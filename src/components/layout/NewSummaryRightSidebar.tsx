import React from 'react';
import { 
  Clock, 
  Lightbulb, 
  HelpCircle, 
  ArrowRight, 
  BookOpen, 
  Play, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { StructuredSummary } from '../../types/summary';
import { SAMPLE_VIDEOS, SampleVideo } from '../../services/sampleData';

interface NewSummaryRightSidebarProps {
  onSelectSample: (sample: SampleVideo) => void;
  onViewAllHistory: () => void;
  onOpenHelp?: () => void;
}

export const NewSummaryRightSidebar: React.FC<NewSummaryRightSidebarProps> = ({
  onSelectSample,
  onViewAllHistory,
  onOpenHelp
}) => {
  // Use the top 4 featured sample videos
  const recentItems = SAMPLE_VIDEOS.slice(0, 4);

  return (
    <div className="w-full xl:w-[380px] shrink-0 space-y-5">
      {/* 1. Recently Summarized Card */}
      <div className="bg-white dark:bg-[#131B2E] rounded-3xl p-5 border border-neutral-200/90 dark:border-neutral-800 shadow-xs">
        <div className="flex items-center justify-between pb-3.5 border-b border-neutral-100 dark:border-neutral-800/80 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
              Recently Summarized
            </h3>
          </div>
          <button
            type="button"
            onClick={onViewAllHistory}
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>View all</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="space-y-3">
          {recentItems.map((item, idx) => {
            const timeAgo = idx === 0 ? '2 hours ago' : idx === 1 ? '5 hours ago' : idx === 2 ? '1 day ago' : '2 days ago';
            const duration = item.duration || '42:17';

            return (
              <div
                key={item.id}
                onClick={() => onSelectSample(item)}
                className="group flex items-center gap-3 p-1.5 -mx-1.5 rounded-2xl hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-all cursor-pointer"
              >
                {/* Thumbnail with overlay duration */}
                <div className="w-20 h-13 rounded-xl overflow-hidden shrink-0 bg-neutral-900 relative border border-neutral-200/60 dark:border-neutral-700/50">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-3.5 h-3.5 fill-white text-white" />
                  </div>
                  <span className="absolute bottom-1 right-1 px-1 py-0.2 rounded bg-black/80 text-[9px] font-mono font-bold text-white leading-tight">
                    {duration}
                  </span>
                </div>

                {/* Details */}
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 truncate">
                    {item.channel}
                  </p>
                  <p className="text-[10px] text-neutral-400 dark:text-neutral-500 font-mono mt-0.5">
                    {duration} • {timeAgo}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Quick Tips Card */}
      <div className="bg-white dark:bg-[#131B2E] rounded-3xl p-5 border border-neutral-200/90 dark:border-neutral-800 shadow-xs">
        <div className="flex items-center gap-2 mb-3.5">
          <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Lightbulb className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
            Quick Tips
          </h3>
        </div>

        <ul className="space-y-2.5 text-xs text-neutral-600 dark:text-neutral-300">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
            <span>Use a valid YouTube URL</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
            <span>Works with public videos</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
            <span>You can summarize long videos</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
            <span>Try different languages</span>
          </li>
        </ul>
      </div>

      {/* 3. Need Help Card */}
      <div className="relative overflow-hidden bg-white dark:bg-[#131B2E] rounded-3xl p-5 border border-neutral-200/90 dark:border-neutral-800 shadow-xs">
        {/* Subtle decorative background wave */}
        <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-indigo-500/5 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <HelpCircle className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
              Need help?
            </h3>
          </div>

          <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed mb-3.5">
            Check our guide or explore examples to get the most out of VidBrief.ai.
          </p>

          <button
            type="button"
            onClick={onOpenHelp || onViewAllHistory}
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>View Documentation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
