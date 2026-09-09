import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQS = [
  {
    q: 'How does VidBrief AI prevent hallucinations and false facts?',
    a: 'VidBrief AI operates under strict temperature constraints (0.2) and prompt boundaries with Gemini 3.8. It is explicitly commanded never to invent statistics, fabricate quotes, or claim opinions as facts. Every metric and quote extracted must originate directly from the transcript.',
  },
  {
    q: 'What types of YouTube videos can I summarize?',
    a: 'You can summarize any public YouTube video with available English or auto-generated captions, including tech talks, keynote speeches, tutorials, interviews, financial reviews, podcast episodes, and lectures.',
  },
  {
    q: 'What happens if a video does not have automated captions or subtitles?',
    a: 'If a creator has disabled captions or YouTube blocks automated extraction, VidBrief prompts you with a manual transcript paste modal so you can paste text or notes and still generate a comprehensive executive briefing.',
  },
  {
    q: 'Can I export briefings to PDF or Markdown?',
    a: 'Yes! Every summary can be exported in one click to a formatted Executive PDF document, copied as clean Markdown for Notion/Obsidian, or printed directly.',
  },
  {
    q: 'How long of a video can VidBrief process?',
    a: 'VidBrief can process long videos up to several hours long. Our backend utilizes hierarchical token chunking to summarize large transcripts without exceeding context limits.',
  },
];

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-16 sm:py-20 border-t border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-900/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2">
            Questions & Answers
          </h2>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 overflow-hidden shadow-2xs transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white">
                    {faq.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-neutral-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-neutral-500 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed border-t border-neutral-100 dark:border-neutral-800/80 pt-3 font-normal">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
