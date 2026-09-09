import React, { useState } from 'react';
import { Lightbulb, ChevronRight } from 'lucide-react';
import { KeyTakeaway } from '../../types/summary';

interface KeyTakeawaysProps {
  takeaways: KeyTakeaway[];
}

export const KeyTakeaways: React.FC<KeyTakeawaysProps> = ({ takeaways }) => {
  const [showAll, setShowAll] = useState(false);

  if (!takeaways || takeaways.length === 0) return null;

  const displayList = showAll ? takeaways : takeaways.slice(0, 3);

  // Derive badge type and color per card
  const getBadgeInfo = (takeaway: KeyTakeaway, index: number) => {
    // If the title or summary hints at importance, map accordingly
    const text = (takeaway.title + ' ' + takeaway.summary).toLowerCase();
    
    if (takeaway.importance === 'high' || text.includes('must') || text.includes('critical') || index === 0) {
      return {
        label: 'IMPORTANT',
        circleBg: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300',
        badgeBg: 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border-rose-200/60 dark:border-rose-900/50'
      };
    }
    if (text.includes('recommend') || text.includes('should') || text.includes('action') || index === 2) {
      return {
        label: 'RECOMMENDATION',
        circleBg: 'bg-amber-100 text-amber-700 dark:bg-amber-950/80 dark:text-amber-300',
        badgeBg: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200/60 dark:border-emerald-900/50'
      };
    }
    if (takeaway.importance === 'medium' || text.includes('key') || text.includes('core')) {
      return {
        label: 'KEY IDEA',
        circleBg: 'bg-purple-100 text-purple-700 dark:bg-purple-950/80 dark:text-purple-300',
        badgeBg: 'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 border-purple-200/60 dark:border-purple-900/50'
      };
    }
    return {
      label: 'FACT',
      circleBg: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300',
      badgeBg: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border-blue-200/60 dark:border-blue-900/50'
    };
  };

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <Lightbulb className="w-4 h-4" />
          </div>
          <h2 className="text-base font-bold text-neutral-900 dark:text-white tracking-tight">
            Key Takeaways
          </h2>
        </div>

        {takeaways.length > 3 && (
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>{showAll ? 'Show less' : 'View all'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {displayList.map((item, index) => {
          const badge = getBadgeInfo(item, index);
          return (
            <div
              key={index}
              className="bg-white dark:bg-[#131B2E] rounded-3xl border border-neutral-200/80 dark:border-neutral-800/80 p-5 flex flex-col justify-between shadow-xs hover:border-indigo-200 dark:hover:border-indigo-800/60 transition-all group"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${badge.circleBg}`}>
                    {index + 1}
                  </div>
                  <h3 className="font-bold text-sm text-neutral-900 dark:text-white leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                </div>

                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal line-clamp-3 mb-4">
                  {item.summary}
                </p>
              </div>

              <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800/60 flex items-center justify-between">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${badge.badgeBg}`}>
                  {badge.label}
                </span>
                <span className="text-[10px] text-neutral-400 capitalize">
                  {item.importance || 'high'} priority
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
