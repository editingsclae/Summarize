const fs = require('fs');

// RightSidebar
fs.writeFileSync('src/components/layout/RightSidebar.tsx', `
import React from 'react';
import { ImportantPoints } from '../insights/ImportantPoints';
import { FactsData } from '../insights/FactsData';
import { Quotes } from '../insights/Quotes';
import { ActionItems } from '../insights/ActionItems';
import { Concepts } from '../insights/Concepts';
import { AskVideo } from '../ai/AskVideo';
import { StructuredSummary } from '../../types/summary';

interface RightSidebarProps {
  summary: StructuredSummary;
}

export function RightSidebar({ summary }: RightSidebarProps) {
  return (
    <div className="space-y-6">
      <ImportantPoints points={summary.importantPoints} />
      <FactsData facts={summary.facts} />
      <Quotes quotes={summary.quotes} />
      <ActionItems items={summary.actionItems} />
      <Concepts concepts={summary.concepts} />
      <AskVideo summary={summary} />
    </div>
  );
}
`);

// Insight Components
fs.writeFileSync('src/components/insights/ImportantPoints.tsx', `
import React from 'react';
import { AlertTriangle, Info, Lightbulb, CheckCircle2 } from 'lucide-react';
import { ImportantPoint } from '../../types/summary';

export function ImportantPoints({ points }: { points: ImportantPoint[] }) {
  if (!points || points.length === 0) return null;

  const getBadgeStyle = (type: string) => {
    switch (type) {
      case 'IMPORTANT': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800/50';
      case 'STATISTIC': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800/50';
      case 'WARNING': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800/50';
      case 'RECOMMENDATION': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50';
      default: return 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800/50';
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'IMPORTANT': return <AlertTriangle className="w-3 h-3" />;
      case 'STATISTIC': return <Info className="w-3 h-3" />;
      case 'WARNING': return <AlertTriangle className="w-3 h-3" />;
      case 'RECOMMENDATION': return <CheckCircle2 className="w-3 h-3" />;
      default: return <Lightbulb className="w-3 h-3" />;
    }
  };

  const formatTime = (secs?: number | null) => {
    if (!secs) return '';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return \`\${m}:\${s.toString().padStart(2, '0')}\`;
  };

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm">
      <div className="px-5 py-4 flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <AlertTriangle className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="font-bold text-neutral-900 dark:text-white text-sm">Important Points</h3>
        </div>
        <button className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700">View all →</button>
      </div>
      <div className="p-5 space-y-4">
        {points.map((pt, i) => (
          <div key={i} className="flex gap-3">
            <div className="w-0.5 bg-neutral-100 dark:bg-neutral-800 rounded-full flex-shrink-0 mt-1" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1.5">
                <span className={\`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide border \${getBadgeStyle(pt.type)}\`}>
                  {getIcon(pt.type)}
                  {pt.type}
                </span>
                {pt.timestamp && <span className="text-[10px] font-medium text-neutral-400">{formatTime(pt.timestamp)}</span>}
              </div>
              <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-snug">{pt.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
`);
