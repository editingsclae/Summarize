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

// Row 2: Bottom 5 Analysis Tabs (Directly aligned 5 below 5)
const ROW_2_TABS: SummaryTabType[] = [
  'Key Facts',
  'Quotes',
  'Action Items',
  'Concepts',
  'Pros & Cons'
];

const ALL_TABS: SummaryTabType[] = [...ROW_1_TABS, ...ROW_2_TABS];

export const SummaryTabs: React.FC<SummaryTabsProps> = ({
  activeTab,
  onTabChange,
  counts
}) => {
  const renderTabIcon = (tab: SummaryTabType, isActive: boolean) => {
    const baseIconClass = 'w-4 h-4 shrink-0 transition-colors duration-150';

    if (isActive) {
      const activeColor = 'text-indigo-600 dark:text-indigo-400';
      switch (tab) {
        case 'Summary': return <FileText className={`${baseIconClass} ${activeColor}`} />;
        case 'Infographic': return <LayoutDashboard className={`${baseIconClass} ${activeColor}`} />;
        case 'Mindmap': return <GitFork className={`${baseIconClass} ${activeColor}`} />;
        case 'Transcript': return <List className={`${baseIconClass} ${activeColor}`} />;
        case 'Timestamps': return <Clock className={`${baseIconClass} ${activeColor}`} />;
        case 'Key Facts': return <Lightbulb className={`${baseIconClass} ${activeColor}`} />;
        case 'Quotes': return <QuoteIcon className={`${baseIconClass} ${activeColor}`} />;
        case 'Action Items': return <CheckCircle2 className={`${baseIconClass} ${activeColor}`} />;
        case 'Concepts': return <BookMarked className={`${baseIconClass} ${activeColor}`} />;
        case 'Pros & Cons': return <Scale className={`${baseIconClass} ${activeColor}`} />;
      }
    }

    // Inactive state: colorful yet calm, harmonious tones
    switch (tab) {
      case 'Summary':
        return <FileText className={`${baseIconClass} text-indigo-500/80 group-hover:text-indigo-600 dark:text-indigo-400/80`} />;
      case 'Infographic':
        return <LayoutDashboard className={`${baseIconClass} text-blue-500/80 group-hover:text-blue-600 dark:text-blue-400/80`} />;
      case 'Mindmap':
        return <GitFork className={`${baseIconClass} text-violet-500/80 group-hover:text-violet-600 dark:text-violet-400/80`} />;
      case 'Transcript':
        return <List className={`${baseIconClass} text-indigo-500/80 group-hover:text-indigo-600 dark:text-indigo-400/80`} />;
      case 'Timestamps':
        return <Clock className={`${baseIconClass} text-amber-500/80 group-hover:text-amber-600 dark:text-amber-400/80`} />;
      case 'Key Facts':
        return <Lightbulb className={`${baseIconClass} text-amber-500/80 group-hover:text-amber-600 dark:text-amber-400/80`} />;
      case 'Quotes':
        return <QuoteIcon className={`${baseIconClass} text-purple-500/80 group-hover:text-purple-600 dark:text-purple-400/80`} />;
      case 'Action Items':
        return <CheckCircle2 className={`${baseIconClass} text-emerald-500/80 group-hover:text-emerald-600 dark:text-emerald-400/80`} />;
      case 'Concepts':
        return <BookMarked className={`${baseIconClass} text-sky-500/80 group-hover:text-sky-600 dark:text-sky-400/80`} />;
      case 'Pros & Cons':
        return <Scale className={`${baseIconClass} text-rose-500/80 group-hover:text-rose-600 dark:text-rose-400/80`} />;
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

  // 2D grid keyboard navigation (Up, Down, Left, Right)
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex: number | null = null;
    if (e.key === 'ArrowRight') {
      nextIndex = (index + 1) % ALL_TABS.length;
    } else if (e.key === 'ArrowLeft') {
      nextIndex = (index - 1 + ALL_TABS.length) % ALL_TABS.length;
    } else if (e.key === 'ArrowDown') {
      nextIndex = (index + 5) % ALL_TABS.length;
    } else if (e.key === 'ArrowUp') {
      nextIndex = (index - 5 + ALL_TABS.length) % ALL_TABS.length;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = ALL_TABS.length - 1;
    }

    if (nextIndex !== null) {
      e.preventDefault();
      const nextTab = ALL_TABS[nextIndex];
      onTabChange(nextTab);
      const tabId = `tab-${nextTab.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
      document.getElementById(tabId)?.focus();
    }
  };

  const renderTabButton = (tab: SummaryTabType, index: number) => {
    const isActive = activeTab === tab;
    const count = getCount(tab);
    const tabId = `tab-${tab.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
    const panelId = `panel-${tab.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

    return (
      <button
        key={tab}
        id={tabId}
        type="button"
        role="tab"
        tabIndex={isActive ? 0 : -1}
        aria-selected={isActive}
        aria-controls={panelId}
        onClick={() => onTabChange(tab)}
        onKeyDown={(e) => handleKeyDown(e, index)}
        className={`relative h-10 px-2.5 sm:px-3.5 flex items-center justify-start gap-2 sm:gap-2.5 rounded-[8px] text-[14px] font-medium transition-all duration-150 cursor-pointer whitespace-nowrap select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1 dark:focus-visible:ring-offset-neutral-900 group ${
          isActive
            ? 'bg-[#EEF2FF] dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-semibold'
            : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800/40'
        }`}
      >
        {/* Tab Icon - Fixed width and perfectly aligned */}
        <span className="w-4 h-4 flex items-center justify-center shrink-0">
          {renderTabIcon(tab, isActive)}
        </span>

        {/* Tab Label */}
        <span className="truncate tracking-tight">{tab}</span>

        {/* Soft, perfectly aligned numeric badge */}
        {count > 0 && (
          <span
            className={`inline-flex items-center justify-center min-w-[17px] h-[17px] px-1.5 rounded-full text-[11px] font-medium leading-none transition-colors duration-150 ${
              isActive
                ? 'bg-indigo-100/90 text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300'
                : 'bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400 group-hover:bg-neutral-200/60 dark:group-hover:bg-neutral-700 group-hover:text-neutral-700 dark:group-hover:text-neutral-200'
            }`}
          >
            {count}
          </span>
        )}

        {/* Clear, minimal bottom active indicator */}
        {isActive && (
          <span
            className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-indigo-600 dark:bg-indigo-400 rounded-full"
            aria-hidden="true"
          />
        )}
      </button>
    );
  };

  return (
    <div className="w-full bg-white dark:bg-[#0D1321] rounded-[11px] border border-[#E5E7EB] dark:border-neutral-800 shadow-[0_1px_3px_rgba(0,0,0,0.03)] p-1 overflow-hidden">
      {/* Horizontally scrollable wrapper on mobile without scrollbar */}
      <div className="w-full overflow-x-auto no-scrollbar scroll-smooth">
        <div
          role="tablist"
          aria-label="Summary Content Sections"
          className="min-w-[640px] sm:min-w-0 flex flex-col"
        >
          {/* Row 1: Top 5 Tabs */}
          <div className="grid grid-cols-5 gap-1 w-full">
            {ROW_1_TABS.map((tab, idx) => renderTabButton(tab, idx))}
          </div>

          {/* Hairline Divider between the 2 rows */}
          <div className="my-1 border-t border-[#E5E7EB]/80 dark:border-neutral-800/80" />

          {/* Row 2: Bottom 5 Tabs (Directly aligned 5 below 5) */}
          <div className="grid grid-cols-5 gap-1 w-full">
            {ROW_2_TABS.map((tab, idx) => renderTabButton(tab, idx + 5))}
          </div>
        </div>
      </div>
    </div>
  );
};
