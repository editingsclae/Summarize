import React from 'react';
import { 
  AlertTriangle, 
  TrendingUp, 
  CheckCircle2, 
  Lightbulb, 
  BookMarked, 
  ShieldAlert, 
  Info,
  Play
} from 'lucide-react';
import { ImportantPoint, ImportantPointType } from '../../types/summary';
import { formatTimestamp, getYouTubeTimestampUrl } from '../../utils/youtube';

interface ImportantPointsSectionProps {
  points: ImportantPoint[];
  videoId: string;
}

const TYPE_CONFIG: Record<
  ImportantPointType, 
  { label: string; bg: string; text: string; border: string; icon: React.ComponentType<{ className?: string }> }
> = {
  IMPORTANT: {
    label: 'IMPORTANT',
    bg: 'bg-indigo-50 dark:bg-indigo-950/40',
    text: 'text-indigo-700 dark:text-indigo-300',
    border: 'border-indigo-200 dark:border-indigo-800/80',
    icon: Info,
  },
  FACT: {
    label: 'FACT',
    bg: 'bg-sky-50 dark:bg-sky-950/40',
    text: 'text-sky-700 dark:text-sky-300',
    border: 'border-sky-200 dark:border-sky-800/80',
    icon: CheckCircle2,
  },
  STATISTIC: {
    label: 'STATISTIC',
    bg: 'bg-violet-50 dark:bg-violet-950/40',
    text: 'text-violet-700 dark:text-violet-300',
    border: 'border-violet-200 dark:border-violet-800/80',
    icon: TrendingUp,
  },
  WARNING: {
    label: 'WARNING',
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    text: 'text-amber-800 dark:text-amber-300',
    border: 'border-amber-200 dark:border-amber-800/80',
    icon: AlertTriangle,
  },
  RECOMMENDATION: {
    label: 'RECOMMENDATION',
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    text: 'text-emerald-700 dark:text-emerald-300',
    border: 'border-emerald-200 dark:border-emerald-800/80',
    icon: Lightbulb,
  },
  'KEY IDEA': {
    label: 'KEY IDEA',
    bg: 'bg-purple-50 dark:bg-purple-950/40',
    text: 'text-purple-700 dark:text-purple-300',
    border: 'border-purple-200 dark:border-purple-800/80',
    icon: Lightbulb,
  },
  DEFINITION: {
    label: 'DEFINITION',
    bg: 'bg-teal-50 dark:bg-teal-950/40',
    text: 'text-teal-700 dark:text-teal-300',
    border: 'border-teal-200 dark:border-teal-800/80',
    icon: BookMarked,
  },
  ACTION: {
    label: 'ACTION',
    bg: 'bg-blue-50 dark:bg-blue-950/40',
    text: 'text-blue-700 dark:text-blue-300',
    border: 'border-blue-200 dark:border-blue-800/80',
    icon: CheckCircle2,
  },
  KEY_CONCEPT: {
    label: 'KEY CONCEPT',
    bg: 'bg-purple-50 dark:bg-purple-950/40',
    text: 'text-purple-700 dark:text-purple-300',
    border: 'border-purple-200 dark:border-purple-800/80',
    icon: Lightbulb,
  },
};

export const ImportantPointsSection: React.FC<ImportantPointsSectionProps> = ({ points, videoId }) => {
  if (!points || points.length === 0) return null;

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 p-5 sm:p-6 shadow-sm">
      <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-neutral-100 dark:border-neutral-800">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center justify-center">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
            Critical Highlights & Insights
          </h3>
        </div>
        <span className="text-xs text-neutral-400 dark:text-neutral-500 font-medium">
          Selective Emphasis
        </span>
      </div>

      <div className="space-y-3">
        {points.map((point, index) => {
          const typeKey = (point.type?.toUpperCase() as ImportantPointType) || 'IMPORTANT';
          const cfg = TYPE_CONFIG[typeKey] || TYPE_CONFIG.IMPORTANT;
          const IconComponent = cfg.icon;

          return (
            <div
              key={index}
              className={`p-3.5 rounded-xl border ${cfg.border} ${cfg.bg} flex flex-col sm:flex-row sm:items-start justify-between gap-3 transition-colors`}
            >
              <div className="flex items-start gap-2.5 flex-1 min-w-0">
                <div className="mt-0.5 shrink-0">
                  <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${cfg.text} bg-white/60 dark:bg-black/20 border border-current/20`}>
                    <IconComponent className="w-3 h-3" />
                    {cfg.label}
                  </span>
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100 leading-snug">
                    {point.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 mt-1 leading-relaxed font-normal">
                    {point.content}
                  </p>
                </div>
              </div>

              {point.timestamp !== undefined && point.timestamp !== null && (
                <a
                  href={getYouTubeTimestampUrl(videoId, point.timestamp)}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 self-start sm:self-center inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-mono font-medium text-neutral-600 dark:text-neutral-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white/80 dark:hover:bg-neutral-800/80 transition-colors border border-neutral-200/60 dark:border-neutral-700/60"
                  title="Jump to timestamp on YouTube"
                >
                  <Play className="w-3 h-3 fill-current text-indigo-500" />
                  <span>{formatTimestamp(point.timestamp)}</span>
                </a>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
