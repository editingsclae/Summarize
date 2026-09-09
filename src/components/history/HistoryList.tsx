import React, { useState } from 'react';
import { Search, Trash2, ExternalLink, Calendar, Clock, Bookmark } from 'lucide-react';
import { SavedSummaryRecord, StructuredSummary } from '../../types/summary';

interface HistoryListProps {
  history: SavedSummaryRecord[];
  onSelectSummary: (summary: StructuredSummary) => void;
  onDeleteRecord?: (id: string) => void;
  savedVideoIds?: string[];
  onToggleBookmark?: (summary: StructuredSummary) => void;
}

export const HistoryList: React.FC<HistoryListProps> = ({
  history,
  onSelectSummary,
  onDeleteRecord,
  savedVideoIds = [],
  onToggleBookmark
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = history.filter(item => 
    item.video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.video.channel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search saved summaries by title or channel..."
          className="w-full text-xs pl-9 pr-4 py-2.5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#131B2E] text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="p-8 text-center bg-white dark:bg-[#131B2E] rounded-3xl border border-neutral-200 dark:border-neutral-800 text-neutral-400 text-xs">
          No summaries found.
        </div>
      ) : (
        <div className="space-y-2.5">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="p-3.5 rounded-2xl bg-white dark:bg-[#131B2E] border border-neutral-200/80 dark:border-neutral-800/80 hover:border-indigo-300 dark:hover:border-indigo-800/60 transition-all flex items-center gap-3.5 group"
            >
              <div 
                className="w-20 h-13 rounded-xl overflow-hidden shrink-0 bg-neutral-900 cursor-pointer"
                onClick={() => onSelectSummary(item.summary)}
              >
                <img
                  src={item.video.thumbnail}
                  alt={item.video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>

              <div 
                className="flex-1 min-w-0 cursor-pointer"
                onClick={() => onSelectSummary(item.summary)}
              >
                <h4 className="text-xs font-bold text-neutral-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 truncate">
                  {item.video.title}
                </h4>
                <div className="flex items-center gap-2 mt-1 text-[11px] text-neutral-500 dark:text-neutral-400">
                  <span>{item.video.channel}</span>
                  <span>•</span>
                  <span>{item.video.duration || '42:17'}</span>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                {onToggleBookmark && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBookmark(item.summary);
                    }}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      savedVideoIds.includes(item.video.id)
                        ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/60'
                        : 'text-neutral-400 hover:text-indigo-600 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    }`}
                    title={
                      savedVideoIds.includes(item.video.id)
                        ? 'Remove from Bookmarked Summaries'
                        : 'Save to Bookmarked Summaries'
                    }
                  >
                    <Bookmark
                      className={`w-3.5 h-3.5 ${
                        savedVideoIds.includes(item.video.id) ? 'fill-current' : ''
                      }`}
                    />
                  </button>
                )}

                <a
                  href={item.video.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-indigo-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  title="Open video on YouTube"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                {onDeleteRecord && (
                  <button
                    type="button"
                    onClick={() => onDeleteRecord(item.id)}
                    className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                    title="Delete summary"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
