import React, { useState } from 'react';
import { 
  Play, 
  ExternalLink, 
  Bookmark, 
  Share2, 
  MoreHorizontal, 
  CheckCircle2, 
  Globe, 
  Clock, 
  Eye, 
  ThumbsUp, 
  X,
  Printer,
  FileDown,
  Download,
  ChevronDown,
  FileText
} from 'lucide-react';
import { VideoMetadata } from '../../types/video';

interface VideoInfoCardProps {
  video: VideoMetadata;
  language?: string;
  onSave?: () => void;
  isSaved?: boolean;
  isSaving?: boolean;
  onShare?: () => void;
  onExportPdf?: () => void;
  onExportMarkdown?: () => void;
}

export const VideoInfoCard: React.FC<VideoInfoCardProps> = ({
  video,
  language = 'English',
  onSave,
  isSaved = false,
  isSaving = false,
  onShare,
  onExportPdf,
  onExportMarkdown,
}) => {
  const [isPlayingInline, setIsPlayingInline] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  // Detect live stream state
  const isLive = Boolean(video.isLive || video.duration === 'LIVE' || video.liveStatus === 'live');
  const isOngoingLive = isLive && video.liveStatus !== 'completed';

  // Compute or format values
  const viewsDisplay =
    video.concurrentViewers ||
    (video.viewCount && video.viewCount !== 'Unavailable'
      ? (video.viewCount.includes('view') || video.viewCount.includes('watching') ? video.viewCount : `${video.viewCount} views`)
      : (isOngoingLive ? 'Live Stream' : (video.viewCount || 'Unavailable')));
  const cleanViews = viewsDisplay.replace(/\s*views?/i, '').trim() || 'Unavailable';
  const likesDisplay = video.likeCount && video.likeCount !== 'Unavailable' ? video.likeCount : 'Unavailable';
  const durationDisplay = isOngoingLive ? 'LIVE' : (video.duration && video.duration !== 'Unavailable' ? video.duration : 'Unavailable');
  const publishedDate = video.publishedAt && video.publishedAt !== 'Unavailable'
    ? (video.publishedAt.startsWith('Started') || video.publishedAt.startsWith('Streamed')
        ? video.publishedAt
        : `Published on ${video.publishedAt}`)
    : 'Unavailable';

  const formatLanguageName = (code?: string) => {
    if (!code || code === 'Unavailable') return 'Unavailable';
    if (code === 'en' || code === 'English') return 'English';
    if (code === 'es') return 'Español';
    if (code === 'fr') return 'Français';
    if (code === 'de') return 'Deutsch';
    if (code === 'it') return 'Italiano';
    if (code === 'ar') return 'العربية';
    return code;
  };

  return (
    <div className="bg-white dark:bg-[#0D1321] rounded-2xl border border-neutral-200/80 dark:border-neutral-800 p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] dark:shadow-none transition-colors">
      <div className="flex flex-col lg:flex-row gap-5 lg:gap-6 items-start">
        {/* Left: Thumbnail with Play Button Overlay & Duration */}
        <div className="w-full lg:w-[320px] xl:w-[350px] shrink-0 aspect-video rounded-xl overflow-hidden bg-neutral-900 relative group shadow-xs border border-neutral-200/60 dark:border-neutral-800">
          {isPlayingInline ? (
            <div className="relative w-full h-full">
              <iframe
                src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                title={video.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <button
                onClick={() => setIsPlayingInline(false)}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-black/75 text-white hover:bg-black transition-colors z-10"
                title="Close embedded video"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              <img
                src={video.thumbnail}
                alt={video.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
                }}
              />
              {/* Play Button Overlay */}
              <div className="absolute inset-0 bg-black/25 flex items-center justify-center transition-all group-hover:bg-black/35">
                <button
                  type="button"
                  onClick={() => setIsPlayingInline(true)}
                  className="w-11 h-11 rounded-full bg-white/95 dark:bg-white text-neutral-900 flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  title="Play video"
                >
                  <Play className="w-4 h-4 ml-0.5 fill-neutral-900 text-neutral-900" />
                </button>
              </div>
              {/* Duration or Live Tag */}
              {isOngoingLive ? (
                <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  LIVE
                </span>
              ) : durationDisplay && durationDisplay !== 'Unavailable' ? (
                <span className="absolute bottom-2.5 right-2.5 px-1.5 py-0.5 rounded bg-black/85 backdrop-blur-xs text-white text-[10px] font-mono font-medium leading-none">
                  {durationDisplay}
                </span>
              ) : null}
            </>
          )}
        </div>

        {/* Right: Title, Channel, Actions & Metadata Badges */}
        <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch">
          <div>
            {/* Title & Live Badge */}
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold text-neutral-950 dark:text-white leading-snug tracking-tight">
                {video.title}
              </h1>
              {isOngoingLive && (
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-400 font-semibold text-[11px] border border-red-500/30 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 dark:bg-red-500 inline-block animate-pulse" />
                  LIVE
                </span>
              )}
            </div>

            {/* Channel Info Row */}
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
              {video.channelAvatar ? (
                <img
                  src={video.channelAvatar}
                  alt={video.channel}
                  referrerPolicy="no-referrer"
                  className="w-5 h-5 rounded-full object-cover border border-neutral-200 dark:border-neutral-700 shrink-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-[10px] shrink-0">
                  {video.channel ? video.channel.charAt(0).toUpperCase() : 'Y'}
                </div>
              )}
              <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                {video.channel}
              </span>
              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400 shrink-0" />
              <span>•</span>
              <span>{publishedDate}</span>
              {isOngoingLive && (
                <>
                  <span>•</span>
                  <span className="font-medium text-red-600 dark:text-red-400">{viewsDisplay}</span>
                </>
              )}
            </div>

            {/* Action Buttons Row */}
            <div className="mt-4 flex items-center gap-2 flex-nowrap overflow-x-auto no-scrollbar py-0.5">
              <a
                href={video.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-medium text-xs shadow-2xs transition-all shrink-0 whitespace-nowrap"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Open on YouTube</span>
              </a>

              <button
                type="button"
                onClick={onSave}
                disabled={isSaving}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer shrink-0 whitespace-nowrap active:scale-[0.98] ${
                  isSaved
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400'
                    : 'border-neutral-200/90 dark:border-neutral-750 bg-white dark:bg-neutral-850 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                } ${isSaving ? 'opacity-70 cursor-wait' : ''}`}
                title={isSaved ? 'Remove from Bookmarked Summaries' : 'Save to Bookmarked Summaries (Firebase)'}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''} ${isSaving ? 'animate-spin' : ''}`} />
                <span>{isSaving ? 'Saving...' : isSaved ? 'Saved' : 'Save'}</span>
              </button>

              {/* Export Dropdown (PDF & Markdown) */}
              <div className="relative shrink-0">
                <button
                  type="button"
                  id="card-export-dropdown-btn"
                  onClick={() => {
                    setShowExportMenu(!showExportMenu);
                    setShowMoreMenu(false);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200/90 dark:border-neutral-750 bg-white dark:bg-neutral-850 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-xs font-medium transition-all cursor-pointer whitespace-nowrap active:scale-[0.98]"
                  title="Export summary to PDF or Markdown"
                >
                  <Download className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Export</span>
                  <ChevronDown className="w-3 h-3 text-neutral-400" />
                </button>

                {showExportMenu && (
                  <div className="absolute left-0 sm:right-0 sm:left-auto mt-2 w-56 rounded-xl bg-white dark:bg-[#0D1321] border border-neutral-200/80 dark:border-neutral-800 shadow-[0_8px_30px_rgba(0,0,0,0.08)] py-1.5 z-30 animate-in fade-in zoom-in-95 duration-150">
                    <button
                      type="button"
                      id="card-export-pdf-btn"
                      onClick={() => {
                        setShowExportMenu(false);
                        if (onExportPdf) onExportPdf();
                      }}
                      className="w-full px-3.5 py-2 text-left text-xs font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800/60 flex items-center gap-2.5 transition-colors cursor-pointer"
                    >
                      <div className="w-7 h-7 rounded-lg bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 border border-rose-200/60 dark:border-rose-900/60">
                        <FileText className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="font-semibold text-neutral-900 dark:text-white">Executive PDF</div>
                        <div className="text-[10px] text-neutral-500 dark:text-neutral-400">Download formatted .pdf report</div>
                      </div>
                    </button>
                    <button
                      type="button"
                      id="card-export-md-btn"
                      onClick={() => {
                        setShowExportMenu(false);
                        if (onExportMarkdown) onExportMarkdown();
                      }}
                      className="w-full px-3.5 py-2 text-left text-xs font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800/60 flex items-center gap-2.5 transition-colors cursor-pointer"
                    >
                      <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-200/60 dark:border-indigo-900/60">
                        <FileDown className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="font-semibold text-neutral-900 dark:text-white">Markdown Notes</div>
                        <div className="text-[10px] text-neutral-500 dark:text-neutral-400">Download clean .md document</div>
                      </div>
                    </button>
                    <div className="my-1 border-t border-neutral-100 dark:border-neutral-800" />
                    <button
                      type="button"
                      id="card-print-btn"
                      onClick={() => {
                        setShowExportMenu(false);
                        window.print();
                      }}
                      className="w-full px-3.5 py-1.5 text-left text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/60 flex items-center gap-2.5 transition-colors cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5 text-neutral-400 ml-1" />
                      <span className="ml-0.5">Print Briefing</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Executive Metric Bar (Language, Duration, Views, Likes) */}
      <div className="mt-5 pt-4 border-t border-neutral-100 dark:border-neutral-800/80">
        <div className="grid grid-cols-2 md:grid-cols-4 rounded-xl bg-neutral-50/70 dark:bg-neutral-900/40 border border-neutral-200/80 dark:border-neutral-800 divide-y md:divide-y-0 md:divide-x divide-neutral-200/70 dark:divide-neutral-800/80 overflow-hidden">
          {/* 1. Language */}
          <div className="px-4 py-2.5 sm:px-5 sm:py-3 flex items-center gap-3 hover:bg-neutral-100/50 dark:hover:bg-neutral-800/40 transition-colors">
            <div className="w-7 h-7 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 flex items-center justify-center shrink-0 border border-neutral-200/60 dark:border-neutral-700/60">
              <Globe className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <span className="block text-[10px] font-medium text-neutral-400 dark:text-neutral-500 tracking-wider uppercase">Language</span>
              <span className="block text-xs sm:text-sm font-semibold text-neutral-900 dark:text-neutral-100 truncate" title={formatLanguageName(video.language || language)}>
                {formatLanguageName(video.language || language)}
              </span>
            </div>
          </div>

          {/* 2. Duration */}
          <div className="px-4 py-2.5 sm:px-5 sm:py-3 flex items-center gap-3 hover:bg-neutral-100/50 dark:hover:bg-neutral-800/40 transition-colors">
            <div className="w-7 h-7 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 flex items-center justify-center shrink-0 border border-neutral-200/60 dark:border-neutral-700/60">
              <Clock className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <span className="block text-[10px] font-medium text-neutral-400 dark:text-neutral-500 tracking-wider uppercase">Duration</span>
              <span className="block text-xs sm:text-sm font-semibold font-mono text-neutral-900 dark:text-neutral-100 truncate" title={durationDisplay}>
                {durationDisplay}
              </span>
            </div>
          </div>

          {/* 3. Views */}
          <div className="px-4 py-2.5 sm:px-5 sm:py-3 flex items-center gap-3 hover:bg-neutral-100/50 dark:hover:bg-neutral-800/40 transition-colors">
            <div className="w-7 h-7 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 flex items-center justify-center shrink-0 border border-neutral-200/60 dark:border-neutral-700/60">
              <Eye className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <span className="block text-[10px] font-medium text-neutral-400 dark:text-neutral-500 tracking-wider uppercase">Views</span>
              <span className="block text-xs sm:text-sm font-semibold text-neutral-900 dark:text-neutral-100 truncate" title={cleanViews}>
                {cleanViews}
              </span>
            </div>
          </div>

          {/* 4. Likes */}
          <div className="px-4 py-2.5 sm:px-5 sm:py-3 flex items-center gap-3 hover:bg-neutral-100/50 dark:hover:bg-neutral-800/40 transition-colors">
            <div className="w-7 h-7 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 flex items-center justify-center shrink-0 border border-neutral-200/60 dark:border-neutral-700/60">
              <ThumbsUp className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <span className="block text-[10px] font-medium text-neutral-400 dark:text-neutral-500 tracking-wider uppercase">Likes</span>
              <span className="block text-xs sm:text-sm font-semibold text-neutral-900 dark:text-neutral-100 truncate" title={likesDisplay}>
                {likesDisplay}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
