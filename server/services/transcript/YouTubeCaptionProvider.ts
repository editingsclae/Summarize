import { YoutubeTranscript } from 'youtube-transcript';
import { ITranscriptProvider, TranscriptResult, TranscriptSegment } from './types';
import { SAMPLE_VIDEOS } from '../../../src/services/sampleData';

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

export class YouTubeCaptionProvider implements ITranscriptProvider {
  public readonly name = 'YouTubeCaptionProvider';

  /**
   * Quick check if YouTube caption tracks exist for the video
   */
  async hasCaptions(videoId: string): Promise<boolean> {
    const cleanId = videoId.trim();

    // Sample video check
    if (SAMPLE_VIDEOS.some((s) => s.id === cleanId && s.transcript)) {
      return true;
    }

    // Try YoutubeTranscript ping
    try {
      const items = await YoutubeTranscript.fetchTranscript(cleanId);
      if (items && items.length > 0) return true;
    } catch {
      // Fall through to watch page scraping
    }

    // Direct page caption track inspection
    try {
      const pageRes = await fetch(`https://www.youtube.com/watch?v=${cleanId}`, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept-Language': 'en-US,en;q=0.9',
        },
      });

      if (pageRes.ok) {
        const html = await pageRes.text();
        return html.includes('"captionTracks":');
      }
    } catch {
      // Ignore
    }

    return false;
  }

  async getTranscript(videoId: string, language = 'en'): Promise<TranscriptResult> {
    const cleanId = videoId.trim();

    // 1. Sample videos with indexed transcript
    const sample = SAMPLE_VIDEOS.find((s) => s.id === cleanId);
    if (sample && sample.transcript) {
      return {
        success: true,
        available: true,
        source: 'youtube_captions',
        language: language || 'en',
        segments: sample.segments || [{ start: 0, duration: 60, text: sample.transcript }],
        fullText: sample.transcript,
      };
    }

    // 2. youtube-transcript with requested language
    if (language && language !== 'auto') {
      try {
        const items = await YoutubeTranscript.fetchTranscript(cleanId, { lang: language });
        if (items && items.length > 0) {
          const segments: TranscriptSegment[] = items.map((item) => ({
            start: Math.round(item.offset / 1000),
            duration: Math.round(item.duration / 1000),
            text: decodeHtmlEntities(item.text),
          }));
          return {
            success: true,
            available: true,
            source: 'youtube_captions',
            language,
            segments,
            fullText: segments.map((s) => s.text).join(' '),
          };
        }
      } catch {
        // Fall through
      }
    }

    // 3. Default video captions without language constraint
    try {
      const items = await YoutubeTranscript.fetchTranscript(cleanId);
      if (items && items.length > 0) {
        const segments: TranscriptSegment[] = items.map((item) => ({
          start: Math.round(item.offset / 1000),
          duration: Math.round(item.duration / 1000),
          text: decodeHtmlEntities(item.text),
        }));
        return {
          success: true,
          available: true,
          source: 'youtube_captions',
          language: language || 'en',
          segments,
          fullText: segments.map((s) => s.text).join(' '),
        };
      }
    } catch {
      // Fall through
    }

    // 4. Parse caption tracks from YouTube watch page
    try {
      const pageResponse = await fetch(`https://www.youtube.com/watch?v=${cleanId}`, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept-Language': 'en-US,en;q=0.9',
        },
      });

      if (pageResponse.ok) {
        const html = await pageResponse.text();
        const match = html.match(/"captionTracks":\s*(\[.+?\])/);
        if (match && match[1]) {
          const tracks = JSON.parse(match[1]);
          if (Array.isArray(tracks) && tracks.length > 0) {
            const selectedTrack =
              tracks.find((t: { languageCode: string }) => t.languageCode === language) || tracks[0];
            if (selectedTrack?.baseUrl) {
              const captionXmlRes = await fetch(selectedTrack.baseUrl);
              if (captionXmlRes.ok) {
                const xmlText = await captionXmlRes.text();
                const textRegex = /<text start="([\d.]+)" dur="([\d.]+)"[^>]*>([\s\S]*?)<\/text>/g;
                const segments: TranscriptSegment[] = [];
                let m;
                while ((m = textRegex.exec(xmlText)) !== null) {
                  segments.push({
                    start: Math.round(parseFloat(m[1])),
                    duration: Math.round(parseFloat(m[2])),
                    text: decodeHtmlEntities(m[3]),
                  });
                }
                if (segments.length > 0) {
                  return {
                    success: true,
                    available: true,
                    source: 'youtube_captions',
                    language: selectedTrack.languageCode || language || 'en',
                    segments,
                    fullText: segments.map((s) => s.text).join(' '),
                  };
                }
              }
            }
          }
        }
      }
    } catch {
      // Ignore
    }

    return {
      success: false,
      available: false,
      source: 'youtube_captions',
      segments: [],
      fullText: '',
      error: 'No accessible YouTube caption tracks found.',
    };
  }
}
