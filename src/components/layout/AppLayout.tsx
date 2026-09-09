import React, { useState, useEffect } from 'react';
import { Sidebar, NavItem } from './Sidebar';
import { Header } from './Header';
import { SavedSummaryRecord, StructuredSummary } from '../../types/summary';
import { Sparkles, X, ChevronRight } from 'lucide-react';

interface AppLayoutProps {
  currentNav: NavItem;
  onNavigate: (nav: NavItem) => void;
  recentHistory: SavedSummaryRecord[];
  activeVideoId?: string;
  onSelectSummary: (summary: StructuredSummary) => void;
  onUpgradeClick: () => void;
  onSettingsClick: () => void;
  rightSidebar?: React.ReactNode;
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  currentNav,
  onNavigate,
  recentHistory,
  activeVideoId,
  onSelectSummary,
  onUpgradeClick,
  onSettingsClick,
  rightSidebar,
  children
}) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [mobileInsightsOpen, setMobileInsightsOpen] = useState(false);

  // Prevent background scrolling when either drawer is open on mobile
  useEffect(() => {
    if (mobileSidebarOpen || mobileInsightsOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mobileSidebarOpen, mobileInsightsOpen]);

  // Handle Escape key to close mobile drawers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileSidebarOpen(false);
        setMobileInsightsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex h-screen w-full bg-[#F8FAFC] dark:bg-[#0A0F1D] text-neutral-900 dark:text-neutral-100 overflow-hidden font-sans">
      {/* ------------------------------------------------------------- */}
      {/* 1. Mobile Left Sidebar Drawer (Overlay + Drawer)              */}
      {/* ------------------------------------------------------------- */}
      {mobileSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden transition-opacity duration-300"
          onClick={() => setMobileSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <div 
        className={`fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] h-full transform transition-transform duration-300 ease-in-out lg:static lg:w-64 lg:translate-x-0 ${
          mobileSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        <Sidebar
          currentNav={currentNav}
          onNavigate={(nav) => {
            onNavigate(nav);
            setMobileSidebarOpen(false);
          }}
          recentHistory={recentHistory}
          activeVideoId={activeVideoId}
          onSelectSummary={(summary) => {
            onSelectSummary(summary);
            setMobileSidebarOpen(false);
          }}
          onUpgradeClick={() => {
            onUpgradeClick();
            setMobileSidebarOpen(false);
          }}
          onSettingsClick={() => {
            onSettingsClick();
            setMobileSidebarOpen(false);
          }}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. Mobile Right Insights Drawer (Overlay + Drawer for < xl)    */}
      {/* ------------------------------------------------------------- */}
      {mobileInsightsOpen && rightSidebar && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs xl:hidden transition-opacity duration-300"
          onClick={() => setMobileInsightsOpen(false)}
          aria-hidden="true"
        />
      )}

      {rightSidebar && (
        <div 
          className={`fixed inset-y-0 right-0 z-50 w-full sm:w-[440px] max-w-[94vw] h-full bg-white dark:bg-[#0D1321] border-l border-neutral-200 dark:border-neutral-800 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col xl:hidden ${
            mobileInsightsOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Video Insights and Analysis"
        >
          {/* Drawer Header */}
          <div className="px-5 py-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between shrink-0 bg-neutral-50/90 dark:bg-[#090D17]/90 backdrop-blur-md">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-sm shadow-indigo-500/20">
                <Sparkles className="w-4 h-4 fill-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white leading-tight">
                  Insights & AI Analysis
                </h3>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                  Key takeaways, facts, quotes & chat
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setMobileInsightsOpen(false)}
              className="p-2 rounded-xl text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              aria-label="Close insights drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 overscroll-contain no-scrollbar">
            {rightSidebar}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 3. Main Workspace (Header + Content + Desktop Right Sidebar)  */}
      {/* ------------------------------------------------------------- */}
      <div className="flex-1 flex flex-col h-screen min-w-0 overflow-hidden">
        {/* Top Header */}
        <Header
          onOpenMobileSidebar={() => {
            setMobileInsightsOpen(false);
            setMobileSidebarOpen(true);
          }}
          onOpenMobileInsights={() => {
            setMobileSidebarOpen(false);
            setMobileInsightsOpen(true);
          }}
          hasRightSidebar={Boolean(rightSidebar)}
          onOpenSettings={onSettingsClick}
          onOpenPricing={onUpgradeClick}
        />

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="max-w-[1680px] mx-auto p-4 sm:p-6 lg:p-7">
            <div className="flex flex-col xl:flex-row gap-6 items-start">
              {/* Center Main Content (Summary, Tabs, History, etc.) */}
              <main className="flex-1 min-w-0 w-full">
                {children}

                {/* Mobile Insights Banner at the bottom of the summary */}
                {rightSidebar && (
                  <div className="mt-8 p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-indigo-50/90 via-purple-50/50 to-white dark:from-indigo-950/40 dark:via-[#131B2E] dark:to-purple-950/20 border border-indigo-100 dark:border-indigo-900/60 xl:hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-indigo-600/30">
                        <Sparkles className="w-5 h-5 fill-white" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                          Video Insights & AI Analysis
                        </h4>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                          View key takeaways, facts, quotes, action items, and ask AI questions.
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setMobileInsightsOpen(true)}
                      className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white font-semibold text-xs shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
                    >
                      <Sparkles className="w-3.5 h-3.5 fill-white" />
                      <span>Open Insights Panel</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </main>

              {/* Desktop Right Insights Column (xl+ screens only, preventing any overlap on mobile) */}
              {rightSidebar && (
                <aside className="hidden xl:block w-[380px] shrink-0">
                  {rightSidebar}
                </aside>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 4. Floating Action Button on Mobile for Instant Insights      */}
      {/* ------------------------------------------------------------- */}
      {rightSidebar && !mobileInsightsOpen && !mobileSidebarOpen && (
        <button
          type="button"
          onClick={() => setMobileInsightsOpen(true)}
          className="xl:hidden fixed bottom-6 right-6 z-30 px-4 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-xs shadow-xl shadow-indigo-600/40 flex items-center gap-2 transition-all active:scale-95 cursor-pointer border border-white/20 backdrop-blur-xs"
          aria-label="Open insights"
        >
          <Sparkles className="w-4 h-4 fill-white" />
          <span>Insights</span>
        </button>
      )}
    </div>
  );
};
