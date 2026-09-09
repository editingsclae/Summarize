import React, { useState } from 'react';
import { CheckSquare, Square, ListChecks } from 'lucide-react';

interface ActionItemsSectionProps {
  actionItems: string[];
}

export const ActionItemsSection: React.FC<ActionItemsSectionProps> = ({ actionItems }) => {
  const [completed, setCompleted] = useState<Record<number, boolean>>({});

  if (!actionItems || actionItems.length === 0) return null;

  const toggleItem = (idx: number) => {
    setCompleted((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const completedCount = Object.values(completed).filter(Boolean).length;

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 p-5 sm:p-6 shadow-sm">
      <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-neutral-100 dark:border-neutral-800">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 flex items-center justify-center">
            <ListChecks className="w-4 h-4" />
          </div>
          <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
            Action Items & Implementation Steps
          </h3>
        </div>
        <span className="text-xs text-neutral-400 dark:text-neutral-500 font-medium">
          {completedCount} of {actionItems.length} completed
        </span>
      </div>

      <div className="space-y-2.5">
        {actionItems.map((item, idx) => {
          const isDone = completed[idx];
          return (
            <div
              key={idx}
              onClick={() => toggleItem(idx)}
              className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer select-none ${
                isDone
                  ? 'bg-neutral-50/50 dark:bg-neutral-800/30 border-neutral-200 dark:border-neutral-800 opacity-60'
                  : 'bg-white dark:bg-neutral-900 border-neutral-200/80 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 shadow-2xs'
              }`}
            >
              <button
                type="button"
                className="mt-0.5 text-indigo-600 dark:text-indigo-400 focus:outline-none"
              >
                {isDone ? (
                  <CheckSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <Square className="w-4 h-4 text-neutral-400" />
                )}
              </button>

              <p
                className={`text-xs sm:text-sm leading-relaxed ${
                  isDone
                    ? 'line-through text-neutral-400 dark:text-neutral-500'
                    : 'text-neutral-800 dark:text-neutral-200 font-normal'
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
