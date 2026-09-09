import React, { useState, useEffect } from 'react';
import { 
  AlertCircle, 
  Sparkles, 
  Compass, 
  Bookmark, 
  Cloud,
  FileDown,
  FileText,
  Copy,
  CheckCircle2,
  Play
} from 'lucide-react';
import { AppLayout } from './components/layout/AppLayout';
import { NavItem } from './components/layout/Sidebar';
import { RightSidebar } from './components/layout/RightSidebar';
import { VideoInfoCard } from './components/video/VideoInfoCard';
import { SummaryTabs, SummaryTabType } from './components/summary/SummaryTabs';
import { TabContent } from './components/summary/TabContent';
import { HistoryList } from './components/history/HistoryList';
import { ProcessingState } from './components/ProcessingState';
import { AskVideoChat } from './components/AskVideoChat';
import { HistoryModal } from './components/HistoryModal';
import { PricingModal } from './components/PricingModal';
import { SettingsModal } from './components/SettingsModal';
import { ManualTranscriptModal } from './components/ManualTranscriptModal';
import { LoginPage } from './components/LoginPage';
import { VideoInput } from './components/VideoInput';
import { NewSummaryView } from './components/summary/NewSummaryView';
import { NewSummaryRightSidebar } from './components/layout/NewSummaryRightSidebar';

import { StructuredSummary, SummaryLength, SummaryStyle, OutputLanguage } from './types/summary';
import { VideoMetadata } from './types/video';
import { summarizeVideo, translateSummary } from './services/api';
import { SAMPLE_VIDEOS, SampleVideo } from './services/sampleData';
import { AuthProvider, useAuth } from './context/AuthContext';
import { 
  saveSummaryToCloud, 
  fetchUserCloudData,
  toggleBookmarkInCloud,
  deleteSummaryFromCloud 
} from './services/firebase';
import { downloadPdf, downloadMarkdown } from './utils/export';

function AppContent() {
  const { user, loading: authLoading } = useAuth();
  const [currentNav, setCurrentNav] = useState<NavItem>('home');
  const [activeTab, setActiveTab] = useState<SummaryTabType>('Summary');
  
  // Default to sample video summary so the dashboard is immediately populated like the reference image
  const [summary, setSummary] = useState<StructuredSummary | null>(() => {
    try {
      const saved = localStorage.getItem('vidbrief_active_summary');
      if (saved) return JSON.parse(saved);
    } catch {}
    return SAMPLE_VIDEOS[0]?.summary || null;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [progressStage, setProgressStage] = useState(1);
  const [progressStageName, setProgressStageName] = useState('');
  const [transcriptMethod, setTranscriptMethod] = useState<'captions' | 'stt' | 'checking'>('checking');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Saved bookmarks
  const [savedVideoIds, setSavedVideoIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('vidbrief_saved_ids');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [SAMPLE_VIDEOS[0]?.id || ''];
  });
  const [isBookmarkSaving, setIsBookmarkSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<{
    title?: string;
    text: string;
    type: 'success' | 'info' | 'error';
    iconType?: 'bookmark' | 'pdf' | 'markdown' | 'link' | 'success' | 'error';
  } | null>(null);

  // Auto-dismiss toast after 4s
  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 4000);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  // Modals state
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAskChatOpen, setIsAskChatOpen] = useState(false);
  const [isManualTranscriptOpen, setIsManualTranscriptOpen] = useState(false);
  const [pendingVideo, setPendingVideo] = useState<VideoMetadata | null>(null);
  const [pendingOptions, setPendingOptions] = useState<{
    url: string;
    length: SummaryLength;
    style: SummaryStyle;
    language: OutputLanguage;
  } | null>(null);

  // History state
  const [history, setHistory] = useState<StructuredSummary[]>(() => {
    try {
      const saved = localStorage.getItem('vidbrief_history');
      if (saved) return JSON.parse(saved);
    } catch {}
    return SAMPLE_VIDEOS.map((s) => s.summary);
  });

  // Sync both summaries and bookmarks with Firestore when logged in
  useEffect(() => {
    if (!user?.uid) return;

    let isMounted = true;
    fetchUserCloudData(user.uid)
      .then((data) => {
        if (!isMounted || !data) return;
        const { summaries: cloudSummaries, bookmarkedIds: cloudBookmarks } = data;

        if (cloudSummaries && cloudSummaries.length > 0) {
          setHistory((prev) => {
            const map = new Map<string, StructuredSummary>();
            cloudSummaries.forEach((s) => map.set(s.video.id, s));
            prev.forEach((s) => {
              if (!map.has(s.video.id)) map.set(s.video.id, s);
            });
            return Array.from(map.values()).slice(0, 30);
          });
        }

        if (cloudBookmarks && cloudBookmarks.length > 0) {
          setSavedVideoIds((prev) => {
            const set = new Set([...prev, ...cloudBookmarks]);
            return Array.from(set);
          });
        }
      })
      .catch((err) => {
        console.warn('Could not sync summaries and bookmarks from Firestore:', err);
      });

    return () => {
      isMounted = false;
    };
  }, [user?.uid]);

  useEffect(() => {
    try {
      localStorage.setItem('vidbrief_history', JSON.stringify(history));
    } catch {}
  }, [history]);

  useEffect(() => {
    if (summary) {
      try {
        localStorage.setItem('vidbrief_active_summary', JSON.stringify(summary));
      } catch {}
    }
  }, [summary]);

  useEffect(() => {
    try {
      localStorage.setItem('vidbrief_saved_ids', JSON.stringify(savedVideoIds));
    } catch {}
  }, [savedVideoIds]);

  const saveToHistory = (newSummary: StructuredSummary) => {
    const isBookmarked = savedVideoIds.includes(newSummary.video.id);
    setHistory((prev) => {
      const filtered = prev.filter((item) => item.video.id !== newSummary.video.id);
      return [newSummary, ...filtered].slice(0, 30);
    });
    if (user?.uid) {
      saveSummaryToCloud(user.uid, newSummary, isBookmarked).catch((err) => {
        console.warn('Failed to save summary to cloud:', err);
      });
    }
  };

  const handleDeleteHistoryItem = (videoId: string) => {
    setHistory((prev) => prev.filter((i) => i.video.id !== videoId));
    setSavedVideoIds((prev) => prev.filter((id) => id !== videoId));
    if (user?.uid) {
      deleteSummaryFromCloud(user.uid, videoId).catch((err) => {
        console.warn('Failed to delete summary from cloud:', err);
      });
    }
  };

  const handleStartSummarize = async (options: {
    url: string;
    length?: SummaryLength;
    style?: SummaryStyle;
    language?: OutputLanguage;
    customTranscript?: string;
  }) => {
    setIsLoading(true);
    setErrorMessage(null);
    setProgressStage(1);
    setProgressStageName('Validating video URL and loading metadata');
    setTranscriptMethod('checking');
    setPendingOptions({
      url: options.url,
      length: options.length || 'standard',
      style: options.style || 'professional',
      language: options.language || 'en',
    });

    try {
      const result = await summarizeVideo(
        {
          youtubeUrl: options.url,
          summaryLength: options.length || 'standard',
          style: options.style || 'professional',
          language: options.language || 'en',
          customTranscript: options.customTranscript,
        },
        (stage, name, method) => {
          setProgressStage(stage);
          setProgressStageName(name);
          if (method) setTranscriptMethod(method);
        }
      );

      setSummary(result.summary);
      saveToHistory(result.summary);
      setCurrentNav('home');
      setActiveTab('Summary');
    } catch (err: any) {
      if (err.needsManualTranscript) {
        setPendingVideo(err.video || null);
        setIsManualTranscriptOpen(true);
      } else {
        setErrorMessage(err.message || 'Failed to generate video summary.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualTranscriptSubmit = (transcriptText: string) => {
    if (pendingOptions) {
      handleStartSummarize({
        ...pendingOptions,
        customTranscript: transcriptText,
      });
    }
  };

  const handleToggleSave = async (targetSummary?: StructuredSummary) => {
    const target = targetSummary || summary;
    if (!target) return;
    const vidId = target.video.id;
    const isCurrentlySaved = savedVideoIds.includes(vidId);
    const newSavedStatus = !isCurrentlySaved;

    // Immediate optimistic local update
    setSavedVideoIds((prev) => {
      const next = newSavedStatus ? [...prev, vidId] : prev.filter((id) => id !== vidId);
      try {
        localStorage.setItem('vidbrief_saved_ids', JSON.stringify(next));
      } catch {}
      return next;
    });

    // Ensure it is in history state
    setHistory((prev) => {
      if (newSavedStatus && !prev.some((item) => item.video.id === vidId)) {
        return [target, ...prev];
      }
      return prev;
    });

    // Sync to Firebase Firestore
    if (user?.uid) {
      setIsBookmarkSaving(true);
      try {
        await toggleBookmarkInCloud(user.uid, target, newSavedStatus);
        setToastMessage({
          title: newSavedStatus ? 'Saved to Cloud' : 'Removed from Bookmarks',
          text: newSavedStatus
            ? `“${target.video.title.slice(0, 32)}...” saved to Bookmarked Summaries in Firebase!`
            : `Removed from Bookmarked Summaries in Firebase.`,
          type: 'success',
          iconType: 'bookmark',
        });
      } catch (err) {
        console.error('Failed to update bookmark in Firebase:', err);
        setToastMessage({
          title: 'Sync Notice',
          text: 'Saved locally, but failed to sync to Firebase cloud.',
          type: 'error',
          iconType: 'error',
        });
      } finally {
        setIsBookmarkSaving(false);
      }
    } else {
      setToastMessage({
        title: newSavedStatus ? 'Bookmarked Locally' : 'Removed Bookmark',
        text: newSavedStatus
          ? 'Bookmarked in this session. Sign in with Google to sync with Firebase.'
          : 'Removed from Bookmarked Summaries.',
        type: 'info',
        iconType: 'bookmark',
      });
    }
  };

  const handleShare = () => {
    if (!summary) return;
    if (navigator.share) {
      navigator.share({
        title: summary.video.title,
        text: summary.tldr,
        url: summary.video.url,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(summary.video.url);
      setToastMessage({
        title: 'Link Copied',
        text: 'Video summary URL copied to clipboard!',
        type: 'success',
        iconType: 'link',
      });
    }
  };

  const handleExportMarkdown = () => {
    if (!summary) return;
    try {
      downloadMarkdown(summary);
      setToastMessage({
        title: 'Markdown Exported',
        text: `Downloaded "${summary.video.title.slice(0, 36)}..." as a Markdown (.md) briefing.`,
        type: 'success',
        iconType: 'markdown',
      });
    } catch (err) {
      console.error('Failed to export Markdown:', err);
      setToastMessage({
        title: 'Export Failed',
        text: 'Could not export Markdown file. Please try again.',
        type: 'error',
        iconType: 'error',
      });
    }
  };

  const handleExportPdf = () => {
    if (!summary) return;
    try {
      downloadPdf(summary);
      setToastMessage({
        title: 'PDF Exported',
        text: `Downloaded executive PDF report for "${summary.video.title.slice(0, 36)}...".`,
        type: 'success',
        iconType: 'pdf',
      });
    } catch (err) {
      console.error('Failed to export PDF:', err);
      setToastMessage({
        title: 'Export Failed',
        text: 'Could not export PDF report. Please try again.',
        type: 'error',
        iconType: 'error',
      });
    }
  };

  // Convert history to SavedSummaryRecord format for sidebar
  const recentHistoryRecords = history.map((s) => ({
    id: s.video.id,
    createdAt: s.generatedAt,
    video: s.video,
    summary: s,
  }));

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0D1321] text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-xl animate-pulse">
            <Sparkles className="w-6 h-6 fill-white" />
          </div>
          <div className="flex items-center gap-2.5 text-xs font-semibold text-neutral-400">
            <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            <span>Loading VidBrief.ai...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0A0F1D] flex flex-col items-center justify-center p-4">
        <LoginPage />
      </div>
    );
  }

  return (
    <AppLayout
      currentNav={currentNav}
      onNavigate={(nav) => {
        if (nav === 'new') {
          setCurrentNav('new');
        } else {
          setCurrentNav(nav);
        }
      }}
      recentHistory={recentHistoryRecords}
      activeVideoId={summary?.video?.id}
      onSelectSummary={(sel) => {
        setSummary(sel);
        setCurrentNav('home');
        setActiveTab('Summary');
      }}
      onUpgradeClick={() => setIsPricingOpen(true)}
      onSettingsClick={() => setIsSettingsOpen(true)}
      rightSidebar={
        currentNav === 'new' ? (
          <NewSummaryRightSidebar
            onSelectSample={(sample) => {
              setSummary(sample.summary);
              setCurrentNav('home');
              setActiveTab('Summary');
            }}
            onViewAllHistory={() => setCurrentNav('history')}
            onOpenHelp={() => setIsHistoryModalOpen(true)}
          />
        ) : summary && currentNav === 'home' ? (
          <RightSidebar
            summary={summary}
            onOpenFullChat={() => setIsAskChatOpen(true)}
          />
        ) : undefined
      }
    >
      {/* Global Error Banner */}
      {errorMessage && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 flex items-start gap-3 text-rose-800 dark:text-rose-300 text-xs sm:text-sm">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-600 dark:text-rose-400 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="font-bold">Summary generation notice</p>
            <p className="mt-0.5 font-normal">{errorMessage}</p>
          </div>
          <button
            onClick={() => setErrorMessage(null)}
            className="text-rose-500 hover:text-rose-700 font-semibold text-xs ml-auto cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main View Switcher */}
      {isLoading ? (
        <div className="max-w-3xl mx-auto py-8">
          <ProcessingState
            currentStage={progressStage}
            stageName={progressStageName}
            transcriptMethod={transcriptMethod}
          />
        </div>
      ) : currentNav === 'new' ? (
        /* New Summary Prompt View matching reference design */
        <NewSummaryView
          onSummarize={handleStartSummarize}
          onSelectSample={(vid) => {
            setSummary(vid.summary);
            setCurrentNav('home');
            setActiveTab('Summary');
          }}
          onViewAllExamples={() => setCurrentNav('explore')}
          isLoading={isLoading}
        />
      ) : currentNav === 'history' ? (
        /* History View */
        <div className="space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
            <div>
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
                Summary History
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Browse, search, and reopen all your previously analyzed YouTube videos.
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              {history.length} Saved
            </span>
          </div>

          <HistoryList
            history={recentHistoryRecords}
            savedVideoIds={savedVideoIds}
            onToggleBookmark={(itemSummary) => handleToggleSave(itemSummary)}
            onSelectSummary={(sel) => {
              setSummary(sel);
              setCurrentNav('home');
              setActiveTab('Summary');
            }}
            onDeleteRecord={handleDeleteHistoryItem}
          />
        </div>
      ) : currentNav === 'saved' ? (
        /* Saved / Bookmarked View */
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-200 dark:border-neutral-800">
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                  <Bookmark className="w-5 h-5 text-indigo-600 dark:text-indigo-400 fill-indigo-600 dark:fill-indigo-400" />
                  Bookmarked Summaries
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60">
                  {recentHistoryRecords.filter((rec) => savedVideoIds.includes(rec.video.id)).length} saved
                </span>
                {user?.email && (
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60">
                    <Cloud className="w-3 h-3" />
                    Synced to Firebase
                  </span>
                )}
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                Summaries you've bookmarked for reference. Toggling bookmarks saves them directly to your Firebase Firestore database.
              </p>
            </div>

            {recentHistoryRecords.filter((rec) => savedVideoIds.includes(rec.video.id)).length > 0 && (
              <button
                type="button"
                onClick={() => setCurrentNav('explore')}
                className="self-start sm:self-auto px-3 py-1.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-750 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5 text-indigo-500" />
                <span>Explore more</span>
              </button>
            )}
          </div>

          {recentHistoryRecords.filter((rec) => savedVideoIds.includes(rec.video.id)).length === 0 ? (
            <div className="p-10 sm:p-14 text-center bg-white dark:bg-[#131B2E] rounded-3xl border border-neutral-200 dark:border-neutral-800 space-y-4">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-sm border border-indigo-100 dark:border-indigo-900/60">
                <Bookmark className="w-6 h-6" />
              </div>
              <div className="max-w-md mx-auto space-y-1">
                <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                  No Bookmarked Summaries Yet
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  When viewing any video summary, click the <span className="font-semibold text-neutral-700 dark:text-neutral-300">"Save"</span> bookmark button to store it in your Bookmarked Summaries and sync it to Firebase.
                </p>
              </div>
              <div className="pt-2 flex flex-wrap justify-center gap-2.5">
                {summary && (
                  <button
                    type="button"
                    onClick={() => handleToggleSave(summary)}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                  >
                    <Bookmark className="w-3.5 h-3.5 fill-white" />
                    <span>Bookmark Active Summary</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setCurrentNav('home')}
                  className="px-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-xs font-semibold transition-all cursor-pointer"
                >
                  Go to Active Summary
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentNav('explore')}
                  className="px-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-xs font-semibold transition-all cursor-pointer"
                >
                  Explore Trending Topics
                </button>
              </div>
            </div>
          ) : (
            <HistoryList
              history={recentHistoryRecords.filter((rec) => savedVideoIds.includes(rec.video.id))}
              savedVideoIds={savedVideoIds}
              onToggleBookmark={(itemSummary) => handleToggleSave(itemSummary)}
              onSelectSummary={(sel) => {
                setSummary(sel);
                setCurrentNav('home');
                setActiveTab('Summary');
              }}
              onDeleteRecord={handleDeleteHistoryItem}
            />
          )}
        </div>
      ) : currentNav === 'explore' ? (
        /* Explore View */
        <div className="space-y-6">
          <div className="pb-3 border-b border-neutral-200 dark:border-neutral-800">
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
              Explore Trending Topics
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Discover popular insights and summaries from curated YouTube talks and tutorials.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SAMPLE_VIDEOS.map((vid) => (
              <div
                key={vid.id}
                className="bg-white dark:bg-[#131B2E] rounded-3xl border border-neutral-200/80 dark:border-neutral-800 overflow-hidden shadow-xs hover:border-indigo-300 dark:hover:border-indigo-800/80 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="aspect-video bg-neutral-900 relative overflow-hidden">
                    <img
                      src={vid.thumbnail}
                      alt={vid.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/80 text-white text-[11px] font-mono">
                      {vid.duration}
                    </span>
                  </div>

                  <div className="p-5">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold uppercase tracking-wider mb-2">
                      {vid.category}
                    </span>
                    <h3 className="text-sm font-bold text-neutral-900 dark:text-white line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {vid.title}
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                      {vid.channel}
                    </p>
                    <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-3 line-clamp-2">
                      {vid.summary.tldr}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    type="button"
                    onClick={() => {
                      setSummary(vid.summary);
                      setCurrentNav('home');
                      setActiveTab('Summary');
                    }}
                    className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>View Full Briefing</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : summary ? (
        /* Standard Home Summary Dashboard View matching reference */
        <div className="space-y-6">
          {/* Video Information Card */}
          <VideoInfoCard
            video={summary.video}
            language={summary.language}
            isSaved={savedVideoIds.includes(summary.video.id)}
            isSaving={isBookmarkSaving}
            onSave={() => handleToggleSave(summary)}
            onShare={handleShare}
            onExportPdf={handleExportPdf}
            onExportMarkdown={handleExportMarkdown}
          />

          {/* Navigation Tabs */}
          <SummaryTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            counts={{
              timestamps: summary.sections?.length,
              facts: summary.facts?.length,
              quotes: summary.quotes?.length,
              actionItems: summary.actionItems?.length,
              concepts: summary.concepts?.length,
            }}
          />

          {/* Tab Content Display */}
          <TabContent
            activeTab={activeTab}
            summary={summary}
          />
        </div>
      ) : (
        <div className="p-12 text-center text-neutral-400 text-sm">
          Select a video from your history or click &quot;New Summary&quot; in the sidebar to get started.
        </div>
      )}

      {/* Modals */}
      {summary && (
        <AskVideoChat
          isOpen={isAskChatOpen}
          onClose={() => setIsAskChatOpen(false)}
          summary={summary}
        />
      )}

      <HistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        history={history}
        onSelectSummary={(sel) => {
          setSummary(sel);
          setCurrentNav('home');
          setActiveTab('Summary');
        }}
        onDeleteSummary={handleDeleteHistoryItem}
        onClearHistory={() => setHistory([])}
      />

      <PricingModal
        isOpen={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      <ManualTranscriptModal
        isOpen={isManualTranscriptOpen}
        onClose={() => setIsManualTranscriptOpen(false)}
        video={pendingVideo}
        onSubmitTranscript={handleManualTranscriptSubmit}
      />

      {/* Visual Feedback Toast Notification */}
      {toastMessage && (
        <div
          id="app-toast-notification"
          role="status"
          aria-live="polite"
          className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 max-w-sm sm:max-w-md px-4 py-3 rounded-2xl bg-neutral-900/95 dark:bg-[#131B2E]/95 text-white border border-neutral-700/80 shadow-2xl backdrop-blur-md flex items-start gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          <div
            className={`p-2 rounded-xl shrink-0 mt-0.5 ${
              toastMessage.iconType === 'pdf'
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                : toastMessage.iconType === 'markdown'
                ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                : toastMessage.iconType === 'bookmark'
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                : toastMessage.iconType === 'link'
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                : toastMessage.type === 'success'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : toastMessage.type === 'error'
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                : 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
            }`}
          >
            {toastMessage.iconType === 'pdf' ? (
              <FileText className="w-4 h-4" />
            ) : toastMessage.iconType === 'markdown' ? (
              <FileDown className="w-4 h-4" />
            ) : toastMessage.iconType === 'bookmark' ? (
              <Bookmark className="w-4 h-4 fill-current" />
            ) : toastMessage.iconType === 'link' ? (
              <Copy className="w-4 h-4" />
            ) : toastMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
          </div>

          <div className="flex-1 min-w-0 pr-1">
            {toastMessage.title && (
              <h5 className="text-xs font-bold text-white tracking-tight leading-tight">
                {toastMessage.title}
              </h5>
            )}
            <p className="text-xs text-neutral-300 mt-0.5 leading-relaxed break-words">
              {toastMessage.text}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="p-1 -mr-1 text-neutral-400 hover:text-white rounded-lg transition-colors cursor-pointer shrink-0"
            aria-label="Dismiss toast"
          >
            ✕
          </button>
        </div>
      )}
    </AppLayout>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
