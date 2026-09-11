import React, { useState } from 'react';
import { CheckCircle2, ChevronRight, Check } from 'lucide-react';

interface ActionItemsProps {
  items: string[];
}

export const ActionItems: React.FC<ActionItemsProps> = ({ items }) => {
  const [showAll, setShowAll] = useState(false);
  const [completedIndices, setCompletedIndices] = useState<Record<number, boolean>>({});

  // Fallbacks if items empty
  const defaultItems = [
    'Learn about AI tools and how to use them effectively.',
    'Build relevant skills for the emerging automation economy.',
    'Support responsible AI policies and ethical safeguards.'
  ];

  const list = items && items.length > 0 ? items : defaultItems;
  const displayItems = showAll ? list : list.slice(0, 3);

  const toggleComplete = (idx: number) => {
    setCompletedIndices(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  return (
    <div className="bg-white dark:bg-[#0D1321] rounded-xl border border-neutral-200/80 dark:border-neutral-800 p-4 sm:p-5 shadow-2xs">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-200/60 dark:border-emerald-900/60">
            <CheckCircle2 className="w-3 h-3" />
          </div>
          <h3 className="font-semibold text-neutral-900 dark:text-white text-xs sm:text-sm">
            Action Items
          </h3>
        </div>

        {list.length > 3 && (
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="text-xs font-medium text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white flex items-center gap-0.5 cursor-pointer transition-colors"
          >
            <span>{showAll ? 'Show less' : 'View all'}</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Action Items List */}
      <div className="space-y-2">
        {displayItems.map((item, idx) => {
          const isDone = !!completedIndices[idx];
          return (
            <div
              key={idx}
              onClick={() => toggleComplete(idx)}
              className={`p-2.5 rounded-lg border transition-all flex items-start gap-2.5 cursor-pointer ${
                isDone
                  ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200/70 dark:border-emerald-900/40 opacity-70'
                  : 'bg-neutral-50/70 dark:bg-neutral-850/40 border-neutral-200/60 dark:border-neutral-800/60 hover:bg-white dark:hover:bg-neutral-800/60'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 transition-colors ${
                  isDone
                    ? 'bg-emerald-600 text-white'
                    : 'bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300'
                }`}
              >
                {isDone ? <Check className="w-3 h-3 stroke-[3]" /> : idx + 1}
              </div>

              <p
                className={`text-xs font-medium leading-snug ${
                  isDone
                    ? 'line-through text-neutral-400 dark:text-neutral-500'
                    : 'text-neutral-800 dark:text-neutral-200'
                }`}
              >
                {item}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
