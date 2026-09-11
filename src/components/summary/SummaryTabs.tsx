import React from 'react';
import { 
  FileText, 
  LayoutDashboard, 
  GitFork, 
  List, 
  Clock, 
  Lightbulb, 
  Quote as QuoteIcon, 
  CheckCircle2, 
  BookMarked, 
  Scale 
} from 'lucide-react';

export type SummaryTabType = 
  | 'Summary' 
  | 'Infographic'
  | 'Mindmap'
  | 'Transcript' 
  | 'Timestamps' 
  | 'Key Facts' 
  | 'Quotes' 
  | 'Action Items' 
  | 'Concepts' 
  | 'Pros & Cons';

interface SummaryTabsProps {
  activeTab: SummaryTabType;
  onTabChange: (tab: SummaryTabType) => void;
  counts?: {
    timestamps?: number;
    facts?: number;
    quotes?: number;
    actionItems?: number;
    concepts?: number;
    prosCons?: number;
  };
}

// Row 1: Top 5 Primary Tabs
const ROW_1_TABS: SummaryTabType[] = [
  'Summary',
  'Infographic',
  'Mindmap',
  'Transcript',
  'Timestamps'
];

// Row 2: Bottom 5 Deep-Dive Analysis Tabs
const ROW_2_TABS: SummaryTabType[] = [
  'Key Facts',
  'Quotes',
  'Action Items',
  'Concepts',
  'Pros & Cons'
];

export const SummaryTabs: React.FC<SummaryTabsProps> = ({
  activeTab,
  onTabChange,
  counts
}) => {
  const renderTabIcon = (tab: SummaryTabType) => {
    switch (tab) {
      case 'Summary':
        return <FileText className="w-3.5 h-3.5 shrink-0 text-indigo-500 dark:text-indigo-400" />;
      case 'Infographic':
        return <LayoutDashboard className="w-3.5 h-3.5 shrink-0 text-blue-600 dark:text-blue-400" />;
      case 'Mindmap':
        return <GitFork className="w-3.5 h-3.5 shrink-0 text-blue-600 dark:text-blue-400" />;
      case 'Transcript':
        return <List className="w-3.5 h-3.5 shrink-0 text-indigo-500 dark:text-indigo-400" />;
      case 'Timestamps':
        return <Clock className="w-3.5 h-3.5 shrink-0 text-amber-500 dark:text-amber-400" />;
      case 'Key Facts':
        return <Lightbulb className="w-3.5 h-3.5 shrink-0 text-amber-500 dark:text-amber-400" />;
      case 'Quotes':
        return <QuoteIcon className="w-3.5 h-3.5 shrink-0 text-purple-500 dark:text-purple-400" />;
      case 'Action Items':
        return <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-500 dark:text-emerald-400" />;
      case 'Concepts':
        return <BookMarked className="w-3.5 h-3.5 shrink-0 text-cyan-500 dark:text-cyan-400" />;
      case 'Pros & Cons':
        return <Scale className="w-3.5 h-3.5 shrink-0 text-rose-500 dark:text-rose-400" />;
    }
  };

  const getCount = (tab: SummaryTabType) => {
    if (!counts) return 0;
    if (tab === 'Timestamps') return counts.timestamps || 0;
    if (tab === 'Key Facts') return counts.facts || 0;
    if (tab === 'Quotes') return counts.quotes || 0;
    if (tab === 'Action Items') return counts.actionItems || 0;
    if (tab === 'Concepts') return counts.concepts || 0;
    if (tab === 'Pros & Cons') return counts.prosCons || 0;
    return 0;
  };

  const renderTabButton = (tab: SummaryTabType) => {
    const isActive = activeTab === tab;
    const count = getCount(tab);

    return (
      <button
        key={tab}
        type="button"
        onClick={() => onTabChange(tab)}
        className={`relative py-2.5 px-1 sm:px-2 text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-1.5 group ${
          isActive
            ? 'text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50/80 dark:bg-indigo-950/40'
            : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-neutral-50/80 dark:hover:bg-neutral-850/40'
        }`}
      >
        {renderTabIcon(tab)}
        <span className="truncate">{tab}</span>
        {count > 0 && (
          <span
            className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-medium shrink-0 ${
              isActive
                ? 'bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300'
                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 group-hover:bg-neutral-200/70 dark:group-hover:bg-neutral-700'
            }`}
          >
            {count}
          </span>
        )}
      </button>
    );
  };

  return (
    <div className="w-full bg-white dark:bg-[#0D1321] rounded-xl border border-neutral-200/80 dark:border-neutral-800 shadow-2xs overflow-hidden">
      <div className="w-full overflow-x-auto no-scrollbar">
        <div className="min-w-[580px] sm:min-w-0 flex flex-col divide-y divide-neutral-200/70 dark:divide-neutral-800/80">
          {/* Row 1: Top 5 Tabs */}
          <nav className="grid grid-cols-5 w-full">
            {ROW_1_TABS.map(renderTabButton)}
          </nav>

          {/* Row 2: Bottom 5 Tabs (below Row 1) */}
          <nav className="grid grid-cols-5 w-full">
            {ROW_2_TABS.map(renderTabButton)}
          </nav>
        </div>
      </div>
    </div>
  );
};
