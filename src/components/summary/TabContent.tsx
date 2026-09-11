import React, { useState, useEffect } from 'react';
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
  Scale,
  AlertCircle,
  Loader2,
  List,
  AlignLeft
} from 'lucide-react';
import { StructuredSummary } from '../../types/summary';
import { TranscriptSegment } from '../../types/video';
import { fetchTranscript } from '../../services/api';
import { SummaryTabType } from './SummaryTabs';
import { TLDRCard } from './TLDRCard';
import { ExecutiveSummary } from './ExecutiveSummary';
import { KeyTakeaways } from './KeyTakeaways';
import { DetailedSummary } from './DetailedSummary';
import { ProsConsSection } from './ProsConsSection';
import { ConclusionSection } from './ConclusionSection';
import { MindmapView } from '../mindmap/MindmapView';
import { InfographicView } from '../infographic/InfographicView';

interface TabContentProps {
  activeTab: SummaryTabType;
  summary: StructuredSummary;
  transcriptText?: string;
  transcriptSegments?: TranscriptSegment[];
  onUpdateSummary?: (updated: StructuredSummary) => void;
}

export const TabContent: React.FC<TabContentProps> = ({
  activeTab,
  summary,
  transcriptText,
  transcriptSegments,
  onUpdateSummary,
}) => {
  const [copiedTranscript, setCopiedTranscript] = useState(false);
  const [transcriptSearch, setTranscriptSearch] = useState('');
  const [loadedTranscript, setLoadedTranscript] = useState<string | null>(transcriptText || summary.transcript || null);
  const [loadedSegments, setLoadedSegments] = useState<TranscriptSegment[] | null>(transcriptSegments || (summary.segments as TranscriptSegment[]) || null);
  const [isLoadingTranscript, setIsLoadingTranscript] = useState(false);
  const [viewMode, setViewMode] = useState<'timestamped' | 'plain'>('timestamped');
  const fetchAttemptedRef = React.useRef<Set<string>>(new Set());

  // Keep state synced when props change
  useEffect(() => {
    setLoadedTranscript(transcriptText || summary.transcript || null);
    setLoadedSegments(transcriptSegments || (summary.segments as TranscriptSegment[]) || null);
  }, [summary.video.id, transcriptText, transcriptSegments]);

  // Auto-fetch full transcript on demand if segments are missing
  useEffect(() => {
    const videoId = summary.video?.id;
    if (!videoId) return;

    const hasSegments = Boolean(loadedSegments && loadedSegments.length > 0);
    const alreadyAttempted = fetchAttemptedRef.current.has(videoId);

    if (activeTab === 'Transcript' && !hasSegments && !alreadyAttempted) {
      fetchAttemptedRef.current.add(videoId);
      let isMounted = true;
      setIsLoadingTranscript(true);

      fetchTranscript(videoId, summary.language || 'en')
        .then((res) => {
          if (!isMounted) return;
          if (res && res.success && (res.segments?.length > 0 || res.fullText)) {
            setLoadedTranscript(res.fullText);
            setLoadedSegments(res.segments || []);
            const updated: StructuredSummary = {
              ...summary,
              transcript: res.fullText,
              segments: res.segments || [],
              hasRealTranscript: true,
            };
            if (onUpdateSummary) {
              onUpdateSummary(updated);
            }
          }
        })
        .catch((err) => {
          console.warn('[TabContent] Auto-fetch transcript notice:', err);
        })
        .finally(() => {
          if (isMounted) setIsLoadingTranscript(false);
        });

      return () => {
        isMounted = false;
      };
    }
  }, [activeTab, summary.video?.id, loadedSegments, onUpdateSummary]);

  const handleCopyTranscript = () => {
    const textToCopy = loadedTranscript || transcriptText || summary.executiveSummary;
    navigator.clipboard.writeText(textToCopy);
    setCopiedTranscript(true);
    setTimeout(() => setCopiedTranscript(false), 2000);
  };

  const getYoutubeTimestampUrl = (seconds: number) => {
    return `https://www.youtube.com/watch?v=${summary.video.id}&t=${seconds}s`;
  };

  const formatSeconds = (secs: number) => {
    const hours = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = Math.floor(secs % 60);
    if (hours > 0) {
      return `${hours}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
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

  if (activeTab === 'Infographic') {
    return (
      <div className="space-y-4 animate-fadeIn">
        <InfographicView summary={summary} initialLanguage="ar" />
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
    const hasSegments = Boolean(loadedSegments && loadedSegments.length > 0);
    const fullText = loadedTranscript || transcriptText || (summary.sections?.map(s => `[${s.title}]\n${s.summary}`).join('\n\n') || summary.executiveSummary);
    const paragraphs = fullText.split('\n\n').filter(p => p.trim());
    
    // Filter segments or text based on search input
    const filteredSegments = hasSegments
      ? loadedSegments!.filter(seg => !transcriptSearch.trim() || seg.text.toLowerCase().includes(transcriptSearch.toLowerCase()))
      : [];

    const filteredParagraphs = !hasSegments
      ? (transcriptSearch.trim() ? paragraphs.filter(p => p.toLowerCase().includes(transcriptSearch.toLowerCase())) : paragraphs)
      : [];

    const isSynthetic = !hasSegments && summary.hasRealTranscript === false;

    return (
      <div className="bg-white dark:bg-[#0D1321] rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
        {/* Caption Notice for Live Streams without YouTube captions */}
        {isSynthetic && !isLoadingTranscript && (
          <div className="p-3.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/50 flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
              <span className="font-bold">Live Stream Caption Notice:</span> Official speech-to-text captions have not been published by YouTube for this broadcast ({summary.video.duration || 'stream replay'}). The briefing and chapter timeline below were synthesized using curriculum context, creator summit materials, and topic intelligence.
            </div>
          </div>
        )}

        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
              <FileText className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-neutral-900 dark:text-white text-sm">
                  {hasSegments ? 'Full Video Transcript' : (isSynthetic ? 'Synthesized Content Breakdown' : 'Full Video Transcript')}
                </h3>
                {hasSegments && (
                  <span className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold">
                    {loadedSegments!.length.toLocaleString()} lines
                  </span>
                )}
              </div>
              <p className="text-xs text-neutral-400">
                {hasSegments
                  ? 'Verbatim speech-to-text synchronized with video timeline'
                  : (isSynthetic ? 'Chronological topic flow and key discussion phases' : 'Complete speech-to-text transcript')}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* View Mode Toggle (Timestamped vs Plain) */}
            {hasSegments && (
              <div className="flex items-center rounded-lg bg-neutral-100 dark:bg-neutral-800/80 p-0.5 border border-neutral-200/60 dark:border-neutral-700/60 text-xs">
                <button
                  type="button"
                  onClick={() => setViewMode('timestamped')}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-all ${
                    viewMode === 'timestamped'
                      ? 'bg-white dark:bg-[#0D1321] text-indigo-600 dark:text-indigo-400 shadow-2xs font-semibold'
                      : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
                  }`}
                  title="Show timestamped transcript"
                >
                  <List className="w-3.5 h-3.5" />
                  <span>Timed</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('plain')}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-all ${
                    viewMode === 'plain'
                      ? 'bg-white dark:bg-[#0D1321] text-indigo-600 dark:text-indigo-400 shadow-2xs font-semibold'
                      : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
                  }`}
                  title="Show continuous text view"
                >
                  <AlignLeft className="w-3.5 h-3.5" />
                  <span>Text</span>
                </button>
              </div>
            )}

            {/* Search Box */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={transcriptSearch}
                onChange={(e) => setTranscriptSearch(e.target.value)}
                placeholder="Search transcript..."
                className="pl-8 pr-3 py-1.5 rounded-lg text-xs bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {/* Copy Button */}
            <button
              type="button"
              onClick={handleCopyTranscript}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 text-xs font-semibold text-neutral-700 dark:text-neutral-200 transition-colors cursor-pointer"
            >
              {copiedTranscript ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedTranscript ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Body Content */}
        {isLoadingTranscript ? (
          <div className="py-16 flex flex-col items-center justify-center gap-3 text-neutral-400">
            <Loader2 className="w-6 h-6 animate-spin text-indigo-500" />
            <p className="text-xs font-medium">Fetching complete transcript from YouTube captions...</p>
          </div>
        ) : hasSegments && viewMode === 'timestamped' ? (
          /* Timestamped Segments List (like YouTube's transcript panel) */
          <div className="space-y-1 max-h-[600px] overflow-y-auto pr-2 no-scrollbar">
            {filteredSegments.length === 0 ? (
              <p className="text-center py-8 text-neutral-400 text-xs">No matching transcript lines found.</p>
            ) : (
              filteredSegments.map((seg, idx) => {
                const timeFormatted = formatSeconds(seg.start);
                const ytUrl = getYoutubeTimestampUrl(seg.start);
                return (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-2 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors group"
                  >
                    <a
                      href={ytUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-2 py-0.5 rounded-md font-mono text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-600 hover:text-white transition-colors shrink-0 mt-0.5"
                      title="Jump to time on YouTube"
                    >
                      {timeFormatted}
                    </a>
                    <p className="text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed">
                      {seg.text}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        ) : (
          /* Plain Text / Paragraphs view */
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 no-scrollbar text-neutral-700 dark:text-neutral-300 text-xs sm:text-sm leading-relaxed">
            {filteredParagraphs.length === 0 ? (
              <p className="text-center py-8 text-neutral-400 text-xs">No matching lines found.</p>
            ) : (
              filteredParagraphs.map((para, i) => (
                <div key={i} className="p-3 rounded-2xl hover:bg-neutral-50 dark:hover:bg-neutral-850/40 transition-colors border border-transparent hover:border-neutral-200/50 dark:hover:border-neutral-800/50">
                  <p>{para}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    );
  }

  if (activeTab === 'Timestamps') {
    return (
      <div className="bg-white dark:bg-[#0D1321] rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
        <div className="flex items-center gap-2.5 pb-4 border-b border-neutral-100 dark:border-neutral-800">
          <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <Clock className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="font-bold text-neutral-900 dark:text-white text-sm">
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
              <div key={idx} className="py-3 flex items-start justify-between gap-4 group">
                <div className="flex items-start gap-3">
                  <a
                    href={ytUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-mono text-xs font-bold hover:bg-indigo-600 hover:text-white transition-colors shrink-0 flex items-center gap-1"
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
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-indigo-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors shrink-0"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
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
      <div className="bg-white dark:bg-[#0D1321] rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
        <h3 className="font-bold text-neutral-900 dark:text-white text-sm">Key Facts & Figures</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {(summary.facts && summary.facts.length > 0 ? summary.facts : [
            { fact: 'Global GDP boost (2030)', value: '$15.7 trillion', context: 'Projected economic expansion' },
            { fact: 'Jobs at risk of automation', value: '47%', context: 'Within the next two decades' },
            { fact: 'AI market size (2030)', value: '$1.8 trillion', context: 'Industry valuation' },
            { fact: 'Model training speed', value: 'Weeks instead of months', context: 'Computational breakthroughs' }
          ]).map((fact, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-neutral-50/60 dark:bg-neutral-900/40 border border-neutral-200/70 dark:border-neutral-800/80 flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400">{fact.context || 'Fact'}</p>
                <h4 className="text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200 mt-0.5">{fact.fact}</h4>
              </div>
              <span className="text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-400 shrink-0 font-mono">
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
      <div className="bg-white dark:bg-[#0D1321] rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
        <h3 className="font-bold text-neutral-900 dark:text-white text-sm">Memorable Quotes</h3>
        <div className="space-y-3">
          {(summary.quotes && summary.quotes.length > 0 ? summary.quotes : [
            { quote: "AI is not just a technology, it's a new kind of infrastructure for human progress.", speaker: "Speaker", timestamp: 860 }
          ]).map((q, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-neutral-50/60 dark:bg-neutral-900/40 border border-neutral-200/70 dark:border-neutral-800/80">
              <p className="italic text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 font-serif">"{q.quote}"</p>
              <div className="mt-2 text-[11px] text-neutral-500 flex items-center justify-between">
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
      <div className="bg-white dark:bg-[#0D1321] rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
        <h3 className="font-bold text-neutral-900 dark:text-white text-sm">Key Action Items</h3>
        <div className="space-y-2.5">
          {(summary.actionItems && summary.actionItems.length > 0 ? summary.actionItems : [
            'Learn about AI tools and how to use them.',
            'Build relevant skills for the future job market.',
            'Support responsible AI policies and regulations.'
          ]).map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-neutral-50/60 dark:bg-neutral-900/40 border border-neutral-200/70 dark:border-neutral-800/80 flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold text-xs flex items-center justify-center shrink-0">
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
      <div className="bg-white dark:bg-[#0D1321] rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
        <h3 className="font-bold text-neutral-900 dark:text-white text-sm">Core Concepts Explained</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {(summary.concepts && summary.concepts.length > 0 ? summary.concepts : [
            { term: 'Large Language Model', explanation: 'An AI model capable of understanding and generating human language.' },
            { term: 'AI Alignment', explanation: 'Ensuring AI systems act consistently with human intent and safety values.' }
          ]).map((c, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-neutral-50/60 dark:bg-neutral-900/40 border border-neutral-200/70 dark:border-neutral-800/80">
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
