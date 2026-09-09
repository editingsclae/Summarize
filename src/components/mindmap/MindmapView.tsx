import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Languages, 
  ChevronDown, 
  Download, 
  Bookmark, 
  Copy, 
  Share2, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Maximize2, 
  Check, 
  GitFork,
  Sparkles,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { StructuredSummary } from '../../types/summary';
import { MindmapData, MindmapLanguage, MindmapBranch } from '../../types/mindmap';
import { buildMindmapFromSummary } from '../../services/mindmapService';

interface MindmapViewProps {
  summary: StructuredSummary;
  initialLanguage?: MindmapLanguage;
}

export const MindmapView: React.FC<MindmapViewProps> = ({
  summary,
  initialLanguage = 'ar'
}) => {
  const [language, setLanguage] = useState<MindmapLanguage>(initialLanguage);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [collapsedBranches, setCollapsedBranches] = useState<Record<string, boolean>>({});
  const [allCollapsed, setAllCollapsed] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Generate or fetch mindmap data based on current summary and selected language
  const mindmap: MindmapData = useMemo(() => {
    return buildMindmapFromSummary(summary, language);
  }, [summary, language]);

  const isRTL = language === 'ar';

  const rightBranches = useMemo(() => {
    return mindmap.branches.filter(b => b.side === 'right');
  }, [mindmap]);

  const leftBranches = useMemo(() => {
    return mindmap.branches.filter(b => b.side === 'left');
  }, [mindmap]);

  // Center pan initially
  useEffect(() => {
    setPan({ x: 0, y: 0 });
    setZoom(1);
  }, [summary.video.id, language]);

  // Mouse drag to pan
  const handleMouseDown = (e: React.MouseEvent) => {
    // If clicked on an interactive button or select, don't start canvas drag
    if ((e.target as HTMLElement).closest('button, select, a, input')) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;
    setZoom((prev) => Math.min(Math.max(prev * zoomFactor, 0.4), 2.2));
  };

  const toggleBranch = (branchId: string) => {
    setCollapsedBranches((prev) => ({
      ...prev,
      [branchId]: !prev[branchId]
    }));
  };

  const toggleAllBranches = () => {
    const nextState = !allCollapsed;
    setAllCollapsed(nextState);
    const newCollapsedMap: Record<string, boolean> = {};
    mindmap.branches.forEach((b) => {
      newCollapsedMap[b.id] = nextState;
    });
    setCollapsedBranches(newCollapsedMap);
  };

  const handleResetView = () => {
    setPan({ x: 0, y: 0 });
    setZoom(1);
  };

  const handleCopyText = () => {
    const lines: string[] = [`# ${mindmap.rootLabel}`, ''];
    mindmap.branches.forEach((b) => {
      lines.push(`## ${b.label}`);
      b.children.forEach((c) => {
        lines.push(`- ${c.emoji ? c.emoji + ' ' : ''}${c.label}`);
      });
      lines.push('');
    });
    navigator.clipboard.writeText(lines.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveOutline = () => {
    const lines: string[] = [`# ${mindmap.rootLabel}`, ''];
    mindmap.branches.forEach((b) => {
      lines.push(`## ${b.label}`);
      b.children.forEach((c) => {
        lines.push(`- ${c.emoji ? c.emoji + ' ' : ''}${c.label}`);
      });
      lines.push('');
    });
    const blob = new Blob([lines.join('\n')], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${mindmap.rootLabel.replace(/\s+/g, '_')}_mindmap.md`;
    link.click();
    URL.revokeObjectURL(url);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleDownload = () => {
    // Generate text/svg export
    window.print();
  };

  return (
    <div 
      className="relative flex flex-col w-full bg-white dark:bg-[#0D1321] rounded-3xl border border-neutral-200/90 dark:border-neutral-800 shadow-xs overflow-hidden select-none"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* ------------------------------------------------------------- */}
      {/* 1. Top Sub-Toolbar Matching Image 2                           */}
      {/* ------------------------------------------------------------- */}
      <div className="px-5 py-3 border-b border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between gap-4 bg-white/95 dark:bg-[#0D1321]/95 backdrop-blur-md z-20">
        {/* Language Switcher Dropdown on Left */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center">
            <Languages className="w-4 h-4 text-neutral-500 absolute left-3 pointer-events-none" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as MindmapLanguage)}
              className="appearance-none pl-9 pr-8 py-1.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/80 text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer shadow-2xs"
            >
              <option value="ar">Arabic (العربية)</option>
              <option value="en">English (English)</option>
              <option value="fr">French (Français)</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute right-2.5 pointer-events-none" />
          </div>

          <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2.5 py-0.5 rounded-full border border-blue-100 dark:border-blue-900/60">
            <Sparkles className="w-3 h-3 fill-current" />
            <span>{isRTL ? 'مخطط ذهني تفاعلي' : language === 'fr' ? 'Carte mentale interactive' : 'Interactive Mindmap'}</span>
          </span>
        </div>

        {/* Action Buttons on Right (Download, Save, Copy, Share) */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Download */}
          <button
            type="button"
            onClick={handleDownload}
            className="p-2 rounded-xl text-neutral-600 dark:text-neutral-300 hover:text-blue-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            title="Download / Print Mindmap"
          >
            <Download className="w-4 h-4" />
          </button>

          {/* Save / Export Markdown */}
          <button
            type="button"
            onClick={handleSaveOutline}
            className="p-2 rounded-xl text-neutral-600 dark:text-neutral-300 hover:text-blue-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            title="Save outline to file"
          >
            {saved ? <Check className="w-4 h-4 text-emerald-600" /> : <Bookmark className="w-4 h-4" />}
          </button>

          {/* Copy Outline Text */}
          <button
            type="button"
            onClick={handleCopyText}
            className="p-2 rounded-xl text-neutral-600 dark:text-neutral-300 hover:text-blue-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer relative"
            title="Copy mindmap outline"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          </button>

          {/* Share */}
          <button
            type="button"
            onClick={handleCopyText}
            className="p-2 rounded-xl text-neutral-600 dark:text-neutral-300 hover:text-blue-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            title="Share"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. Interactive Mindmap Canvas Container                       */}
      {/* ------------------------------------------------------------- */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        className={`relative w-full h-[650px] sm:h-[720px] bg-gradient-to-b from-neutral-50/70 via-white to-neutral-50/50 dark:from-[#090E1A] dark:via-[#0D1321] dark:to-[#090E1A] overflow-hidden ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      >
        {/* Subtle Canvas Dot Grid Background */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.25] dark:opacity-[0.15]" 
          style={{
            backgroundImage: 'radial-gradient(#94A3B8 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />

        {/* Floating Controls on Left (Matching Image 2 vertical pill) */}
        <div className="absolute left-4 top-6 z-20 flex flex-col bg-white/95 dark:bg-[#131B2E]/95 border border-neutral-200/90 dark:border-neutral-700/80 rounded-2xl p-1.5 shadow-lg shadow-black/5 gap-1.5 backdrop-blur-md">
          <button
            type="button"
            onClick={toggleAllBranches}
            className="p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-blue-600 transition-colors cursor-pointer"
            title={allCollapsed ? 'Expand All Branches' : 'Collapse All Branches'}
          >
            <GitFork className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleResetView}
            className="p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-blue-600 transition-colors cursor-pointer"
            title="Reset View & Center"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <div className="w-full h-px bg-neutral-200 dark:bg-neutral-700 my-0.5" />

          <button
            type="button"
            onClick={() => setZoom((prev) => Math.min(prev + 0.15, 2.2))}
            className="p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-blue-600 transition-colors cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setZoom((prev) => Math.max(prev - 0.15, 0.4))}
            className="p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-blue-600 transition-colors cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
        </div>

        {/* Zoom percentage indicator on bottom left */}
        <div className="absolute left-4 bottom-4 z-20 px-2.5 py-1 rounded-lg bg-white/80 dark:bg-[#131B2E]/80 border border-neutral-200/80 dark:border-neutral-800 text-[11px] font-mono text-neutral-500 font-bold backdrop-blur-xs pointer-events-none">
          {Math.round(zoom * 100)}%
        </div>

        {/* ----------------------------------------------------------- */}
        {/* Mindmap Transformation Viewport                             */}
        {/* ----------------------------------------------------------- */}
        <div
          ref={canvasRef}
          className="absolute left-1/2 top-1/2 transform transition-transform duration-75 origin-center will-change-transform"
          style={{
            transform: `translate(calc(-50% + ${pan.x}px), calc(-50% + ${pan.y}px)) scale(${zoom})`,
          }}
        >
          <div className="relative flex items-center justify-center min-w-[1200px] min-h-[600px] px-8 py-10">
            
            {/* SVG Connecting Bezier Paths */}
            <svg 
              className="absolute inset-0 pointer-events-none w-full h-full overflow-visible"
              viewBox="0 0 1200 600"
            >
              {/* Left Branch Curves */}
              {leftBranches.map((b, idx) => {
                const total = leftBranches.length;
                const startY = 300; // center
                const endY = 60 + (idx * (480 / Math.max(total - 1, 1)));
                return (
                  <path
                    key={`line-left-${b.id}`}
                    d={`M 480 ${startY} C 430 ${startY}, 380 ${endY}, 320 ${endY}`}
                    stroke={b.color}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.85"
                  />
                );
              })}

              {/* Right Branch Curves */}
              {rightBranches.map((b, idx) => {
                const total = rightBranches.length;
                const startY = 300; // center
                const endY = 60 + (idx * (480 / Math.max(total - 1, 1)));
                return (
                  <path
                    key={`line-right-${b.id}`}
                    d={`M 720 ${startY} C 770 ${startY}, 820 ${endY}, 880 ${endY}`}
                    stroke={b.color}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.85"
                  />
                );
              })}
            </svg>

            {/* LEFT BRANCHES COLUMN */}
            <div className="flex flex-col space-y-7 items-end justify-center pr-12 w-[480px] z-10">
              {leftBranches.map((branch) => {
                const isCollapsed = Boolean(collapsedBranches[branch.id]);

                return (
                  <div key={branch.id} className="relative flex flex-col items-end w-full group">
                    {/* Primary Branch Capsule */}
                    <button
                      type="button"
                      onClick={() => toggleBranch(branch.id)}
                      className="px-4 py-2 rounded-2xl border text-xs sm:text-[13px] font-bold bg-white dark:bg-[#131B2E] transition-all cursor-pointer shadow-xs flex items-center gap-2 hover:scale-[1.02]"
                      style={{
                        borderColor: branch.color,
                        color: branch.color
                      }}
                    >
                      <span>{branch.label}</span>
                      <span className="text-[10px] opacity-70">
                        {isCollapsed ? '+' : '–'}
                      </span>
                    </button>

                    {/* Sub-items branching off */}
                    {!isCollapsed && branch.children.length > 0 && (
                      <div className="mt-2.5 flex flex-col items-end space-y-2 pr-2 border-r-2" style={{ borderColor: branch.color }}>
                        {branch.children.map((sub) => (
                          <div 
                            key={sub.id} 
                            className="flex items-center gap-2 text-[11px] sm:text-xs text-neutral-700 dark:text-neutral-200 bg-white/80 dark:bg-neutral-800/80 px-3 py-1.5 rounded-xl border border-neutral-200/60 dark:border-neutral-700/60 shadow-2xs hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                          >
                            <span className="leading-snug text-right">{sub.label}</span>
                            {sub.emoji && <span className="text-sm shrink-0">{sub.emoji}</span>}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* CENTRAL ROOT NODE (The dark capsule from Image 2) */}
            <div className="relative z-10 shrink-0 mx-4">
              <div className="px-8 py-4 rounded-3xl bg-[#1E293B] text-white font-black text-base sm:text-lg shadow-xl shadow-slate-900/30 border-2 border-slate-700 text-center max-w-[260px] tracking-tight leading-snug transform hover:scale-105 transition-transform">
                {mindmap.rootLabel}
              </div>

              {/* Decorative radial aura */}
              <div className="absolute inset-0 rounded-3xl bg-blue-500/10 blur-xl pointer-events-none" />
            </div>

            {/* RIGHT BRANCHES COLUMN */}
            <div className="flex flex-col space-y-7 items-start justify-center pl-12 w-[480px]">
              {rightBranches.map((branch) => {
                const isCollapsed = Boolean(collapsedBranches[branch.id]);

                return (
                  <div key={branch.id} className="relative flex flex-col items-start w-full group">
                    {/* Primary Branch Capsule */}
                    <button
                      type="button"
                      onClick={() => toggleBranch(branch.id)}
                      className="px-4 py-2 rounded-2xl border text-xs sm:text-[13px] font-bold bg-white dark:bg-[#131B2E] transition-all cursor-pointer shadow-xs flex items-center gap-2 hover:scale-[1.02]"
                      style={{
                        borderColor: branch.color,
                        color: branch.color
                      }}
                    >
                      <span>{branch.label}</span>
                      <span className="text-[10px] opacity-70">
                        {isCollapsed ? '+' : '–'}
                      </span>
                    </button>

                    {/* Sub-items branching off */}
                    {!isCollapsed && branch.children.length > 0 && (
                      <div className="mt-2.5 flex flex-col items-start space-y-2 pl-2 border-l-2" style={{ borderColor: branch.color }}>
                        {branch.children.map((sub) => (
                          <div 
                            key={sub.id} 
                            className="flex items-center gap-2 text-[11px] sm:text-xs text-neutral-700 dark:text-neutral-200 bg-white/80 dark:bg-neutral-800/80 px-3 py-1.5 rounded-xl border border-neutral-200/60 dark:border-neutral-700/60 shadow-2xs hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                          >
                            {sub.emoji && <span className="text-sm shrink-0">{sub.emoji}</span>}
                            <span className="leading-snug text-left">{sub.label}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
