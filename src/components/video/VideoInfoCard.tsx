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
    <div className="bg-white dark:bg-[#131B2E] rounded-3xl border border-neutral-200/80 dark:border-neutral-800/80 p-5 sm:p-6 shadow-xs transition-colors">
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left: Thumbnail with Play Button Overlay & Duration */}
        <div className="w-full lg:w-[320px] xl:w-[360px] shrink-0 aspect-video rounded-2xl overflow-hidden bg-neutral-900 relative group shadow-sm border border-neutral-200/60 dark:border-neutral-800">
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
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
                }}
              />
              {/* Play Button Overlay */}
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-all group-hover:bg-black/40">
                <button
                  type="button"
                  onClick={() => setIsPlayingInline(true)}
                  className="w-14 h-14 rounded-full bg-white/95 dark:bg-white text-indigo-600 flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all cursor-pointer group-hover:shadow-indigo-500/30"
                  title="Play video"
                >
                  <Play className="w-6 h-6 ml-1 fill-indigo-600 text-indigo-600" />
                </button>
              </div>
              {/* Duration or Live Tag */}
              {isOngoingLive ? (
                <span className="absolute bottom-3 right-3 px-2.5 py-0.5 rounded-md bg-red-600 text-white text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  LIVE
                </span>
              ) : durationDisplay && durationDisplay !== 'Unavailable' ? (
                <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-xs text-white text-xs font-mono font-medium tracking-tight">
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
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white leading-tight tracking-tight">
                {video.title}
              </h1>
              {isOngoingLive && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-400 font-bold text-xs border border-red-500/30 shrink-0">
                  <span className="w-2 h-2 rounded-full bg-red-600 dark:bg-red-500 inline-block animate-pulse" />
                  LIVE STREAM
                </span>
              )}
            </div>

            {/* Channel Info Row */}
            <div className="mt-3 flex flex-wrap items-center gap-2.5 text-xs text-neutral-500 dark:text-neutral-400">
              {video.channelAvatar ? (
                <img
                  src={video.channelAvatar}
                  alt={video.channel}
                  referrerPolicy="no-referrer"
                  className="w-6 h-6 rounded-full object-cover border border-neutral-200 dark:border-neutral-700 shadow-2xs shrink-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-[11px] shrink-0 shadow-2xs">
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
                  <span className="font-semibold text-red-600 dark:text-red-400">{viewsDisplay}</span>
                </>
              )}
            </div>

            {/* Action Buttons Row - Guaranteed single line next to each other */}
            <div className="mt-5 flex items-center gap-2 sm:gap-2.5 flex-nowrap overflow-x-auto no-scrollbar py-0.5">
              <a
                href={video.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white font-medium text-xs sm:text-sm shadow-sm transition-all shrink-0 whitespace-nowrap"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Open on YouTube</span>
              </a>

              <button
                type="button"
                onClick={onSave}
                disabled={isSaving}
                className={`inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer shrink-0 whitespace-nowrap ${
                  isSaved
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400'
                    : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-750'
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
                  className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-750 text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap"
                  title="Export summary to PDF or Markdown"
                >
                  <Download className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Export</span>
                  <ChevronDown className="w-3 h-3 text-neutral-400" />
                </button>

                {showExportMenu && (
                  <div className="absolute left-0 sm:right-0 sm:left-auto mt-2 w-56 rounded-2xl bg-white dark:bg-[#131B2E] border border-neutral-200 dark:border-neutral-700 shadow-2xl py-1.5 z-30 animate-in fade-in zoom-in-95 duration-150">
                    <button
                      type="button"
                      id="card-export-pdf-btn"
                      onClick={() => {
                        setShowExportMenu(false);
                        if (onExportPdf) onExportPdf();
                      }}
                      className="w-full px-3.5 py-2.5 text-left text-xs font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800/80 flex items-center gap-2.5 transition-colors cursor-pointer"
                    >
                      <div className="w-7 h-7 rounded-lg bg-rose-500/10 text-rose-500 dark:text-rose-400 flex items-center justify-center shrink-0 border border-rose-500/20">
                        <FileText className="w-4 h-4" />
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
                      className="w-full px-3.5 py-2.5 text-left text-xs font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800/80 flex items-center gap-2.5 transition-colors cursor-pointer"
                    >
                      <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-500/20">
                        <FileDown className="w-4 h-4" />
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
                      className="w-full px-3.5 py-2 text-left text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/80 flex items-center gap-2.5 transition-colors cursor-pointer"
                    >
                      <Printer className="w-4 h-4 text-neutral-400 ml-1" />
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
      <div className="mt-6 pt-5 border-t border-neutral-100 dark:border-neutral-800/80">
        <div className="grid grid-cols-2 md:grid-cols-4 rounded-2xl bg-neutral-50/60 dark:bg-neutral-900/30 border border-neutral-200/80 dark:border-neutral-800/80 divide-y md:divide-y-0 md:divide-x divide-neutral-200/70 dark:divide-neutral-800/80 overflow-hidden">
          {/* 1. Language */}
          <div className="px-4 py-3 sm:px-5 sm:py-3.5 flex items-center gap-3 hover:bg-neutral-100/50 dark:hover:bg-neutral-800/40 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 flex items-center justify-center shrink-0 border border-neutral-200/60 dark:border-neutral-700/60">
              <Globe className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="block text-[10px] font-semibold text-neutral-400 dark:text-neutral-500 tracking-wider uppercase">Language</span>
              <span className="block text-xs sm:text-sm font-semibold text-neutral-900 dark:text-neutral-100 truncate" title={formatLanguageName(video.language || language)}>
                {formatLanguageName(video.language || language)}
              </span>
            </div>
          </div>

          {/* 2. Duration */}
          <div className="px-4 py-3 sm:px-5 sm:py-3.5 flex items-center gap-3 hover:bg-neutral-100/50 dark:hover:bg-neutral-800/40 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 flex items-center justify-center shrink-0 border border-neutral-200/60 dark:border-neutral-700/60">
              <Clock className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="block text-[10px] font-semibold text-neutral-400 dark:text-neutral-500 tracking-wider uppercase">Duration</span>
              <span className="block text-xs sm:text-sm font-semibold font-mono text-neutral-900 dark:text-neutral-100 truncate" title={durationDisplay}>
                {durationDisplay}
              </span>
            </div>
          </div>

          {/* 3. Views */}
          <div className="px-4 py-3 sm:px-5 sm:py-3.5 flex items-center gap-3 hover:bg-neutral-100/50 dark:hover:bg-neutral-800/40 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 flex items-center justify-center shrink-0 border border-neutral-200/60 dark:border-neutral-700/60">
              <Eye className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="block text-[10px] font-semibold text-neutral-400 dark:text-neutral-500 tracking-wider uppercase">Views</span>
              <span className="block text-xs sm:text-sm font-semibold text-neutral-900 dark:text-neutral-100 truncate" title={cleanViews}>
                {cleanViews}
              </span>
            </div>
          </div>

          {/* 4. Likes */}
          <div className="px-4 py-3 sm:px-5 sm:py-3.5 flex items-center gap-3 hover:bg-neutral-100/50 dark:hover:bg-neutral-800/40 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 flex items-center justify-center shrink-0 border border-neutral-200/60 dark:border-neutral-700/60">
              <ThumbsUp className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="block text-[10px] font-semibold text-neutral-400 dark:text-neutral-500 tracking-wider uppercase">Likes</span>
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
