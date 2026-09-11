import React, { useState, useEffect } from 'react';
import { Sidebar, NavItem } from './Sidebar';
import { Header } from './Header';


import { Sparkles, X, ChevronRight } from 'lucide-react';

interface AppLayoutProps {
  currentNav: NavItem;
  onNavigate: (nav: NavItem) => void;
  onUpgradeClick: () => void;
  onSettingsClick: () => void;
  rightSidebar?: React.ReactNode;
  onHeaderSummarize?: (url: string) => void;
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  currentNav,
  onNavigate,
  onUpgradeClick,
  onSettingsClick,
  rightSidebar,
  onHeaderSummarize,
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
    <div className="flex h-screen w-full bg-[#F9FAFB] dark:bg-[#090D16] text-neutral-900 dark:text-neutral-100 overflow-hidden font-sans">
      {/* ------------------------------------------------------------- */}
      {/* 1. Mobile Left Sidebar Drawer (Overlay + Drawer)              */}
      {/* ------------------------------------------------------------- */}
      {mobileSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden transition-opacity duration-200"
          onClick={() => setMobileSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <div 
        className={`fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] h-full transform transition-transform duration-200 ease-in-out lg:static lg:w-64 lg:translate-x-0 ${
          mobileSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        <Sidebar
          currentNav={currentNav}
          onNavigate={(nav) => {
            onNavigate(nav);
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
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs xl:hidden transition-opacity duration-200"
          onClick={() => setMobileInsightsOpen(false)}
          aria-hidden="true"
        />
      )}

      {rightSidebar && (
        <div 
          className={`fixed inset-y-0 right-0 z-50 w-full sm:w-[420px] max-w-[94vw] h-full bg-white dark:bg-[#0D1321] border-l border-neutral-200/80 dark:border-neutral-800 shadow-2xl transform transition-transform duration-200 ease-in-out flex flex-col xl:hidden ${
            mobileInsightsOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Video Insights and Analysis"
        >
          {/* Drawer Header */}
          <div className="px-5 py-3.5 border-b border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between shrink-0 bg-neutral-50/80 dark:bg-[#090D16]/80 backdrop-blur-md">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 fill-white" />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-neutral-900 dark:text-white leading-tight">
                  Insights &amp; AI Analysis
                </h3>
                <p className="text-[10px] text-neutral-500 dark:text-neutral-400">
                  Key takeaways, facts, quotes &amp; chat
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setMobileInsightsOpen(false)}
              className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              aria-label="Close insights drawer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Drawer Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 overscroll-contain no-scrollbar">
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
          onSummarize={onHeaderSummarize}
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
                  <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0D1321] border border-neutral-200/80 dark:border-neutral-800 xl:hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-200/60 dark:border-indigo-800/60">
                        <Sparkles className="w-4 h-4 fill-current" />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-neutral-900 dark:text-white">
                          Video Insights &amp; AI Analysis
                        </h4>
                        <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                          View key takeaways, facts, quotes, action items, and ask AI questions.
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setMobileInsightsOpen(true)}
                      className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-medium text-xs shadow-2xs transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
                    >
                      <Sparkles className="w-3.5 h-3.5 fill-current" />
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
          className="xl:hidden fixed bottom-6 right-6 z-30 px-3.5 py-2 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-100 font-medium text-xs shadow-lg flex items-center gap-1.5 transition-all active:scale-[0.98] cursor-pointer"
          aria-label="Open insights"
        >
          <Sparkles className="w-3.5 h-3.5 fill-current" />
          <span>Insights</span>
        </button>
      )}
    </div>
  );
};
