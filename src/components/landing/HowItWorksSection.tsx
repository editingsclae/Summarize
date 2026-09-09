import React from 'react';
import { Link2, Cpu, FileText, ArrowRight } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Paste YouTube URL',
      desc: 'Submit any YouTube video link. VidBrief validates the video, retrieves rich metadata, and extracts full synchronized caption tracks.',
      icon: Link2,
    },
    {
      num: '02',
      title: 'Deep Gemini 3.8 Analysis',
      desc: 'Gemini 3.8 Flash extracts the core thesis, isolates quantitative metrics and quotes, eliminates intro fluff, and maps precise timestamps.',
      icon: Cpu,
    },
    {
      num: '03',
      title: 'Review Structured Briefing',
      desc: 'Read executive takeaways, jump directly to key video moments, inspect verified statistics, ask follow-up questions, or export to PDF.',
      icon: FileText,
    },
  ];

  return (
    <section className="py-16 border-t border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2">
            Engineered Workflow
          </h2>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            How VidBrief AI Operates
          </h3>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            A rigorous 3-step pipeline designed to preserve truth and maximize information density.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 p-6 relative hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors shadow-xs"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xs font-bold text-neutral-400 dark:text-neutral-600">
                    {step.num}
                  </span>
                </div>

                <h4 className="text-base font-bold text-neutral-900 dark:text-white mb-2">
                  {step.title}
                </h4>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
