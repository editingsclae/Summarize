import React from 'react';
import { Sparkles, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-neutral-950 py-10 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="font-bold text-sm tracking-tight text-neutral-900 dark:text-white">
            VidBrief<span className="text-indigo-600 dark:text-indigo-400">.ai</span>
          </span>
          <span className="text-xs text-neutral-400 dark:text-neutral-500">
            • Executive Intelligence from Video
          </span>
        </div>

        <div className="flex items-center gap-6 text-xs text-neutral-500 dark:text-neutral-400">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            Enterprise Data Privacy
          </span>
          <span>© {new Date().getFullYear()} VidBrief AI Inc.</span>
        </div>
      </div>
    </footer>
  );
};
