export interface TranscriptSegment {
  start: number;
  duration?: number;
  text: string;
}

export interface TranscriptResult {
  success: boolean;
  available?: boolean;
  source: 'youtube_captions' | 'speech_to_text';
  language?: string;
  segments: TranscriptSegment[];
  fullText: string;
  error?: string;
  isLive?: boolean;
  liveStatus?: 'live' | 'upcoming' | 'completed';
}

export interface ITranscriptProvider {
  name: string;
  getTranscript(videoId: string, language?: string): Promise<TranscriptResult>;
}

export interface AudioAcquisitionResult {
  buffer: Buffer;
  mimeType: string;
  duration: number; // in seconds
  title?: string;
}

export interface ISpeechToTextProvider {
  name: string;
  transcribe(
    audioBuffer: Buffer,
    mimeType: string,
    options: { videoId: string; language?: string; duration?: number }
  ): Promise<TranscriptResult>;
}
