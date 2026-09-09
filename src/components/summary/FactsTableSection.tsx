import React from 'react';
import { Table, Hash, Database } from 'lucide-react';
import { FactData } from '../../types/summary';

interface FactsTableSectionProps {
  facts: FactData[];
}

export const FactsTableSection: React.FC<FactsTableSectionProps> = ({ facts }) => {
  if (!facts || facts.length === 0) return null;

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 p-5 sm:p-6 shadow-sm">
      <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-neutral-100 dark:border-neutral-800">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Hash className="w-4 h-4" />
          </div>
          <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
            Key Facts & Quantitative Data
          </h3>
        </div>
        <span className="text-xs text-neutral-400 dark:text-neutral-500 font-medium">
          {facts.length} Verified Metrics
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-neutral-200 dark:border-neutral-800 text-neutral-400 dark:text-neutral-500 uppercase text-[10px] tracking-wider">
              <th className="py-2.5 pr-4 font-semibold">Fact / Dimension</th>
              <th className="py-2.5 px-4 font-semibold">Measured Value</th>
              <th className="py-2.5 pl-4 font-semibold">Context & Reference</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60 font-normal">
            {facts.map((item, idx) => (
              <tr key={idx} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30 transition-colors">
                <td className="py-3 pr-4 font-medium text-neutral-900 dark:text-neutral-100 align-top">
                  {item.fact}
                </td>
                <td className="py-3 px-4 font-mono font-bold text-indigo-600 dark:text-indigo-400 align-top whitespace-nowrap">
                  {item.value}
                </td>
                <td className="py-3 pl-4 text-neutral-600 dark:text-neutral-300 align-top">
                  {item.context}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
