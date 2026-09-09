import React from 'react';
import { GitFork, LayoutDashboard, FileText } from 'lucide-react';

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
  };
}

const TABS: SummaryTabType[] = [
  'Summary',
  'Infographic',
  'Mindmap',
  'Transcript',
  'Timestamps',
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
  return (
    <div className="border-b border-neutral-200/80 dark:border-neutral-800 w-full overflow-x-auto no-scrollbar">
      <nav className="flex items-center space-x-1 sm:space-x-2 min-w-max py-1 px-1">
        {TABS.map((tab) => {
          const isActive = activeTab === tab;
          let count = 0;
          if (tab === 'Timestamps' && counts?.timestamps) count = counts.timestamps;
          if (tab === 'Key Facts' && counts?.facts) count = counts.facts;
          if (tab === 'Quotes' && counts?.quotes) count = counts.quotes;
          if (tab === 'Action Items' && counts?.actionItems) count = counts.actionItems;
          if (tab === 'Concepts' && counts?.concepts) count = counts.concepts;

          return (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`relative px-3.5 py-3 text-sm font-medium transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                isActive
                  ? 'text-indigo-600 dark:text-indigo-400 font-bold'
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
              }`}
            >
              {tab === 'Infographic' && <LayoutDashboard className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
              {tab === 'Mindmap' && <GitFork className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
              <span>{tab}</span>
              {count > 0 && (
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    isActive
                      ? 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400'
                  }`}
                >
                  {count}
                </span>
              )}
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-full" />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
