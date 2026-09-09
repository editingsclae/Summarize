import React, { useState } from 'react';
import { Clock, Search, Trash2, X, ExternalLink, Play, Sparkles } from 'lucide-react';
import { StructuredSummary } from '../types/summary';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: StructuredSummary[];
  onSelectSummary: (summary: StructuredSummary) => void;
  onDeleteSummary: (id: string) => void;
  onClearHistory: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  history,
  onSelectSummary,
  onDeleteSummary,
  onClearHistory,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filtered = history.filter((item) => {
    const term = searchTerm.toLowerCase();
    return (
      item.video.title.toLowerCase().includes(term) ||
      item.video.channel.toLowerCase().includes(term) ||
      item.tldr.toLowerCase().includes(term)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-neutral-900 w-full max-w-2xl max-h-[85vh] rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-800/30">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 leading-none">
                Summary History
              </h3>
              <p className="text-[11px] text-neutral-500 mt-1">
                {history.length} saved briefing{history.length === 1 ? '' : 's'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {history.length > 0 && (
              <button
                type="button"
                onClick={onClearHistory}
                className="text-xs text-rose-600 hover:text-rose-700 dark:text-rose-400 px-2 py-1 rounded-md hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
              >
                Clear All
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search */}
        {history.length > 0 && (
          <div className="p-3 border-b border-neutral-100 dark:border-neutral-800/80 bg-neutral-50/30 dark:bg-neutral-900/30">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search history by video title, channel, or keywords..."
                className="w-full pl-9 pr-3 py-1.5 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>
        )}

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {history.length === 0 ? (
            <div className="text-center py-12 text-neutral-400 dark:text-neutral-500">
              <Clock className="w-8 h-8 mx-auto mb-2 stroke-1" />
              <p className="text-sm font-medium">No saved summaries yet</p>
              <p className="text-xs mt-1">Videos you summarize will automatically be preserved here.</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-8 text-neutral-400 dark:text-neutral-500">
              <p className="text-xs">No matching summaries found for "{searchTerm}"</p>
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.video.id + (item.generatedAt || '')}
                className="p-3 rounded-xl border border-neutral-200/70 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors flex items-start gap-3 group"
              >
                <img
                  src={item.video.thumbnail}
                  alt={item.video.title}
                  referrerPolicy="no-referrer"
                  className="w-20 aspect-video rounded-lg object-cover shrink-0 bg-neutral-100 dark:bg-neutral-800"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${item.video.id}/hqdefault.jpg`;
                  }}
                />

                <div 
                  className="flex-1 min-w-0 cursor-pointer"
                  onClick={() => {
                    onSelectSummary(item);
                    onClose();
                  }}
                >
                  <h4 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {item.video.title}
                  </h4>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                    {item.video.channel} {item.generatedAt ? `• ${new Date(item.generatedAt).toLocaleDateString()}` : ''}
                  </p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-300 line-clamp-2 mt-1 font-normal">
                    {item.tldr}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onDeleteSummary(item.video.id)}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                  title="Remove from history"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
