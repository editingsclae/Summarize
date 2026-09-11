import React, { useState } from 'react';
import { BookOpen, Clock, ChevronDown, ChevronUp, ExternalLink, ListCollapse, ListFilter } from 'lucide-react';
import { SummarySection } from '../../types/summary';

interface DetailedSummaryProps {
  sections: SummarySection[];
  videoId?: string;
}

export const DetailedSummary: React.FC<DetailedSummaryProps> = ({ 
  sections, 
  videoId 
}) => {
  // Keep track of which chapter bullet points are expanded
  const [expandedIndices, setExpandedIndices] = useState<Set<number>>(new Set());

  if (!sections || sections.length === 0) return null;

  const hasAnyBullets = sections.some(s => s.bullets && s.bullets.length > 0);
  const allExpanded = hasAnyBullets && sections.every((s, idx) => !s.bullets || s.bullets.length === 0 || expandedIndices.has(idx));

  const formatTimestamp = (seconds?: number | null, index?: number) => {
    if (seconds !== undefined && seconds !== null && seconds >= 0) {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    // Estimated timestamps based on chapter index if not provided
    const estimated = [75, 288, 410, 680, 1020][index || 0] || (index || 0) * 240;
    const mins = Math.floor(estimated / 60);
    const secs = Math.floor(estimated % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getYoutubeTimestampUrl = (seconds?: number | null, index?: number) => {
    if (!videoId) return '#';
    const s = seconds ?? ([75, 288, 410, 680, 1020][index || 0] || (index || 0) * 240);
    return `https://www.youtube.com/watch?v=${videoId}&t=${s}s`;
  };

  const toggleExpand = (idx: number) => {
    setExpandedIndices(prev => {
      const next = new Set(prev);
      if (next.has(idx)) {
        next.delete(idx);
      } else {
        next.add(idx);
      }
      return next;
    });
  };

  const toggleAll = () => {
    if (allExpanded) {
      setExpandedIndices(new Set());
    } else {
      const all = new Set<number>();
      sections.forEach((_, idx) => all.add(idx));
      setExpandedIndices(all);
    }
  };

  return (
    <div className="bg-white dark:bg-[#0D1321] rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:border-neutral-300 dark:hover:border-neutral-700 transition-all">
      {/* Card Header */}
      <div className="flex items-center justify-between gap-3 pb-5 mb-5 border-b border-neutral-100 dark:border-neutral-800/70">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <BookOpen className="w-3.5 h-3.5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-neutral-900 dark:text-white tracking-tight">
              Detailed Summary
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Chapter-by-chapter breakdown and key insights
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {hasAnyBullets && (
            <button
              type="button"
              onClick={toggleAll}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:text-indigo-600 hover:border-indigo-200 transition-colors"
            >
              <ListCollapse className="w-3.5 h-3.5" />
              <span>{allExpanded ? 'Collapse All' : 'Expand All'}</span>
            </button>
          )}

          <span className="px-2.5 py-1 rounded-md bg-neutral-50 dark:bg-neutral-800/70 border border-neutral-200/70 dark:border-neutral-700/60 text-xs font-semibold text-neutral-600 dark:text-neutral-300">
            {sections.length} Chapters
          </span>
        </div>
      </div>

      {/* Chapters Timeline List inside the single card */}
      <div className="space-y-4">
        {sections.map((section, idx) => {
          const isExpanded = expandedIndices.has(idx);
          const timeFormatted = formatTimestamp(section.timestamp, idx);
          const ytUrl = getYoutubeTimestampUrl(section.timestamp, idx);
          const isLast = idx === sections.length - 1;
          const hasBullets = section.bullets && section.bullets.length > 0;

          return (
            <div
              key={idx}
              className="flex items-start gap-4 group p-3 sm:p-4 rounded-xl hover:bg-neutral-50/70 dark:hover:bg-neutral-800/40 border border-transparent hover:border-neutral-200/60 dark:hover:border-neutral-800/60 transition-all"
            >
              {/* Timeline marker / number */}
              <div className="flex flex-col items-center shrink-0">
                <div className="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold text-xs flex items-center justify-center border border-indigo-100 dark:border-indigo-900/50 shadow-2xs group-hover:scale-105 transition-transform">
                  {idx + 1}
                </div>
                {!isLast && (
                  <div className="w-0.5 bg-neutral-100 dark:bg-neutral-800/80 flex-1 my-2 min-h-[20px]" />
                )}
              </div>

              {/* Chapter Content */}
              <div className="flex-1 min-w-0 pb-1">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-white leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {section.title}
                  </h3>

                  {videoId ? (
                    <a
                      href={ytUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200/70 dark:border-neutral-700/60 text-xs font-mono font-semibold text-neutral-600 dark:text-neutral-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 transition-colors shrink-0"
                      title="Jump to time on YouTube"
                    >
                      <Clock className="w-3 h-3 text-indigo-500" />
                      <span>{timeFormatted}</span>
                      <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200/70 dark:border-neutral-700/60 text-xs font-mono font-semibold text-neutral-500 shrink-0">
                      <Clock className="w-3 h-3 text-indigo-500" />
                      <span>{timeFormatted}</span>
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {section.summary}
                </p>

                {/* Bullets if present */}
                {hasBullets && (
                  <div className="mt-2.5">
                    {isExpanded ? (
                      <ul className="space-y-1.5 pt-2 border-t border-neutral-100 dark:border-neutral-800/60 text-xs text-neutral-600 dark:text-neutral-300">
                        {section.bullets!.map((b, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                            <span className="leading-relaxed">{b}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    <button
                      type="button"
                      onClick={() => toggleExpand(idx)}
                      className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 cursor-pointer"
                    >
                      <span>{isExpanded ? 'Hide Details' : `Show ${section.bullets!.length} Key Points`}</span>
                      {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
