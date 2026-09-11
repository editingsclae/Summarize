import React, { useState } from 'react';
import { Search, Trash2, ExternalLink, Bookmark, Clock, Play, LayoutGrid, List } from 'lucide-react';
import { SavedSummaryRecord, StructuredSummary } from '../../types/summary';

interface HistoryListProps {
  history: SavedSummaryRecord[];
  onSelectSummary: (summary: StructuredSummary) => void;
  onDeleteRecord?: (id: string) => void;
  savedVideoIds?: string[];
  onToggleBookmark?: (summary: StructuredSummary) => void;
}

function formatRelativeTime(isoDate?: string): string {
  if (!isoDate) return '';
  const diff = Date.now() - new Date(isoDate).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(isoDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export const HistoryList: React.FC<HistoryListProps> = ({
  history,
  onSelectSummary,
  onDeleteRecord,
  savedVideoIds = [],
  onToggleBookmark,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');

  const filtered = history.filter(
    (item) =>
      item.video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.video.channel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-3">
      {/* Toolbar: search + view toggle */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title or channel..."
            className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 dark:focus:border-indigo-600 transition-all"
          />
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-0.5 p-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shrink-0">
          <button
            type="button"
            onClick={() => setViewMode('list')}
            title="List view"
            className={`p-1.5 rounded-md transition-all duration-150 cursor-pointer ${
              viewMode === 'list'
                ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm'
                : 'text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300'
            }`}
          >
            <List className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            title="Grid view"
            className={`p-1.5 rounded-md transition-all duration-150 cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm'
                : 'text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Empty state */}
      {filtered.length === 0 ? (
        <div className="py-14 flex flex-col items-center gap-3 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800">
          <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
            <Search className="w-4 h-4 text-neutral-400" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {searchTerm ? 'No results found' : 'No summaries yet'}
            </p>
            <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5">
              {searchTerm
                ? `Nothing matched "${searchTerm}"`
                : 'Summaries you generate will appear here'}
            </p>
          </div>
        </div>
      ) : viewMode === 'list' ? (
        /* ── LIST VIEW ── */
        <div className="space-y-1.5">
          {filtered.map((item) => {
            const isBookmarked = savedVideoIds.includes(item.video.id);
            const relTime = formatRelativeTime(item.createdAt);

            return (
              <div
                key={item.id}
                className="group flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-sm transition-all duration-150"
              >
                {/* Thumbnail */}
                <button
                  type="button"
                  onClick={() => onSelectSummary(item.summary)}
                  className="relative w-[72px] h-[42px] rounded-lg overflow-hidden shrink-0 bg-neutral-900 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <img
                    src={item.video.thumbnail}
                    alt={item.video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${item.video.id}/default.jpg`;
                    }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-150">
                    <Play className="w-4 h-4 text-white fill-white drop-shadow" />
                  </div>
                  {item.video.duration && (
                    <span className="absolute bottom-0.5 right-0.5 px-1 py-px rounded bg-black/80 text-[9px] font-mono text-white leading-tight">
                      {item.video.duration}
                    </span>
                  )}
                </button>

                {/* Text */}
                <button
                  type="button"
                  onClick={() => onSelectSummary(item.summary)}
                  className="flex-1 min-w-0 text-left cursor-pointer focus:outline-none"
                >
                  <p className="text-sm font-semibold text-neutral-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 truncate transition-colors leading-snug">
                    {item.video.title}
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 truncate max-w-[130px]">
                      {item.video.channel}
                    </span>
                    {relTime && (
                      <>
                        <span className="text-neutral-300 dark:text-neutral-700">·</span>
                        <span className="flex items-center gap-0.5 text-xs text-neutral-400 dark:text-neutral-500 shrink-0">
                          <Clock className="w-3 h-3" />
                          {relTime}
                        </span>
                      </>
                    )}
                  </div>
                </button>

                {/* Actions — revealed on hover */}
                <div className="flex items-center gap-0.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                  {onToggleBookmark && (
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); onToggleBookmark(item.summary); }}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        isBookmarked
                          ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/60'
                          : 'text-neutral-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/30'
                      }`}
                      title={isBookmarked ? 'Remove bookmark' : 'Bookmark'}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
                    </button>
                  )}
                  <a
                    href={item.video.url}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    title="Open on YouTube"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  {onDeleteRecord && (
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); onDeleteRecord(item.id); }}
                      className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* ── GRID VIEW ── */
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map((item) => {
            const isBookmarked = savedVideoIds.includes(item.video.id);
            const relTime = formatRelativeTime(item.createdAt);

            return (
              <div
                key={item.id}
                className="group flex flex-col rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-md overflow-hidden transition-all duration-150 cursor-pointer"
                onClick={() => onSelectSummary(item.summary)}
              >
                {/* Thumbnail */}
                <div className="relative w-full aspect-video bg-neutral-900 overflow-hidden">
                  <img
                    src={item.video.thumbnail}
                    alt={item.video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${item.video.id}/default.jpg`;
                    }}
                  />
                  {/* Play overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-150">
                    <div className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                      <Play className="w-4 h-4 text-neutral-900 fill-neutral-900 ml-0.5" />
                    </div>
                  </div>
                  {/* Duration badge */}
                  {item.video.duration && (
                    <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/80 text-[9px] font-mono text-white leading-tight">
                      {item.video.duration}
                    </span>
                  )}
                  {/* Action buttons overlay on hover */}
                  <div className="absolute top-1.5 right-1.5 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                    {onToggleBookmark && (
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); onToggleBookmark(item.summary); }}
                        className={`p-1 rounded-md backdrop-blur-sm transition-colors cursor-pointer ${
                          isBookmarked
                            ? 'bg-indigo-600/90 text-white'
                            : 'bg-black/50 text-white hover:bg-black/70'
                        }`}
                        title={isBookmarked ? 'Remove bookmark' : 'Bookmark'}
                      >
                        <Bookmark className={`w-3 h-3 ${isBookmarked ? 'fill-white' : ''}`} />
                      </button>
                    )}
                    {onDeleteRecord && (
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); onDeleteRecord(item.id); }}
                        className="p-1 rounded-md bg-black/50 text-white hover:bg-rose-600/90 transition-colors cursor-pointer backdrop-blur-sm"
                        title="Delete"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Card body */}
                <div className="p-2.5 flex flex-col gap-1 flex-1">
                  <p className="text-xs font-semibold text-neutral-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 line-clamp-2 leading-snug transition-colors">
                    {item.video.title}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-1">
                    <span className="text-[10px] text-neutral-500 dark:text-neutral-500 truncate max-w-[80px]">
                      {item.video.channel}
                    </span>
                    {relTime && (
                      <span className="text-[10px] text-neutral-400 dark:text-neutral-600 shrink-0 flex items-center gap-0.5">
                        <Clock className="w-2.5 h-2.5" />
                        {relTime}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
