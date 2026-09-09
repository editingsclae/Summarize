import React from 'react';
import { Brain, HelpCircle } from 'lucide-react';
import { ConceptItem } from '../../types/summary';

interface ConceptsSectionProps {
  concepts: ConceptItem[];
}

export const ConceptsSection: React.FC<ConceptsSectionProps> = ({ concepts }) => {
  if (!concepts || concepts.length === 0) return null;

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 p-5 sm:p-6 shadow-sm">
      <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-neutral-100 dark:border-neutral-800">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <Brain className="w-4 h-4" />
          </div>
          <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
            Key Concepts Explained
          </h3>
        </div>
        <span className="text-xs text-neutral-400 dark:text-neutral-500 font-medium">
          Plain-English Definitions
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {concepts.map((concept, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl border border-neutral-200/70 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/30"
          >
            <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 text-xs font-semibold mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              <span>Concept Term</span>
            </div>
            <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 mb-1.5">
              {concept.term}
            </h4>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
              {concept.explanation}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
