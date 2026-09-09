export interface VideoMetadata {
  id: string;
  url: string;
  title: string;
  channel: string;
  channelAvatar?: string;
  thumbnail: string;
  duration?: string;
  durationSeconds?: number;
  publishedAt?: string;
  description?: string;
  viewCount?: string;
  viewCountFormatted?: string;
  viewCountRaw?: number;
  likeCount?: string;
  likeCountRaw?: number;
  language?: string;
  isLive?: boolean;
  isLiveBroadcast?: boolean;
  liveStatus?: 'live' | 'upcoming' | 'completed';
  concurrentViewers?: string;
}

export interface TranscriptSegment {
  start: number; // in seconds
  duration?: number; // in seconds
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
