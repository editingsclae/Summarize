import React, { useState } from 'react';
import { Sparkles, Clock, Settings, Zap, Plus, ShieldCheck, LogOut, LogIn, User as UserIcon } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onNewSummary: () => void;
  onOpenHistory: () => void;
  onOpenSettings: () => void;
  onOpenPricing: () => void;
  historyCount: number;
  currentView: 'landing' | 'summary' | 'login';
}

export const Navbar: React.FC<NavbarProps> = ({
  onNewSummary,
  onOpenHistory,
  onOpenSettings,
  onOpenPricing,
  historyCount,
  currentView,
}) => {
  const { user, signOut, signIn } = useAuth();
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const getInitials = () => {
    if (user?.displayName) {
      return user.displayName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();
    }
    if (user?.email) {
      return user.email.slice(0, 2).toUpperCase();
    }
    return 'VB';
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200/80 dark:border-neutral-800/80 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md transition-colors no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <button
            id="nav-brand-btn"
            onClick={onNewSummary}
            className="flex items-center gap-2.5 group text-left focus:outline-none cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg tracking-tight text-neutral-900 dark:text-white font-sans">
                  VidBrief<span className="text-indigo-600 dark:text-indigo-400">.ai</span>
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-semibold tracking-wide bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60 rounded">
                  PRO
                </span>
              </div>
            </div>
          </button>

          {/* Desktop Nav Links (Visible when logged in) */}
          {user && (
            <nav className="hidden md:flex items-center gap-1">
              <button
                id="nav-new-summary-btn"
                onClick={onNewSummary}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  currentView === 'landing'
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/70 dark:bg-indigo-950/40'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900'
                }`}
              >
                <Plus className="w-4 h-4" />
                New Summary
              </button>

              <button
                id="nav-history-btn"
                onClick={onOpenHistory}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors cursor-pointer"
              >
                <Clock className="w-4 h-4" />
                History
                {historyCount > 0 && (
                  <span className="ml-1 px-1.5 py-0.2 text-[11px] font-semibold bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-full">
                    {historyCount}
                  </span>
                )}
              </button>

              <button
                id="nav-pricing-btn"
                onClick={onOpenPricing}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors cursor-pointer"
              >
                <Zap className="w-4 h-4 text-amber-500" />
                Plans
              </button>
            </nav>
          )}
        </div>

        {/* Right Action Tools */}
        <div className="flex items-center gap-2.5">
          <ThemeToggle />

          <button
            id="nav-settings-btn"
            onClick={onOpenSettings}
            className="flex items-center justify-center w-9 h-9 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            title="Settings & Preferences"
            aria-label="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* User Profile / Status */}
          {user ? (
            <div className="relative pl-2 border-l border-neutral-200 dark:border-neutral-800">
              <button
                id="user-profile-menu-btn"
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center gap-2 focus:outline-none cursor-pointer rounded-lg p-1 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'User'}
                    className="w-8 h-8 rounded-full border border-neutral-200 dark:border-neutral-700 object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-semibold text-xs shadow-inner">
                    {getInitials()}
                  </div>
                )}
                <div className="text-left hidden lg:block">
                  <p className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 leading-none truncate max-w-[130px]">
                    {user.displayName || user.email?.split('@')[0] || 'User'}
                  </p>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-0.5">
                    <ShieldCheck className="w-3 h-3" /> Signed In
                  </span>
                </div>
              </button>

              {/* User Dropdown */}
              {showUserDropdown && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-xl p-1.5 z-50 animate-in fade-in duration-150"
                  onClick={() => setShowUserDropdown(false)}
                >
                  <div className="px-3 py-2 border-b border-neutral-100 dark:border-neutral-800 mb-1">
                    <p className="text-xs font-bold text-neutral-900 dark:text-white truncate">
                      {user.displayName || 'VidBrief User'}
                    </p>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">
                      {user.email}
                    </p>
                  </div>

                  <button
                    onClick={onOpenHistory}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-left cursor-pointer"
                  >
                    <Clock className="w-3.5 h-3.5 text-neutral-500" />
                    <span>My Saved Briefings ({historyCount})</span>
                  </button>

                  <button
                    onClick={onOpenSettings}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-left cursor-pointer"
                  >
                    <Settings className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Account Settings</span>
                  </button>

                  <div className="border-t border-neutral-100 dark:border-neutral-800 mt-1 pt-1">
                    <button
                      id="sign-out-btn"
                      onClick={() => signOut()}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors text-left font-medium cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              id="nav-signin-btn"
              onClick={() => signIn()}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors shadow-xs cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
