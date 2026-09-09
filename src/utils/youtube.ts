/**
 * YouTube URL, live stream detection, and timestamp utilities
 */

/**
 * Strict regex to detect YouTube video IDs from all supported standard and live stream formats:
 * - Direct 11-char ID
 * - youtube.com/live/VIDEO_ID
 * - youtu.be/live/VIDEO_ID
 * - m.youtube.com/live/VIDEO_ID
 * - youtube.com/watch?v=VIDEO_ID (with or without &live=1, query params)
 * - youtu.be/VIDEO_ID
 * - youtube.com/embed/VIDEO_ID
 * - youtube.com/v/VIDEO_ID
 * - youtube.com/shorts/VIDEO_ID
 */
export const YOUTUBE_VIDEO_ID_REGEX =
  /(?:^|https?:\/\/|(?:[\/?#]))(?:(?:www\.|m\.)?youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|v\/|shorts\/|live\/)|(?:www\.)?youtu\.be\/(?:live\/)?)([a-zA-Z0-9_-]{11})(?:[\/?#&]|$)/i;

export const YOUTUBE_LIVE_URL_REGEX =
  /(?:^|https?:\/\/|(?:[\/?#]))(?:(?:www\.|m\.)?youtube\.com\/live\/|(?:www\.)?youtu\.be\/live\/|live\/)([a-zA-Z0-9_-]{11})(?:[\/?#&]|$)/i;

export function extractYouTubeVideoId(urlOrId: string): string | null {
  if (!urlOrId || typeof urlOrId !== 'string') return null;
  const trimmed = urlOrId.trim();

  // If it's a pure 11 characters without URL characters, treat as direct ID
  const isUrlLike = trimmed.includes('.') || trimmed.includes('/') || trimmed.includes(':') || trimmed.includes('?');
  if (!isUrlLike && /^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  // Explicit check for YouTube /live/ URL formats:
  // e.g. https://www.youtube.com/live/jfKfPfyJRdk, youtube.com/live/jfKfPfyJRdk?feature=share, m.youtube.com/live/...
  const liveMatch = trimmed.match(YOUTUBE_LIVE_URL_REGEX);
  if (liveMatch && liveMatch[1]) {
    return liveMatch[1];
  }

  // General YouTube pattern matching
  const generalMatch = trimmed.match(YOUTUBE_VIDEO_ID_REGEX);
  if (generalMatch && generalMatch[1] && generalMatch[1].length === 11) {
    return generalMatch[1];
  }

  try {
    // Standard URL parsing fallback
    const parsed = new URL(trimmed.startsWith('http') ? trimmed : `https://${trimmed}`);
    const host = parsed.hostname.toLowerCase();
    const isYouTubeHost = host.endsWith('youtube.com') || host.endsWith('youtu.be');

    if (!isYouTubeHost) {
      return null;
    }

    if (host.includes('youtu.be')) {
      const id = parsed.pathname.slice(1).split(/[\/?#]/)[0];
      if (/^[a-zA-Z0-9_-]{11}$/.test(id)) return id;
    }

    if (parsed.searchParams.has('v')) {
      const id = parsed.searchParams.get('v');
      if (id && /^[a-zA-Z0-9_-]{11}$/.test(id)) return id;
    }

    if (parsed.pathname.includes('/live/')) {
      const parts = parsed.pathname.split('/live/');
      const candidate = parts[1]?.split(/[\/?#]/)[0];
      if (candidate && /^[a-zA-Z0-9_-]{11}$/.test(candidate)) {
        return candidate;
      }
    }

    if (parsed.pathname.includes('/shorts/')) {
      const parts = parsed.pathname.split('/shorts/');
      const candidate = parts[1]?.split(/[\/?#]/)[0];
      if (candidate && /^[a-zA-Z0-9_-]{11}$/.test(candidate)) {
        return candidate;
      }
    }

    if (parsed.pathname.includes('/embed/')) {
      const parts = parsed.pathname.split('/embed/');
      const candidate = parts[1]?.split(/[\/?#]/)[0];
      if (candidate && /^[a-zA-Z0-9_-]{11}$/.test(candidate)) {
        return candidate;
      }
    }
  } catch {
    return null;
  }

  return null;
}

/**
 * Detects if a URL corresponds to a YouTube live stream
 * Handles /live/ URLs, channel live streams (@channel/live, /channel/ID/live), and live query flags
 */
export function isYouTubeLiveUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();
  return (
    /\/live(?:\/|$|\?)/i.test(trimmed) ||
    /[?&]live=1/i.test(trimmed) ||
    /@[\w.-]+\/live/i.test(trimmed) ||
    /\/channel\/[\w-]+\/live/i.test(trimmed) ||
    /\/c\/[\w.-]+\/live/i.test(trimmed) ||
    /\/user\/[\w.-]+\/live/i.test(trimmed)
  );
}

/**
 * Validates any YouTube URL or Video ID, including standard watch URLs, shorts, embeds,
 * direct live stream links (/live/VIDEO_ID), and channel live stream URLs (@handle/live)
 */
export function isValidYouTubeUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();

  // If a valid 11-char video ID is extracted directly
  if (extractYouTubeVideoId(trimmed) !== null) {
    return true;
  }

  // Channel live stream URLs (@channel/live, /channel/ID/live, /c/name/live)
  if (
    /@[\w.-]+\/live(?:\/|$|\?)/i.test(trimmed) ||
    /\/channel\/[\w-]+\/live(?:\/|$|\?)/i.test(trimmed) ||
    /\/c\/[\w.-]+\/live(?:\/|$|\?)/i.test(trimmed) ||
    /\/user\/[\w.-]+\/live(?:\/|$|\?)/i.test(trimmed)
  ) {
    return true;
  }

  return false;
}

/**
 * Helper to determine if a video represents an active live stream in progress
 */
export function isLiveStreamInProgress(video?: {
  isLive?: boolean;
  liveStatus?: string;
  duration?: string;
} | null): boolean {
  if (!video) return false;
  if (video.liveStatus === 'completed') return false;
  return Boolean(video.isLive || video.duration === 'LIVE' || video.liveStatus === 'live');
}

export function formatTimestamp(seconds: number | null | undefined): string {
  if (seconds === null || seconds === undefined || isNaN(seconds)) return '';
  const sec = Math.floor(Math.max(0, seconds));
  const hrs = Math.floor(sec / 3600);
  const mins = Math.floor((sec % 3600) / 60);
  const remainingSec = sec % 60;

  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, '0')}:${remainingSec.toString().padStart(2, '0')}`;
  }
  return `${mins}:${remainingSec.toString().padStart(2, '0')}`;
}

export function getYouTubeTimestampUrl(videoId: string, seconds: number | null | undefined): string {
  const cleanId = extractYouTubeVideoId(videoId) || videoId;
  if (seconds === null || seconds === undefined) {
    return `https://www.youtube.com/watch?v=${cleanId}`;
  }
  const s = Math.floor(seconds);
  return `https://www.youtube.com/watch?v=${cleanId}&t=${s}s`;
}

export function formatDuration(seconds: number, isLive?: boolean, liveStatus?: string): string {
  if (isLive && liveStatus !== 'completed') return 'LIVE';
  if (liveStatus === 'completed') {
    return seconds ? formatTimestamp(seconds) : 'Streamed Live';
  }
  if (!seconds || isNaN(seconds)) return isLive ? 'LIVE' : 'Unknown duration';
  return formatTimestamp(seconds);
}

/**
 * youtubeService helper utility on the client side
 */
export const youtubeService = {
  extractVideoId: extractYouTubeVideoId,
  isValidUrl: isValidYouTubeUrl,
  isLiveUrl: isYouTubeLiveUrl,
  isLiveInProgress: isLiveStreamInProgress,
  formatTimestamp,
  formatDuration,
  getTimestampUrl: getYouTubeTimestampUrl,
};
