export type InfographicLanguage = 'en' | 'ar' | 'fr';

export interface InfographicCard {
  id: string;
  tag: string; // e.g. "تعريف", "أهمية", "خطوة عمل", "إحصائية", "Definition", "Key Metric", etc.
  tagColor?: string;
  title: string;
  description: string;
  highlight?: string;
  metric?: string;
  metricLabel?: string;
}

export interface InfographicSection {
  id: string;
  stepNumber: string; // e.g. "01", "02", "03"
  title: string;
  cards: InfographicCard[];
}

export interface InfographicData {
  title: string;
  subtitle: string;
  language: InfographicLanguage;
  sections: InfographicSection[];
  statsBar?: {
    label: string;
    value: string;
    icon?: string;
  }[];
}
