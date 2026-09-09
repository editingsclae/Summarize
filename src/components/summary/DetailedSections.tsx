import React from 'react';
import { ListOrdered, Play, CheckCircle2 } from 'lucide-react';
import { SummarySection } from '../../types/summary';
import { formatTimestamp, getYouTubeTimestampUrl } from '../../utils/youtube';

interface DetailedSectionsProps {
  sections: SummarySection[];
  videoId: string;
}

export const DetailedSections: React.FC<DetailedSectionsProps> = ({ sections, videoId }) => {
  if (!sections || sections.length === 0) return null;

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 p-5 sm:p-6 shadow-sm">
      <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-neutral-100 dark:border-neutral-800">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <ListOrdered className="w-4 h-4" />
          </div>
          <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
            Detailed Topic Breakdown
          </h3>
        </div>
        <span className="text-xs text-neutral-400 dark:text-neutral-500 font-medium">
          Chronological & Thematic
        </span>
      </div>

      <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-neutral-200 dark:before:bg-neutral-800 before:hidden sm:before:block">
        {sections.map((sec, idx) => (
          <div key={idx} className="relative sm:pl-9 group">
            {/* Timeline indicator node */}
            <div className="hidden sm:flex absolute left-1.5 top-1 -translate-x-1/2 w-5 h-5 rounded-full border-2 border-white dark:border-neutral-900 bg-neutral-300 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 group-hover:bg-indigo-600 group-hover:border-indigo-100 dark:group-hover:border-indigo-900 transition-colors items-center justify-center text-[10px] font-bold">
              {idx + 1}
            </div>

            <div className="p-4 rounded-xl border border-neutral-200/70 dark:border-neutral-800/80 bg-neutral-50/40 dark:bg-neutral-800/20 hover:bg-neutral-50 dark:hover:bg-neutral-800/40 transition-colors">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="sm:hidden w-5 h-5 rounded-full bg-neutral-200 dark:bg-neutral-700 text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-neutral-100 leading-snug">
                    {sec.title}
                  </h4>
                </div>

                {sec.timestamp !== undefined && sec.timestamp !== null && (
                  <a
                    href={getYouTubeTimestampUrl(videoId, sec.timestamp)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-medium text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors border border-indigo-200/50 dark:border-indigo-800/50 shadow-2xs"
                    title="Jump to section on YouTube"
                  >
                    <Play className="w-3 h-3 fill-current text-indigo-500" />
                    <span>{formatTimestamp(sec.timestamp)}</span>
                  </a>
                )}
              </div>

              <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal">
                {sec.summary}
              </p>

              {sec.bullets && sec.bullets.length > 0 && (
                <ul className="mt-3 space-y-1.5 pt-2.5 border-t border-neutral-200/50 dark:border-neutral-700/50 text-xs text-neutral-600 dark:text-neutral-400">
                  {sec.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2">
                      <span className="text-indigo-500 mt-0.5">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
