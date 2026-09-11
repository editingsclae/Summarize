import React from 'react';
import { 
  Clock, 
  Lightbulb, 
  HelpCircle, 
  ArrowRight, 
  Play,
  Check
} from 'lucide-react';
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
  // 4 items with thumbnails matching the curated library
  const recentItems = [
    {
      ...SAMPLE_VIDEOS[0],
      title: 'The Future of AI',
      channel: 'Kurzgesagt – In a Nutshell',
      duration: '42:17',
      timeAgo: '2 hours ago',
      thumbnail: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=400&q=80'
    },
    {
      ...SAMPLE_VIDEOS[1],
      title: 'How to Build a Startup',
      channel: 'Ali Abdaal',
      duration: '18:32',
      timeAgo: '5 hours ago',
      thumbnail: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=400&q=80'
    },
    {
      ...SAMPLE_VIDEOS[2],
      title: 'Clean Energy Explained',
      channel: 'Veritasium',
      duration: '28:16',
      timeAgo: '1 day ago',
      thumbnail: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=400&q=80'
    },
    {
      ...SAMPLE_VIDEOS[3],
      title: 'The Psychology of Money',
      channel: 'The School of Life',
      duration: '12:45',
      timeAgo: '2 days ago',
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
    }
  ];

  return (
    <div className="w-full xl:w-[360px] shrink-0 space-y-4">
      {/* 1. Recently Summarized Card */}
      <div className="bg-white dark:bg-[#0D1321] rounded-2xl p-5 border border-neutral-200/80 dark:border-neutral-800 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800/80 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-200/60 dark:border-indigo-900/50">
              <Clock className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white tracking-tight">
              Recently Summarized
            </h3>
          </div>
          <button
            type="button"
            onClick={onViewAllHistory}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>View all</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="space-y-2">
          {recentItems.map((item) => {
            return (
              <div
                key={item.id}
                onClick={() => onSelectSample(item)}
                className="group flex items-center gap-3 p-1.5 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-all cursor-pointer"
              >
                {/* Thumbnail with overlay duration */}
                <div className="w-20 h-13 rounded-lg overflow-hidden shrink-0 bg-neutral-900 relative border border-neutral-200/60 dark:border-neutral-700/50">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-3.5 h-3.5 fill-white text-white" />
                  </div>
                  <span className="absolute bottom-1 right-1 px-1 py-0.2 rounded bg-black/80 text-[9px] font-mono font-medium text-white leading-tight">
                    {item.duration}
                  </span>
                </div>

                {/* Details */}
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-neutral-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 truncate transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 truncate">
                    {item.channel}
                  </p>
                  <p className="text-[10px] text-neutral-400 dark:text-neutral-500 font-mono mt-0.5">
                    {item.duration} • {item.timeAgo}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Quick Tips Card */}
      <div className="bg-white dark:bg-[#0D1321] rounded-2xl p-5 border border-neutral-200/80 dark:border-neutral-800 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-200/60 dark:border-amber-900/50">
            <Lightbulb className="w-3.5 h-3.5" />
          </div>
          <h3 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white tracking-tight">
            Quick Tips
          </h3>
        </div>

        <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-300 font-normal">
          <li className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <span>Use any standard YouTube URL</span>
          </li>
          <li className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <span>Supports public videos and live streams</span>
          </li>
          <li className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <span>Works seamlessly on 1hr+ long lectures</span>
          </li>
          <li className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <span>Translate summaries into multiple languages</span>
          </li>
        </ul>
      </div>

      {/* 3. Need Help Card */}
      <div className="bg-white dark:bg-[#0D1321] rounded-2xl p-5 border border-neutral-200/80 dark:border-neutral-800 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 flex items-center justify-center border border-neutral-200/60 dark:border-neutral-700/60">
            <HelpCircle className="w-3.5 h-3.5" />
          </div>
          <h3 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white tracking-tight">
            Need help?
          </h3>
        </div>

        <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed mb-3">
          Check our guide or explore examples to get the most out of VidBrief AI.
        </p>

        <button
          type="button"
          onClick={onOpenHelp || onViewAllHistory}
          className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <span>View Documentation</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
