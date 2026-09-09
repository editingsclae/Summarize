import React from 'react';
import { Sparkles, ShieldCheck, Zap, FileText, Globe, MessageSquare, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LoginPage: React.FC = () => {
  const { signIn, signInAsGuest, loading, authError, clearAuthError } = useAuth();
  const [isSigningIn, setIsSigningIn] = React.useState(false);

  const handleGoogleLogin = async () => {
    setIsSigningIn(true);
    clearAuthError();
    try {
      await signIn();
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Side: Product pitch & feature highlights */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/60 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>AI-Powered YouTube Intelligence</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight leading-tight">
              Transform hours of video into{' '}
              <span className="text-indigo-600 dark:text-indigo-400">instant clarity</span>
            </h1>
            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-xl leading-relaxed">
              Sign in to unlock deep executive briefings, timestamped sections, key takeaways, multilingual summaries, and interactive video Q&A.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <FileText className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-bold text-neutral-900 dark:text-white">Structured Reports</h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-normal">
                TL;DR, executive takeaways, timestamped sections, quotes, and action checklists.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <Globe className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-bold text-neutral-900 dark:text-white">Multilingual Translation</h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-normal">
                Summarize or translate seamlessly into Arabic, Spanish, French, German, and Italian.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-2">
              <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950 flex items-center justify-center text-purple-600 dark:text-purple-400">
                <MessageSquare className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-bold text-neutral-900 dark:text-white">Ask Questions Live</h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-normal">
                Chat with any video and get direct answers backed by verified timestamps.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-2">
              <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950 flex items-center justify-center text-amber-600 dark:text-amber-400">
                <Zap className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-bold text-neutral-900 dark:text-white">Cloud Sync & Export</h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-normal">
                Export to executive PDF and keep your saved video briefings synced in Firestore.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Authentication Card */}
        <div className="lg:col-span-5">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">
            <div className="space-y-2 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-600 text-white shadow-md mx-auto mb-2">
                <Sparkles className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight">
                Welcome to VidBrief
              </h2>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Sign in to access video summaries and interactive intelligence tools.
              </p>
            </div>

            {authError && (
              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/70 text-xs text-neutral-800 dark:text-neutral-200 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 font-bold text-amber-800 dark:text-amber-300">
                    <Zap className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                    <span>Firebase Domain Warning</span>
                  </div>
                  <button
                    onClick={clearAuthError}
                    className="font-semibold text-neutral-500 hover:text-neutral-800 dark:hover:text-white text-[11px]"
                  >
                    Dismiss
                  </button>
                </div>
                <p className="text-[11px] text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {authError.includes('unauthorized-domain')
                    ? 'Firebase OAuth restricts localhost until you add "localhost" to Authorized Domains in Firebase Console (Authentication > Settings > Authorized Domains).'
                    : authError}
                </p>
                <button
                  type="button"
                  onClick={() => signInAsGuest()}
                  className="w-full mt-1 py-2 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Enter with Local Mode (No Firebase Needed)</span>
                </button>
              </div>
            )}

            <div className="space-y-3">
              <button
                id="google-signin-btn"
                onClick={handleGoogleLogin}
                disabled={isSigningIn || loading}
                className="w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-semibold text-sm transition-all shadow-sm active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSigningIn ? (
                  <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                )}
                <span>{isSigningIn ? 'Connecting to Google...' : 'Continue with Google'}</span>
              </button>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-neutral-200 dark:border-neutral-800"></div>
                <span className="flex-shrink mx-3 text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">Or Local Development</span>
                <div className="flex-grow border-t border-neutral-200 dark:border-neutral-800"></div>
              </div>

              <button
                type="button"
                onClick={() => signInAsGuest()}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700/80 text-neutral-800 dark:text-neutral-200 font-semibold text-xs sm:text-sm transition-all shadow-xs cursor-pointer active:scale-[0.98]"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-500" />
                  <span>Continue as Guest / Local Dev</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60">
                  Instant Access
                </span>
              </button>

              <div className="pt-2 flex items-center justify-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Protected by Firebase Authentication & Firestore</span>
              </div>
            </div>

            <div className="border-t border-neutral-200 dark:border-neutral-800 pt-4 text-center">
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                By logging in, your video briefings, custom notes, and history will be saved securely to your personal account.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
