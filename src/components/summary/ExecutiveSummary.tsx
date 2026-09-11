import React from 'react';
import { FileText } from 'lucide-react';
import { StructuredSummary } from '../../types/summary';
import { InsightCards } from './InsightCards';

interface ExecutiveSummaryProps {
  summary: StructuredSummary;
}

export const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({ summary }) => {
  return (
    <div className="bg-white dark:bg-[#0D1321] rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
          <FileText className="w-3.5 h-3.5" />
        </div>
        <h2 className="text-sm font-bold text-neutral-900 dark:text-white tracking-tight">
          Executive Summary
        </h2>
      </div>

      {/* Main Executive Summary Text */}
      <div className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed space-y-3 font-normal">
        {summary.executiveSummary.split('\n\n').map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>

      {/* 4 Compact Insight Cards */}
      <InsightCards summary={summary} />
    </div>
  );
};
