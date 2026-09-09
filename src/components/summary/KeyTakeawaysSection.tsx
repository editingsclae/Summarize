import React from 'react';
import { KeyRound, Star, Sparkles } from 'lucide-react';
import { KeyTakeaway } from '../../types/summary';

interface KeyTakeawaysSectionProps {
  takeaways: KeyTakeaway[];
}

export const KeyTakeawaysSection: React.FC<KeyTakeawaysSectionProps> = ({ takeaways }) => {
  if (!takeaways || takeaways.length === 0) return null;

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 p-5 sm:p-6 shadow-sm">
      <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-neutral-100 dark:border-neutral-800">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <KeyRound className="w-4 h-4" />
          </div>
          <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
            Key Takeaways
          </h3>
        </div>
        <span className="text-xs text-neutral-400 dark:text-neutral-500 font-medium">
          {takeaways.length} Key Insights
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {takeaways.map((item, idx) => {
          const isHigh = item.importance === 'high';
          return (
            <div
              key={idx}
              className="flex flex-col justify-between p-4 rounded-xl border border-neutral-200/70 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/30 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="w-5 h-5 rounded-full bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span
                    className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                      isHigh
                        ? 'bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                    }`}
                  >
                    {item.importance} priority
                  </span>
                </div>
                <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 mb-1.5 leading-snug">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
                  {item.summary}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
