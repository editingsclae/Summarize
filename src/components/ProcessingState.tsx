import React, { useEffect, useState } from 'react';
import { CheckCircle2, Loader2, Sparkles, Info } from 'lucide-react';

interface ProcessingStateProps {
  currentStage: number;
  stageName?: string;
  transcriptMethod?: 'captions' | 'stt' | 'checking';
}

const BASE_STAGES = [
  { id: 1, label: 'Video detected', desc: 'Validating URL & parsing video identifiers' },
  { id: 2, label: 'Retrieving video information', desc: 'Fetching metadata, channel, and thumbnail' },
  { id: 3, label: 'Checking captions', desc: 'Scanning for official YouTube caption tracks' },
  { id: 4, label: 'Creating transcript', desc: 'Preparing transcript segments' },
  { id: 5, label: 'Analyzing content', desc: 'Filtering out fluff and mapping central themes' },
  { id: 6, label: 'Extracting important points', desc: 'Detecting facts, metrics, quotes, and timestamps' },
  { id: 7, label: 'Generating AI summary', desc: 'Synthesizing executive briefing with Gemini 3.8' },
  { id: 8, label: 'Structuring final result', desc: 'Formatting intelligence report and actionable insights' },
];

const STATUS_MESSAGES = [
  'Connecting to video streams...',
  'Checking available caption tracks...',
  'Processing spoken dialogue and timestamps...',
  'Isolating critical quantitative data and statistics...',
  'Evaluating speaker arguments and core thesis...',
  'Drafting executive summary and takeaway cards...',
  'Finalizing timestamps and fact-checking quotes...',
];

export const ProcessingState: React.FC<ProcessingStateProps> = ({
  currentStage,
  stageName,
  transcriptMethod = 'checking',
}) => {
  const [elapsed, setElapsed] = useState(0);
  const [messageIdx, setMessageIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const msgTimer = setInterval(() => {
      setMessageIdx((prev) => (prev + 1) % STATUS_MESSAGES.length);
    }, 3200);
    return () => clearInterval(msgTimer);
  }, []);

  // Compute dynamic stage labels according to captions availability
  const stages = BASE_STAGES.map((st) => {
    if (st.id === 3) {
      if (transcriptMethod === 'captions') {
        return { ...st, label: 'Checking captions', note: 'Captions found' };
      }
      if (transcriptMethod === 'stt') {
        return {
          ...st,
          label: 'Checking captions',
          note: 'Captions unavailable',
          desc: 'No captions found — switching to automatic AI speech-to-text',
        };
      }
    }
    if (st.id === 4) {
      if (transcriptMethod === 'captions') {
        return {
          ...st,
          label: 'Processing YouTube transcript',
          desc: 'Extracting timed caption tracks & normalizing text',
        };
      }
      if (transcriptMethod === 'stt') {
        return {
          ...st,
          label: 'Transcribing video audio with AI',
          desc: 'Generating high-accuracy speech-to-text directly from audio',
        };
      }
    }
    return st;
  });

  // Compute progress percentage
  const progressPercent = Math.min(Math.round((currentStage / stages.length) * 100), 96);

  return (
    <div className="w-full max-w-2xl mx-auto my-12 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 shadow-xl shadow-neutral-950/5">
      {/* Header with animated icon */}
      <div className="flex items-center justify-between pb-6 border-b border-neutral-100 dark:border-neutral-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center relative">
            <Sparkles className="w-5 h-5 animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
            </span>
          </div>
          <div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
              Generating Video Intelligence Briefing
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              Powered by Google Gemini • {elapsed}s elapsed
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="font-mono text-sm font-bold text-indigo-600 dark:text-indigo-400">
            {progressPercent}%
          </span>
        </div>
      </div>

      {/* Visual Progress Bar */}
      <div className="w-full bg-neutral-100 dark:bg-neutral-800 rounded-full h-2 my-6 overflow-hidden">
        <div
          className="bg-gradient-to-r from-indigo-500 to-violet-600 h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Dynamic Status Callout */}
      <div className="bg-neutral-50 dark:bg-neutral-800/50 rounded-xl p-3 mb-6 border border-neutral-200/60 dark:border-neutral-700/60 flex items-center gap-2.5">
        <Loader2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 animate-spin shrink-0" />
        <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300 animate-in fade-in duration-300">
          {stageName || STATUS_MESSAGES[messageIdx]}
        </span>
      </div>

      {/* Stages List */}
      <div className="space-y-3">
        {stages.map((stage) => {
          const isDone = currentStage > stage.id;
          const isCurrent = currentStage === stage.id;
          const note = (stage as any).note;

          return (
            <div
              key={stage.id}
              className={`flex items-start gap-3 p-2 rounded-lg transition-colors ${
                isCurrent
                  ? 'bg-indigo-50/70 dark:bg-indigo-950/30'
                  : 'text-neutral-500 dark:text-neutral-400'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 animate-spin" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-neutral-300 dark:border-neutral-700 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <p
                      className={`text-xs font-semibold ${
                        isDone
                          ? 'text-neutral-800 dark:text-neutral-200'
                          : isCurrent
                          ? 'text-indigo-600 dark:text-indigo-400 font-bold'
                          : 'text-neutral-400 dark:text-neutral-500'
                      }`}
                    >
                      {stage.label}
                    </p>
                    {note && (
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-md font-medium inline-flex items-center gap-1 ${
                          note === 'Captions found'
                            ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                            : 'bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800'
                        }`}
                      >
                        {note === 'Captions unavailable' && <Info className="w-2.5 h-2.5" />}
                        {note}
                      </span>
                    )}
                  </div>

                  {isDone && (
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                      Done
                    </span>
                  )}
                  {isCurrent && (
                    <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-medium animate-pulse">
                      In progress...
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-neutral-400 dark:text-neutral-500 leading-tight mt-0.5">
                  {stage.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
