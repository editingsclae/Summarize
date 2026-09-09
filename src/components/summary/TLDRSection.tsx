import React from 'react';
import { Zap } from 'lucide-react';

interface TLDRSectionProps {
  tldr: string;
}

export const TLDRSection: React.FC<TLDRSectionProps> = ({ tldr }) => {
  return (
    <div className="bg-gradient-to-br from-indigo-50/70 via-white to-violet-50/40 dark:from-indigo-950/30 dark:via-neutral-900 dark:to-violet-950/20 rounded-2xl border border-indigo-100 dark:border-indigo-900/50 p-5 sm:p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-2.5">
        <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
          <Zap className="w-4 h-4 fill-current" />
        </div>
        <h3 className="text-sm font-bold tracking-tight uppercase text-indigo-950 dark:text-indigo-200">
          TL;DR Overview
        </h3>
        <span className="text-[11px] font-medium text-indigo-600/80 dark:text-indigo-400/80 ml-auto">
          2–4 Sentence Briefing
        </span>
      </div>

      <p className="text-neutral-800 dark:text-neutral-200 text-base sm:text-lg leading-relaxed font-normal">
        {tldr}
      </p>
    </div>
  );
};
