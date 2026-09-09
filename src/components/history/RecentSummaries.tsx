import React from 'react';
import { Clock } from 'lucide-react';
import { SavedSummaryRecord, StructuredSummary } from '../../types/summary';
import { SAMPLE_VIDEOS } from '../../services/sampleData';

interface RecentSummariesProps {
  history: SavedSummaryRecord[];
  activeVideoId?: string;
  onSelectSummary: (summary: StructuredSummary) => void;
  onViewAll?: () => void;
}

export const RecentSummaries: React.FC<RecentSummariesProps> = ({
  history,
  activeVideoId,
  onSelectSummary,
  onViewAll,
}) => {
  // Combine real history with sample videos if history has few items
  const items = history && history.length > 0 
    ? history.slice(0, 4)
    : SAMPLE_VIDEOS.slice(0, 4).map(sample => ({
        id: sample.id,
        createdAt: new Date().toISOString(),
        video: {
          id: sample.id,
          url: sample.url,
          title: sample.title,
          channel: sample.channel,
          thumbnail: sample.thumbnail,
          duration: sample.duration,
          publishedAt: sample.publishedAt
        },
        summary: sample.summary
      }));

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-3">
        <h4 className="text-[11px] font-bold text-neutral-400 dark:text-neutral-400 tracking-wider uppercase">
          Recent Summaries
        </h4>
        {onViewAll && (
          <button
            type="button"
            onClick={onViewAll}
            className="text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
          >
            View all
          </button>
        )}
      </div>

      <div className="space-y-1.5">
        {items.map((item, idx) => {
          const isActive = activeVideoId === item.video.id;
          const relativeTime = idx === 0 ? '2 hours ago' : idx === 1 ? '5 hours ago' : idx === 2 ? '1 day ago' : '2 days ago';
          const duration = item.video.duration || (idx === 0 ? '42:17' : idx === 1 ? '18:32' : idx === 2 ? '28:16' : '12:45');

          return (
            <button
              key={item.id || idx}
              type="button"
              onClick={() => onSelectSummary(item.summary)}
              className={`w-full text-left p-2 rounded-2xl flex items-center gap-2.5 transition-all cursor-pointer group ${
                isActive
                  ? 'bg-neutral-800 text-white'
                  : 'hover:bg-neutral-800/60 text-neutral-300'
              }`}
            >
              {/* Thumbnail */}
              <div className="w-12 h-8 rounded-lg overflow-hidden shrink-0 bg-neutral-800 relative border border-neutral-700/50">
                <img
                  src={item.video.thumbnail}
                  alt={item.video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${item.video.id}/default.jpg`;
                  }}
                />
              </div>

              {/* Title & Info */}
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-neutral-200 group-hover:text-white truncate">
                  {item.video.title}
                </p>
                <p className="text-[10px] text-neutral-400 flex items-center gap-1 mt-0.5 font-mono">
                  <span>{duration}</span>
                  <span>•</span>
                  <span>{relativeTime}</span>
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
