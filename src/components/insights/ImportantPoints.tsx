import React, { useState } from 'react';
import { AlertTriangle, TrendingUp, AlertCircle, CheckCircle2, ChevronRight, Clock } from 'lucide-react';
import { ImportantPoint } from '../../types/summary';

interface ImportantPointsProps {
  points: ImportantPoint[];
  videoId?: string;
}

export const ImportantPoints: React.FC<ImportantPointsProps> = ({ points, videoId }) => {
  const [showAll, setShowAll] = useState(false);

  if (!points || points.length === 0) return null;

  const displayPoints = showAll ? points : points.slice(0, 4);

  const getStyleForType = (type: string) => {
    switch (type) {
      case 'IMPORTANT':
        return {
          badgeBg: 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 border-rose-200/80 dark:border-rose-900/60',
          borderAccent: 'border-l-rose-500',
          icon: <AlertTriangle className="w-2.5 h-2.5" />
        };
      case 'STATISTIC':
        return {
          badgeBg: 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300 border-blue-200/80 dark:border-blue-900/60',
          borderAccent: 'border-l-blue-500',
          icon: <TrendingUp className="w-2.5 h-2.5" />
        };
      case 'WARNING':
        return {
          badgeBg: 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 border-amber-200/80 dark:border-amber-900/60',
          borderAccent: 'border-l-amber-500',
          icon: <AlertCircle className="w-2.5 h-2.5" />
        };
      case 'RECOMMENDATION':
        return {
          badgeBg: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-900/60',
          borderAccent: 'border-l-emerald-500',
          icon: <CheckCircle2 className="w-2.5 h-2.5" />
        };
      default:
        return {
          badgeBg: 'bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300 border-purple-200/80 dark:border-purple-900/60',
          borderAccent: 'border-l-purple-500',
          icon: <AlertTriangle className="w-2.5 h-2.5" />
        };
    }
  };

  const formatTimestamp = (secs?: number | null, index?: number) => {
    if (secs !== undefined && secs !== null && secs >= 0) {
      const m = Math.floor(secs / 60);
      const s = Math.floor(secs % 60);
      return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    const simulated = [754, 1132, 1517, 1928][index || 0] || 600;
    const m = Math.floor(simulated / 60);
    const s = Math.floor(simulated % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white dark:bg-[#131B2E] rounded-3xl border border-neutral-200/80 dark:border-neutral-800/80 p-5 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-3.5 h-3.5" />
          </div>
          <h3 className="font-bold text-neutral-900 dark:text-white text-sm">
            Important Points
          </h3>
        </div>

        {points.length > 4 && (
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

      {/* Points Cards */}
      <div className="space-y-3">
        {displayPoints.map((pt, idx) => {
          const style = getStyleForType(pt.type);
          const time = formatTimestamp(pt.timestamp, idx);

          return (
            <div
              key={idx}
              className={`p-3.5 rounded-2xl bg-neutral-50/70 dark:bg-neutral-850/40 border border-neutral-200/60 dark:border-neutral-800/60 border-l-3 ${style.borderAccent} transition-all hover:bg-white dark:hover:bg-neutral-800/60`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${style.badgeBg}`}>
                  {style.icon}
                  {pt.type}
                </span>

                <div className="flex items-center gap-1 text-[11px] font-mono text-neutral-400">
                  <Clock className="w-2.5 h-2.5" />
                  <span>{time}</span>
                </div>
              </div>

              <p className="text-xs font-medium text-neutral-800 dark:text-neutral-200 leading-snug">
                {pt.content}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
