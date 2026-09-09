import React from 'react';
import { Zap } from 'lucide-react';

interface TLDRCardProps {
  tldr: string;
  readingTime?: string;
}

export const TLDRCard: React.FC<TLDRCardProps> = ({ 
  tldr, 
  readingTime = '2 min read' 
}) => {
  return (
    <div className="bg-[#EEF2FF]/60 dark:bg-indigo-950/25 rounded-3xl border border-indigo-100 dark:border-indigo-900/40 p-5 sm:p-6 shadow-xs">
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <Zap className="w-4 h-4 fill-current" />
          </div>
          <h2 className="text-base font-bold text-neutral-900 dark:text-white tracking-tight">
            TL;DR
          </h2>
        </div>
        <span className="px-3 py-1 rounded-full bg-white dark:bg-neutral-800 border border-indigo-100 dark:border-indigo-900/60 text-xs font-semibold text-indigo-600 dark:text-indigo-400 shadow-2xs">
          {readingTime}
        </span>
      </div>

      <p className="text-neutral-700 dark:text-neutral-300 text-sm sm:text-base leading-relaxed">
        {tldr}
      </p>
    </div>
  );
};
