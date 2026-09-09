import React from 'react';
import { FileText, Target, BookOpen } from 'lucide-react';

interface ExecutiveSummarySectionProps {
  executiveSummary: string;
}

export const ExecutiveSummarySection: React.FC<ExecutiveSummarySectionProps> = ({ executiveSummary }) => {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 p-5 sm:p-6 shadow-sm">
      <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-neutral-100 dark:border-neutral-800">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 flex items-center justify-center">
            <FileText className="w-4 h-4" />
          </div>
          <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
            Executive Summary
          </h3>
        </div>
        <span className="text-xs text-neutral-400 dark:text-neutral-500 font-medium">
          Context & Core Thesis
        </span>
      </div>

      <div className="text-neutral-700 dark:text-neutral-300 text-sm sm:text-base leading-relaxed space-y-3 font-normal">
        {executiveSummary.split('\n\n').map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </div>
  );
};
