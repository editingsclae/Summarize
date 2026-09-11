import React, { useState } from 'react';
import { 
  Sparkles, 
  Sun, 
  Moon, 
  Bell, 
  Menu, 
  ChevronDown, 
  Link2,
  LogOut,
  Settings as SettingsIcon,
  Crown
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
  onOpenMobileSidebar?: () => void;
  onOpenMobileInsights?: () => void;
  hasRightSidebar?: boolean;
  onOpenSettings?: () => void;
  onOpenPricing?: () => void;
  onSummarize?: (url: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMobileSidebar,
  onOpenMobileInsights,
  hasRightSidebar = false,
  onOpenSettings,
  onOpenPricing,
  onSummarize
}) => {
  const [isDark, setIsDark] = useState(() => {
    return document.documentElement.classList.contains('dark');
  });
  const [headerUrl, setHeaderUrl] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const { user, signOut } = useAuth();
  const userName = user?.displayName || 'Firas Alouini';
  const userPhoto = user?.photoURL || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80';

  const setDarkMode = (dark: boolean) => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
      localStorage.setItem('vidbrief_theme', 'dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    } else {
      root.classList.remove('dark');
      localStorage.setItem('vidbrief_theme', 'light');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    }
  };

  const handleHeaderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!headerUrl.trim()) return;
    if (onSummarize) {
      onSummarize(headerUrl.trim());
      setHeaderUrl('');
    }
  };

  return (
    <header className="h-16 px-4 sm:px-6 bg-white/80 dark:bg-[#090D16]/80 backdrop-blur-md border-b border-neutral-200/80 dark:border-neutral-800/80 sticky top-0 z-30 flex items-center justify-between gap-4">
      {/* Left / Hamburger for Mobile */}
      <div className="flex items-center gap-3 lg:hidden">
        <button
          type="button"
          onClick={onOpenMobileSidebar}
          className="p-1.5 rounded-lg text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
          title="Open navigation"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Center Search / Summarize Bar */}
      <div className="flex-1 max-w-xl hidden sm:block">
        <form onSubmit={handleHeaderSubmit} className="relative flex items-center">
          <div className="relative flex-1">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none flex items-center">
              <Link2 className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={headerUrl}
              onChange={(e) => setHeaderUrl(e.target.value)}
              placeholder="Paste a YouTube URL here..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-neutral-50/60 dark:bg-neutral-900/50 border border-neutral-200/80 dark:border-neutral-750 text-xs sm:text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-indigo-500/80 focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={!headerUrl.trim()}
            className="ml-2 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-medium text-xs flex items-center gap-1.5 shadow-2xs active:scale-[0.98] transition-all cursor-pointer shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>Summarize Video</span>
          </button>
        </form>
      </div>

      {/* Right User & Theme Controls */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto">
        {/* Mobile Insights Button */}
        {hasRightSidebar && (
          <button
            type="button"
            onClick={onOpenMobileInsights}
            className="xl:hidden flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200/80 dark:border-indigo-800/80 text-xs font-semibold cursor-pointer"
            title="Open video insights drawer"
          >
            <Sparkles className="w-3.5 h-3.5 fill-current shrink-0" />
            <span className="hidden sm:inline">Insights</span>
          </button>
        )}

        {/* Unified Light/Dark Mode Toggle Button */}
        <button
          type="button"
          onClick={() => setDarkMode(!isDark)}
          className="p-2 rounded-lg text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800/80 transition-colors cursor-pointer border border-transparent hover:border-neutral-200/60 dark:hover:border-neutral-700/60"
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? (
            <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform duration-200" />
          ) : (
            <Moon className="w-4 h-4 text-neutral-600 dark:text-neutral-300 hover:-rotate-12 transition-transform duration-200" />
          )}
        </button>

        {/* Notifications Bell with Red Indicator Dot */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-lg text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800/80 transition-colors relative cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-rose-500 ring-2 ring-white dark:ring-[#090D16]" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-64 rounded-xl bg-white dark:bg-[#0D1321] border border-neutral-200/80 dark:border-neutral-800 shadow-[0_8px_30px_rgba(0,0,0,0.08)] p-3.5 z-30 animate-in fade-in zoom-in-95 duration-150">
              <h4 className="text-xs font-semibold text-neutral-900 dark:text-white mb-1.5">Notifications</h4>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
                Welcome to VidBrief.ai! Paste any YouTube video URL to generate instant structured insights.
              </p>
            </div>
          )}
        </div>

        {/* User Pill / Profile */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors cursor-pointer"
          >
            <img
              src={userPhoto}
              alt={userName}
              className="w-7 h-7 rounded-full object-cover border border-neutral-200 dark:border-neutral-700"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <span className="hidden sm:inline text-xs font-semibold text-neutral-800 dark:text-neutral-200">
              {userName}
            </span>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-52 rounded-xl bg-white dark:bg-[#0D1321] border border-neutral-200/80 dark:border-neutral-800 shadow-[0_8px_30px_rgba(0,0,0,0.08)] py-1.5 z-30 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-2 border-b border-neutral-100 dark:border-neutral-800">
                <p className="text-xs font-semibold text-neutral-900 dark:text-white truncate">{userName}</p>
                <p className="text-[10px] text-neutral-400 truncate">{user?.email || 'firas@example.com'}</p>
              </div>

              <div className="py-1">
                {onOpenPricing && (
                  <button
                    type="button"
                    onClick={() => {
                      setShowUserMenu(false);
                      onOpenPricing();
                    }}
                    className="w-full px-3 py-1.5 text-left text-xs text-amber-600 dark:text-amber-400 font-medium hover:bg-neutral-50 dark:hover:bg-neutral-800/60 flex items-center gap-2"
                  >
                    <Crown className="w-3.5 h-3.5" />
                    <span>Upgrade to Pro</span>
                  </button>
                )}

                {onOpenSettings && (
                  <button
                    type="button"
                    onClick={() => {
                      setShowUserMenu(false);
                      onOpenSettings();
                    }}
                    className="w-full px-3 py-1.5 text-left text-xs text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800/60 flex items-center gap-2"
                  >
                    <SettingsIcon className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Settings</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setShowUserMenu(false);
                    signOut();
                  }}
                  className="w-full px-3 py-1.5 text-left text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
