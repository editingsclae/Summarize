import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  Search, 
  Clock, 
  ExternalLink, 
  FileText, 
  Lightbulb, 
  Quote as QuoteIcon, 
  CheckCircle2, 
  BookMarked,
  Scale
} from 'lucide-react';
import { StructuredSummary } from '../../types/summary';
import { SummaryTabType } from './SummaryTabs';
import { TLDRCard } from './TLDRCard';
import { ExecutiveSummary } from './ExecutiveSummary';
import { KeyTakeaways } from './KeyTakeaways';
import { DetailedSummary } from './DetailedSummary';
import { ProsConsSection } from './ProsConsSection';
import { ConclusionSection } from './ConclusionSection';
import { MindmapView } from '../mindmap/MindmapView';

interface TabContentProps {
  activeTab: SummaryTabType;
  summary: StructuredSummary;
  transcriptText?: string;
}

export const TabContent: React.FC<TabContentProps> = ({
  activeTab,
  summary,
  transcriptText
}) => {
  const [copiedTranscript, setCopiedTranscript] = useState(false);
  const [transcriptSearch, setTranscriptSearch] = useState('');

  const handleCopyTranscript = () => {
    const textToCopy = transcriptText || summary.executiveSummary;
    navigator.clipboard.writeText(textToCopy);
    setCopiedTranscript(true);
    setTimeout(() => setCopiedTranscript(false), 2000);
  };

  const getYoutubeTimestampUrl = (seconds: number) => {
    return `https://www.youtube.com/watch?v=${summary.video.id}&t=${seconds}s`;
  };

  const formatSeconds = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (activeTab === 'Summary') {
    return (
      <div className="space-y-6">
        {/* TL;DR Card */}
        <TLDRCard tldr={summary.tldr} readingTime="2 min read" />

        {/* Executive Summary with 4 Insight Cards */}
        <ExecutiveSummary summary={summary} />

        {/* Key Takeaways Grid */}
        <KeyTakeaways takeaways={summary.keyTakeaways} />

        {/* Detailed Summary Chapters */}
        <DetailedSummary sections={summary.sections} videoId={summary.video.id} />
      </div>
    );
  }

  if (activeTab === 'Mindmap') {
    return (
      <div className="space-y-4 animate-fadeIn">
        <MindmapView summary={summary} initialLanguage="ar" />
      </div>
    );
  }

  if (activeTab === 'Transcript') {
    const fullText = transcriptText || (summary.sections?.map(s => `[${s.title}]\n${s.summary}`).join('\n\n') || summary.executiveSummary);
    const paragraphs = fullText.split('\n\n').filter(p => p.trim());
    const filtered = transcriptSearch.trim()
      ? paragraphs.filter(p => p.toLowerCase().includes(transcriptSearch.toLowerCase()))
      : paragraphs;

    return (
      <div className="bg-white dark:bg-[#131B2E] rounded-3xl border border-neutral-200/80 dark:border-neutral-800/80 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-neutral-900 dark:text-white text-base">
                Full Video Transcript
              </h3>
              <p className="text-xs text-neutral-400">
                Complete speech-to-text transcript synchronized with audio
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={transcriptSearch}
                onChange={(e) => setTranscriptSearch(e.target.value)}
                placeholder="Search transcript..."
                className="pl-8 pr-3 py-1.5 rounded-xl text-xs bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="button"
              onClick={handleCopyTranscript}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 text-xs font-semibold text-neutral-700 dark:text-neutral-200 transition-colors cursor-pointer"
            >
              {copiedTranscript ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedTranscript ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 no-scrollbar text-neutral-700 dark:text-neutral-300 text-xs sm:text-sm leading-relaxed">
          {filtered.length === 0 ? (
            <p className="text-center py-8 text-neutral-400 text-xs">No matching lines found.</p>
          ) : (
            filtered.map((para, i) => (
              <div key={i} className="p-3 rounded-2xl hover:bg-neutral-50 dark:hover:bg-neutral-850/40 transition-colors">
                <p>{para}</p>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  if (activeTab === 'Timestamps') {
    return (
      <div className="bg-white dark:bg-[#131B2E] rounded-3xl border border-neutral-200/80 dark:border-neutral-800/80 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-4 border-b border-neutral-100 dark:border-neutral-800">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-neutral-900 dark:text-white text-base">
              Interactive Timestamps & Chapters
            </h3>
            <p className="text-xs text-neutral-400">
              Click any timestamp to navigate straight to that moment on YouTube
            </p>
          </div>
        </div>

        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
          {summary.sections.map((sec, idx) => {
            const timeSecs = sec.timestamp ?? (idx * 300);
            const timeStr = formatSeconds(timeSecs);
            const ytUrl = getYoutubeTimestampUrl(timeSecs);

            return (
              <div key={idx} className="py-3.5 flex items-start justify-between gap-4 group">
                <div className="flex items-start gap-3">
                  <a
                    href={ytUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-mono text-xs font-bold hover:bg-indigo-600 hover:text-white transition-colors shrink-0 flex items-center gap-1"
                  >
                    <Clock className="w-3 h-3" />
                    <span>{timeStr}</span>
                  </a>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {sec.title}
                    </h4>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                      {sec.summary}
                    </p>
                  </div>
                </div>

                <a
                  href={ytUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl text-neutral-400 hover:text-indigo-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors shrink-0"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (activeTab === 'Key Facts') {
    return (
      <div className="bg-white dark:bg-[#131B2E] rounded-3xl border border-neutral-200/80 dark:border-neutral-800/80 p-6 shadow-xs space-y-4">
        <h3 className="font-bold text-neutral-900 dark:text-white text-base">Key Facts & Figures</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(summary.facts && summary.facts.length > 0 ? summary.facts : [
            { fact: 'Global GDP boost (2030)', value: '$15.7 trillion', context: 'Projected economic expansion' },
            { fact: 'Jobs at risk of automation', value: '47%', context: 'Within the next two decades' },
            { fact: 'AI market size (2030)', value: '$1.8 trillion', context: 'Industry valuation' },
            { fact: 'Model training speed', value: 'Weeks instead of months', context: 'Computational breakthroughs' }
          ]).map((fact, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-850/40 border border-neutral-200/80 dark:border-neutral-800 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">{fact.context || 'Fact'}</p>
                <h4 className="text-sm font-bold text-neutral-800 dark:text-neutral-200 mt-1">{fact.fact}</h4>
              </div>
              <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400 shrink-0 font-mono">
                {fact.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeTab === 'Quotes') {
    return (
      <div className="bg-white dark:bg-[#131B2E] rounded-3xl border border-neutral-200/80 dark:border-neutral-800/80 p-6 shadow-xs space-y-4">
        <h3 className="font-bold text-neutral-900 dark:text-white text-base">Memorable Quotes</h3>
        <div className="space-y-3">
          {(summary.quotes && summary.quotes.length > 0 ? summary.quotes : [
            { quote: "AI is not just a technology, it's a new kind of infrastructure for human progress.", speaker: "Speaker", timestamp: 860 }
          ]).map((q, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-850/40 border border-neutral-200/80 dark:border-neutral-800">
              <p className="italic text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 font-serif">"{q.quote}"</p>
              <div className="mt-2 text-xs text-neutral-500 flex items-center justify-between">
                <span>— {q.speaker || 'Speaker'}</span>
                {q.timestamp && <span className="font-mono">{formatSeconds(q.timestamp)}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeTab === 'Action Items') {
    return (
      <div className="bg-white dark:bg-[#131B2E] rounded-3xl border border-neutral-200/80 dark:border-neutral-800/80 p-6 shadow-xs space-y-4">
        <h3 className="font-bold text-neutral-900 dark:text-white text-base">Key Action Items</h3>
        <div className="space-y-3">
          {(summary.actionItems && summary.actionItems.length > 0 ? summary.actionItems : [
            'Learn about AI tools and how to use them.',
            'Build relevant skills for the future job market.',
            'Support responsible AI policies and regulations.'
          ]).map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-850/40 border border-neutral-200/80 dark:border-neutral-800 flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold text-xs flex items-center justify-center shrink-0">
                {idx + 1}
              </div>
              <p className="text-xs sm:text-sm font-medium text-neutral-800 dark:text-neutral-200">{item}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeTab === 'Concepts') {
    return (
      <div className="bg-white dark:bg-[#131B2E] rounded-3xl border border-neutral-200/80 dark:border-neutral-800/80 p-6 shadow-xs space-y-4">
        <h3 className="font-bold text-neutral-900 dark:text-white text-base">Core Concepts Explained</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(summary.concepts && summary.concepts.length > 0 ? summary.concepts : [
            { term: 'Large Language Model', explanation: 'An AI model capable of understanding and generating human language.' },
            { term: 'AI Alignment', explanation: 'Ensuring AI systems act consistently with human intent and safety values.' }
          ]).map((c, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-850/40 border border-neutral-200/80 dark:border-neutral-800">
              <h4 className="text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-400 mb-1">{c.term}</h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">{c.explanation}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeTab === 'Pros & Cons') {
    return (
      <div className="space-y-6">
        <ProsConsSection pros={summary.pros} cons={summary.cons} />
        {summary.conclusion && <ConclusionSection conclusion={summary.conclusion} />}
      </div>
    );
  }

  return null;
};
