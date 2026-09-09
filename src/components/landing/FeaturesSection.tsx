import React from 'react';
import { 
  BarChart3, 
  Clock, 
  MessageSquare, 
  FileCheck, 
  ShieldCheck, 
  CheckSquare, 
  Layers, 
  Languages 
} from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      title: 'Quantitative Data Extraction',
      desc: 'Automatically isolates metrics, percentages, dollar amounts, and dates into a structured reference table.',
      icon: BarChart3,
    },
    {
      title: 'Clickable Timestamp Navigation',
      desc: 'Every key takeaway, quote, and chapter links directly to the exact second in the original YouTube video.',
      icon: Clock,
    },
    {
      title: 'Interactive Video Q&A',
      desc: 'Ask follow-up questions to query specific quotes, arguments, or technical details with cited timestamps.',
      icon: MessageSquare,
    },
    {
      title: 'Action Items & Implementation',
      desc: 'Converts tutorials and key advice into checkable, step-by-step action plans you can track in real-time.',
      icon: CheckSquare,
    },
    {
      title: 'Strict Grounding & Zero Hallucination',
      desc: 'Powered by low-temperature Gemini 3.8 models that never fabricate claims, quotes, or statistics.',
      icon: ShieldCheck,
    },
    {
      title: 'Executive PDF & Markdown Export',
      desc: 'Export presentation-grade briefs in one click, ideal for team Notion docs, executive memos, or archives.',
      icon: FileCheck,
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2">
            Engineered for Professionals
          </h2>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Beyond Basic AI Summaries
          </h3>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Designed to answer: "What do I need to know if I don't have 60 minutes to watch this video?"
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/40 dark:bg-neutral-900/40 hover:bg-white dark:hover:bg-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all shadow-2xs group"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-neutral-900 dark:text-white mb-2">
                  {feat.title}
                </h4>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
