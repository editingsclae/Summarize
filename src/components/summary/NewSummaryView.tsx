import React, { useState } from 'react';
import { 
  Sparkles, 
  Link2, 
  ArrowRight, 
  Play, 
  CheckCircle2, 
  Zap, 
  Clock, 
  Target, 
  ShieldCheck, 
  Loader2,
  Activity,
  Shield
} from 'lucide-react';
import { SAMPLE_VIDEOS, SampleVideo } from '../../services/sampleData';
import { SummaryLength, SummaryStyle, OutputLanguage } from '../../types/summary';

interface NewSummaryViewProps {
  onSummarize: (options: {
    url: string;
    length?: SummaryLength;
    style?: SummaryStyle;
    language?: OutputLanguage;
  }) => void;
  onSelectSample: (sample: SampleVideo) => void;
  onViewAllExamples?: () => void;
  isLoading?: boolean;
}

export const NewSummaryView: React.FC<NewSummaryViewProps> = ({
  onSummarize,
  onSelectSample,
  onViewAllExamples,
  isLoading = false
}) => {
  const [url, setUrl] = useState('');
  const [inputError, setInputError] = useState('');

  const featuredVideos = SAMPLE_VIDEOS.slice(0, 4);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      setInputError('Please enter a YouTube video URL');
      return;
    }
    setInputError('');
    onSummarize({
      url: url.trim(),
    });
  };

  // Channel details matching the reference image
  const exampleCardDetails = [
    {
      badgeLines: ['THE FUTURE', 'OF AI'],
      channelAvatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&h=120&q=80',
      channelInitial: 'K',
      channelBg: 'bg-blue-600',
      thumbnail: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
      title: 'The Future of AI',
      channel: 'Kurzgesagt – In a Nutshell',
      duration: '42:17',
      stats: '2.4M views • Sep 14, 2026'
    },
    {
      badgeLines: ['BUILD', 'A STARTUP'],
      channelAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
      channelInitial: 'A',
      channelBg: 'bg-indigo-600',
      thumbnail: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80',
      title: 'How to Build a Startup',
      channel: 'Ali Abdaal',
      duration: '18:32',
      stats: '1.2M views • Aug 10, 2026'
    },
    {
      badgeLines: ['CLEAN', 'ENERGY'],
      channelAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
      channelInitial: 'V',
      channelBg: 'bg-blue-500',
      thumbnail: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80',
      title: 'Clean Energy Explained',
      channel: 'Veritasium',
      duration: '28:16',
      stats: '3.8M views • Jul 22, 2026'
    },
    {
      badgeLines: ['THE PSYCHOLOGY', 'OF MONEY'],
      channelAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80',
      channelInitial: 'T',
      channelBg: 'bg-amber-600',
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      title: 'The Psychology of Money',
      channel: 'The School of Life',
      duration: '12:45',
      stats: '5.1M views • Jun 18, 2026'
    }
  ];

  return (
    <div className="w-full space-y-7 animate-fadeIn">
      {/* ------------------------------------------------------------- */}
      {/* 1. Hero Header with Playful Handwritten Arrow Note            */}
      {/* ------------------------------------------------------------- */}
      <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
        <div className="flex items-start gap-4">
          {/* Blue Rounded Video / Play Icon */}
          <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-2xl bg-[#2563EB] flex items-center justify-center text-white shadow-lg shadow-blue-500/25 shrink-0">
            <Play className="w-6 h-6 fill-white text-white translate-x-0.5" />
          </div>

          <div>
            <h1 className="text-2xl sm:text-[28px] font-bold text-neutral-900 dark:text-white tracking-tight font-display leading-tight">
              Create a New Video Summary
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1 max-w-xl leading-relaxed">
              Paste a YouTube URL and let AI analyze the video, extract key insights, and give you a comprehensive summary in seconds.
            </p>
          </div>
        </div>

        {/* Cursive Decorative Arrow Callout */}
        <div className="hidden lg:flex flex-col items-end shrink-0 pr-4 select-none">
          <span className="font-['Caveat',cursive] text-[20px] text-[#4F46E5] dark:text-indigo-400 font-bold tracking-wide transform -rotate-2 leading-tight">
            Turn any YouTube video<br />into valuable insights
          </span>
          <svg 
            className="w-14 h-12 text-[#6366F1] dark:text-indigo-400 -mt-1 mr-10 transform translate-x-3" 
            viewBox="0 0 55 45" 
            fill="none" 
            stroke="currentColor"
          >
            <path 
              d="M 40 2 Q 44 20 18 34" 
              strokeWidth="1.9" 
              strokeLinecap="round" 
              fill="none" 
            />
            <path 
              d="M 23 26 L 16 35 L 27 38" 
              strokeWidth="1.9" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              fill="none" 
            />
          </svg>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. Main Input Card with Badges                                */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white dark:bg-[#131B2E] rounded-3xl p-6 sm:p-7 border border-neutral-200/90 dark:border-neutral-800 shadow-xs">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label 
              htmlFor="youtube-url-input" 
              className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100 block mb-2"
            >
              YouTube URL
            </label>

            <div className="relative flex flex-col sm:flex-row items-stretch gap-2 sm:gap-0">
              <div className="relative flex-1">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none flex items-center">
                  <Link2 className="w-4 h-4" />
                </div>
                <input
                  id="youtube-url-input"
                  type="text"
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value);
                    if (inputError) setInputError('');
                  }}
                  placeholder="https://www.youtube.com/watch?v=example123"
                  disabled={isLoading}
                  className="w-full pl-11 pr-4 sm:pr-44 py-3.5 rounded-2xl bg-neutral-50/60 dark:bg-neutral-900/90 border border-neutral-200/90 dark:border-neutral-700/80 text-xs sm:text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-[#0D1321] transition-all"
                />
              </div>

              {/* Action Button */}
              <button
                type="submit"
                disabled={isLoading || !url.trim()}
                className="sm:absolute sm:right-1.5 sm:top-1.5 sm:bottom-1.5 px-5 sm:px-6 py-3 sm:py-0 rounded-xl bg-[#2563EB] hover:bg-blue-700 disabled:opacity-40 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm shadow-blue-600/20 transition-all cursor-pointer active:scale-98 shrink-0"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 fill-white" />
                    <span>Analyze Video</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>

            {inputError && (
              <p className="text-xs text-rose-500 font-medium mt-1.5 pl-1">
                {inputError}
              </p>
            )}
          </div>

          {/* 4 Feature Badges in Row */}
          <div className="pt-2 flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="bg-[#EFF6FF] dark:bg-blue-950/40 text-[#2563EB] dark:text-blue-300 border border-[#DBEAFE] dark:border-blue-900/50 rounded-xl px-3 py-1.5 text-xs font-medium flex items-center gap-2">
              <Play className="w-3 h-3 fill-[#2563EB] text-[#2563EB]" />
              <span>Works with or without captions</span>
            </div>

            <div className="bg-[#EFF6FF] dark:bg-blue-950/40 text-[#2563EB] dark:text-blue-300 border border-[#DBEAFE] dark:border-blue-900/50 rounded-xl px-3 py-1.5 text-xs font-medium flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>AI-powered transcription</span>
            </div>

            <div className="bg-[#EFF6FF] dark:bg-blue-950/40 text-[#2563EB] dark:text-blue-300 border border-[#DBEAFE] dark:border-blue-900/50 rounded-xl px-3 py-1.5 text-xs font-medium flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>Accurate & structured summaries</span>
            </div>

            <div className="bg-[#EFF6FF] dark:bg-blue-950/40 text-[#2563EB] dark:text-blue-300 border border-[#DBEAFE] dark:border-blue-900/50 rounded-xl px-3 py-1.5 text-xs font-medium flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>Supports long videos</span>
            </div>
          </div>
        </form>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. Try These Examples (4-Column Grid)                         */}
      {/* ------------------------------------------------------------- */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="text-[#2563EB]">
              <Sparkles className="w-4 h-4 fill-[#2563EB]" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white">
                Try These Examples
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Click on any example to get started quickly.
              </p>
            </div>
          </div>

          {onViewAllExamples && (
            <button
              type="button"
              onClick={onViewAllExamples}
              className="text-xs font-semibold text-[#2563EB] hover:text-blue-700 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>View all examples</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredVideos.map((vid, index) => {
            const details = exampleCardDetails[index % 4];

            return (
              <div
                key={vid.id}
                onClick={() => onSelectSample(vid)}
                className="group flex flex-col bg-white dark:bg-[#131B2E] rounded-2xl p-3 border border-neutral-200/80 dark:border-neutral-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all cursor-pointer shadow-xs hover:shadow-md"
              >
                {/* 16:9 Thumbnail with Overlay Banner & Duration */}
                <div className="w-full aspect-video rounded-xl overflow-hidden bg-neutral-900 relative">
                  <img
                    src={details.thumbnail}
                    alt={details.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Subtle dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/35 flex flex-col justify-between p-2.5">
                    {/* Bold headline typography in 2 lines */}
                    <div className="mt-1">
                      <div className="text-left font-black tracking-wider text-white uppercase drop-shadow-md text-[13px] leading-tight">
                        {details.badgeLines[0]}
                        <br />
                        {details.badgeLines[1]}
                      </div>
                    </div>

                    {/* Bottom Row: Play Hover Icon & Duration Badge */}
                    <div className="flex items-center justify-between mt-auto">
                      <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-3 h-3 fill-white text-white translate-x-0.2" />
                      </div>
                      <span className="px-1.5 py-0.5 rounded bg-black/85 text-[10px] font-mono font-bold text-white ml-auto">
                        {details.duration}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="mt-3 flex flex-col flex-1">
                  <h3 className="text-[13px] font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-1 transition-colors">
                    {details.title}
                  </h3>

                  {/* Channel with Verified Badge */}
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <img
                      src={details.channelAvatar}
                      alt={details.channel}
                      className="w-4 h-4 rounded-full object-cover shrink-0 border border-neutral-300 dark:border-neutral-700"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <span className="text-[11px] font-medium text-neutral-600 dark:text-neutral-400 truncate">
                      {details.channel}
                    </span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB] fill-[#2563EB] text-white shrink-0" />
                  </div>

                  {/* Views & Date */}
                  <p className="text-[10px] text-neutral-400 dark:text-neutral-500 mt-1">
                    {details.stats}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 4. Bottom Value Proposition 4-Column Banner                   */}
      {/* ------------------------------------------------------------- */}
      <div className="p-5 rounded-2xl bg-blue-50/40 dark:bg-[#101726] border border-blue-100/70 dark:border-neutral-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {/* 1: AI-Powered */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-100/70 dark:bg-blue-950/60 text-[#2563EB] dark:text-blue-400 flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4 fill-[#2563EB] text-[#2563EB]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-neutral-900 dark:text-white">
                AI-Powered
              </h4>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 leading-relaxed">
                Get intelligent, structured summaries with Google Gemini.
              </p>
            </div>
          </div>

          {/* 2: Save Time */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-100/70 dark:bg-blue-950/60 text-[#2563EB] dark:text-blue-400 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4 text-[#2563EB]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-neutral-900 dark:text-white">
                Save Time
              </h4>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 leading-relaxed">
                Understand key points in seconds, not hours.
              </p>
            </div>
          </div>

          {/* 3: Stay Informed */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-100/70 dark:bg-blue-950/60 text-[#2563EB] dark:text-blue-400 flex items-center justify-center shrink-0">
              <Target className="w-4 h-4 text-[#2563EB]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-neutral-900 dark:text-white">
                Stay Informed
              </h4>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 leading-relaxed">
                Extract facts, insights, quotes and actionable items.
              </p>
            </div>
          </div>

          {/* 4: Secure & Private */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-100/70 dark:bg-blue-950/60 text-[#2563EB] dark:text-blue-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-neutral-900 dark:text-white">
                Secure & Private
              </h4>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 leading-relaxed">
                Your data is safe and never shared.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
