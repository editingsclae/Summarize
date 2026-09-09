import React, { useState } from 'react';
import { Settings, X, Check, Globe, Sparkles, Sliders, ShieldCheck } from 'lucide-react';
import { SummaryLength, SummaryStyle, OutputLanguage } from '../types/summary';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [defaultLength, setDefaultLength] = useState<SummaryLength>(() => {
    return (localStorage.getItem('vidbrief_default_length') as SummaryLength) || 'detailed';
  });
  const [defaultStyle, setDefaultStyle] = useState<SummaryStyle>(() => {
    return (localStorage.getItem('vidbrief_default_style') as SummaryStyle) || 'professional';
  });
  const [defaultLang, setDefaultLang] = useState<OutputLanguage>(() => {
    return (localStorage.getItem('vidbrief_default_lang') as OutputLanguage) || 'auto';
  });
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    localStorage.setItem('vidbrief_default_length', defaultLength);
    localStorage.setItem('vidbrief_default_style', defaultStyle);
    localStorage.setItem('vidbrief_default_lang', defaultLang);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-neutral-900 w-full max-w-md rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-800/30">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 flex items-center justify-center">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                Application Preferences
              </h3>
              <p className="text-[11px] text-neutral-500">Configure default generation presets</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4 text-xs">
          {/* Default Length */}
          <div>
            <label className="font-semibold text-neutral-700 dark:text-neutral-300 block mb-1.5">
              Default Summary Length
            </label>
            <select
              value={defaultLength}
              onChange={(e) => setDefaultLength(e.target.value as SummaryLength)}
              className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl p-2 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="quick">Quick (2-3 minute read)</option>
              <option value="standard">Standard (Balanced overview)</option>
              <option value="detailed">Detailed (In-depth key points)</option>
              <option value="comprehensive">Comprehensive (Full briefing report)</option>
            </select>
          </div>

          {/* Default Style */}
          <div>
            <label className="font-semibold text-neutral-700 dark:text-neutral-300 block mb-1.5">
              Default Analysis Style
            </label>
            <select
              value={defaultStyle}
              onChange={(e) => setDefaultStyle(e.target.value as SummaryStyle)}
              className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl p-2 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="professional">Professional (Executive tone)</option>
              <option value="educational">Educational (Concept learning)</option>
              <option value="technical">Technical (Engineering & specs)</option>
              <option value="simple">Simple (Plain English & accessible)</option>
            </select>
          </div>

          {/* Default Language */}
          <div>
            <label className="font-semibold text-neutral-700 dark:text-neutral-300 block mb-1.5">
              Default Language
            </label>
            <select
              value={defaultLang}
              onChange={(e) => setDefaultLang(e.target.value as OutputLanguage)}
              className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl p-2 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="auto">Auto-detect from Video</option>
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="it">Italian</option>
              <option value="ar">Arabic</option>
            </select>
          </div>

          {/* Model Status */}
          <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800">
            <div className="flex items-center justify-between text-[11px] text-neutral-500">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                Gemini 3.8 Intelligence Engine
              </span>
              <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">Online</span>
            </div>
          </div>
        </div>

        <div className="px-5 py-3 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/30 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold text-white flex items-center gap-1.5 shadow-2xs"
          >
            {saved ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Saved!</span>
              </>
            ) : (
              <span>Save Preferences</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
