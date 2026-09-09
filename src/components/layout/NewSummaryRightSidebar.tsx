import React from 'react';
import { 
  Clock, 
  Lightbulb, 
  HelpCircle, 
  ArrowRight, 
  Play
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
  // 4 items with thumbnails matching the screenshot
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
      <div className="bg-white dark:bg-[#131B2E] rounded-3xl p-5 border border-neutral-200/90 dark:border-neutral-800 shadow-xs">
        <div className="flex items-center justify-between pb-3.5 border-b border-neutral-100 dark:border-neutral-800/80 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-[#2563EB] dark:text-blue-400 flex items-center justify-center">
              <Clock className="w-4 h-4 text-[#2563EB]" />
            </div>
            <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
              Recently Summarized
            </h3>
          </div>
          <button
            type="button"
            onClick={onViewAllHistory}
            className="text-xs font-semibold text-[#2563EB] hover:text-blue-700 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>View all</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="space-y-3">
          {recentItems.map((item) => {
            return (
              <div
                key={item.id}
                onClick={() => onSelectSample(item)}
                className="group flex items-center gap-3 p-1 rounded-2xl hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-all cursor-pointer"
              >
                {/* Thumbnail with overlay duration */}
                <div className="w-20 h-13 rounded-xl overflow-hidden shrink-0 bg-neutral-900 relative border border-neutral-200/60 dark:border-neutral-700/50">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-3.5 h-3.5 fill-white text-white" />
                  </div>
                  <span className="absolute bottom-1 right-1 px-1 py-0.2 rounded bg-black/85 text-[9px] font-mono font-bold text-white leading-tight">
                    {item.duration}
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
                    {item.duration} • {item.timeAgo}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Quick Tips Card */}
      <div className="bg-white dark:bg-[#131B2E] rounded-3xl p-5 border border-neutral-200/90 dark:border-neutral-800 shadow-xs">
        <div className="flex items-center gap-2.5 mb-3.5">
          <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-[#2563EB] dark:text-blue-400 flex items-center justify-center">
            <Lightbulb className="w-4 h-4 text-[#2563EB]" />
          </div>
          <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
            Quick Tips
          </h3>
        </div>

        <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-300 font-normal">
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] shrink-0" />
            <span>Use a valid YouTube URL</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] shrink-0" />
            <span>Works with public videos</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] shrink-0" />
            <span>You can summarize long videos</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] shrink-0" />
            <span>Try different languages</span>
          </li>
        </ul>
      </div>

      {/* 3. Need Help Card */}
      <div className="relative overflow-hidden bg-white dark:bg-[#131B2E] rounded-3xl p-5 border border-neutral-200/90 dark:border-neutral-800 shadow-xs min-h-[140px]">
        {/* Decorative subtle wave illustration at bottom-right */}
        <div className="absolute right-0 bottom-0 pointer-events-none opacity-40 dark:opacity-20 translate-x-2 translate-y-2">
          <svg width="150" height="90" viewBox="0 0 150 90" fill="none">
            <path
              d="M0 60 C 40 40, 80 80, 150 20 L 150 90 L 0 90 Z"
              fill="url(#wave-gradient)"
            />
            <path
              d="M20 70 C 60 50, 100 85, 150 35 L 150 90 L 20 90 Z"
              fill="#2563EB"
              fillOpacity="0.15"
            />
            <defs>
              <linearGradient id="wave-gradient" x1="0" y1="0" x2="150" y2="90" gradientUnits="userSpaceOnUse">
                <stop stopColor="#93C5FD" />
                <stop offset="1" stopColor="#3B82F6" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-7 h-7 rounded-xl bg-[#1E293B] text-white flex items-center justify-center">
              <HelpCircle className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
              Need help?
            </h3>
          </div>

          <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed mb-3.5 max-w-[280px]">
            Check our guide or explore examples to get the most out of VidBrief.ai.
          </p>

          <button
            type="button"
            onClick={onOpenHelp || onViewAllHistory}
            className="text-xs font-semibold text-[#2563EB] hover:text-blue-700 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>View Documentation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
