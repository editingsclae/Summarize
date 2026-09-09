import { VideoMetadata, TranscriptResult, TranscriptSegment } from '../src/types/video';
import { SAMPLE_VIDEOS } from '../src/services/sampleData';
import { transcriptService } from './services/transcript';

export const YOUTUBE_VIDEO_ID_REGEX =
  /(?:^|https?:\/\/|(?:[\/?#]))(?:(?:www\.|m\.)?youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|v\/|shorts\/|live\/)|(?:www\.)?youtu\.be\/(?:live\/)?)([a-zA-Z0-9_-]{11})(?:[\/?#&]|$)/i;

export const YOUTUBE_LIVE_URL_REGEX =
  /(?:^|https?:\/\/|(?:[\/?#]))(?:(?:www\.|m\.)?youtube\.com\/live\/|(?:www\.)?youtu\.be\/live\/|live\/)([a-zA-Z0-9_-]{11})(?:[\/?#&]|$)/i;

export function extractVideoId(urlOrId: string): string | null {
  if (!urlOrId || typeof urlOrId !== 'string') return null;
  const trimmed = urlOrId.trim();

  // If pure 11 characters without URL characters, treat as direct ID
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
 * Checks if a given URL or string represents a YouTube live stream
 */
export function isLiveUrl(url: string): boolean {
  if (!url) return false;
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
 * Resolves a video ID from direct IDs, live URLs, or channel live stream URLs (@channel/live)
 */
export async function resolveVideoId(urlOrId: string): Promise<string | null> {
  const directId = extractVideoId(urlOrId);
  if (directId) return directId;

  if (!urlOrId || typeof urlOrId !== 'string') return null;
  const trimmed = urlOrId.trim();

  // If this is a channel live stream link (e.g. https://www.youtube.com/@LofiGirl/live)
  if (isLiveUrl(trimmed)) {
    try {
      const fullUrl = trimmed.startsWith('http') ? trimmed : `https://${trimmed}`;
      const res = await fetch(fullUrl, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept-Language': 'en-US,en;q=0.9',
          Cookie: 'SOCS=CAESEwgDEgk2MTc4NDQ2MzUaAmVuIAEaBgiAoP3UBg;',
        },
      });

      if (res.ok) {
        const html = await res.text();

        // 1. Look for canonical link with watch?v=...
        const canonicalMatch = html.match(/<link rel="canonical" href="https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})"/);
        if (canonicalMatch && canonicalMatch[1]) {
          return canonicalMatch[1];
        }

        // 2. Look for "videoId":"..." in initial data
        const videoIdMatch = html.match(/"videoId":"([a-zA-Z0-9_-]{11})"/);
        if (videoIdMatch && videoIdMatch[1]) {
          return videoIdMatch[1];
        }

        // 3. Look for /watch?v= or /live/ in page
        const watchMatch = html.match(/\/watch\?v=([a-zA-Z0-9_-]{11})/);
        if (watchMatch && watchMatch[1]) {
          return watchMatch[1];
        }

        const liveMatch = html.match(/\/live\/([a-zA-Z0-9_-]{11})/);
        if (liveMatch && liveMatch[1]) {
          return liveMatch[1];
        }
      }
    } catch (err) {
      console.warn(`[YouTubeService] Failed to resolve channel live URL ${trimmed}:`, err);
    }
  }

  return null;
}

/**
 * Formats duration in seconds into readable H:MM:SS or M:SS string
 */
export function formatDurationSeconds(seconds?: number): string {
  if (!seconds || isNaN(seconds) || seconds <= 0) return 'Unavailable';
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Formats ISO 8601 duration (e.g. PT1H23M45S) into readable string and seconds
 */
function parseIso8601Duration(isoDuration: string): { formatted: string; seconds: number } | null {
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return null;
  const hours = parseInt(match[1] || '0', 10);
  const minutes = parseInt(match[2] || '0', 10);
  const seconds = parseInt(match[3] || '0', 10);
  const totalSeconds = hours * 3600 + minutes * 60 + seconds;

  if (hours > 0) {
    return {
      formatted: `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
      seconds: totalSeconds,
    };
  }
  return {
    formatted: `${minutes}:${seconds.toString().padStart(2, '0')}`,
    seconds: totalSeconds,
  };
}

/**
 * Formats numeric view count into clean, human-readable format
 */
export function formatViews(views?: number | string): string {
  if (views === undefined || views === null || views === '') return 'Unavailable';
  const num = typeof views === 'string' ? parseInt(views.replace(/[^0-9]/g, ''), 10) : views;
  if (isNaN(num)) return typeof views === 'string' ? views : 'Unavailable';
  if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(1).replace(/\.0$/, '')}B views`;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1).replace(/\.0$/, '')}M views`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1).replace(/\.0$/, '')}K views`;
  return `${num.toLocaleString()} views`;
}

/**
 * Formats likes count
 */
export function formatLikes(likesStr?: string, likesRaw?: number): string {
  if (likesRaw && !isNaN(likesRaw) && likesRaw > 0) {
    if (likesRaw >= 1_000_000) return `${(likesRaw / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
    if (likesRaw >= 1_000) return `${(likesRaw / 1_000).toFixed(1).replace(/\.0$/, '')}K`;
    return likesRaw.toLocaleString();
  }
  if (likesStr) {
    const clean = likesStr.replace(/\s*likes?/i, '').trim();
    if (clean) return clean;
  }
  return 'Unavailable';
}

/**
 * Formats ISO date into human-friendly format (e.g. Oct 24, 2009)
 */
export function formatPublishDate(dateStr?: string): string {
  if (!dateStr) return 'Unavailable';
  try {
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    }
  } catch {}
  return dateStr;
}

/**
 * Fetch video metadata dynamically and reliably from YouTube,
 * extracting title, channel, channel avatar, duration, views, likes, publication date, thumbnail, and language.
 */
export async function fetchVideoMetadata(videoIdOrUrl: string): Promise<VideoMetadata> {
  const cleanId = (await resolveVideoId(videoIdOrUrl)) || extractVideoId(videoIdOrUrl) || videoIdOrUrl.trim();
  const watchUrl = `https://www.youtube.com/watch?v=${cleanId}`;
  const liveUrl = `https://www.youtube.com/live/${cleanId}`;
  const wasLiveUrlInput = isLiveUrl(videoIdOrUrl);

  let title = `YouTube Video (${cleanId})`;
  let channel = 'YouTube Creator';
  let channelAvatar: string | undefined = undefined;
  let thumbnail = `https://img.youtube.com/vi/${cleanId}/maxresdefault.jpg`;
  let publishedAt: string | undefined = undefined;
  let description = '';
  let duration: string | undefined = undefined;
  let durationSeconds: number | undefined = undefined;
  let viewCount: string | undefined = undefined;
  let viewCountRaw: number | undefined = undefined;
  let likeCount: string | undefined = undefined;
  let likeCountRaw: number | undefined = undefined;
  let language: string | undefined = undefined;
  let concurrentViewers: string | undefined = undefined;
  let isLive = wasLiveUrlInput;
  let isLiveBroadcast = wasLiveUrlInput;
  let liveStatus: 'live' | 'upcoming' | 'completed' | undefined = wasLiveUrlInput ? 'live' : undefined;

  // 1. Fetch YouTube watch page HTML (contains rich ytInitialPlayerResponse & ytInitialData)
  try {
    const pageRes = await fetch(watchUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
        Cookie: 'SOCS=CAESEwgDEgk2MTc4NDQ2MzUaAmVuIAEaBgiAoP3UBg;',
      },
    });

    if (pageRes.ok) {
      const html = await pageRes.text();

      // Parse ytInitialPlayerResponse
      let playerResponse: any = null;
      const playerMatch =
        html.match(/var ytInitialPlayerResponse\s*=\s*(\{.+?\});(?:var|<\/script>)/s) ||
        html.match(/ytInitialPlayerResponse\s*=\s*(\{.+?\});/s);
      if (playerMatch) {
        try {
          playerResponse = JSON.parse(playerMatch[1]);
        } catch {}
      }

      if (playerResponse?.videoDetails) {
        const vd = playerResponse.videoDetails;
        if (vd.title) title = vd.title;
        if (vd.author) channel = vd.author;
        if (vd.shortDescription) description = vd.shortDescription;

        // Real duration
        if (vd.lengthSeconds) {
          const secs = parseInt(vd.lengthSeconds, 10);
          if (!isNaN(secs) && secs > 0) {
            durationSeconds = secs;
            duration = formatDurationSeconds(secs);
          }
        }

        // Real view count
        if (vd.viewCount) {
          const parsedViews = parseInt(vd.viewCount, 10);
          if (!isNaN(parsedViews)) {
            viewCountRaw = parsedViews;
            viewCount = formatViews(parsedViews);
          } else {
            viewCount = vd.viewCount;
          }
        }

        // Live stream check
        if (vd.isLiveContent || vd.isLive) {
          isLive = true;
          isLiveBroadcast = true;
        }

        // Real high-resolution thumbnail
        if (vd.thumbnail?.thumbnails && Array.isArray(vd.thumbnail.thumbnails) && vd.thumbnail.thumbnails.length > 0) {
          const thumbs = vd.thumbnail.thumbnails;
          const bestThumb = thumbs[thumbs.length - 1]?.url;
          if (bestThumb) {
            thumbnail = bestThumb.startsWith('//') ? `https:${bestThumb}` : bestThumb;
          }
        }
      }

      // Microformat (publish date, channel name fallback, default language)
      if (playerResponse?.microformat?.playerMicroformatRenderer) {
        const pm = playerResponse.microformat.playerMicroformatRenderer;
        if (pm.publishDate || pm.uploadDate) {
          publishedAt = formatPublishDate(pm.publishDate || pm.uploadDate);
        }
        if (pm.ownerChannelName && (!channel || channel === 'YouTube Creator')) {
          channel = pm.ownerChannelName;
        }
        if (pm.defaultLanguage) {
          language = pm.defaultLanguage;
        }
      }

      // Captions language
      if (!language && playerResponse?.captions?.playerCaptionsTracklistRenderer?.captionTracks) {
        const tracks = playerResponse.captions.playerCaptionsTracklistRenderer.captionTracks;
        if (Array.isArray(tracks) && tracks.length > 0) {
          language = tracks[0].languageCode || tracks[0].name?.simpleText;
        }
      }

      // Real channel avatar URL
      const avatarMatch =
        html.match(/"videoOwnerRenderer":\s*\{.*?"thumbnail":\s*\{"thumbnails":\s*\[\s*\{"url":\s*"([^"]+)"/s) ||
        html.match(/"channelThumbnail":\s*\{"thumbnails":\s*\[\s*\{"url":\s*"([^"]+)"/s) ||
        html.match(/"avatar":\s*\{"thumbnails":\s*\[\s*\{"url":\s*"([^"]+)"/s) ||
        html.match(/"decoratedAvatarViewModel":\{.*?"avatar":\{"image":\{"sources":\[\{"url":"([^"]+)"/s);
      if (avatarMatch && avatarMatch[1]) {
        channelAvatar = avatarMatch[1].startsWith('//') ? `https:${avatarMatch[1]}` : avatarMatch[1];
      }

      // Real likes extraction
      const exactLikesMatch =
        html.match(/like this video along with ([0-9,]+) other people/i) ||
        html.match(/"label":\s*"([0-9,]+)\s*likes?"/i);
      if (exactLikesMatch && exactLikesMatch[1]) {
        const rawLikesNum = parseInt(exactLikesMatch[1].replace(/,/g, ''), 10);
        if (!isNaN(rawLikesNum)) {
          likeCountRaw = rawLikesNum;
          likeCount = formatLikes(exactLikesMatch[1], rawLikesNum);
        } else {
          likeCount = exactLikesMatch[1];
        }
      } else {
        const compactLikesMatch =
          html.match(/"segmentedLikeDislikeButtonViewModel":\{.*?"title":"([0-9,KMk\.]+)"/) ||
          html.match(/"defaultText":\s*\{\s*"simpleText":\s*"([0-9,KMk\.]+)"\s*\}.*?like/i) ||
          html.match(/"iconType":"LIKE".*?"simpleText":"([0-9,KMk\.]+)"/s);
        if (compactLikesMatch && compactLikesMatch[1]) {
          likeCount = compactLikesMatch[1].trim();
        }
      }

      // Live content inspection
      const detectedLiveContent =
        html.includes('"isLive":true') ||
        html.includes('"isLiveContent":true') ||
        html.includes('"isLiveNow":true') ||
        html.includes('"status":"LIVE"') ||
        html.includes('badge-style-type-live-now') ||
        html.includes('"liveBroadcastDetails"');

      if (detectedLiveContent) {
        isLive = true;
        isLiveBroadcast = true;
      }

      const isLiveNowMatch = html.match(/"isLiveNow":\s*(true|false)/);
      const isLiveNow = isLiveNowMatch ? isLiveNowMatch[1] === 'true' : detectedLiveContent;
      const endTimestampMatch = html.match(/"endTimestamp":\s*"([^"]+)"/);
      let hasEnded = false;
      if (endTimestampMatch && endTimestampMatch[1]) {
        try {
          const endTime = new Date(endTimestampMatch[1]).getTime();
          hasEnded = !isNaN(endTime) && endTime < Date.now();
        } catch {
          hasEnded = false;
        }
      }
      if (isLiveNow) {
        hasEnded = false;
      }
      const isUpcoming = html.includes('"isUpcoming":true') || html.includes('"status":"UPCOMING"');

      if (isUpcoming) {
        liveStatus = 'upcoming';
      } else if (hasEnded) {
        liveStatus = 'completed';
      } else if (isLive) {
        liveStatus = 'live';
      }

      // Concurrent viewers count
      const viewersMatch =
        html.match(/"(?:shortViewCount|viewCount)":\{"runs":\[\{"text":"([^"]+)"\},\{"text":"\s*(?:watching|watching now|concurrent)/i) ||
        html.match(/"([0-9,KMk\.]+\s*(?:watching|watching now))"/i) ||
        html.match(/"concurrentViewers":\s*"([^"]+)"/);
      if (viewersMatch && viewersMatch[1]) {
        const cleanCount = viewersMatch[1].replace(/\s*watching(?:\s+now)?/i, '').trim();
        concurrentViewers = `${cleanCount} watching now`;
        hasEnded = false;
        liveStatus = 'live';
      }

      // Fallback title extraction from meta tags
      if (!title || title.startsWith('YouTube Video')) {
        const ogTitleMatch = html.match(/<meta property="og:title" content="([^"]+)"/);
        if (ogTitleMatch && ogTitleMatch[1]) {
          title = decodeHtmlEntities(ogTitleMatch[1]);
        }
      }

      // Fallback description from meta tags
      if (!description) {
        const descMatch =
          html.match(/<meta property="og:description" content="([^"]+)"/) ||
          html.match(/<meta name="description" content="([^"]+)"/);
        if (descMatch && descMatch[1]) {
          description = decodeHtmlEntities(descMatch[1]);
        }
      }

      // Fallback channel from meta tags
      if (!channel || channel === 'YouTube Creator') {
        const channelMatch =
          html.match(/<link itemprop="name" content="([^"]+)"/) ||
          html.match(/"ownerChannelName":"([^"]+)"/);
        if (channelMatch && channelMatch[1]) {
          channel = decodeHtmlEntities(channelMatch[1]);
        }
      }

      // Fallback duration
      if (!duration) {
        const durationMetaMatch = html.match(/<meta itemprop="duration" content="([^"]+)"/);
        if (durationMetaMatch && durationMetaMatch[1]) {
          const parsed = parseIso8601Duration(durationMetaMatch[1]);
          if (parsed) {
            duration = parsed.formatted;
            durationSeconds = parsed.seconds;
          }
        }
      }

      // Fallback publication date
      if (!publishedAt) {
        const dateMatch =
          html.match(/<meta itemprop="datePublished" content="([^"]+)"/) ||
          html.match(/<meta itemprop="uploadDate" content="([^"]+)"/);
        if (dateMatch && dateMatch[1]) {
          publishedAt = formatPublishDate(dateMatch[1]);
        }
      }

      if (isLive && !hasEnded) {
        duration = 'LIVE';
        durationSeconds = 0;
        if (concurrentViewers) {
          viewCount = concurrentViewers;
        }
      }
    }
  } catch (pageErr) {
    console.warn(`[YouTubeService] Watch page inspect failed for ${cleanId}:`, pageErr);
  }

  // 2. oEmbed Fallback for title/channel/thumbnail if needed
  if (!title || title.startsWith('YouTube Video') || !channel || channel === 'YouTube Creator') {
    try {
      const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(watchUrl)}&format=json`;
      const res = await fetch(oembedUrl);
      if (res.ok) {
        const data = (await res.json()) as { title?: string; author_name?: string; thumbnail_url?: string };
        if (data.title && (!title || title.startsWith('YouTube Video'))) title = data.title;
        if (data.author_name && (!channel || channel === 'YouTube Creator')) channel = data.author_name;
        if (data.thumbnail_url && !thumbnail) thumbnail = data.thumbnail_url;
      }
    } catch (err) {
      console.warn(`[YouTubeService] oEmbed fetch fallback failed for ${cleanId}:`, err);
    }
  }

  return {
    id: cleanId,
    url: watchUrl,
    title,
    channel,
    channelAvatar,
    thumbnail,
    duration: isLive && liveStatus === 'live' ? 'LIVE' : duration || 'Unavailable',
    durationSeconds: isLive && liveStatus === 'live' ? 0 : durationSeconds,
    publishedAt: publishedAt || 'Unavailable',
    description,
    viewCount: viewCount || 'Unavailable',
    viewCountRaw,
    likeCount: likeCount || 'Unavailable',
    likeCountRaw,
    language: language || undefined,
    isLive,
    isLiveBroadcast,
    liveStatus,
    concurrentViewers,
  };
}

function formatTimeAgo(isoDate: string): string {
  try {
    const diffMs = Date.now() - new Date(isoDate).getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours < 1) return 'just recently';
    if (diffHours === 1) return '1 hour ago';
    if (diffHours < 24) return `${diffHours} hours ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} days ago`;
  } catch {
    return 'recently';
  }
}

/**
 * Check if captions exist for video
 */
export async function checkCaptionsAvailability(videoIdOrUrl: string): Promise<boolean> {
  const cleanId = (await resolveVideoId(videoIdOrUrl)) || extractVideoId(videoIdOrUrl) || videoIdOrUrl.trim();
  return transcriptService.checkCaptionsOnly(cleanId);
}

/**
 * Fetch transcript with fallback mechanisms (Captions -> Speech-to-Text)
 */
export async function fetchTranscript(videoIdOrUrl: string, lang = 'en'): Promise<TranscriptResult> {
  const cleanId = (await resolveVideoId(videoIdOrUrl)) || extractVideoId(videoIdOrUrl) || videoIdOrUrl.trim();
  const result = await transcriptService.getTranscript(cleanId, { language: lang });

  return {
    success: result.success,
    available: result.success,
    source: result.source,
    language: result.language || lang,
    segments: result.segments,
    fullText: result.fullText,
    error: result.error,
    isLive: result.isLive,
    liveStatus: result.liveStatus,
  };
}

function decodeHtmlEntities(text: string): string {
  if (!text) return '';
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .trim();
}

/**
 * Comprehensive YouTubeService encapsulating URL resolution, live stream detection,
 * metadata extraction (including active/ongoing streams), and transcript access.
 */
export class YouTubeService {
  extractVideoId(urlOrId: string): string | null {
    return extractVideoId(urlOrId);
  }

  isLiveUrl(url: string): boolean {
    return isLiveUrl(url);
  }

  async resolveVideoId(urlOrId: string): Promise<string | null> {
    return resolveVideoId(urlOrId);
  }

  async fetchMetadata(videoIdOrUrl: string): Promise<VideoMetadata> {
    return fetchVideoMetadata(videoIdOrUrl);
  }

  async fetchTranscript(videoIdOrUrl: string, lang = 'en'): Promise<TranscriptResult> {
    return fetchTranscript(videoIdOrUrl, lang);
  }

  async checkCaptionsAvailability(videoIdOrUrl: string): Promise<boolean> {
    return checkCaptionsAvailability(videoIdOrUrl);
  }
}

export const youtubeService = new YouTubeService();

