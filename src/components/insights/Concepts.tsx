import React, { useState } from 'react';
import { BookMarked, ChevronRight } from 'lucide-react';
import { ConceptItem } from '../../types/summary';

interface ConceptsProps {
  concepts: ConceptItem[];
}

export const Concepts: React.FC<ConceptsProps> = ({ concepts }) => {
  const [showAll, setShowAll] = useState(false);

  const fallbackConcepts: ConceptItem[] = [
    {
      term: 'Large Language Model',
      explanation: 'An advanced AI architecture trained on vast text data capable of parsing and generating human language.'
    },
    {
      term: 'AI Alignment',
      explanation: 'The research subfield ensuring AI systems act consistently with human intent, safety, and values.'
    }
  ];

  const list = concepts && concepts.length > 0 ? concepts : fallbackConcepts;
  const displayConcepts = showAll ? list : list.slice(0, 2);

  return (
    <div className="bg-white dark:bg-[#0D1321] rounded-xl border border-neutral-200/80 dark:border-neutral-800 p-4 sm:p-5 shadow-2xs">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-200/60 dark:border-indigo-900/60">
            <BookMarked className="w-3 h-3" />
          </div>
          <h3 className="font-semibold text-neutral-900 dark:text-white text-xs sm:text-sm">
            Concepts Explained
          </h3>
        </div>

        {list.length > 2 && (
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="text-xs font-medium text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white flex items-center gap-0.5 cursor-pointer transition-colors"
          >
            <span>{showAll ? 'Show less' : 'View all'}</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Concepts List */}
      <div className="space-y-2">
        {displayConcepts.map((item, idx) => (
          <div
            key={idx}
            className="p-3 rounded-lg bg-neutral-50/70 dark:bg-neutral-850/40 border border-neutral-200/60 dark:border-neutral-800/60"
          >
            <h4 className="text-xs font-semibold text-neutral-900 dark:text-white mb-1">
              {item.term}
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
              {item.explanation}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
