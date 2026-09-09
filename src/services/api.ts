import { VideoMetadata, TranscriptResult } from '../types/video';
import { StructuredSummary, SummarizeRequestOptions, QnAMessage } from '../types/summary';
import { SAMPLE_VIDEOS } from './sampleData';

export async function fetchVideoInfo(url: string): Promise<{ video: VideoMetadata; isSample?: boolean }> {
  const res = await fetch('/api/video-info', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to retrieve video info');
  }
  return data;
}

export async function fetchTranscript(videoId: string, language = 'en'): Promise<TranscriptResult> {
  const res = await fetch('/api/transcript', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ videoId, language }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to retrieve transcript');
  }
  return data.transcript;
}

export async function checkCaptions(videoId: string): Promise<boolean> {
  try {
    const res = await fetch('/api/check-captions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ videoId }),
    });
    if (res.ok) {
      const data = await res.json();
      return Boolean(data.hasCaptions);
    }
  } catch {
    // Ignore
  }
  return false;
}

export async function summarizeVideo(
  options: SummarizeRequestOptions,
  onProgress?: (stage: number, stageName: string, transcriptMethod?: 'captions' | 'stt' | 'checking') => void
): Promise<{ video: VideoMetadata; summary: StructuredSummary; transcriptSource?: string }> {
  // Stage 1: Video detected
  if (onProgress) {
    onProgress(1, 'Validating URL & parsing video identifiers', 'checking');
    await new Promise((r) => setTimeout(r, 400));
    onProgress(2, 'Fetching metadata, channel, and thumbnail', 'checking');
  }

  // Fast check of captions availability to set UI state immediately
  let detectedMethod: 'captions' | 'stt' = 'captions';
  const checkPromise = (async () => {
    try {
      const targetUrl = options.youtubeUrl || (options as any).url;
      const res = await fetch('/api/check-captions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: targetUrl }),
      });
      if (res.ok) {
        const data = await res.json();
        return data.hasCaptions ? 'captions' : 'stt';
      }
    } catch {
      // fallback
    }
    return 'captions';
  })();

  const [methodResult] = await Promise.all([
    checkPromise,
    new Promise((r) => setTimeout(r, 500)),
  ]);

  detectedMethod = (methodResult as 'captions' | 'stt') || 'captions';

  if (onProgress) {
    onProgress(
      3,
      detectedMethod === 'captions'
        ? 'Official captions found on YouTube'
        : 'Captions unavailable — switching to automatic AI speech-to-text',
      detectedMethod
    );
    await new Promise((r) => setTimeout(r, 500));
    onProgress(
      4,
      detectedMethod === 'captions'
        ? 'Processing YouTube transcript segments'
        : 'Transcribing video audio directly with AI speech-to-text',
      detectedMethod
    );
  }

  // Start the actual summarization API request
  const requestPromise = fetch('/api/summarize', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(options),
  });

  // Intermediate simulated transitions while model synthesizes
  let stageTimer: NodeJS.Timeout | null = null;
  let currentSimulated = 5;

  if (onProgress) {
    stageTimer = setInterval(() => {
      if (currentSimulated === 5) {
        onProgress(5, 'Filtering out fluff and mapping central themes', detectedMethod);
        currentSimulated = 6;
      } else if (currentSimulated === 6) {
        onProgress(6, 'Detecting facts, metrics, quotes, and timestamps', detectedMethod);
        currentSimulated = 7;
      } else if (currentSimulated === 7) {
        onProgress(7, 'Synthesizing executive briefing with Gemini', detectedMethod);
        currentSimulated = 8;
      }
    }, 2800);
  }

  try {
    const res = await requestPromise;
    if (stageTimer) clearInterval(stageTimer);

    const data = await res.json();

    if (!res.ok) {
      if (res.status === 422 && data.needsManualTranscript) {
        const error: any = new Error(data.error || 'Transcript unavailable');
        error.needsManualTranscript = true;
        error.video = data.video;
        throw error;
      }
      throw new Error(data.error || 'Summarization request failed');
    }

    if (onProgress) {
      const finalMethod = data.transcriptSource === 'speech_to_text' ? 'stt' : 'captions';
      onProgress(8, 'Formatting intelligence report and actionable insights', finalMethod);
      await new Promise((r) => setTimeout(r, 300));
    }

    return data;
  } catch (err) {
    if (stageTimer) clearInterval(stageTimer);
    throw err;
  }
}

export async function askVideoQuestion(params: {
  video: VideoMetadata;
  transcript?: string;
  summary: StructuredSummary;
  question: string;
}): Promise<{ answer: string; citations: { text: string; timestamp?: number }[] }> {
  const res = await fetch('/api/ask', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to get answer');
  }
  return data;
}

export async function getSampleVideos() {
  try {
    const res = await fetch('/api/sample-videos');
    if (res.ok) {
      const data = await res.json();
      return data.samples || SAMPLE_VIDEOS;
    }
  } catch {
    // fallback
  }
  return SAMPLE_VIDEOS;
}

export async function translateSummary(
  summary: StructuredSummary,
  targetLanguage: string
): Promise<StructuredSummary> {
  const res = await fetch('/api/translate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ summary, targetLanguage }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to translate summary');
  }
  return data.summary;
}
