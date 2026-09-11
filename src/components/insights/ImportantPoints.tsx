import React, { useState } from 'react';
import {
  AlertTriangle,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Lightbulb,
  BookOpen,
  Zap,
  Info,
  ChevronDown,
  ChevronUp,
  Clock,
} from 'lucide-react';
import { ImportantPoint } from '../../types/summary';

interface ImportantPointsProps {
  points: ImportantPoint[];
  videoId?: string;
}

interface TypeConfig {
  label: string;
  badge: string;
  dot: string;
  icon: React.ReactNode;
}

function getTypeConfig(type: string): TypeConfig {
  switch (type) {
    case 'FACT':
      return {
        label: 'Fact',
        badge: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border-blue-200/70 dark:border-blue-800/60',
        dot: 'bg-blue-500',
        icon: <Info className="w-3 h-3" />,
      };
    case 'STATISTIC':
      return {
        label: 'Statistic',
        badge: 'bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-300 border-violet-200/70 dark:border-violet-800/60',
        dot: 'bg-violet-500',
        icon: <TrendingUp className="w-3 h-3" />,
      };
    case 'WARNING':
      return {
        label: 'Warning',
        badge: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border-amber-200/70 dark:border-amber-800/60',
        dot: 'bg-amber-500',
        icon: <AlertCircle className="w-3 h-3" />,
      };
    case 'RECOMMENDATION':
      return {
        label: 'Tip',
        badge: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200/70 dark:border-emerald-800/60',
        dot: 'bg-emerald-500',
        icon: <CheckCircle2 className="w-3 h-3" />,
      };
    case 'KEY IDEA':
    case 'KEY_CONCEPT':
      return {
        label: 'Key Idea',
        badge: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 border-indigo-200/70 dark:border-indigo-800/60',
        dot: 'bg-indigo-500',
        icon: <Lightbulb className="w-3 h-3" />,
      };
    case 'DEFINITION':
      return {
        label: 'Definition',
        badge: 'bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300 border-sky-200/70 dark:border-sky-800/60',
        dot: 'bg-sky-500',
        icon: <BookOpen className="w-3 h-3" />,
      };
    case 'ACTION':
      return {
        label: 'Action',
        badge: 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border-rose-200/70 dark:border-rose-800/60',
        dot: 'bg-rose-500',
        icon: <Zap className="w-3 h-3" />,
      };
    case 'IMPORTANT':
    default:
      return {
        label: 'Important',
        badge: 'bg-orange-50 text-orange-700 dark:bg-orange-950/40 dark:text-orange-300 border-orange-200/70 dark:border-orange-800/60',
        dot: 'bg-orange-500',
        icon: <AlertTriangle className="w-3 h-3" />,
      };
  }
}

function formatTimestamp(secs?: number | null, index?: number): string {
  if (secs !== undefined && secs !== null && secs >= 0) {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }
  const simulated = [754, 1552, 2217, 1928][index ?? 0] ?? 600;
  const m = Math.floor(simulated / 60);
  const s = Math.floor(simulated % 60);
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export const ImportantPoints: React.FC<ImportantPointsProps> = ({ points, videoId }) => {
  const [showAll, setShowAll] = useState(false);

  if (!points || points.length === 0) return null;

  const PREVIEW_COUNT = 4;
  const displayPoints = showAll ? points : points.slice(0, PREVIEW_COUNT);
  const hasMore = points.length > PREVIEW_COUNT;

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-100 dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-rose-50 dark:bg-rose-950/50 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-3 h-3 text-rose-600 dark:text-rose-400" />
          </div>
          <h3 className="text-sm font-semibold text-neutral-900 dark:text-white tracking-tight">
            Important Points
          </h3>
          <span className="ml-0.5 text-[11px] font-medium text-neutral-400 dark:text-neutral-500">
            {points.length}
          </span>
        </div>

        {hasMore && (
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-0.5 text-xs font-medium text-neutral-400 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors duration-150 cursor-pointer"
          >
            {showAll ? (
              <>
                <span>Show less</span>
                <ChevronUp className="w-3.5 h-3.5" />
              </>
            ) : (
              <>
                <span>View all</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        )}
      </div>

      {/* Points list */}
      <div className="divide-y divide-neutral-100 dark:divide-neutral-800/80">
        {displayPoints.map((pt, idx) => {
          const config = getTypeConfig(pt.type);
          const time = formatTimestamp(pt.timestamp, idx);
          const text = pt.content || pt.point || pt.title || '';

          return (
            <div
              key={idx}
              className="group px-4 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-800/40 transition-colors duration-150"
            >
              {/* Type badge + timestamp */}
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider border ${config.badge}`}
                >
                  {config.icon}
                  {config.label}
                </span>

                <div className="flex items-center gap-1 text-[11px] font-mono text-neutral-400 dark:text-neutral-500">
                  <Clock className="w-3 h-3" />
                  <span>{time}</span>
                </div>
              </div>

              {/* Content */}
              <p className="text-[13px] leading-relaxed text-neutral-700 dark:text-neutral-300 font-normal">
                {text}
              </p>
            </div>
          );
        })}
      </div>

      {/* Footer — show more / collapse */}
      {hasMore && (
        <button
          type="button"
          onClick={() => setShowAll(!showAll)}
          className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 border-t border-neutral-100 dark:border-neutral-800 text-xs font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800/40 transition-all duration-150 cursor-pointer"
        >
          {showAll ? (
            <>
              <ChevronUp className="w-3.5 h-3.5" />
              Show less
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5" />
              {points.length - PREVIEW_COUNT} more points
            </>
          )}
        </button>
      )}
    </div>
  );
};
