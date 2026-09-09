import ytdl from '@distube/ytdl-core';
import { AudioAcquisitionResult } from './types';

export class MediaAcquisitionService {
  private maxDurationSeconds: number;
  private maxAudioSizeBytes: number;

  constructor() {
    this.maxDurationSeconds = parseInt(process.env.MAX_TRANSCRIPTION_DURATION || '3600', 10);
    this.maxAudioSizeBytes = parseInt(process.env.MAX_AUDIO_SIZE || '52428800', 10); // 50MB default
  }

  /**
   * Acquire audio stream from a YouTube video
   */
  async getAudio(videoId: string): Promise<AudioAcquisitionResult> {
    const cleanId = videoId.trim();
    const watchUrl = `https://www.youtube.com/watch?v=${cleanId}`;

    // 1. Fetch metadata and verify accessibility and duration limits
    let info: ytdl.videoInfo;
    try {
      info = await ytdl.getInfo(watchUrl, {
        requestOptions: {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          },
        },
      });
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : String(err);
      if (
        errMsg.includes('Sign in to confirm you’re not a bot') ||
        errMsg.includes('LOGIN_REQUIRED') ||
        errMsg.includes('bot')
      ) {
        throw new Error('YOUTUBE_BOT_PROTECTED: Direct media stream requires authentication on cloud server IP.');
      }
      throw new Error(`Media acquisition inspection error: ${errMsg}`);
    }

    const durationSeconds = parseInt(info.videoDetails.lengthSeconds, 10) || 0;
    const isLive = Boolean(info.videoDetails.isLiveContent);

    // Active live streams cannot be downloaded as a finite audio buffer
    if (isLive && durationSeconds === 0) {
      throw new Error('LIVE_STREAM_IN_PROGRESS: Audio extraction is unavailable for live broadcasts currently in progress.');
    }

    if (!isLive && this.maxDurationSeconds > 0 && durationSeconds > this.maxDurationSeconds) {
      throw new Error(
        `Video duration (${Math.round(durationSeconds / 60)} min) exceeds maximum permitted limit (${Math.round(
          this.maxDurationSeconds / 60
        )} min).`
      );
    }

    // 2. Select lowest audio bitrate format for speed and speech transcription efficiency
    const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
    if (!audioFormats || audioFormats.length === 0) {
      throw new Error('No accessible audio stream formats found for this video.');
    }

    // Prefer lowest bitrate for audio processing to keep payload compact
    const selectedFormat = audioFormats.reduce((prev, curr) => {
      const prevBitrate = prev.audioBitrate || 128;
      const currBitrate = curr.audioBitrate || 128;
      return currBitrate < prevBitrate ? curr : prev;
    }, audioFormats[0]);

    const mimeType = selectedFormat.mimeType ? selectedFormat.mimeType.split(';')[0] : 'audio/mp4';

    // 3. Stream audio into memory buffer with size protection
    const audioStream = ytdl(watchUrl, {
      format: selectedFormat,
      filter: 'audioonly',
      highWaterMark: 1 << 20, // 1MB chunks
    });

    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];
      let totalBytes = 0;

      audioStream.on('data', (chunk: Buffer) => {
        totalBytes += chunk.length;
        if (totalBytes > this.maxAudioSizeBytes) {
          audioStream.destroy();
          reject(
            new Error(
              `Audio size exceeded maximum limit of ${Math.round(
                this.maxAudioSizeBytes / (1024 * 1024)
              )}MB for transcription.`
            )
          );
          return;
        }
        chunks.push(chunk);
      });

      audioStream.on('end', () => {
        const fullBuffer = Buffer.concat(chunks);
        resolve({
          buffer: fullBuffer,
          mimeType,
          duration: durationSeconds,
          title: info.videoDetails.title,
        });
      });

      audioStream.on('error', (streamErr) => {
        reject(new Error(`Audio streaming error: ${streamErr.message}`));
      });
    });
  }
}
