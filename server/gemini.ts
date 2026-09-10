import { GoogleGenAI, Type } from '@google/genai';
import { StructuredSummary, SummaryLength, SummaryStyle, OutputLanguage } from '../src/types/summary';
import { VideoMetadata, TranscriptSegment } from '../src/types/video';

// Lazy-initialized Gemini client with telemetry header
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is missing.');
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

interface GenerateSummaryParams {
  video: VideoMetadata;
  segments: TranscriptSegment[];
  rawText: string;
  language?: OutputLanguage;
  summaryLength?: SummaryLength;
  style?: SummaryStyle;
}

const SUMMARY_RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    tldr: {
      type: Type.STRING,
      description: 'A concise 2-4 sentence overview explaining what the entire video is about.',
    },
    executiveSummary: {
      type: Type.STRING,
      description: 'A detailed overview explaining main subject, main argument, purpose of the video, and most important conclusions.',
    },
    keyTakeaways: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          summary: { type: Type.STRING },
          importance: { type: Type.STRING, description: 'high, medium, or low' },
        },
        required: ['title', 'summary', 'importance'],
      },
    },
    importantPoints: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          type: { 
            type: Type.STRING, 
            description: 'One of: IMPORTANT, FACT, STATISTIC, WARNING, RECOMMENDATION, KEY IDEA, DEFINITION, ACTION' 
          },
          title: { type: Type.STRING },
          content: { type: Type.STRING },
          timestamp: { type: Type.NUMBER, description: 'Timestamp in seconds if identifiable, or null' },
        },
        required: ['type', 'title', 'content'],
      },
    },
    sections: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          summary: { type: Type.STRING },
          timestamp: { type: Type.NUMBER, description: 'Starting timestamp in seconds if available' },
          bullets: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
        },
        required: ['title', 'summary'],
      },
    },
    facts: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          fact: { type: Type.STRING },
          value: { type: Type.STRING },
          context: { type: Type.STRING },
        },
        required: ['fact', 'value', 'context'],
      },
    },
    quotes: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          quote: { type: Type.STRING, description: 'Direct exact quote from transcript without fabricating' },
          speaker: { type: Type.STRING },
          timestamp: { type: Type.NUMBER },
        },
        required: ['quote'],
      },
    },
    actionItems: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
    concepts: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          term: { type: Type.STRING },
          explanation: { type: Type.STRING },
        },
        required: ['term', 'explanation'],
      },
    },
    pros: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          point: { type: Type.STRING },
          type: { type: Type.STRING, description: 'pro' },
        },
        required: ['point', 'type'],
      },
    },
    cons: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          point: { type: Type.STRING },
          type: { type: Type.STRING, description: 'con' },
        },
        required: ['point', 'type'],
      },
    },
    conclusion: {
      type: Type.STRING,
      description: 'The video\'s final message and what the viewer should remember.',
    },
  },
  required: [
    'tldr',
    'executiveSummary',
    'keyTakeaways',
    'importantPoints',
    'sections',
    'facts',
    'quotes',
    'actionItems',
    'concepts',
    'conclusion',
  ],
};

const SYSTEM_INSTRUCTION = `You are an expert information analyst, investigative researcher, and professional executive editor.
Your job is to transform a YouTube video transcript into an accurate, structured, high-value intelligence briefing.

CRITICAL QUALITY RULES:
1. Never invent or hallucinate information.
2. Never fabricate statistics, measurements, percentages, or dates.
3. Never fabricate quotes: all quotes must be verbatim or near-verbatim excerpts directly spoken in the transcript.
4. Distinguish facts from opinions. If a speaker states an opinion, attribute it as such.
5. Identify the video's actual purpose, central thesis, supporting arguments, and definitive conclusions.
6. Remove sponsor plugs, repetitive filler, channel subscribe calls, and intro fluff.
7. Preserve accurate technical terminology and provide intuitive, simple definitions in the concepts section.
8. Extract quantitative data (metrics, costs, percentages, dates) for the key facts table.
9. Assign accurate second-based timestamps (e.g. 145 for 2:25) to sections, key points, and quotes when discernible from the transcript.
10. Categorize important points using: IMPORTANT, FACT, STATISTIC, WARNING, RECOMMENDATION, KEY IDEA, DEFINITION, ACTION. Be selective; do not mark everything as important.
11. If the video naturally discusses comparisons, options, or evaluations, populate pros and cons. Otherwise keep them minimal.
12. Answer: "What would I need to know if I didn't have time to watch the entire video?" Prioritize information value and density over superficial brevity.
13. MANDATORY LANGUAGE CONSISTENCY: You MUST generate all human-readable text fields (tldr, executiveSummary, keyTakeaways titles and summaries, importantPoints point, sections titles and summaries, bullets, fact labels, quotes, action items, concepts, pros, cons, and conclusion) in the requested OUTPUT LANGUAGE. For Arabic (العربية), use fluent Modern Standard Arabic (العربية الفصحى). Never leave the text in English if another language is requested.
14. COMPLETENESS OF THOUGHTS AND SENTENCES: Every single title, summary, takeaway, important point, bullet, and sentence MUST be fully written out and grammatically complete. NEVER end titles or sentences with trailing ellipses ("...") or cut off mid-thought. Always express full thoughts with complete words and ending punctuation.`;

/**
 * Format transcript segments with timestamp cues
 */
function prepareTranscriptForPrompt(segments: TranscriptSegment[], maxChars = 80000): string {
  if (!segments || segments.length === 0) return '';

  let result = '';
  let lastTimestamp = -1;

  for (const seg of segments) {
    // Add timestamp every ~30-60 seconds or segment boundary
    if (seg.start - lastTimestamp >= 30 || lastTimestamp === -1) {
      result += `\n[${Math.floor(seg.start)}s] `;
      lastTimestamp = seg.start;
    }
    result += seg.text + ' ';

    if (result.length >= maxChars) {
      result += '\n... [Transcript truncated for length, processing available content]';
      break;
    }
  }

  return result.trim();
}

export async function generateStructuredSummary(params: GenerateSummaryParams): Promise<StructuredSummary> {
  const ai = getAiClient();
  const { video, segments, rawText, language = 'en', summaryLength = 'detailed', style = 'professional' } = params;

  const targetLangMap: Record<string, string> = {
    en: 'English',
    es: 'Spanish',
    fr: 'French',
    de: 'German',
    it: 'Italian',
    ar: 'Arabic',
    auto: 'the primary language of the video',
  };

  const chosenLang = targetLangMap[language] || 'English';

  const formattedTranscript = prepareTranscriptForPrompt(segments);
  const contentToAnalyze = formattedTranscript || rawText.slice(0, 70000);

  const hasFullTranscript = contentToAnalyze.length > 100 && !contentToAnalyze.startsWith('VIDEO METADATA');
  const transcriptSection = hasFullTranscript
    ? `TRANSCRIPT WITH TIMESTAMPS:\n${contentToAnalyze}`
    : `VIDEO METADATA & TOPIC OVERVIEW:
${contentToAnalyze || `Title: ${video.title}\nCreator: ${video.channel}\nDescription: ${video.description || 'Comprehensive review and discussion.'}`}

INSTRUCTION FOR VIDEOS WITHOUT TIMESTAMPTED CAPTIONS:
Direct YouTube closed-caption tracks were not published for this video. Using the verified video title "${video.title}", creator "${video.channel}", published description, and your comprehensive knowledge base, generate a detailed, authoritative, structured briefing report capturing the key insights, specs, breakdown, and conclusions presented in this video.`;

  const languagePromptDirective = chosenLang === 'English'
    ? 'OUTPUT LANGUAGE: English.'
    : `MANDATORY OUTPUT LANGUAGE: ${chosenLang.toUpperCase()} (${language}).
CRITICAL LANGUAGE DIRECTIVE: The user explicitly selected ${chosenLang}. You MUST write ALL textual content (tldr, executiveSummary, keyTakeaways titles and summaries, importantPoints point, sections titles and summaries, bullets, fact labels, quotes, action items, concepts, pros, cons, conclusion) in fluent, natural ${chosenLang} (for Arabic, use Modern Standard Arabic الفصحى). Do NOT write any summaries, key points, or section headings in English.`;

  const userPrompt = `Generate a comprehensive, structured briefing report for the following YouTube video:

VIDEO TITLE: "${video.title}"
CHANNEL: "${video.channel}"
REQUESTED SUMMARY LENGTH: ${summaryLength}
REQUESTED SUMMARY STYLE: ${style}
${languagePromptDirective}

${transcriptSection}

Ensure your response conforms strictly to the provided JSON schema. Ensure all fields are filled with high information value and zero hallucinations.`;

  const candidateModels = ['gemini-3.8-flash', 'gemini-flash-latest', 'gemini-3.1-flash-lite'];
  let rawJson = '{}';
  let lastError: any = null;

  for (const modelName of candidateModels) {
    try {
      const response = await ai.models.generateContent({
        model: modelName,
        contents: userPrompt,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.2, // low temperature for maximum factual precision
          responseMimeType: 'application/json',
          responseSchema: SUMMARY_RESPONSE_SCHEMA,
        },
      });
      rawJson = response.text?.trim() || '{}';
      break; // Success, exit loop
    } catch (err: any) {
      console.warn(`Model ${modelName} failed:`, err.message || err);
      lastError = err;
    }
  }

  if (rawJson === '{}' && lastError) {
    if (lastError.message?.includes('resource_exhausted') || lastError.message?.includes('Quota exceeded')) {
      throw new Error('AI processing quota exceeded. Please try again later or configure your own Gemini API key.');
    }
    throw lastError;
  }
  let parsedData: any;
  try {
    parsedData = JSON.parse(rawJson);
  } catch (err) {
    console.error('Failed to parse Gemini JSON output:', rawJson);
    throw new Error('Failed to parse structured summary from AI response.');
  }

  return {
    video,
    tldr: parsedData.tldr || 'No TL;DR generated.',
    executiveSummary: parsedData.executiveSummary || 'No executive summary generated.',
    keyTakeaways: parsedData.keyTakeaways || [],
    importantPoints: parsedData.importantPoints || [],
    sections: parsedData.sections || [],
    facts: parsedData.facts || [],
    quotes: parsedData.quotes || [],
    actionItems: parsedData.actionItems || [],
    concepts: parsedData.concepts || [],
    pros: parsedData.pros || [],
    cons: parsedData.cons || [],
    conclusion: parsedData.conclusion || '',
    summaryLength,
    style,
    language,
    generatedAt: new Date().toISOString(),
  };
}

/**
 * Translate an existing structured summary into the target output language
 */
export async function translateStructuredSummary(
  summary: StructuredSummary,
  targetLanguage: OutputLanguage
): Promise<StructuredSummary> {
  const targetLangMap: Record<string, string> = {
    en: 'English',
    es: 'Spanish',
    fr: 'French',
    de: 'German',
    it: 'Italian',
    ar: 'Arabic',
    auto: 'English',
  };

  const chosenLang = targetLangMap[targetLanguage] || 'English';
  if (chosenLang === 'English' && summary.language === 'en') {
    return summary;
  }

  const ai = getAiClient();
  const prompt = `You are an expert multilingual editor and technical translator.
Translate the following video intelligence briefing into ${chosenLang} (target language code: ${targetLanguage}).
${chosenLang === 'Arabic' ? 'For Arabic, use fluent, natural Modern Standard Arabic (اللغة العربية الفصحى).' : ''}

CRITICAL TRANSLATION MANDATE:
1. Translate ALL human-readable text properties (tldr, executiveSummary, takeaway titles and summaries, importantPoints point, sections titles and summaries, bullets, fact labels, quotes translation, action items, concepts term and explanation, pros, cons, conclusion) into ${chosenLang}.
2. Retain all timestamps, importance levels ('high', 'medium', 'low'), point types ('IMPORTANT', 'FACT', 'STATISTIC', 'WARNING', etc.), and numerical values.
3. Return the response strictly adhering to the JSON schema.

INPUT SUMMARY:
${JSON.stringify({
  tldr: summary.tldr,
  executiveSummary: summary.executiveSummary,
  keyTakeaways: summary.keyTakeaways,
  importantPoints: summary.importantPoints,
  sections: summary.sections,
  facts: summary.facts,
  quotes: summary.quotes,
  actionItems: summary.actionItems,
  concepts: summary.concepts,
  pros: summary.pros,
  cons: summary.cons,
  conclusion: summary.conclusion,
}, null, 2)}`;

  const candidateModels = ['gemini-3.8-flash', 'gemini-flash-latest', 'gemini-3.1-flash-lite'];
  let rawJson = '{}';
  let lastError: any = null;

  for (const modelName of candidateModels) {
    try {
      const response = await ai.models.generateContent({
        model: modelName,
        contents: prompt,
        config: {
          temperature: 0.1,
          responseMimeType: 'application/json',
          responseSchema: SUMMARY_RESPONSE_SCHEMA,
        },
      });
      rawJson = response.text?.trim() || '{}';
      break;
    } catch (err: any) {
      console.warn(`Translation Model ${modelName} failed:`, err.message || err);
      lastError = err;
    }
  }

  if (rawJson === '{}' && lastError) {
    if (lastError.message?.includes('resource_exhausted') || lastError.message?.includes('Quota exceeded')) {
      throw new Error('AI processing quota exceeded. Please try again later or configure your own Gemini API key.');
    }
  }
  let parsedData: any;
  try {
    parsedData = JSON.parse(rawJson);
  } catch (err) {
    console.error('Failed to parse translated Gemini JSON output:', rawJson);
    return { ...summary, language: targetLanguage };
  }

  return {
    ...summary,
    tldr: parsedData.tldr || summary.tldr,
    executiveSummary: parsedData.executiveSummary || summary.executiveSummary,
    keyTakeaways: parsedData.keyTakeaways?.length ? parsedData.keyTakeaways : summary.keyTakeaways,
    importantPoints: parsedData.importantPoints?.length ? parsedData.importantPoints : summary.importantPoints,
    sections: parsedData.sections?.length ? parsedData.sections : summary.sections,
    facts: parsedData.facts?.length ? parsedData.facts : summary.facts,
    quotes: parsedData.quotes?.length ? parsedData.quotes : summary.quotes,
    actionItems: parsedData.actionItems?.length ? parsedData.actionItems : summary.actionItems,
    concepts: parsedData.concepts?.length ? parsedData.concepts : summary.concepts,
    pros: parsedData.pros?.length ? parsedData.pros : summary.pros,
    cons: parsedData.cons?.length ? parsedData.cons : summary.cons,
    conclusion: parsedData.conclusion || summary.conclusion,
    language: targetLanguage,
    generatedAt: new Date().toISOString(),
  };
}

/**
 * Interactive Q&A about video
 */
export async function answerVideoQuestion(params: {
  video: VideoMetadata;
  transcript: string;
  summary: StructuredSummary;
  question: string;
}): Promise<{ answer: string; citations: { text: string; timestamp?: number }[] }> {
  const ai = getAiClient();
  const { video, transcript, summary, question } = params;

  const prompt = `You are the VidBrief AI assistant helping the user explore and understand this YouTube video.

VIDEO DETAILS:
Title: "${video.title}"
Channel: "${video.channel}"

EXECUTIVE SUMMARY:
${summary.executiveSummary}

TL;DR:
${summary.tldr}

TRANSCRIPT EXCERPT:
${transcript.slice(0, 50000)}

USER QUESTION:
"${question}"

INSTRUCTIONS:
1. Answer the question directly, factually, and thoroughly using only the provided video context.
2. If timestamps are relevant, include them (e.g. "[12:34]").
3. If quotes or numbers are relevant, mention them precisely.
4. If the video does not cover the question, state clearly that it was not discussed in the video.
5. Return your response as JSON with:
   {
     "answer": "...",
     "citations": [
       { "text": "brief quote or point", "timestamp": 120 }
     ]
   }`;

  const candidateModels = ['gemini-3.8-flash', 'gemini-flash-latest', 'gemini-3.1-flash-lite'];
  let rawJson = '{}';
  let lastError: any = null;

  for (const modelName of candidateModels) {
    try {
      const response = await ai.models.generateContent({
        model: modelName,
        contents: prompt,
        config: {
          temperature: 0.2,
          responseMimeType: 'application/json',
        },
      });
      rawJson = response.text?.trim() || '{}';
      break;
    } catch (err: any) {
      console.warn(`Q&A Model ${modelName} failed:`, err.message || err);
      lastError = err;
    }
  }

  if (rawJson === '{}' && lastError) {
    if (lastError.message?.includes('resource_exhausted') || lastError.message?.includes('Quota exceeded')) {
      throw new Error('AI processing quota exceeded. Please try again later or configure your own Gemini API key.');
    }
  }

  try {
    const parsed = JSON.parse(rawJson);
    return {
      answer: parsed.answer || rawJson || 'I could not find an answer in the video.',
      citations: parsed.citations || [],
    };
  } catch {
    return {
      answer: rawJson || 'I could not answer the question.',
      citations: [],
    };
  }
}
