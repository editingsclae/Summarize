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
    <div className="bg-gradient-to-br from-indigo-50/80 via-white to-purple-50/40 dark:from-indigo-950/30 dark:via-[#131B2E] dark:to-purple-950/20 rounded-3xl border border-indigo-100 dark:border-indigo-900/50 p-5 shadow-xs">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <h3 className="font-bold text-neutral-900 dark:text-white text-sm">
            Ask About This Video
          </h3>
        </div>

        {onOpenFullChat && (
          <button
            type="button"
            onClick={onOpenFullChat}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
          >
            <MessageSquare className="w-3 h-3" />
            <span>Full Chat</span>
          </button>
        )}
      </div>

      <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
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
            className="text-[11px] px-2.5 py-1 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:border-indigo-300 hover:text-indigo-600 transition-all text-left"
          >
            {pq}
          </button>
        ))}
      </div>

      {/* Answer box if available */}
      {answer && (
        <div className="p-3 rounded-2xl bg-white dark:bg-neutral-800/80 border border-indigo-100 dark:border-indigo-900/60 mb-3 text-xs text-neutral-800 dark:text-neutral-200 leading-relaxed">
          <div className="flex items-center gap-1 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
            <Sparkles className="w-2.5 h-2.5" />
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
          className="w-full text-xs pl-3 pr-9 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="button"
          disabled={loading || !question.trim()}
          onClick={() => handleAsk()}
          className="absolute right-1.5 p-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-40 transition-all cursor-pointer"
        >
          {loading ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Send className="w-3.5 h-3.5" />
          )}
        </button>
      </div>
    </div>
  );
};
