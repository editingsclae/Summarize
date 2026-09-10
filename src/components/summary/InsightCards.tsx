import React from 'react';
import { Lightbulb, CheckCircle2, AlertTriangle, Info } from 'lucide-react';
import { StructuredSummary } from '../../types/summary';

interface InsightCardsProps {
  summary: StructuredSummary;
}

export const InsightCards: React.FC<InsightCardsProps> = ({ summary }) => {
  // Find or derive the 4 cards dynamically from real AI summary data
  const keyIdea = 
    summary.importantPoints?.find(p => p.type === 'KEY IDEA')?.content ||
    summary.importantPoints?.find(p => p.type === 'IMPORTANT')?.content ||
    summary.keyTakeaways?.[0]?.summary ||
    'Transformative impact across key industries';

  const recommendation = 
    summary.importantPoints?.find(p => p.type === 'RECOMMENDATION')?.content ||
    summary.actionItems?.[0] ||
    'Prepare strategically for technological transitions';

  const important = 
    summary.importantPoints?.find(p => p.type === 'IMPORTANT')?.content ||
    summary.importantPoints?.find(p => p.type === 'WARNING')?.content ||
    summary.keyTakeaways?.[1]?.summary ||
    'Focus on responsible execution and safety';

  const fact = 
    summary.importantPoints?.find(p => p.type === 'FACT')?.content ||
    summary.importantPoints?.find(p => p.type === 'STATISTIC')?.content ||
    (summary.facts?.[0] ? `${summary.facts[0].fact}: ${summary.facts[0].value}` : null) ||
    'Rapid adoption accelerating globally';

  // Helper to ensure texts are complete, readable sentences and never cut mid-word
  const formatInsightText = (txt: string) => {
    if (!txt) return '';
    const clean = txt.trim();
    // Allow full sentences up to 240 chars to display completely
    if (clean.length <= 240) return clean;
    // For very long text, cleanly extract the first complete sentence(s)
    const sentenceMatch = clean.match(/^(.+?[.!?])(?:\s|$)/);
    if (sentenceMatch && sentenceMatch[1].length >= 35) {
      return sentenceMatch[1];
    }
    // Clean break at word boundary
    const slice = clean.slice(0, 220);
    const lastSpace = slice.lastIndexOf(' ');
    return (lastSpace > 50 ? slice.slice(0, lastSpace) : slice) + '...';
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
      {/* 1. KEY IDEA - Purple */}
      <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/40 flex flex-col justify-between min-h-[110px]">
        <div className="flex items-center gap-1.5 mb-2">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 text-[10px] font-bold tracking-wide uppercase">
            <Lightbulb className="w-2.5 h-2.5" />
            KEY IDEA
          </span>
        </div>
        <p className="text-xs font-medium text-neutral-800 dark:text-neutral-200 leading-relaxed">
          {formatInsightText(keyIdea)}
        </p>
      </div>

      {/* 2. RECOMMENDATION - Green */}
      <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 flex flex-col justify-between min-h-[110px]">
        <div className="flex items-center gap-1.5 mb-2">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold tracking-wide uppercase">
            <CheckCircle2 className="w-2.5 h-2.5" />
            RECOMMENDATION
          </span>
        </div>
        <p className="text-xs font-medium text-neutral-800 dark:text-neutral-200 leading-relaxed">
          {formatInsightText(recommendation)}
        </p>
      </div>

      {/* 3. IMPORTANT - Amber/Warm */}
      <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 flex flex-col justify-between min-h-[110px]">
        <div className="flex items-center gap-1.5 mb-2">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 text-[10px] font-bold tracking-wide uppercase">
            <AlertTriangle className="w-2.5 h-2.5" />
            IMPORTANT
          </span>
        </div>
        <p className="text-xs font-medium text-neutral-800 dark:text-neutral-200 leading-relaxed">
          {formatInsightText(important)}
        </p>
      </div>

      {/* 4. FACT - Blue */}
      <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 flex flex-col justify-between min-h-[110px]">
        <div className="flex items-center gap-1.5 mb-2">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-[10px] font-bold tracking-wide uppercase">
            <Info className="w-2.5 h-2.5" />
            FACT
          </span>
        </div>
        <p className="text-xs font-medium text-neutral-800 dark:text-neutral-200 leading-relaxed">
          {formatInsightText(fact)}
        </p>
      </div>
    </div>
  );
};
