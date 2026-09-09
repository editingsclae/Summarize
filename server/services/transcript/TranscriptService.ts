import { ITranscriptProvider, TranscriptResult } from './types';
import { YouTubeCaptionProvider } from './YouTubeCaptionProvider';
import { MediaAcquisitionService } from './MediaAcquisitionService';
import { getSpeechToTextProvider, MockSpeechToTextProvider } from './SpeechToTextProvider';

export class TranscriptService {
  private youtubeCaptionProvider: YouTubeCaptionProvider;
  private mediaAcquisitionService: MediaAcquisitionService;
  private transcriptCache = new Map<string, TranscriptResult>();

  constructor() {
    this.youtubeCaptionProvider = new YouTubeCaptionProvider();
    this.mediaAcquisitionService = new MediaAcquisitionService();
  }

  /**
   * Check if YouTube captions exist without doing full audio fallback
   */
  async checkCaptionsOnly(videoId: string): Promise<boolean> {
    return this.youtubeCaptionProvider.hasCaptions(videoId);
  }

  /**
   * Primary transcript pipeline:
   * 1. Check cache by videoId
   * 2. Try YouTube captions first (fastest, most economical)
   * 3. Fallback automatically to server-side speech-to-text from audio
   * 4. Return common normalized TranscriptResult
   */
  async getTranscript(
    videoId: string,
    options?: { language?: string; forceRefresh?: boolean }
  ): Promise<TranscriptResult> {
    const cleanId = videoId.trim();
    const cacheKey = `${cleanId}_${options?.language || 'default'}`;

    // 1. Check in-memory cache
    if (!options?.forceRefresh && this.transcriptCache.has(cacheKey)) {
      console.log(`[TranscriptService] Serving cached transcript for ${cleanId}`);
      return this.transcriptCache.get(cacheKey)!;
    }

    // 2. Attempt YouTube captions first
    console.log(`[TranscriptService] Checking official captions for ${cleanId}...`);
    try {
      const captionResult = await this.youtubeCaptionProvider.getTranscript(cleanId, options?.language);
      if (captionResult.success && captionResult.segments.length > 0) {
        console.log(`[TranscriptService] Found YouTube captions for ${cleanId} (${captionResult.segments.length} segments)`);
        this.transcriptCache.set(cacheKey, captionResult);
        return captionResult;
      }
    } catch (captionErr) {
      console.log(`[TranscriptService] Official caption tracks not present for ${cleanId}`);
    }

    // 3. Fallback to Speech-to-Text from video audio
    const isTranscriptionEnabled =
      process.env.TRANSCRIPTION_ENABLED !== 'false' && process.env.TRANSCRIPTION_ENABLED !== '0';

    if (!isTranscriptionEnabled) {
      console.log(`[TranscriptService] Automatic speech-to-text disabled via TRANSCRIPTION_ENABLED=false`);
      return {
        success: false,
        available: false,
        source: 'youtube_captions',
        segments: [],
        fullText: '',
        error: "YouTube captions are unavailable, and automatic audio transcription is disabled on the server.",
      };
    }

    console.log(`[TranscriptService] Captions unavailable. Starting speech-to-text fallback for ${cleanId}...`);

    try {
      // Acquire audio stream server-side
      const audioData = await this.mediaAcquisitionService.getAudio(cleanId);
      console.log(
        `[TranscriptService] Audio acquired: ${Math.round(audioData.buffer.length / 1024)} KB (${audioData.duration}s duration)`
      );

      // Transcribe audio using configured provider (e.g. Gemini, Whisper)
      const sttProvider = getSpeechToTextProvider();
      console.log(`[TranscriptService] Invoking STT provider: ${sttProvider.name}`);

      const sttResult = await sttProvider.transcribe(audioData.buffer, audioData.mimeType, {
        videoId: cleanId,
        language: options?.language,
        duration: audioData.duration,
      });

      if (sttResult.success && (sttResult.segments.length > 0 || sttResult.fullText.length > 0)) {
        console.log(
          `[TranscriptService] Speech-to-text succeeded: ${sttResult.segments.length} segments, ${sttResult.fullText.length} chars`
        );
        this.transcriptCache.set(cacheKey, sttResult);
        return sttResult;
      }
    } catch (sttErr: unknown) {
      const errMsg = sttErr instanceof Error ? sttErr.message : String(sttErr);
      const isBotProtected =
        errMsg.includes('YOUTUBE_BOT_PROTECTED') ||
        errMsg.includes('Sign in to confirm you’re not a bot') ||
        errMsg.includes('LOGIN_REQUIRED');

      if (isBotProtected) {
        console.log(`[TranscriptService] Direct audio extraction restricted by YouTube bot protection for ${cleanId}.`);
      } else {
        console.log(`[TranscriptService] Direct media acquisition unavailable for ${cleanId}: ${errMsg.slice(0, 80)}`);
      }

      if (errMsg.includes('LIVE_STREAM_IN_PROGRESS')) {
        return {
          success: false,
          available: false,
          source: 'youtube_captions',
          segments: [],
          fullText: '',
          error: "This YouTube live stream is currently in progress. Live captions have not yet been published by YouTube. You can paste live notes or key discussion points below to generate an immediate briefing.",
        };
      }

      // If in development or demo mode and media streaming was blocked by network/host policies,
      // allow fallback to mock provider if configured
      if (process.env.TRANSCRIPTION_PROVIDER === 'mock') {
        const mockProvider = new MockSpeechToTextProvider();
        const mockResult = await mockProvider.transcribe(Buffer.from([]), 'audio/mp4', {
          videoId: cleanId,
          language: options?.language,
        });
        this.transcriptCache.set(cacheKey, mockResult);
        return mockResult;
      }
    }

    // 4. If all automated pathways exhausted, return clean result indicating captions are not published
    return {
      success: false,
      available: false,
      source: 'speech_to_text',
      segments: [],
      fullText: '',
      error: "Direct captions are not published on YouTube for this video.",
    };
  }

  /**
   * Clear cache for a video
   */
  clearCache(videoId?: string) {
    if (videoId) {
      for (const key of this.transcriptCache.keys()) {
        if (key.startsWith(videoId)) {
          this.transcriptCache.delete(key);
        }
      }
    } else {
      this.transcriptCache.clear();
    }
  }
}

export const transcriptService = new TranscriptService();
