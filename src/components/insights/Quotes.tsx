import React, { useState } from 'react';
import { Quote, Clock, ChevronRight } from 'lucide-react';
import { QuoteItem } from '../../types/summary';

interface QuotesProps {
  quotes: QuoteItem[];
  videoId?: string;
}

export const Quotes: React.FC<QuotesProps> = ({ quotes }) => {
  const [showAll, setShowAll] = useState(false);

  if (!quotes || quotes.length === 0) return null;

  const displayQuotes = showAll ? quotes : quotes.slice(0, 2);

  const formatTime = (secs?: number | null, idx?: number) => {
    if (secs !== undefined && secs !== null && secs >= 0) {
      const m = Math.floor(secs / 60);
      const s = Math.floor(secs % 60);
      return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    const simulated = [862, 1420][idx || 0] || 600;
    const m = Math.floor(simulated / 60);
    const s = Math.floor(simulated % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white dark:bg-[#131B2E] rounded-3xl border border-neutral-200/80 dark:border-neutral-800/80 p-5 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
            <Quote className="w-3.5 h-3.5" />
          </div>
          <h3 className="font-bold text-neutral-900 dark:text-white text-sm">
            Important Quotes
          </h3>
        </div>

        {quotes.length > 2 && (
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 flex items-center gap-0.5 cursor-pointer"
          >
            <span>{showAll ? 'Show less' : 'View all'}</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Quote Items */}
      <div className="space-y-3">
        {displayQuotes.map((q, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-2xl bg-neutral-50/70 dark:bg-neutral-850/40 border border-neutral-200/60 dark:border-neutral-800/60 relative group"
          >
            <Quote className="w-5 h-5 text-indigo-300 dark:text-indigo-700/60 mb-1" />
            <p className="text-xs italic text-neutral-700 dark:text-neutral-300 leading-relaxed font-serif">
              "{q.quote}"
            </p>

            <div className="mt-2.5 flex items-center justify-between text-[11px] text-neutral-400">
              <span className="font-medium text-neutral-600 dark:text-neutral-400">
                — {q.speaker || 'Speaker'}
              </span>
              <div className="flex items-center gap-1 font-mono">
                <Clock className="w-2.5 h-2.5" />
                <span>{formatTime(q.timestamp, idx)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
