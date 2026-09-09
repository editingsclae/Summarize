import React, { useState } from 'react';
import { FileText, X, Sparkles, AlertCircle } from 'lucide-react';
import { VideoMetadata } from '../types/video';

interface ManualTranscriptModalProps {
  isOpen: boolean;
  onClose: () => void;
  video: VideoMetadata | null;
  onSubmitTranscript: (text: string) => void;
}

export const ManualTranscriptModal: React.FC<ManualTranscriptModalProps> = ({
  isOpen,
  onClose,
  video,
  onSubmitTranscript,
}) => {
  const [text, setText] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim().length < 20) return;
    onSubmitTranscript(text.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-neutral-900 w-full max-w-xl rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-800/30">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                Paste Transcript Manually
              </h3>
              <p className="text-[11px] text-neutral-500">
                {video ? video.title : 'Custom Content Input'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-3 text-xs">
          <div className="p-3 bg-amber-50/70 dark:bg-amber-950/30 rounded-xl border border-amber-200/60 dark:border-amber-800/60 text-amber-800 dark:text-amber-300 leading-relaxed">
            <span className="font-semibold">Notice:</span>{' '}
            {video?.isLive && video?.liveStatus !== 'completed'
              ? 'This YouTube live stream is currently ongoing. Official live captions have not yet been published by YouTube. You can paste live notes or key discussion points below to generate your complete executive briefing.'
              : video?.liveStatus === 'completed' || video?.isLiveBroadcast
              ? 'Automatic transcription is not available for this concluded live stream. You can paste the transcript, captions, or notes below to generate your complete executive briefing.'
              : "Automatic transcription isn't available for this video. You can paste the transcript, subtitles, or lecture notes below to generate your complete executive briefing."}
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={8}
            placeholder={
              video?.isLive && video?.liveStatus !== 'completed'
                ? 'Paste live stream notes, bullet points, or transcript here...'
                : 'Paste raw transcript, meeting notes, or speaker text here...'
            }
            className="w-full bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 rounded-xl p-3 text-xs text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
          />

          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-neutral-400">
              {text.trim().split(/\s+/).filter(Boolean).length} words entered
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-1.5 rounded-xl border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={text.trim().length < 20}
                className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center gap-1.5 disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Generate Briefing</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
