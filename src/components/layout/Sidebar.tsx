import React from 'react';
import { 
  Home, 
  PlusCircle, 
  History as HistoryIcon, 
  Bookmark, 
  Compass, 
  Settings, 
  Crown, 
  Check, 
  ChevronRight, 
  Sparkles,
  Play,
  X
} from 'lucide-react';
import { RecentSummaries } from '../history/RecentSummaries';
import { SavedSummaryRecord, StructuredSummary } from '../../types/summary';

export type NavItem = 'home' | 'new' | 'history' | 'saved' | 'explore' | 'settings';

interface SidebarProps {
  currentNav: NavItem;
  onNavigate: (nav: NavItem) => void;
  recentHistory: SavedSummaryRecord[];
  activeVideoId?: string;
  onSelectSummary: (summary: StructuredSummary) => void;
  onUpgradeClick: () => void;
  onSettingsClick: () => void;
  onCloseMobile?: () => void;
  user?: {
    name?: string;
    email?: string;
    avatarUrl?: string;
  } | null;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentNav,
  onNavigate,
  recentHistory,
  activeVideoId,
  onSelectSummary,
  onUpgradeClick,
  onSettingsClick,
  onCloseMobile,
  user
}) => {
  const userName = user?.name || 'Firas Alouini';
  const userEmail = user?.email || 'firas@example.com';
  const userInitials = userName.slice(0, 2).toUpperCase();

  const navItems = [
    { id: 'home' as NavItem, label: 'Home', icon: Home },
    { id: 'new' as NavItem, label: 'New Summary', icon: PlusCircle },
    { id: 'history' as NavItem, label: 'History', icon: HistoryIcon },
    { id: 'saved' as NavItem, label: 'Saved', icon: Bookmark },
    { id: 'explore' as NavItem, label: 'Explore', icon: Compass },
    { id: 'settings' as NavItem, label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-full h-full bg-white dark:bg-[#0D1321] text-neutral-900 dark:text-white flex flex-col justify-between select-none border-r border-neutral-200/80 dark:border-neutral-800/80 shrink-0">
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6 no-scrollbar">
        {/* Brand Header */}
        <div className="px-2 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#2563EB] flex items-center justify-center text-white shadow-sm shadow-blue-500/30">
                <Play className="w-4 h-4 fill-white text-white translate-x-0.2" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg tracking-tight text-neutral-900 dark:text-white font-display">
                  VidBrief.ai
                </span>
                <span className="px-1.5 py-0.2 rounded bg-[#2563EB] text-white text-[10px] font-bold tracking-normal">
                  Pro
                </span>
              </div>
            </div>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1 font-medium tracking-normal pl-0.5">
              YouTube Video Summarizer
            </p>
          </div>

          {/* Mobile Close Button */}
          {onCloseMobile && (
            <button
              type="button"
              onClick={onCloseMobile}
              className="lg:hidden p-2 rounded-xl text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              title="Close navigation"
              aria-label="Close navigation"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentNav === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  if (item.id === 'settings') {
                    onSettingsClick();
                  } else {
                    onNavigate(item.id);
                  }
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#2563EB] text-white shadow-sm shadow-blue-600/30'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-800/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Divider */}
        <div className="border-t border-neutral-200/80 dark:border-neutral-800/80 my-2" />

        {/* Recent Summaries List */}
        <RecentSummaries
          history={recentHistory}
          activeVideoId={activeVideoId}
          onSelectSummary={onSelectSummary}
          onViewAll={() => onNavigate('history')}
        />

        {/* Upgrade to Pro Card */}
        <div className="p-4 rounded-3xl bg-gradient-to-br from-indigo-50/90 via-purple-50/50 to-white dark:from-indigo-950/70 dark:via-neutral-900 dark:to-purple-950/50 border border-indigo-200/90 dark:border-indigo-500/30 shadow-xs dark:shadow-indigo-950/30 text-left">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Crown className="w-3.5 h-3.5 fill-amber-500 dark:fill-amber-400" />
            </div>
            <h4 className="text-xs font-bold text-neutral-900 dark:text-white tracking-tight">
              Upgrade to Pro
            </h4>
          </div>

          <ul className="space-y-1.5 text-[11px] text-neutral-600 dark:text-neutral-300 mb-3.5">
            <li className="flex items-center gap-1.5">
              <Check className="w-3 h-3 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <span>Unlimited summaries</span>
            </li>
            <li className="flex items-center gap-1.5">
              <Check className="w-3 h-3 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <span>PDF & Markdown export</span>
            </li>
            <li className="flex items-center gap-1.5">
              <Check className="w-3 h-3 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <span>Advanced AI analysis</span>
            </li>
            <li className="flex items-center gap-1.5">
              <Check className="w-3 h-3 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <span>Ask questions about videos</span>
            </li>
          </ul>

          <button
            type="button"
            onClick={onUpgradeClick}
            className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/20 transition-all cursor-pointer active:scale-98"
          >
            <span>Upgrade Now</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* User Profile Section at Bottom */}
      <div className="p-3 border-t border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/70 dark:bg-[#090D17]">
        <button
          type="button"
          onClick={onSettingsClick}
          className="w-full flex items-center justify-between p-2 rounded-2xl hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors text-left cursor-pointer group"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src={user?.avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80'}
              alt={userName}
              className="w-8 h-8 rounded-full object-cover border border-neutral-200 dark:border-neutral-700 shrink-0"
            />
            <div className="min-w-0">
              <p className="text-xs font-bold text-neutral-800 dark:text-neutral-200 group-hover:text-neutral-950 dark:group-hover:text-white truncate">
                {userName}
              </p>
              <p className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate">
                {userEmail}
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-600 dark:text-neutral-500 dark:group-hover:text-neutral-300" />
        </button>
      </div>
    </aside>
  );
};
