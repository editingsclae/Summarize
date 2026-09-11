import React from 'react';
import { Scale, ThumbsUp, ThumbsDown, Check, X } from 'lucide-react';
import { ProConItem } from '../../types/summary';

interface ProsConsSectionProps {
  pros: ProConItem[];
  cons: ProConItem[];
}

export const ProsConsSection: React.FC<ProsConsSectionProps> = ({ pros, cons }) => {
  const hasPros = pros && pros.length > 0;
  const hasCons = cons && cons.length > 0;

  if (!hasPros && !hasCons) return null;

  return (
    <div className="bg-white dark:bg-[#0D1321] rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-neutral-100 dark:border-neutral-800">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <Scale className="w-4 h-4" />
          </div>
          <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
            Comparative Analysis (Pros & Cons)
          </h3>
        </div>
        <span className="text-xs text-neutral-400 dark:text-neutral-500 font-medium">
          Critical Evaluation
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pros */}
        {hasPros && (
          <div className="p-4 rounded-xl border border-emerald-200/80 dark:border-emerald-900/60 bg-emerald-50/30 dark:bg-emerald-950/20">
            <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-xs uppercase tracking-wider mb-3">
              <ThumbsUp className="w-3.5 h-3.5" />
              <span>Key Advantages / Strengths</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-normal">
              {pros.map((p, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{p.point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Cons */}
        {hasCons && (
          <div className="p-4 rounded-xl border border-rose-200/80 dark:border-rose-900/60 bg-rose-50/30 dark:bg-rose-950/20">
            <div className="flex items-center gap-2 text-rose-800 dark:text-rose-300 font-bold text-xs uppercase tracking-wider mb-3">
              <ThumbsDown className="w-3.5 h-3.5" />
              <span>Limitations / Caveats</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-normal">
              {cons.map((c, i) => (
                <li key={i} className="flex items-start gap-2">
                  <X className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                  <span>{c.point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
