export type MindmapLanguage = 'en' | 'ar' | 'fr';

export interface MindmapSubItem {
  id: string;
  emoji?: string;
  label: string;
  detail?: string;
  children?: MindmapSubItem[];
}

export interface MindmapBranch {
  id: string;
  label: string;
  color: string;
  side: 'left' | 'right';
  collapsed?: boolean;
  children: MindmapSubItem[];
}

export interface MindmapData {
  id?: string;
  rootLabel: string;
  language: MindmapLanguage;
  branches: MindmapBranch[];
}
