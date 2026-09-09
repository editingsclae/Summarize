import React from 'react';
import { Sparkles, Shield, Clock, FileCheck, ArrowRight } from 'lucide-react';
import { VideoInput } from '../VideoInput';
import { SummaryLength, SummaryStyle, OutputLanguage } from '../../types/summary';

interface HeroSectionProps {
  onSummarize: (options: {
    url: string;
    length: SummaryLength;
    style: SummaryStyle;
    language: OutputLanguage;
  }) => void;
  isLoading: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSummarize, isLoading }) => {
  return (
    <section className="relative pt-12 pb-16 sm:pt-16 sm:pb-24 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-indigo-50/60 via-violet-50/20 to-transparent dark:from-indigo-950/20 dark:via-violet-950/5 dark:to-transparent -z-10 pointer-events-none blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Micro-Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-200/80 dark:border-indigo-800/80 bg-white dark:bg-neutral-900 text-xs font-semibold text-indigo-700 dark:text-indigo-300 shadow-2xs mb-6">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>Powered by Google Gemini 3.8 Flash • Zero Hallucinations</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-neutral-900 dark:text-white max-w-4xl mx-auto leading-[1.12]">
          Transform Hours of YouTube Into{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600">
            Executive Briefings
          </span>{' '}
          in Seconds
        </h1>

        {/* Hero Subtitle */}
        <p className="mt-5 text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto font-normal leading-relaxed">
          VidBrief AI parses video transcripts to extract verified facts, quantitative data, timestamps, and actionable conclusions. Built for researchers, engineers, and executives.
        </p>

        {/* Main Video Input Box */}
        <div className="mt-8 sm:mt-10">
          <VideoInput onSummarize={onSummarize} isLoading={isLoading} />
        </div>

        {/* Social Proof & Guarantee Badges */}
        <div className="mt-10 pt-8 border-t border-neutral-200/60 dark:border-neutral-800/60 max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-neutral-900 dark:text-neutral-100">Factual Accuracy</p>
              <p className="text-[11px] text-neutral-500">Strict transcript grounded</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-neutral-900 dark:text-neutral-100">Clickable Timestamps</p>
              <p className="text-[11px] text-neutral-500">Jump right into video</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0">
              <FileCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-neutral-900 dark:text-neutral-100">PDF & Markdown</p>
              <p className="text-[11px] text-neutral-500">One-click publication</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-neutral-900 dark:text-neutral-100">Ask Anything</p>
              <p className="text-[11px] text-neutral-500">Interactive Q&A assistant</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
