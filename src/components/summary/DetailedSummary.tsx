import React, { useState } from 'react';
import { BookOpen, Clock, ChevronDown, ChevronUp, Play, ExternalLink } from 'lucide-react';
import { SummarySection } from '../../types/summary';

interface DetailedSummaryProps {
  sections: SummarySection[];
  videoId?: string;
}

export const DetailedSummary: React.FC<DetailedSummaryProps> = ({ 
  sections, 
  videoId 
}) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  if (!sections || sections.length === 0) return null;

  const formatTimestamp = (seconds?: number | null, index?: number) => {
    if (seconds !== undefined && seconds !== null && seconds >= 0) {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    // Estimated timestamps based on chapter index if not provided
    const estimated = [272, 555, 1008, 1690, 2262][index || 0] || (index || 0) * 300;
    const mins = Math.floor(estimated / 60);
    const secs = Math.floor(estimated % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getYoutubeTimestampUrl = (seconds?: number | null, index?: number) => {
    if (!videoId) return '#';
    const s = seconds ?? ([272, 555, 1008, 1690, 2262][index || 0] || (index || 0) * 300);
    return `https://www.youtube.com/watch?v=s&t=${s}s`;
  };

  const toggleExpand = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <BookOpen className="w-4 h-4" />
          </div>
          <h2 className="text-base font-bold text-neutral-900 dark:text-white tracking-tight">
            Detailed Summary
          </h2>
        </div>
        <span className="text-xs text-neutral-400">
          {sections.length} Chapters
        </span>
      </div>

      {/* Chapters Grid / List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {sections.slice(0, 4).map((section, idx) => {
          const isExpanded = expandedIndex === idx;
          const timeFormatted = formatTimestamp(section.timestamp, idx);
          const ytUrl = getYoutubeTimestampUrl(section.timestamp, idx);

          return (
            <div
              key={idx}
              className="bg-white dark:bg-[#131B2E] rounded-3xl border border-neutral-200/80 dark:border-neutral-800/80 p-4 flex flex-col justify-between shadow-xs hover:border-indigo-200 dark:hover:border-indigo-800/60 transition-all text-left group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-neutral-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                    {idx + 1}. {section.title}
                  </span>
                  {videoId ? (
                    <a
                      href={ytUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-neutral-400 hover:text-indigo-600 dark:hover:text-indigo-400 shrink-0"
                      title="Jump to time on YouTube"
                    >
                      <Clock className="w-3 h-3" />
                      <span>{timeFormatted}</span>
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-neutral-400 shrink-0">
                      <Clock className="w-3 h-3" />
                      <span>{timeFormatted}</span>
                    </span>
                  )}
                </div>

                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-2">
                  {section.summary}
                </p>

                {/* Bullets if expanded */}
                {isExpanded && section.bullets && section.bullets.length > 0 && (
                  <ul className="mt-3 pt-2 border-t border-neutral-100 dark:border-neutral-800/60 space-y-1.5 text-xs text-neutral-600 dark:text-neutral-300">
                    {section.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-1.5">
                        <span className="text-indigo-500 font-bold">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="mt-3 pt-2 border-t border-neutral-100 dark:border-neutral-800/40 flex items-center justify-between">
                {section.bullets && section.bullets.length > 0 ? (
                  <button
                    type="button"
                    onClick={() => toggleExpand(idx)}
                    className="text-[11px] font-medium text-neutral-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 cursor-pointer"
                  >
                    <span>{isExpanded ? 'Less' : 'Details'}</span>
                    {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  </button>
                ) : <span />}

                {videoId && (
                  <a
                    href={ytUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1 rounded-md text-neutral-400 hover:text-indigo-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    title="Open timestamp"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
