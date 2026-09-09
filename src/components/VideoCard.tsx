import React, { useState } from 'react';
import { ExternalLink, Play, Clock, User, Calendar, X } from 'lucide-react';
import { VideoMetadata } from '../types/video';

interface VideoCardProps {
  video: VideoMetadata;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const [isPlayingInline, setIsPlayingInline] = useState(false);

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 p-4 sm:p-5 shadow-sm">
      <div className="flex flex-col sm:flex-row gap-4 items-start">
        {/* Thumbnail or Inline Player */}
        <div className="w-full sm:w-56 shrink-0 aspect-video rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 relative group border border-neutral-200 dark:border-neutral-700/60 shadow-xs">
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
                className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 text-white hover:bg-black transition-colors"
                title="Close embedded player"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <>
              <img
                src={video.thumbnail}
                alt={video.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  // fallback to standard YouTube thumbnail if maxres is missing
                  (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
                }}
              />
              <div className="absolute inset-0 bg-black/25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={() => setIsPlayingInline(true)}
                  className="w-11 h-11 rounded-full bg-white/90 text-neutral-900 flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                  title="Play video inline"
                >
                  <Play className="w-5 h-5 ml-0.5 fill-current" />
                </button>
              </div>
              {video.isLive || video.duration === 'LIVE' ? (
                <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-bold tracking-wider uppercase flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  LIVE
                </span>
              ) : video.duration ? (
                <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-white text-[11px] font-mono tracking-tight">
                  {video.duration}
                </span>
              ) : null}
            </>
          )}
        </div>

        {/* Video Metadata Info */}
        <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch">
          <div>
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100 leading-snug tracking-tight">
                {video.title}
              </h2>
              <a
                href={video.url}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 p-1.5 rounded-lg text-neutral-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                title="Open on YouTube"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-y-1.5 gap-x-4 text-xs text-neutral-500 dark:text-neutral-400">
              <span className="flex items-center gap-1.5 font-medium text-neutral-700 dark:text-neutral-300">
                {video.channelAvatar ? (
                  <img
                    src={video.channelAvatar}
                    alt={video.channel}
                    referrerPolicy="no-referrer"
                    className="w-4 h-4 rounded-full object-cover border border-neutral-200 dark:border-neutral-700"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <User className="w-3.5 h-3.5 text-neutral-400" />
                )}
                {video.channel}
              </span>

              {video.isLive || video.duration === 'LIVE' ? (
                <span className="flex items-center gap-1.5 font-bold text-red-600 dark:text-red-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 dark:bg-red-400 animate-pulse" />
                  LIVE
                </span>
              ) : video.duration ? (
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-neutral-400" />
                  {video.duration}
                </span>
              ) : null}

              {video.publishedAt && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                  {video.publishedAt}
                </span>
              )}
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-xs">
            <span className="text-neutral-500 dark:text-neutral-400">
              Source: <span className="font-mono text-neutral-700 dark:text-neutral-300">youtube.com/watch?v={video.id}</span>
            </span>

            {!isPlayingInline && (
              <button
                type="button"
                onClick={() => setIsPlayingInline(true)}
                className="inline-flex items-center gap-1 font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                Watch alongside summary
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
