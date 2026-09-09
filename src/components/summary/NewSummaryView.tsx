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
  SlidersHorizontal,
  Loader2,
  FileText,
  Languages,
  Activity,
  Shield,
  Video
} from 'lucide-react';
import { SAMPLE_VIDEOS, SampleVideo } from '../../services/sampleData';
import { SummaryLength, SummaryStyle, OutputLanguage } from '../../types/summary';

interface NewSummaryViewProps {
  onSummarize: (options: {
    url: string;
    length: SummaryLength;
    style: SummaryStyle;
    language: OutputLanguage;
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
  const [length, setLength] = useState<SummaryLength>('detailed');
  const [style, setStyle] = useState<SummaryStyle>('bullet-points');
  const [language, setLanguage] = useState<OutputLanguage>('en');
  const [showOptions, setShowOptions] = useState(false);
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
      length,
      style,
      language
    });
  };

  return (
    <div className="w-full space-y-8 animate-fadeIn">
      {/* ------------------------------------------------------------- */}
      {/* 1. Hero Header with Playful Handwritten Arrow Note            */}
      {/* ------------------------------------------------------------- */}
      <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
        <div className="flex items-start gap-4">
          {/* Blue Rounded Video Icon */}
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 shrink-0">
            <Video className="w-6 h-6 fill-white/20" />
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white tracking-tight font-display">
              Create a New Video Summary
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1 max-w-xl leading-relaxed">
              Paste a YouTube URL and let AI analyze the video, extract key insights, and give you a comprehensive summary in seconds.
            </p>
          </div>
        </div>

        {/* Cursive Decorative Arrow Callout (Hidden on very small screens) */}
        <div className="hidden lg:flex flex-col items-end shrink-0 pr-4">
          <span className="font-serif italic font-medium text-indigo-500 dark:text-indigo-400 text-sm tracking-wide transform -rotate-2 select-none">
            Turn any YouTube video<br />into valuable insights
          </span>
          <svg 
            className="w-12 h-10 text-indigo-400 dark:text-indigo-400 -mt-1 mr-6" 
            viewBox="0 0 50 40" 
            fill="none" 
            stroke="currentColor"
          >
            <path 
              d="M 35 2 Q 40 18 18 30" 
              strokeWidth="1.8" 
              strokeLinecap="round" 
              fill="none" 
            />
            <path 
              d="M 23 23 L 17 31 L 27 34" 
              strokeWidth="1.8" 
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
            <div className="flex items-center justify-between mb-2">
              <label 
                htmlFor="youtube-url-input" 
                className="text-xs sm:text-sm font-bold text-neutral-800 dark:text-neutral-200 block"
              >
                YouTube URL
              </label>
              
              <button
                type="button"
                onClick={() => setShowOptions(!showOptions)}
                className="text-xs font-semibold text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>{showOptions ? 'Hide Options' : 'Custom Options'}</span>
              </button>
            </div>

            <div className="relative flex flex-col sm:flex-row items-stretch gap-2 sm:gap-0">
              <div className="relative flex-1">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none flex items-center">
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
                  className="w-full pl-10 pr-4 sm:pr-40 py-3.5 rounded-2xl sm:rounded-r-2xl bg-neutral-50 dark:bg-neutral-900/90 border border-neutral-200/90 dark:border-neutral-700/80 text-xs sm:text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-[#0D1321] transition-all"
                />
              </div>

              {/* Action Button */}
              <button
                type="submit"
                disabled={isLoading || !url.trim()}
                className="sm:absolute sm:right-1.5 sm:top-1.5 sm:bottom-1.5 px-5 sm:px-6 py-3 sm:py-0 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-40 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-600/25 transition-all cursor-pointer active:scale-98"
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

          {/* Expandable Advanced Options */}
          {showOptions && (
            <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Length */}
              <div>
                <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">
                  Length
                </label>
                <select
                  value={length}
                  onChange={(e) => setLength(e.target.value as SummaryLength)}
                  className="w-full text-xs py-2 px-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 focus:outline-none"
                >
                  <option value="quick">Quick (1-2 min read)</option>
                  <option value="detailed">Detailed (Comprehensive)</option>
                  <option value="deep-dive">Deep Dive (In-depth)</option>
                </select>
              </div>

              {/* Style */}
              <div>
                <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">
                  Style
                </label>
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value as SummaryStyle)}
                  className="w-full text-xs py-2 px-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 focus:outline-none"
                >
                  <option value="bullet-points">Bullet Points & Highlights</option>
                  <option value="executive">Executive Summary</option>
                  <option value="action-oriented">Action-Oriented Checklist</option>
                  <option value="educational">Educational Breakdown</option>
                </select>
              </div>

              {/* Language */}
              <div>
                <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">
                  Language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as OutputLanguage)}
                  className="w-full text-xs py-2 px-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 focus:outline-none"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish (Español)</option>
                  <option value="fr">French (Français)</option>
                  <option value="de">German (Deutsch)</option>
                  <option value="ar">Arabic (العربية)</option>
                </select>
              </div>
            </div>
          )}

          {/* 4 Feature Badges in Row */}
          <div className="pt-2 flex flex-wrap items-center gap-2 sm:gap-2.5">
            <div className="bg-blue-50/80 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-900/50 rounded-xl px-3 py-1.5 text-xs font-medium flex items-center gap-1.5">
              <Play className="w-3 h-3 fill-blue-600 text-blue-600" />
              <span>Works with or without captions</span>
            </div>

            <div className="bg-blue-50/80 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-900/50 rounded-xl px-3 py-1.5 text-xs font-medium flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-blue-600" />
              <span>AI-powered transcription</span>
            </div>

            <div className="bg-blue-50/80 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-900/50 rounded-xl px-3 py-1.5 text-xs font-medium flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-blue-600" />
              <span>Accurate & structured summaries</span>
            </div>

            <div className="bg-blue-50/80 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-900/50 rounded-xl px-3 py-1.5 text-xs font-medium flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
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
          <div className="flex items-center gap-2">
            <div className="text-blue-600 dark:text-blue-400">
              <Sparkles className="w-4 h-4 fill-blue-600" />
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
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>View all examples</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredVideos.map((vid, index) => {
            const badgeTexts = [
              'THE FUTURE OF AI',
              'BUILD A STARTUP',
              'CLEAN ENERGY',
              'THE PSYCHOLOGY OF MONEY'
            ];
            const viewsCount = [
              '2.4M views • Sep 14, 2026',
              '1.2M views • Aug 10, 2026',
              '3.8M views • Jul 22, 2026',
              '5.1M views • Jun 18, 2026'
            ];
            const channelNames = [
              'Kurzgesagt – In a Nutshell',
              'Ali Abdaal',
              'Veritasium',
              'The School of Life'
            ];
            const durations = ['42:17', '18:32', '28:16', '12:45'];

            const bannerText = vid.badgeText || badgeTexts[index % 4];
            const displayViews = vid.views ? `${vid.views} • ${vid.publishedAt}` : viewsCount[index % 4];
            const displayChannel = vid.channel || channelNames[index % 4];
            const displayDuration = vid.duration || durations[index % 4];

            return (
              <div
                key={vid.id}
                onClick={() => onSelectSample(vid)}
                className="group flex flex-col bg-white dark:bg-[#131B2E] rounded-2xl p-3 border border-neutral-200/80 dark:border-neutral-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all cursor-pointer shadow-xs hover:shadow-md"
              >
                {/* 16:9 Thumbnail with Overlay Banner & Duration */}
                <div className="w-full aspect-video rounded-xl overflow-hidden bg-neutral-900 relative">
                  <img
                    src={vid.thumbnail}
                    alt={vid.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/30 flex flex-col justify-between p-2.5">
                    {/* Centered / Banner text */}
                    <div className="mt-auto mb-auto text-center">
                      <span className="text-[11px] font-black tracking-wider text-white uppercase drop-shadow-md">
                        {bannerText}
                      </span>
                    </div>

                    {/* Bottom Duration Badge */}
                    <div className="flex items-center justify-between">
                      <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-3 h-3 fill-white text-white translate-x-0.2" />
                      </div>
                      <span className="px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-mono font-bold text-white ml-auto">
                        {displayDuration}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="mt-3 flex flex-col flex-1">
                  <h3 className="text-xs font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-1 transition-colors">
                    {vid.title}
                  </h3>

                  {/* Channel with Verified Badge */}
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white text-[8px] font-bold flex items-center justify-center shrink-0">
                      {displayChannel.charAt(0)}
                    </div>
                    <span className="text-[11px] font-medium text-neutral-600 dark:text-neutral-400 truncate">
                      {displayChannel}
                    </span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-blue-500/20 shrink-0" />
                  </div>

                  {/* Views & Date */}
                  <p className="text-[10px] text-neutral-400 dark:text-neutral-500 mt-1">
                    {displayViews}
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
      <div className="p-5 rounded-2xl bg-blue-50/50 dark:bg-[#101726] border border-blue-100/80 dark:border-neutral-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {/* 1: AI-Powered */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-100/80 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4 fill-blue-600 text-blue-600" />
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
            <div className="w-8 h-8 rounded-xl bg-blue-100/80 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4 text-blue-600" />
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
            <div className="w-8 h-8 rounded-xl bg-blue-100/80 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <Target className="w-4 h-4 text-blue-600" />
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
            <div className="w-8 h-8 rounded-xl bg-blue-100/80 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
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
