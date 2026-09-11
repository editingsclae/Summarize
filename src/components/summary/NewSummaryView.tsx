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
  Shield,
  FileText,
  Check,
  SlidersHorizontal,
  ChevronDown,
  Globe
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
  const [showOptions, setShowOptions] = useState(false);
  const [length, setLength] = useState<SummaryLength>('detailed');
  const [style, setStyle] = useState<SummaryStyle>('professional');
  const [language, setLanguage] = useState<OutputLanguage>('auto');

  const featuredVideos = SAMPLE_VIDEOS.slice(0, 4);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      setInputError('Please enter a valid YouTube video URL');
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

  // Channel details matching curated examples
  const exampleCardDetails = [
    {
      badgeLines: ['THE FUTURE', 'OF AI'],
      channelAvatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&h=120&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
      title: 'The Future of AI',
      channel: 'Kurzgesagt – In a Nutshell',
      duration: '42:17',
      stats: '2.4M views • Sep 14, 2026'
    },
    {
      badgeLines: ['BUILD', 'A STARTUP'],
      channelAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80',
      title: 'How to Build a Startup',
      channel: 'Ali Abdaal',
      duration: '18:32',
      stats: '1.2M views • Aug 10, 2026'
    },
    {
      badgeLines: ['CLEAN', 'ENERGY'],
      channelAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80',
      title: 'Clean Energy Explained',
      channel: 'Veritasium',
      duration: '28:16',
      stats: '3.8M views • Jul 22, 2026'
    },
    {
      badgeLines: ['THE PSYCHOLOGY', 'OF MONEY'],
      channelAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      title: 'The Psychology of Money',
      channel: 'The School of Life',
      duration: '12:45',
      stats: '5.1M views • Jun 18, 2026'
    }
  ];

  return (
    <div className="w-full space-y-6">
      {/* ------------------------------------------------------------- */}
      {/* 1. Header Section (Sleek, Linear-style)                       */}
      {/* ------------------------------------------------------------- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-200/60 dark:border-indigo-900/50 shrink-0 shadow-2xs">
            <Play className="w-4 h-4 fill-current ml-0.5" />
          </div>

          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white tracking-tight leading-tight">
              Create a New Video Summary
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5 leading-relaxed">
              Paste any YouTube video URL to generate instant executive briefings, chapters, and key takeaways.
            </p>
          </div>
        </div>

        {/* Minimalist Live Service Status Badge */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-[#0D1321] border border-neutral-200/80 dark:border-neutral-800 text-xs font-medium text-neutral-600 dark:text-neutral-400 shadow-2xs shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Gemini 3.8 Engine Ready</span>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. Main Input Card with Filters & Preferences                 */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white dark:bg-[#0D1321] rounded-2xl p-5 sm:p-6 border border-neutral-200/80 dark:border-neutral-800 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label 
                htmlFor="youtube-url-input" 
                className="text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400"
              >
                YouTube Video URL
              </label>

              {/* Filter / Preferences Toggle */}
              <button
                type="button"
                id="toggle-summary-options-btn"
                onClick={() => setShowOptions(!showOptions)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer border ${
                  showOptions
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-900/60 font-semibold'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white bg-neutral-50 dark:bg-neutral-900/60 border-neutral-200/80 dark:border-neutral-800'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                <span>Filters &amp; Preferences</span>
                <span className="hidden sm:inline text-[11px] text-neutral-400 dark:text-neutral-500 font-mono">
                  ({length} • {style})
                </span>
                <ChevronDown className={`w-3 h-3 text-neutral-400 transition-transform duration-200 ${showOptions ? 'rotate-180' : ''}`} />
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
                  className="w-full pl-10 pr-4 sm:pr-40 py-3 rounded-xl bg-neutral-50/70 dark:bg-neutral-900/60 border border-neutral-200/90 dark:border-neutral-700/80 text-xs sm:text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white dark:focus:bg-[#0D1321] transition-all shadow-2xs"
                />
              </div>

              {/* Action Button */}
              <button
                type="submit"
                disabled={isLoading || !url.trim()}
                className="sm:absolute sm:right-1.5 sm:top-1.5 sm:bottom-1.5 px-5 py-2.5 sm:py-0 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-2xs transition-all cursor-pointer active:scale-[0.98] shrink-0"
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
              <p className="text-xs text-rose-600 dark:text-rose-400 font-medium mt-1.5 pl-1">
                {inputError}
              </p>
            )}
          </div>

          {/* Collapsible Filter / Preferences Drawer */}
          {showOptions && (
            <div className="p-4 rounded-xl bg-neutral-50/80 dark:bg-neutral-900/40 border border-neutral-200/80 dark:border-neutral-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs animate-in fade-in duration-150">
              {/* 1. Length */}
              <div>
                <label className="font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                  <span>Summary Length</span>
                </label>
                <div className="grid grid-cols-2 gap-1 bg-white dark:bg-[#0D1321] p-1 rounded-lg border border-neutral-200/80 dark:border-neutral-800">
                  {(['quick', 'standard', 'detailed', 'comprehensive'] as SummaryLength[]).map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => setLength(l)}
                      className={`px-2 py-1 rounded-md text-center capitalize transition-colors text-xs font-medium cursor-pointer ${
                        length === l
                          ? 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 font-semibold shadow-2xs border border-indigo-200/60 dark:border-indigo-900/50'
                          : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white border border-transparent'
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Style / Tone */}
              <div>
                <label className="font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                  <span>Tone &amp; Style</span>
                </label>
                <div className="grid grid-cols-2 gap-1 bg-white dark:bg-[#0D1321] p-1 rounded-lg border border-neutral-200/80 dark:border-neutral-800">
                  {(['professional', 'educational', 'technical', 'simple'] as SummaryStyle[]).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setStyle(s)}
                      className={`px-2 py-1 rounded-md text-center capitalize transition-colors text-xs font-medium cursor-pointer ${
                        style === s
                          ? 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 font-semibold shadow-2xs border border-indigo-200/60 dark:border-indigo-900/50'
                          : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white border border-transparent'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Output Language */}
              <div>
                <label className="font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                  <span>Output Language</span>
                </label>
                <select
                  id="summary-output-language-select"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as OutputLanguage)}
                  className="w-full px-3 py-2 rounded-lg bg-white dark:bg-[#0D1321] border border-neutral-200/80 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer shadow-2xs"
                >
                  <option value="auto">Auto-detect (Same as video)</option>
                  <option value="en">English (US / UK)</option>
                  <option value="ar">Arabic (العربية)</option>
                  <option value="es">Spanish (Español)</option>
                  <option value="fr">French (Français)</option>
                  <option value="de">German (Deutsch)</option>
                  <option value="it">Italian (Italiano)</option>
                </select>
                <p className="text-[10px] text-neutral-400 mt-1 pl-0.5">
                  AI translates takeaways and executive briefings automatically.
                </p>
              </div>
            </div>
          )}

          {/* 4 Clean Feature Badges in Row */}
          <div className="pt-2 flex flex-wrap items-center gap-2">
            <div className="bg-neutral-50 dark:bg-neutral-900/50 text-neutral-600 dark:text-neutral-300 border border-neutral-200/80 dark:border-neutral-800 rounded-lg px-2.5 py-1 text-xs font-medium flex items-center gap-1.5">
              <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              <span>Works with or without captions</span>
            </div>

            <div className="bg-neutral-50 dark:bg-neutral-900/50 text-neutral-600 dark:text-neutral-300 border border-neutral-200/80 dark:border-neutral-800 rounded-lg px-2.5 py-1 text-xs font-medium flex items-center gap-1.5">
              <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              <span>AI speech-to-text fallback</span>
            </div>

            <div className="bg-neutral-50 dark:bg-neutral-900/50 text-neutral-600 dark:text-neutral-300 border border-neutral-200/80 dark:border-neutral-800 rounded-lg px-2.5 py-1 text-xs font-medium flex items-center gap-1.5">
              <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              <span>Structured executive insights</span>
            </div>

            <div className="bg-neutral-50 dark:bg-neutral-900/50 text-neutral-600 dark:text-neutral-300 border border-neutral-200/80 dark:border-neutral-800 rounded-lg px-2.5 py-1 text-xs font-medium flex items-center gap-1.5">
              <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              <span>Supports long lectures &amp; podcasts</span>
            </div>
          </div>
        </form>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. Try These Examples (4-Column Grid)                         */}
      {/* ------------------------------------------------------------- */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white tracking-tight">
              Try These Examples
            </h2>
          </div>

          {onViewAllExamples && (
            <button
              type="button"
              onClick={onViewAllExamples}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1 transition-colors cursor-pointer"
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
                className="group flex flex-col bg-white dark:bg-[#0D1321] rounded-xl p-3 border border-neutral-200/80 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-150 cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
              >
                {/* 16:9 Thumbnail with Overlay Banner & Duration */}
                <div className="w-full aspect-video rounded-lg overflow-hidden bg-neutral-900 relative">
                  <img
                    src={details.thumbnail}
                    alt={details.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300 ease-out"
                    loading="lazy"
                  />
                  
                  {/* Subtle dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/35 flex flex-col justify-between p-2.5">
                    {/* Bold headline typography in 2 lines */}
                    <div className="mt-0.5">
                      <div className="text-left font-extrabold tracking-wider text-white uppercase text-[12px] leading-tight drop-shadow-sm">
                        {details.badgeLines[0]}
                        <br />
                        {details.badgeLines[1]}
                      </div>
                    </div>

                    {/* Bottom Row: Play Hover Icon & Duration Badge */}
                    <div className="flex items-center justify-between mt-auto">
                      <div className="w-6 h-6 rounded-full bg-white/25 backdrop-blur-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-3 h-3 fill-white text-white translate-x-0.2" />
                      </div>
                      <span className="px-1.5 py-0.5 rounded bg-black/80 backdrop-blur-xs text-[10px] font-mono font-medium text-white ml-auto">
                        {details.duration}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="mt-2.5 flex flex-col flex-1">
                  <h3 className="text-[13px] font-bold text-neutral-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 line-clamp-1 transition-colors">
                    {details.title}
                  </h3>

                  {/* Channel with Verified Badge */}
                  <div className="flex items-center gap-1.5 mt-1">
                    <img
                      src={details.channelAvatar}
                      alt={details.channel}
                      className="w-4 h-4 rounded-full object-cover shrink-0 border border-neutral-200 dark:border-neutral-700"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <span className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400 truncate">
                      {details.channel}
                    </span>
                    <CheckCircle2 className="w-3 h-3 text-indigo-500 fill-indigo-100 dark:fill-indigo-950 shrink-0" />
                  </div>

                  {/* Views & Date */}
                  <p className="text-[10px] text-neutral-400 dark:text-neutral-500 font-mono mt-1">
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
      <div className="p-5 rounded-2xl bg-white dark:bg-[#0D1321] border border-neutral-200/80 dark:border-neutral-800 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* 1: AI-Powered */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-200/60 dark:border-indigo-900/50">
              <Zap className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-neutral-900 dark:text-white">
                AI-Powered Briefings
              </h4>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 leading-relaxed">
                Structured summaries powered by Google Gemini 3.8.
              </p>
            </div>
          </div>

          {/* 2: Save Time */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-200/60 dark:border-indigo-900/50">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-neutral-900 dark:text-white">
                Save 85% Reading Time
              </h4>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 leading-relaxed">
                Grasp core theses, data and action items in 2 minutes.
              </p>
            </div>
          </div>

          {/* 3: Stay Informed */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-200/60 dark:border-indigo-900/50">
              <Target className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-neutral-900 dark:text-white">
                Extracted Intelligence
              </h4>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 leading-relaxed">
                Automatic facts, quotes, concepts, and pros &amp; cons.
              </p>
            </div>
          </div>

          {/* 4: Secure & Private */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-200/60 dark:border-indigo-900/50">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-neutral-900 dark:text-white">
                Secure &amp; Cloud Synced
              </h4>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 leading-relaxed">
                Export to PDF, Markdown, or save to personal cloud.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
