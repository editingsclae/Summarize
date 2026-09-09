import { VideoMetadata } from './video';

export type SummaryLength = 'quick' | 'standard' | 'detailed' | 'deep-dive' | 'comprehensive';
export type SummaryStyle = 'professional' | 'educational' | 'technical' | 'simple' | 'bullet-points' | 'executive' | 'action-oriented';
export type OutputLanguage = 'auto' | 'en' | 'es' | 'fr' | 'de' | 'it' | 'ar';

export type ImportantPointType = 
  | 'IMPORTANT' 
  | 'FACT' 
  | 'STATISTIC' 
  | 'WARNING' 
  | 'RECOMMENDATION' 
  | 'KEY IDEA' 
  | 'DEFINITION' 
  | 'ACTION'
  | 'KEY_CONCEPT';

export interface KeyTakeaway {
  title: string;
  summary: string;
  importance?: 'high' | 'medium' | 'low';
}

export interface ImportantPoint {
  type: ImportantPointType;
  title?: string;
  content?: string;
  point?: string;
  timestamp?: number | null; // in seconds
}

export interface SummarySection {
  title: string;
  summary: string;
  timestamp?: number | null;
  bullets?: string[];
}

export interface FactData {
  fact?: string;
  value?: string;
  context?: string;
  content?: string;
  label?: string;
}

export interface QuoteItem {
  quote: string;
  speaker?: string;
  timestamp?: number | null;
}

export interface ConceptItem {
  term: string;
  explanation: string;
}

export interface ProConObject {
  point: string;
  type?: 'pro' | 'con';
  sentiment?: string;
}

export type ProConItem = string | ProConObject;

export interface StructuredSummary {
  video: VideoMetadata;
  tldr: string;
  executiveSummary: string;
  keyTakeaways: KeyTakeaway[];
  importantPoints: ImportantPoint[];
  sections: SummarySection[];
  facts: FactData[];
  quotes?: QuoteItem[];
  actionItems: string[];
  concepts: ConceptItem[];
  pros: ProConItem[];
  cons: ProConItem[];
  conclusion: string;
  summaryLength?: SummaryLength;
  style?: SummaryStyle;
  language?: string;
  generatedAt: string;
}

export interface SavedSummaryRecord {
  id: string;
  createdAt: string;
  video: VideoMetadata;
  summary: StructuredSummary;
  viewCount?: number;
}

export interface SummarizeRequestOptions {
  youtubeUrl: string;
  language?: OutputLanguage;
  summaryLength?: SummaryLength;
  style?: SummaryStyle;
  customTranscript?: string;
}

export interface QnAMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
  citations?: {
    text: string;
    timestamp?: number;
  }[];
}
