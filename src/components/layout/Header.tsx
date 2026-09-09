import React, { useState } from 'react';
import { 
  Sparkles, 
  Sun, 
  Moon, 
  Bell, 
  Menu, 
  ChevronDown, 
  User as UserIcon,
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
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMobileSidebar,
  onOpenMobileInsights,
  hasRightSidebar = false,
  onOpenSettings,
  onOpenPricing,
}) => {
  const [isDark, setIsDark] = useState(() => {
    return document.documentElement.classList.contains('dark');
  });
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const { user, signOut } = useAuth();
  const userName = user?.displayName || 'Firas Alouini';
  const userInitials = userName.slice(0, 2).toUpperCase();

  const toggleTheme = () => {
    const root = document.documentElement;
    if (root.classList.contains('dark')) {
      root.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDark(false);
    } else {
      root.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDark(true);
    }
  };

  return (
    <header className="h-18 px-4 sm:px-6 bg-white/90 dark:bg-[#0D1321]/90 backdrop-blur-md border-b border-neutral-200/80 dark:border-neutral-800/80 sticky top-0 z-30 flex items-center justify-between gap-4">
      {/* Left / Hamburger for Mobile */}
      <div className="flex items-center gap-3 lg:hidden">
        <button
          type="button"
          onClick={onOpenMobileSidebar}
          className="p-2 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          title="Open navigation"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 max-w-2xl" />

      {/* Right User & Theme Controls */}
      <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
        {/* Mobile Insights Button (visible on tablet/mobile when insights available) */}
        {hasRightSidebar && (
          <button
            type="button"
            onClick={onOpenMobileInsights}
            className="xl:hidden flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/40 transition-colors text-xs font-semibold cursor-pointer"
            title="Open video insights drawer"
          >
            <Sparkles className="w-3.5 h-3.5 fill-current shrink-0" />
            <span className="hidden sm:inline">Insights</span>
          </button>
        )}

        {/* Theme Toggle Button */}
        <button
          type="button"
          onClick={toggleTheme}
          className="p-2.5 rounded-xl text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2.5 rounded-xl text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors relative cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-indigo-500 ring-2 ring-white dark:ring-[#0D1321]" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-[#131B2E] border border-neutral-200 dark:border-neutral-800 shadow-xl p-3 z-30">
              <h4 className="text-xs font-bold text-neutral-900 dark:text-white mb-2">Notifications</h4>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                Welcome to VidBrief.ai! Paste any YouTube video to generate instant structured summaries.
              </p>
            </div>
          )}
        </div>

        {/* User Pill / Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-2xl hover:bg-neutral-100 dark:hover:bg-neutral-800/80 transition-colors cursor-pointer"
          >
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={userName}
                className="w-7 h-7 rounded-full object-cover border border-neutral-300 dark:border-neutral-700"
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white text-[11px] font-bold shadow-xs">
                {userInitials}
              </div>
            )}
            <span className="hidden md:inline text-xs font-bold text-neutral-800 dark:text-neutral-200">
              {userName}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-neutral-400 hidden sm:inline" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-white dark:bg-[#131B2E] border border-neutral-200 dark:border-neutral-800 shadow-xl py-2 z-30">
              <div className="px-3.5 py-2 border-b border-neutral-100 dark:border-neutral-800">
                <p className="text-xs font-bold text-neutral-900 dark:text-white truncate">{userName}</p>
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
                    className="w-full px-3.5 py-2 text-left text-xs text-amber-600 dark:text-amber-400 font-semibold hover:bg-neutral-50 dark:hover:bg-neutral-800/60 flex items-center gap-2"
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
                    className="w-full px-3.5 py-2 text-left text-xs text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800/60 flex items-center gap-2"
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
                  className="w-full px-3.5 py-2 text-left text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2"
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
