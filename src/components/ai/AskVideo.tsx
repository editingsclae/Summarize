import React, { useState } from 'react';
import { Sparkles, Send, MessageSquare, Loader2 } from 'lucide-react';
import { StructuredSummary } from '../../types/summary';
import { askVideoQuestion } from '../../services/api';

interface AskVideoProps {
  summary: StructuredSummary;
  onOpenFullChat?: () => void;
}

export const AskVideo: React.FC<AskVideoProps> = ({ summary, onOpenFullChat }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const presetQuestions = [
    'What was the main conclusion?',
    'What are the key statistics mentioned?'
  ];

  const handleAsk = async (qText?: string) => {
    const q = (qText || question).trim();
    if (!q || loading) return;

    setLoading(true);
    setAnswer(null);

    try {
      const res = await askVideoQuestion({
        video: summary.video,
        summary,
        question: q
      });
      setAnswer(res.answer);
    } catch {
      setAnswer('Unable to generate answer right now. Please try again or open the full chat.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-[#0D1321] rounded-xl border border-neutral-200/80 dark:border-neutral-800 p-4 sm:p-5 shadow-2xs">
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-200/60 dark:border-indigo-900/60">
            <Sparkles className="w-3 h-3 fill-current" />
          </div>
          <h3 className="font-semibold text-neutral-900 dark:text-white text-xs sm:text-sm">
            Ask About This Video
          </h3>
        </div>

        {onOpenFullChat && (
          <button
            type="button"
            onClick={onOpenFullChat}
            className="text-xs font-medium text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
          >
            <MessageSquare className="w-3 h-3" />
            <span>Full Chat</span>
          </button>
        )}
      </div>

      <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-3 leading-relaxed">
        Have questions about the video? Ask our AI assistant anything.
      </p>

      {/* Preset suggestions */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {presetQuestions.map((pq, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              setQuestion(pq);
              handleAsk(pq);
            }}
            className="text-[11px] px-2.5 py-1 rounded-md bg-neutral-50 dark:bg-neutral-850 border border-neutral-200/80 dark:border-neutral-750 text-neutral-600 dark:text-neutral-300 hover:border-indigo-400 hover:text-indigo-600 transition-all text-left"
          >
            {pq}
          </button>
        ))}
      </div>

      {/* Answer box if available */}
      {answer && (
        <div className="p-3 rounded-lg bg-neutral-50/70 dark:bg-neutral-850/50 border border-neutral-200/80 dark:border-neutral-800 mb-3 text-xs text-neutral-800 dark:text-neutral-200 leading-relaxed">
          <div className="flex items-center gap-1 text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
            <Sparkles className="w-2.5 h-2.5 fill-current" />
            AI Answer
          </div>
          <p>{answer}</p>
        </div>
      )}

      {/* Input row */}
      <div className="relative flex items-center">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
          placeholder="Ask a question..."
          className="w-full text-xs pl-3 pr-8 py-2 rounded-lg border border-neutral-200/90 dark:border-neutral-750 bg-neutral-50/50 dark:bg-neutral-900/50 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-indigo-500/80 focus:ring-2 focus:ring-indigo-500/20 transition-all"
        />
        <button
          type="button"
          disabled={loading || !question.trim()}
          onClick={() => handleAsk()}
          className="absolute right-1.5 p-1 rounded-md bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white transition-all cursor-pointer"
        >
          {loading ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : (
            <Send className="w-3 h-3" />
          )}
        </button>
      </div>
    </div>
  );
};
