import React, { useState } from 'react';
import { Youtube, ArrowRight, SlidersHorizontal, Sparkles, Clipboard, X, Globe, FileText, Check } from 'lucide-react';
import { SummaryLength, SummaryStyle, OutputLanguage } from '../types/summary';
import { isValidYouTubeUrl } from '../utils/youtube';
import { SAMPLE_VIDEOS } from '../services/sampleData';

interface VideoInputProps {
  onSummarize: (options: {
    url: string;
    length: SummaryLength;
    style: SummaryStyle;
    language: OutputLanguage;
  }) => void;
  isLoading: boolean;
  initialUrl?: string;
}

export const VideoInput: React.FC<VideoInputProps> = ({
  onSummarize,
  isLoading,
  initialUrl = '',
}) => {
  const [url, setUrl] = useState(initialUrl);
  const [showOptions, setShowOptions] = useState(false);
  const [length, setLength] = useState<SummaryLength>('detailed');
  const [style, setStyle] = useState<SummaryStyle>('professional');
  const [language, setLanguage] = useState<OutputLanguage>('auto');
  const [error, setError] = useState<string | null>(null);

  const handlePaste = async () => {
    try {
      if (typeof window !== 'undefined' && typeof window.focus === 'function') {
        window.focus();
      }
      if (typeof navigator !== 'undefined' && navigator.clipboard && typeof navigator.clipboard.readText === 'function') {
        const text = await navigator.clipboard.readText();
        if (text) {
          setUrl(text.trim());
          setError(null);
        }
      }
    } catch {
      // ignore clipboard read restrictions or lack of document focus
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);

    const trimmed = url.trim();
    if (!trimmed) {
      setError('Please paste or enter a YouTube video link.');
      return;
    }

    if (!isValidYouTubeUrl(trimmed)) {
      setError('Please provide a valid YouTube video or live stream URL (e.g. youtube.com/watch?v=... or youtube.com/live/...)');
      return;
    }

    onSummarize({
      url: trimmed,
      length,
      style,
      language,
    });
  };

  const handleSelectSample = (sampleUrl: string) => {
    setUrl(sampleUrl);
    setError(null);
    onSummarize({
      url: sampleUrl,
      length,
      style,
      language,
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xl shadow-neutral-950/5 p-2 transition-all focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="flex items-center flex-1 px-3 py-2 gap-3 min-w-0">
              <Youtube className="w-6 h-6 text-red-600 dark:text-red-500 shrink-0" />
              <input
                id="youtube-url-input"
                type="text"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="Paste any YouTube video or live stream URL (e.g. youtube.com/watch?v=... or youtube.com/live/...)"
                disabled={isLoading}
                className="w-full bg-transparent border-0 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 text-base font-normal focus:outline-none focus:ring-0"
              />
              {url ? (
                <button
                  type="button"
                  onClick={() => setUrl('')}
                  className="p-1 rounded-md text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
                >
                  <X className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handlePaste}
                  title="Paste from clipboard"
                  className="hidden sm:flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-md text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  <Clipboard className="w-3.5 h-3.5" />
                  <span>Paste</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 p-1 pt-0 sm:pt-1">
              <button
                type="button"
                id="toggle-options-btn"
                onClick={() => setShowOptions(!showOptions)}
                className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-medium border transition-colors ${
                  showOptions
                    ? 'border-indigo-300 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300'
                    : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                }`}
                title="Summary preferences"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Options</span>
              </button>

              <button
                type="submit"
                id="summarize-submit-btn"
                disabled={isLoading}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isLoading ? 'Processing...' : 'Summarize Video'}</span>
                {!isLoading && <ArrowRight className="w-4 h-4 hidden sm:inline" />}
              </button>
            </div>
          </div>

          {/* Options Drawer */}
          {showOptions && (
            <div className="mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-800/80 px-3 pb-2 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs animate-in fade-in duration-150">
              {/* Length */}
              <div>
                <label className="font-semibold text-neutral-700 dark:text-neutral-300 block mb-1.5 flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-neutral-400" />
                  Summary Length
                </label>
                <div className="grid grid-cols-2 gap-1 bg-neutral-100 dark:bg-neutral-800/80 p-1 rounded-lg">
                  {(['quick', 'standard', 'detailed', 'comprehensive'] as SummaryLength[]).map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => setLength(l)}
                      className={`px-2 py-1 rounded text-center capitalize transition-colors ${
                        length === l
                          ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white font-semibold shadow-xs'
                          : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              {/* Style */}
              <div>
                <label className="font-semibold text-neutral-700 dark:text-neutral-300 block mb-1.5 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-neutral-400" />
                  Tone & Style
                </label>
                <div className="grid grid-cols-2 gap-1 bg-neutral-100 dark:bg-neutral-800/80 p-1 rounded-lg">
                  {(['professional', 'educational', 'technical', 'simple'] as SummaryStyle[]).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setStyle(s)}
                      className={`px-2 py-1 rounded text-center capitalize transition-colors ${
                        style === s
                          ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white font-semibold shadow-xs'
                          : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Language */}
              <div>
                <label className="font-semibold text-neutral-700 dark:text-neutral-300 block mb-1.5 flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-neutral-400" />
                  Output Language
                </label>
                <select
                  id="summary-language-select"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as OutputLanguage)}
                  className="w-full bg-neutral-100 dark:bg-neutral-800/80 border border-transparent rounded-lg px-2.5 py-1.5 text-xs text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="auto">Auto (Video Language)</option>
                  <option value="en">English</option>
                  <option value="es">Spanish (Español)</option>
                  <option value="fr">French (Français)</option>
                  <option value="de">German (Deutsch)</option>
                  <option value="it">Italian (Italiano)</option>
                  <option value="ar">Arabic (العربية)</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </form>

      {/* Error Message */}
      {error && (
        <p className="mt-2 text-xs text-rose-600 dark:text-rose-400 font-medium px-2 flex items-center gap-1">
          <span>⚠️</span> {error}
        </p>
      )}

      {/* Instant Samples Bar */}
      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 px-1">
        <span className="font-medium text-neutral-600 dark:text-neutral-300">Try a sample video:</span>
        {SAMPLE_VIDEOS.map((sample) => (
          <button
            key={sample.id}
            type="button"
            onClick={() => handleSelectSample(sample.url)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:border-indigo-400 dark:hover:border-indigo-700 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shadow-2xs"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
            <span className="truncate max-w-[200px]">{sample.channel} • {sample.title.split(']')[1] || sample.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
