import { GoogleGenAI, Type } from '@google/genai';
import { ISpeechToTextProvider, TranscriptResult, TranscriptSegment } from './types';

/**
 * Gemini-powered Speech-to-Text Provider
 * Utilizes gemini-3.5-transcribe / gemini-3.8-flash multimodal capabilities
 */
export class GeminiSpeechToTextProvider implements ISpeechToTextProvider {
  public readonly name = 'gemini';
  private aiClient: GoogleGenAI | null = null;

  private getClient(): GoogleGenAI {
    if (!this.aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('GEMINI_API_KEY is not configured on the server.');
      }
      this.aiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
    }
    return this.aiClient;
  }

  async transcribe(
    audioBuffer: Buffer,
    mimeType: string,
    options: { videoId: string; language?: string; duration?: number }
  ): Promise<TranscriptResult> {
    const ai = this.getClient();
    const base64Audio = audioBuffer.toString('base64');

    const audioPart = {
      inlineData: {
        mimeType: mimeType || 'audio/mp4',
        data: base64Audio,
      },
    };

    const targetLangDirective =
      options.language && options.language !== 'auto'
        ? `The speaker may be talking in or around ${options.language}, or auto-detect the spoken language.`
        : 'Auto-detect the spoken language.';

    const promptText = `You are a speech-to-text transcription engine.
Transcribe the speech from this audio file with high fidelity.
${targetLangDirective}
CRITICAL REQUIREMENTS:
1. Divide the transcription into chronological, timestamped segments.
2. For each segment, provide the start time in seconds (as an integer or float), estimated duration in seconds, and the transcribed spoken text.
3. Preserve all technical terms, names, numbers, and facts accurately.
4. Identify the primary detected language code (e.g. 'en', 'es', 'fr', 'ar', 'de', etc.).`;

    // Response schema for structured timestamps
    const TRANSCRIPT_SCHEMA = {
      type: Type.OBJECT,
      properties: {
        detectedLanguage: { type: Type.STRING },
        fullText: { type: Type.STRING, description: 'Complete unified transcript text' },
        segments: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              start: { type: Type.NUMBER, description: 'Start time in seconds' },
              duration: { type: Type.NUMBER, description: 'Duration in seconds' },
              text: { type: Type.STRING, description: 'Transcribed dialogue' },
            },
            required: ['start', 'text'],
          },
        },
      },
      required: ['segments'],
    };

    // Try primary transcription model gemini-3.5-transcribe, fallback to gemini-3.8-flash
    const candidateModels = ['gemini-3.5-transcribe', 'gemini-3.8-flash'];
    let lastError: Error | null = null;

    for (const modelName of candidateModels) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: [audioPart, { text: promptText }],
          config: {
            temperature: 0.1,
            responseMimeType: 'application/json',
            responseSchema: TRANSCRIPT_SCHEMA,
          },
        });

        const rawJson = response.text?.trim();
        if (rawJson) {
          const parsed = JSON.parse(rawJson);
          const rawSegments = Array.isArray(parsed.segments) ? parsed.segments : [];

          const segments: TranscriptSegment[] = rawSegments.map((s: { start: number; duration?: number; text: string }) => ({
            start: Math.round(Number(s.start) || 0),
            duration: s.duration ? Math.round(Number(s.duration)) : undefined,
            text: String(s.text || '').trim(),
          })).filter((s: TranscriptSegment) => s.text.length > 0);

          const fullText =
            parsed.fullText || segments.map((s: TranscriptSegment) => s.text).join(' ');

          if (segments.length > 0 || fullText.trim().length > 0) {
            return {
              success: true,
              available: true,
              source: 'speech_to_text',
              language: parsed.detectedLanguage || options.language || 'en',
              segments: segments.length > 0 ? segments : [{ start: 0, duration: options.duration || 60, text: fullText }],
              fullText,
            };
          }
        }
      } catch (err: unknown) {
        lastError = err instanceof Error ? err : new Error(String(err));
        console.warn(`Transcription attempt with ${modelName} failed:`, lastError.message);
      }
    }

    throw new Error(
      `Gemini speech-to-text failed: ${lastError?.message || 'Could not parse audio transcript'}`
    );
  }
}

/**
 * OpenAI Whisper Speech-to-Text Provider (Configurable alternative)
 */
export class OpenAISpeechToTextProvider implements ISpeechToTextProvider {
  public readonly name = 'whisper';

  async transcribe(
    audioBuffer: Buffer,
    mimeType: string,
    options: { videoId: string; language?: string; duration?: number }
  ): Promise<TranscriptResult> {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY is required for Whisper speech-to-text provider.');
    }

    const formData = new FormData();
    const blob = new Blob([audioBuffer], { type: mimeType || 'audio/mp4' });
    formData.append('file', blob, 'audio.mp4');
    formData.append('model', 'whisper-1');
    formData.append('response_format', 'verbose_json');
    if (options.language && options.language !== 'auto') {
      formData.append('language', options.language);
    }

    const res = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      body: formData,
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`OpenAI Whisper API error: ${errText}`);
    }

    const data: any = await res.json();
    const segments: TranscriptSegment[] = (data.segments || []).map((s: any) => ({
      start: Math.round(s.start || 0),
      duration: Math.round((s.end || 0) - (s.start || 0)),
      text: s.text?.trim() || '',
    }));

    return {
      success: true,
      available: true,
      source: 'speech_to_text',
      language: data.language || options.language || 'en',
      segments,
      fullText: data.text || segments.map((s) => s.text).join(' '),
    };
  }
}

/**
 * Mock Speech-to-Text Provider (for development or automated fallback testing)
 */
export class MockSpeechToTextProvider implements ISpeechToTextProvider {
  public readonly name = 'mock';

  async transcribe(
    _audioBuffer: Buffer,
    _mimeType: string,
    options: { videoId: string; language?: string; duration?: number }
  ): Promise<TranscriptResult> {
    const duration = options.duration || 180;
    const segments: TranscriptSegment[] = [
      { start: 0, duration: 25, text: 'Welcome to this comprehensive overview and presentation.' },
      { start: 26, duration: 45, text: 'In today\'s session, we are analyzing the primary architectural concepts and principles.' },
      { start: 72, duration: 50, text: 'Our key findings indicate that automated audio fallback increases reliability substantially.' },
      { start: 125, duration: 40, text: 'In conclusion, combining multiple transcript sources provides seamless resilience for all users.' },
    ];

    return {
      success: true,
      available: true,
      source: 'speech_to_text',
      language: options.language || 'en',
      segments,
      fullText: segments.map((s) => s.text).join(' '),
    };
  }
}

/**
 * Provider factory based on TRANSCRIPTION_PROVIDER env variable
 */
export function getSpeechToTextProvider(): ISpeechToTextProvider {
  const providerType = (process.env.TRANSCRIPTION_PROVIDER || 'gemini').toLowerCase().trim();

  switch (providerType) {
    case 'whisper':
    case 'openai':
      return new OpenAISpeechToTextProvider();
    case 'mock':
      return new MockSpeechToTextProvider();
    case 'gemini':
    default:
      return new GeminiSpeechToTextProvider();
  }
}
