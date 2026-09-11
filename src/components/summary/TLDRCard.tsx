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
    <div className="bg-indigo-50/50 dark:bg-indigo-950/20 rounded-2xl border border-indigo-100/80 dark:border-indigo-900/30 p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <Zap className="w-3.5 h-3.5 fill-current" />
          </div>
          <h2 className="text-sm font-bold text-neutral-900 dark:text-white tracking-tight">
            TL;DR
          </h2>
        </div>
        <span className="px-2.5 py-1 rounded-md bg-white dark:bg-[#0D1321] border border-indigo-100 dark:border-indigo-900/50 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 shadow-2xs">
          {readingTime}
        </span>
      </div>

      <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed">
        {tldr}
      </p>
    </div>
  );
};
