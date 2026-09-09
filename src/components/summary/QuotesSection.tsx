import React from 'react';
import { Quote, Play, User } from 'lucide-react';
import { QuoteItem } from '../../types/summary';
import { formatTimestamp, getYouTubeTimestampUrl } from '../../utils/youtube';

interface QuotesSectionProps {
  quotes: QuoteItem[];
  videoId: string;
}

export const QuotesSection: React.FC<QuotesSectionProps> = ({ quotes, videoId }) => {
  if (!quotes || quotes.length === 0) return null;

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 p-5 sm:p-6 shadow-sm">
      <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-neutral-100 dark:border-neutral-800">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 flex items-center justify-center">
            <Quote className="w-4 h-4" />
          </div>
          <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
            Important Direct Quotes
          </h3>
        </div>
        <span className="text-xs text-neutral-400 dark:text-neutral-500 font-medium">
          Verbatim Excerpts
        </span>
      </div>

      <div className="space-y-3.5">
        {quotes.map((q, idx) => (
          <blockquote
            key={idx}
            className="p-4 rounded-xl border border-neutral-200/70 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/30 relative"
          >
            <p className="text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 italic leading-relaxed font-normal">
              "{q.quote}"
            </p>

            <div className="mt-2.5 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 pt-2 border-t border-neutral-200/50 dark:border-neutral-700/50">
              <span className="font-medium text-neutral-700 dark:text-neutral-300 flex items-center gap-1">
                <User className="w-3 h-3 text-neutral-400" />
                {q.speaker || 'Speaker'}
              </span>

              {q.timestamp !== undefined && q.timestamp !== null && (
                <a
                  href={getYouTubeTimestampUrl(videoId, q.timestamp)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  <Play className="w-3 h-3 fill-current" />
                  {formatTimestamp(q.timestamp)}
                </a>
              )}
            </div>
          </blockquote>
        ))}
      </div>
    </div>
  );
};
