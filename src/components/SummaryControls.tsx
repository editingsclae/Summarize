import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  Download, 
  FileText, 
  Share2, 
  RotateCw, 
  Minimize2, 
  Maximize2, 
  Globe, 
  MessageSquare,
  Printer
} from 'lucide-react';
import { StructuredSummary, SummaryLength, OutputLanguage } from '../types/summary';
import { generateMarkdown, downloadMarkdown, downloadPdf } from '../utils/export';
import { copyToClipboard } from '../utils/clipboard';

interface SummaryControlsProps {
  summary: StructuredSummary;
  onRegenerate: () => void;
  onChangeLength: (length: SummaryLength) => void;
  onChangeLanguage: (lang: OutputLanguage) => void;
  onOpenAskChat: () => void;
  onExportPdf?: () => void;
  onExportMarkdown?: () => void;
}

export const SummaryControls: React.FC<SummaryControlsProps> = ({
  summary,
  onRegenerate,
  onChangeLength,
  onChangeLanguage,
  onOpenAskChat,
  onExportPdf,
  onExportMarkdown,
}) => {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [exportNotice, setExportNotice] = useState<string | null>(null);
  const [showTranslateMenu, setShowTranslateMenu] = useState(false);
  const [downloadMenu, setDownloadMenu] = useState(false);

  const handleCopy = async () => {
    const md = generateMarkdown(summary);
    const success = await copyToClipboard(md);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `VidBrief AI: ${summary.video.title}`,
          text: summary.tldr,
          url: window.location.href,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    const success = await copyToClipboard(window.location.href);
    if (success) {
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  return (
    <div className="w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-3 sm:p-4 shadow-sm no-print">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Left Side Action Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {/* Ask AI Button */}
          <button
            id="control-ask-ai-btn"
            onClick={onOpenAskChat}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 shadow-sm transition-all"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Ask About Video</span>
          </button>

          {/* Copy Button */}
          <button
            id="control-copy-btn"
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors"
            title="Copy summary as Markdown"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>

          {/* Download Dropdown */}
          <div className="relative">
            <button
              id="control-download-menu-btn"
              onClick={() => setDownloadMenu(!downloadMenu)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>

            {downloadMenu && (
              <div 
                className="absolute left-0 mt-1 w-44 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-lg p-1 z-30 animate-in fade-in duration-150 text-xs"
                onClick={() => setDownloadMenu(false)}
              >
                <button
                  onClick={() => {
                    if (onExportPdf) {
                      onExportPdf();
                    } else {
                      downloadPdf(summary);
                      setExportNotice('Executive PDF Exported!');
                      setTimeout(() => setExportNotice(null), 3000);
                    }
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-left rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-rose-500" />
                  <span>Executive PDF</span>
                </button>
                <button
                  onClick={() => {
                    if (onExportMarkdown) {
                      onExportMarkdown();
                    } else {
                      downloadMarkdown(summary);
                      setExportNotice('Markdown (.md) Exported!');
                      setTimeout(() => setExportNotice(null), 3000);
                    }
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-left rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Markdown (.md)</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="w-full flex items-center gap-2 px-3 py-2 text-left rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5 text-neutral-500" />
                  <span>Print Briefing</span>
                </button>
              </div>
            )}
          </div>

          {/* Share */}
          <button
            id="control-share-btn"
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors"
          >
            {shared ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600 font-semibold">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </>
            )}
          </button>
        </div>

        {/* Right Side Adjustment Modifiers */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {/* Length adjustments: Shorter vs More Detailed */}
          <div className="flex items-center rounded-xl border border-neutral-200 dark:border-neutral-800 p-0.5 bg-neutral-50 dark:bg-neutral-800/60">
            <button
              onClick={() => onChangeLength('quick')}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-white dark:hover:bg-neutral-700 transition-colors"
              title="Generate a shorter summary"
            >
              <Minimize2 className="w-3 h-3" />
              <span>Shorter</span>
            </button>
            <span className="w-px h-3 bg-neutral-300 dark:bg-neutral-700" />
            <button
              onClick={() => onChangeLength('comprehensive')}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-white dark:hover:bg-neutral-700 transition-colors"
              title="Generate more detailed comprehensive analysis"
            >
              <Maximize2 className="w-3 h-3" />
              <span>More Detailed</span>
            </button>
          </div>

          {/* Translate */}
          <div className="relative">
            <button
              id="control-translate-btn"
              onClick={() => setShowTranslateMenu(!showTranslateMenu)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>
                {summary.language === 'ar'
                  ? 'العربية (Arabic)'
                  : summary.language === 'es'
                  ? 'Español'
                  : summary.language === 'fr'
                  ? 'Français'
                  : summary.language === 'de'
                  ? 'Deutsch'
                  : summary.language === 'it'
                  ? 'Italiano'
                  : 'Translate'}
              </span>
            </button>

            {showTranslateMenu && (
              <div 
                className="absolute right-0 mt-1 w-44 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-xl p-1 z-30 animate-in fade-in duration-150 text-xs"
                onClick={() => setShowTranslateMenu(false)}
              >
                {[
                  { code: 'en', label: 'English', native: 'English' },
                  { code: 'ar', label: 'Arabic', native: 'العربية' },
                  { code: 'es', label: 'Spanish', native: 'Español' },
                  { code: 'fr', label: 'French', native: 'Français' },
                  { code: 'de', label: 'German', native: 'Deutsch' },
                  { code: 'it', label: 'Italian', native: 'Italiano' },
                ].map((item) => {
                  const isSelected = (summary.language || 'en') === item.code;
                  return (
                    <button
                      key={item.code}
                      onClick={() => onChangeLanguage(item.code as any)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                        isSelected
                          ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-semibold'
                          : 'hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <span>{item.native}</span>
                        {item.native !== item.label && (
                          <span className="text-[11px] text-neutral-400">({item.label})</span>
                        )}
                      </span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Regenerate */}
          <button
            id="control-regenerate-btn"
            onClick={onRegenerate}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors"
            title="Re-run AI summarization"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Regenerate</span>
          </button>
        </div>
      </div>
    </div>
  );
};
