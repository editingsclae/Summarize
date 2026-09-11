import React, { useState, useMemo } from 'react';
import { 
  Search, 
  X, 
  Play, 
  ArrowRight, 
  Compass, 
  Sparkles, 
  Clock, 
  Eye, 
  CheckCircle2 
} from 'lucide-react';
import { SAMPLE_VIDEOS, SampleVideo } from '../../services/sampleData';
import { StructuredSummary } from '../../types/summary';

interface ExploreViewProps {
  onSelectSummary: (summary: StructuredSummary) => void;
}

export const ExploreView: React.FC<ExploreViewProps> = ({ onSelectSummary }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    SAMPLE_VIDEOS.forEach((v) => {
      if (v.category) set.add(v.category);
    });
    return ['All', ...Array.from(set)];
  }, []);

  // Filter videos based on category and search query
  const filteredVideos = useMemo(() => {
    return SAMPLE_VIDEOS.filter((vid) => {
      const matchesCategory = selectedCategory === 'All' || vid.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        vid.title.toLowerCase().includes(q) ||
        vid.channel.toLowerCase().includes(q) ||
        vid.category.toLowerCase().includes(q) ||
        vid.summary.tldr.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Color mapping for category badges (calm, harmonious SaaS palette)
  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'Artificial Intelligence':
        return 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border-indigo-200/60 dark:border-indigo-900/50';
      case 'Business & Productivity':
        return 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200/60 dark:border-emerald-900/50';
      case 'Science & Technology':
        return 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200/60 dark:border-blue-900/50';
      case 'Psychology & Finance':
        return 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200/60 dark:border-amber-900/50';
      case 'Keynotes & Leadership':
        return 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border-purple-200/60 dark:border-purple-900/50';
      default:
        return 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Section */}
      <div className="pb-5 border-b border-neutral-200/80 dark:border-neutral-800/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-900/40">
                <Sparkles className="w-3 h-3" />
                Curated Library
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Explore Trending Topics
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
              Discover verified AI summaries, key takeaways, and transcripts from top industry talks and lectures.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72 shrink-0">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics, channels..."
              className="w-full pl-9 pr-8 py-2 rounded-xl text-xs sm:text-sm bg-white dark:bg-[#0D1321] border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded-md text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-4">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-semibold shadow-xs'
                    : 'bg-white dark:bg-[#0D1321] text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-800'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Video Cards */}
      {filteredVideos.length === 0 ? (
        /* Empty State */
        <div className="py-16 px-4 text-center rounded-2xl bg-white dark:bg-[#0D1321] border border-neutral-200/80 dark:border-neutral-800 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-400 flex items-center justify-center mx-auto">
            <Search className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
            No briefings found
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto">
            We couldn't find any curated briefings matching "{searchQuery}". Try searching for a different keyword or topic.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="mt-2 px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-xs font-medium text-neutral-700 dark:text-neutral-200 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredVideos.map((vid) => (
            <div
              key={vid.id}
              className="bg-white dark:bg-[#0D1321] rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.06)] hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* Thumbnail Image with Duration Badge and Subtle Play Overlay */}
                <div 
                  className="aspect-video bg-neutral-900 relative overflow-hidden cursor-pointer"
                  onClick={() => onSelectSummary(vid.summary)}
                >
                  <img
                    src={vid.thumbnail}
                    alt={vid.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300 ease-out"
                    loading="lazy"
                  />
                  
                  {/* Subtle Dark Gradient Scrim on hover */}
                  <div className="absolute inset-0 bg-neutral-950/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white/95 dark:bg-neutral-900/90 text-neutral-900 dark:text-white flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                      <Play className="w-4 h-4 fill-current ml-0.5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-xs text-white text-[11px] font-mono font-medium shadow-2xs flex items-center gap-1">
                    <Clock className="w-3 h-3 text-neutral-300" />
                    <span>{vid.duration}</span>
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-5">
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider border ${getCategoryBadgeClass(vid.category)}`}>
                      {vid.category}
                    </span>
                    {vid.views && (
                      <span className="text-[11px] text-neutral-400 font-medium flex items-center gap-1">
                        <Eye className="w-3 h-3 text-neutral-400" />
                        <span>{vid.views}</span>
                      </span>
                    )}
                  </div>

                  <h3 
                    onClick={() => onSelectSummary(vid.summary)}
                    className="text-sm sm:text-[15px] font-bold text-neutral-900 dark:text-white line-clamp-2 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors cursor-pointer"
                  >
                    {vid.title}
                  </h3>

                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 flex items-center gap-1">
                    <span>{vid.channel}</span>
                    {vid.verified && (
                      <CheckCircle2 className="w-3 h-3 text-indigo-500 fill-indigo-100 dark:fill-indigo-950 shrink-0" />
                    )}
                  </p>

                  <p className="text-xs sm:text-[13px] text-neutral-600 dark:text-neutral-300 mt-2.5 line-clamp-2 leading-relaxed">
                    {vid.summary.tldr}
                  </p>
                </div>
              </div>

              {/* Bottom Action Button */}
              <div className="p-4 sm:p-5 pt-0">
                <button
                  type="button"
                  onClick={() => onSelectSummary(vid.summary)}
                  className="w-full py-2 px-3.5 rounded-xl border border-neutral-200 dark:border-neutral-700/80 bg-neutral-50/70 dark:bg-neutral-850/60 hover:bg-indigo-600 hover:border-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:border-indigo-600 text-neutral-700 dark:text-neutral-200 text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-150 cursor-pointer shadow-2xs group/btn active:scale-[0.99]"
                >
                  <span>View Full Briefing</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
