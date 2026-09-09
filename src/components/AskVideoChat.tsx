import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, User, Play, Sparkles, Loader2 } from 'lucide-react';
import { StructuredSummary, QnAMessage } from '../types/summary';
import { askVideoQuestion } from '../services/api';
import { formatTimestamp, getYouTubeTimestampUrl } from '../utils/youtube';

interface AskVideoChatProps {
  isOpen: boolean;
  onClose: () => void;
  summary: StructuredSummary;
}

const PRESET_QUESTIONS = [
  'What were the three most critical takeaways?',
  'What statistics or numbers were cited in the talk?',
  'What are the primary actionable recommendations?',
  'Did the speaker highlight any critical warnings?',
];

export const AskVideoChat: React.FC<AskVideoChatProps> = ({ isOpen, onClose, summary }) => {
  const [messages, setMessages] = useState<QnAMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hello! I have thoroughly analyzed "${summary.video.title}". What would you like to know about this video?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isAsking, setIsAsking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAsking]);

  if (!isOpen) return null;

  const handleSend = async (questionText?: string) => {
    const q = (questionText || input).trim();
    if (!q || isAsking) return;

    const userMsg: QnAMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsAsking(true);

    try {
      const response = await askVideoQuestion({
        video: summary.video,
        summary,
        question: q,
      });

      const assistantMsg: QnAMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.answer,
        citations: response.citations,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: unknown) {
      const errorMsg: QnAMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I apologize, but I had trouble answering that question. Please try rephrasing.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsAsking(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-neutral-900 w-full max-w-xl h-[600px] max-h-[90vh] rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-800/30">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 leading-none">
                Ask About This Video
              </h3>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate max-w-[280px] sm:max-w-md mt-1">
                {summary.video.title}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-indigo-600 text-white rounded-br-none'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 rounded-bl-none'
                  }`}
                >
                  <p className="font-normal whitespace-pre-wrap">{msg.content}</p>

                  {/* Citations / Timestamps */}
                  {msg.citations && msg.citations.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-neutral-200 dark:border-neutral-700 space-y-1">
                      <p className="text-[10px] uppercase font-semibold text-neutral-400 dark:text-neutral-500 tracking-wider">
                        Context Citations
                      </p>
                      {msg.citations.map((cite, cIdx) => (
                        <div key={cIdx} className="flex items-center gap-1.5 text-[11px] text-neutral-600 dark:text-neutral-300">
                          {cite.timestamp !== undefined && cite.timestamp !== null && (
                            <a
                              href={getYouTubeTimestampUrl(summary.video.id, cite.timestamp)}
                              target="_blank"
                              rel="noreferrer"
                              className="font-mono text-indigo-600 dark:text-indigo-400 font-semibold hover:underline inline-flex items-center gap-0.5"
                            >
                              <Play className="w-2.5 h-2.5 fill-current" />
                              {formatTimestamp(cite.timestamp)}
                            </a>
                          )}
                          <span className="truncate italic">"{cite.text}"</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <span className={`block text-[10px] mt-1 text-right ${isUser ? 'text-indigo-200' : 'text-neutral-400'}`}>
                    {msg.timestamp}
                  </span>
                </div>

                {isUser && (
                  <div className="w-7 h-7 rounded-full bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            );
          })}

          {isAsking && (
            <div className="flex gap-3 items-center text-xs text-neutral-500 dark:text-neutral-400">
              <div className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              </div>
              <span>Searching video transcript & analyzing answer...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Preset Prompt Suggestions */}
        <div className="px-4 py-2 border-t border-neutral-100 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-900/50 flex gap-1.5 overflow-x-auto pb-2">
          {PRESET_QUESTIONS.map((pq, i) => (
            <button
              key={i}
              onClick={() => handleSend(pq)}
              disabled={isAsking}
              className="text-[11px] whitespace-nowrap px-2.5 py-1 rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:border-indigo-400 dark:hover:border-indigo-600 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shrink-0 disabled:opacity-50"
            >
              {pq}
            </button>
          ))}
        </div>

        {/* Input bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 border-t border-neutral-200 dark:border-neutral-800 flex items-center gap-2 bg-white dark:bg-neutral-900"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about this video..."
            disabled={isAsking}
            className="flex-1 bg-neutral-100 dark:bg-neutral-800 border-0 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          />
          <button
            type="submit"
            disabled={!input.trim() || isAsking}
            className="p-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 transition-colors shrink-0 shadow-2xs"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
