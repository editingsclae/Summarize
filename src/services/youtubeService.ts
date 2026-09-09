import { VideoMetadata, TranscriptResult } from '../types/video';
import { 
  extractYouTubeVideoId, 
  isValidYouTubeUrl, 
  isYouTubeLiveUrl, 
  formatTimestamp, 
  formatDuration, 
  getYouTubeTimestampUrl 
} from '../utils/youtube';
import { fetchVideoInfo, fetchTranscript as apiFetchTranscript, checkCaptions as apiCheckCaptions } from './api';

export class YouTubeService {
  extractVideoId(urlOrId: string): string | null {
    return extractYouTubeVideoId(urlOrId);
  }

  isValidUrl(url: string): boolean {
    return isValidYouTubeUrl(url);
  }

  isLiveUrl(url: string): boolean {
    return isYouTubeLiveUrl(url);
  }

  formatTimestamp(seconds: number | null | undefined): string {
    return formatTimestamp(seconds);
  }

  formatDuration(seconds: number, isLive?: boolean): string {
    return formatDuration(seconds, isLive);
  }

  getTimestampUrl(videoId: string, seconds: number | null | undefined): string {
    return getYouTubeTimestampUrl(videoId, seconds);
  }

  async fetchMetadata(urlOrId: string): Promise<VideoMetadata> {
    const res = await fetchVideoInfo(urlOrId);
    return res.video;
  }

  async fetchTranscript(videoId: string, language = 'en'): Promise<TranscriptResult> {
    return apiFetchTranscript(videoId, language);
  }

  async checkCaptionsAvailability(videoId: string): Promise<boolean> {
    return apiCheckCaptions(videoId);
  }
}

export const youtubeService = new YouTubeService();
export {
  extractYouTubeVideoId,
  isValidYouTubeUrl,
  isYouTubeLiveUrl,
  formatTimestamp,
  formatDuration,
  getYouTubeTimestampUrl,
};
export default youtubeService;
