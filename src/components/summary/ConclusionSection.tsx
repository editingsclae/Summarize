import React from 'react';
import { Flag, CheckCircle } from 'lucide-react';

interface ConclusionSectionProps {
  conclusion: string;
}

export const ConclusionSection: React.FC<ConclusionSectionProps> = ({ conclusion }) => {
  if (!conclusion) return null;

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 p-5 sm:p-6 shadow-sm">
      <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-neutral-100 dark:border-neutral-800">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <Flag className="w-4 h-4" />
          </div>
          <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
            Final Verdict & Conclusion
          </h3>
        </div>
        <span className="text-xs text-neutral-400 dark:text-neutral-500 font-medium">
          Key Takeaway
        </span>
      </div>

      <div className="p-4 rounded-xl bg-neutral-50/70 dark:bg-neutral-800/40 border border-neutral-200/60 dark:border-neutral-800">
        <p className="text-neutral-800 dark:text-neutral-200 text-sm sm:text-base leading-relaxed font-normal">
          {conclusion}
        </p>
      </div>
    </div>
  );
};
