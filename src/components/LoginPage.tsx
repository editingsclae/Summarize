import React, { useState } from 'react';
import { 
  Play, 
  Sparkles, 
  Link as LinkIcon, 
  ArrowRight, 
  Check, 
  Sun, 
  Moon, 
  Zap, 
  Clock, 
  Target, 
  ShieldCheck, 
  FileText, 
  Lightbulb, 
  Quote as QuoteIcon, 
  CheckCircle2, 
  Bookmark, 
  Compass, 
  Settings, 
  History as HistoryIcon, 
  PlusCircle, 
  Share2, 
  ExternalLink,
  X,
  Lock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { PricingModal } from './PricingModal';

interface LoginPageProps {
  onStartSummarize?: (url: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onStartSummarize }) => {
  const { signIn, signInAsGuest, loading, authError, clearAuthError } = useAuth();
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [authIntentUrl, setAuthIntentUrl] = useState<string | null>(null);

  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem('vidbrief_theme') || localStorage.getItem('theme');
    return saved === 'dark';
  });

  const toggleTheme = () => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.remove('dark');
      localStorage.setItem('vidbrief_theme', 'light');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      root.classList.add('dark');
      localStorage.setItem('vidbrief_theme', 'dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!youtubeUrl.trim()) {
      setIsAuthModalOpen(true);
      return;
    }
    setAuthIntentUrl(youtubeUrl.trim());
    setIsAuthModalOpen(true);
  };

  const handleGoogleLogin = async () => {
    setIsSigningIn(true);
    clearAuthError();
    try {
      await signIn();
      if (authIntentUrl && onStartSummarize) {
        onStartSummarize(authIntentUrl);
      }
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleGuestLogin = () => {
    signInAsGuest('Guest User', 'guest@vidbrief.ai');
    if (authIntentUrl && onStartSummarize) {
      onStartSummarize(authIntentUrl);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] dark:bg-[#0A0F1D] text-neutral-900 dark:text-neutral-100 flex flex-col font-sans transition-colors duration-200">
      {/* ========================================================================= */}
      {/* 1. TOP NAVBAR                                                             */}
      {/* ========================================================================= */}
      <header className="w-full bg-white/90 dark:bg-[#0D1321]/90 backdrop-blur-md border-b border-neutral-200/80 dark:border-neutral-800/80 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#2563EB] flex items-center justify-center text-white shadow-sm shadow-blue-500/30">
              <Play className="w-4 h-4 fill-white text-white translate-x-0.2" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 leading-none">
                <span className="font-bold text-lg tracking-tight text-neutral-900 dark:text-white font-display">
                  VidBrief.ai
                </span>
                <span className="px-1.5 py-0.2 rounded bg-[#2563EB] text-white text-[10px] font-bold tracking-normal">
                  Pro
                </span>
              </div>
              <p className="text-[10px] text-neutral-400 mt-0.5 font-medium tracking-normal">
                YouTube Video Summarizer
              </p>
            </div>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-600 dark:text-neutral-300">
            <a 
              href="#home" 
              className="relative text-indigo-600 dark:text-indigo-400 font-bold py-1"
            >
              Home
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-full" />
            </a>
            <a 
              href="#features" 
              className="hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              className="hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              How It Works
            </a>
            <button
              type="button"
              onClick={() => setIsPricingModalOpen(true)}
              className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Pricing
            </button>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-xl text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors cursor-pointer"
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Sign In Button */}
            <button
              type="button"
              onClick={() => setIsAuthModalOpen(true)}
              className="hidden sm:inline-flex px-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs sm:text-sm font-semibold text-neutral-700 dark:text-neutral-200 transition-all cursor-pointer"
            >
              Sign In
            </button>

            {/* Get Started Free Button */}
            <button
              type="button"
              onClick={() => setIsAuthModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-600/20 active:scale-98 transition-all cursor-pointer"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. HERO SECTION                                                           */}
      {/* ========================================================================= */}
      <main className="flex-1 w-full relative overflow-hidden">
        {/* Soft Ambient Radial Background Glows */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-indigo-200/30 via-purple-200/20 to-transparent dark:from-indigo-900/15 dark:via-purple-900/10 dark:to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-20 relative">
          {/* Subtle Sparkle Stars */}
          <span className="absolute top-16 right-[18%] text-indigo-300 dark:text-indigo-600 text-xl select-none pointer-events-none hidden lg:block">✦</span>
          <span className="absolute top-36 right-[8%] text-indigo-200 dark:text-indigo-700 text-sm select-none pointer-events-none hidden lg:block">✦</span>
          <span className="absolute top-48 left-[12%] text-indigo-200 dark:text-indigo-700 text-sm select-none pointer-events-none hidden lg:block">✦</span>

          {/* Hero Header Pill & Title */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            {/* AI Powered Badge */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/60 text-xs font-bold text-indigo-600 dark:text-indigo-400 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              <span>AI POWERED</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-900 dark:text-white tracking-tight leading-[1.12]">
              Turn YouTube Videos into <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                Actionable Insights
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 max-w-xl mx-auto leading-relaxed">
              Get professional, structured summaries with key takeaways, facts, timestamps and more — powered by <strong className="font-semibold text-neutral-900 dark:text-white">Google Gemini</strong>.
            </p>

            {/* URL Input Form & Summarize Button */}
            <div className="pt-2 max-w-2xl mx-auto">
              <form 
                onSubmit={handleHeroSubmit}
                className="flex flex-col sm:flex-row items-center gap-2 p-2 rounded-2xl bg-white dark:bg-[#131B2E] border border-neutral-200/90 dark:border-neutral-700/80 shadow-xl shadow-indigo-500/5 focus-within:ring-2 focus-within:ring-indigo-500/30 transition-all"
              >
                <div className="flex items-center gap-3 flex-1 w-full px-3 py-1.5">
                  <LinkIcon className="w-4 h-4 text-neutral-400 shrink-0" />
                  <input
                    type="url"
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    placeholder="Paste a YouTube URL here..."
                    className="w-full bg-transparent text-xs sm:text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-600/25 active:scale-98 transition-all shrink-0 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 fill-current" />
                  <span>Summarize Video</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* FLOATING LEFT & RIGHT ELEMENTS (Desktop)                                   */}
          {/* ========================================================================= */}
          {/* Floating Left: Handwritten note + Tilted Video Card */}
          <div className="hidden lg:block absolute left-4 xl:left-8 top-28 z-20 pointer-events-none select-none">
            {/* Handwritten Doodle */}
            <div className="relative mb-2 ml-4">
              <p 
                style={{ fontFamily: 'Caveat, cursive' }} 
                className="text-indigo-600 dark:text-indigo-400 text-xl font-bold -rotate-6 tracking-wide"
              >
                Paste any <br /> YouTube video
              </p>
              {/* Curved SVG Arrow pointing to the video card */}
              <svg 
                className="w-8 h-8 text-indigo-400 dark:text-indigo-500 ml-12 -mt-1" 
                viewBox="0 0 40 40" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M10 5 C 18 18, 26 24, 28 32" />
                <path d="M22 30 L 28 32 L 29 25" />
              </svg>
            </div>

            {/* Tilted Floating Video Card */}
            <div className="w-64 aspect-video rounded-2xl overflow-hidden shadow-2xl border-2 border-white dark:border-neutral-700 relative -rotate-6 bg-neutral-900 group">
              <img 
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=640&q=80" 
                alt="Scenic YouTube Video" 
                className="w-full h-full object-cover"
              />
              {/* YouTube Red Corner Badge */}
              <div className="absolute top-2.5 left-2.5 w-7 h-7 rounded-lg bg-[#FF0000] flex items-center justify-center text-white shadow-md">
                <Play className="w-3.5 h-3.5 fill-white text-white translate-x-0.2" />
              </div>
              {/* Centered Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-neutral-900 shadow-lg">
                  <Play className="w-4 h-4 fill-neutral-900 translate-x-0.2" />
                </div>
              </div>
              {/* Duration Badge */}
              <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 font-mono text-[10px] font-bold text-white leading-none">
                12:48
              </div>
            </div>
          </div>

          {/* Floating Right: Handwritten note + Stack of Insight Cards */}
          <div className="hidden lg:block absolute right-4 xl:right-8 top-28 z-20 pointer-events-none select-none">
            {/* Handwritten Doodle */}
            <div className="relative mb-2 text-right mr-4">
              <p 
                style={{ fontFamily: 'Caveat, cursive' }} 
                className="text-indigo-600 dark:text-indigo-400 text-xl font-bold rotate-6 tracking-wide"
              >
                Get a complete <br /> AI summary
              </p>
              {/* Curved SVG Arrow pointing to the insight stack */}
              <svg 
                className="w-8 h-8 text-indigo-400 dark:text-indigo-500 ml-auto mr-8 -mt-1" 
                viewBox="0 0 40 40" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M30 5 C 22 18, 14 24, 12 32" />
                <path d="M18 30 L 12 32 L 11 25" />
              </svg>
            </div>

            {/* Stacked Insight Cards */}
            <div className="w-56 space-y-2 rotate-3">
              {/* 1. Key Takeaways */}
              <div className="p-2.5 rounded-xl bg-white dark:bg-[#131B2E] border border-amber-200/80 dark:border-amber-900/50 shadow-md flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-500 flex items-center justify-center shrink-0">
                  <Lightbulb className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">Key Takeaways</span>
              </div>

              {/* 2. Important Facts */}
              <div className="p-2.5 rounded-xl bg-white dark:bg-[#131B2E] border border-blue-200/80 dark:border-blue-900/50 shadow-md flex items-center gap-2.5 translate-x-3">
                <div className="w-6 h-6 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-500 flex items-center justify-center shrink-0">
                  <FileText className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">Important Facts</span>
              </div>

              {/* 3. Action Items */}
              <div className="p-2.5 rounded-xl bg-white dark:bg-[#131B2E] border border-emerald-200/80 dark:border-emerald-900/50 shadow-md flex items-center gap-2.5 -translate-x-1">
                <div className="w-6 h-6 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-500 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">Action Items</span>
              </div>

              {/* 4. Quotes */}
              <div className="p-2.5 rounded-xl bg-white dark:bg-[#131B2E] border border-purple-200/80 dark:border-purple-900/50 shadow-md flex items-center gap-2.5 translate-x-2">
                <div className="w-6 h-6 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-500 flex items-center justify-center shrink-0">
                  <QuoteIcon className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">Quotes</span>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 3. VALUE PROPS HORIZONTAL BAR                                             */}
          {/* ========================================================================= */}
          <div className="mt-14 pt-8 border-t border-neutral-200/70 dark:border-neutral-800/80 max-w-5xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {/* Item 1 */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-neutral-900 dark:text-white">AI-Powered Analysis</h4>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">Powered by Google Gemini</p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-neutral-900 dark:text-white">Save Hours</h4>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">Get key insights in seconds</p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                  <Target className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-neutral-900 dark:text-white">Structured Summaries</h4>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">Organized & easy to read</p>
                </div>
              </div>

              {/* Item 4 */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-neutral-900 dark:text-white">100% Secure</h4>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">Your data stays private</p>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 4. PRODUCT SHOWCASE & EVERYTHING YOU NEED IN ONE PLACE                    */}
          {/* ========================================================================= */}
          <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center max-w-6xl mx-auto">
            {/* Left: High-Fidelity Dashboard Mockup Preview */}
            <div className="lg:col-span-8 rounded-2xl sm:rounded-3xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-[#0D1321] shadow-2xl overflow-hidden text-left">
              {/* Browser Window Bar */}
              <div className="px-4 py-2.5 bg-neutral-100/80 dark:bg-neutral-900/80 border-b border-neutral-200/70 dark:border-neutral-800 flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="text-[10px] text-neutral-400 font-mono ml-2">vidbrief.ai/dashboard</span>
              </div>

              {/* Mockup App Interface */}
              <div className="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-neutral-200/80 dark:divide-neutral-800">
                {/* Mini Sidebar */}
                <div className="w-full sm:w-48 p-3 bg-neutral-50/70 dark:bg-[#090D17] shrink-0 space-y-4 text-left">
                  {/* Brand */}
                  <div className="flex items-center gap-1.5 px-1">
                    <div className="w-5 h-5 rounded-md bg-[#2563EB] flex items-center justify-center text-white">
                      <Play className="w-2.5 h-2.5 fill-white" />
                    </div>
                    <span className="font-bold text-xs text-neutral-900 dark:text-white">VidBrief.ai</span>
                    <span className="px-1 rounded bg-[#2563EB] text-white text-[8px] font-bold">Pro</span>
                  </div>

                  {/* Navigation Items */}
                  <div className="space-y-1">
                    <div className="px-2 py-1.5 rounded-lg bg-[#2563EB] text-white text-[11px] font-bold flex items-center gap-2">
                      <FileText className="w-3 h-3" />
                      <span>Home</span>
                    </div>
                    <div className="px-2 py-1.5 rounded-lg text-neutral-600 dark:text-neutral-400 text-[11px] font-medium flex items-center gap-2">
                      <PlusCircle className="w-3 h-3" />
                      <span>New Summary</span>
                    </div>
                    <div className="px-2 py-1.5 rounded-lg text-neutral-600 dark:text-neutral-400 text-[11px] font-medium flex items-center gap-2">
                      <HistoryIcon className="w-3 h-3" />
                      <span>History</span>
                    </div>
                    <div className="px-2 py-1.5 rounded-lg text-neutral-600 dark:text-neutral-400 text-[11px] font-medium flex items-center gap-2">
                      <Bookmark className="w-3 h-3" />
                      <span>Saved</span>
                    </div>
                    <div className="px-2 py-1.5 rounded-lg text-neutral-600 dark:text-neutral-400 text-[11px] font-medium flex items-center gap-2">
                      <Compass className="w-3 h-3" />
                      <span>Explore</span>
                    </div>
                    <div className="px-2 py-1.5 rounded-lg text-neutral-600 dark:text-neutral-400 text-[11px] font-medium flex items-center gap-2">
                      <Settings className="w-3 h-3" />
                      <span>Settings</span>
                    </div>
                  </div>

                  {/* Recent Summaries */}
                  <div className="pt-2 border-t border-neutral-200/80 dark:border-neutral-800 space-y-1.5">
                    <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider px-1">Recent Summaries</p>
                    <div className="p-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-[10px] font-semibold text-neutral-800 dark:text-neutral-200 truncate">
                      The Future of AI
                    </div>
                    <div className="p-1.5 rounded-lg text-[10px] text-neutral-500 dark:text-neutral-400 truncate">
                      How to Build a Startup
                    </div>
                    <div className="p-1.5 rounded-lg text-[10px] text-neutral-500 dark:text-neutral-400 truncate">
                      Clean Energy Explained
                    </div>
                  </div>
                </div>

                {/* Main Mock Content */}
                <div className="flex-1 p-4 space-y-3 bg-white dark:bg-[#0D1321]">
                  {/* Mini Header Search */}
                  <div className="flex items-center justify-between gap-2 pb-2 border-b border-neutral-100 dark:border-neutral-800">
                    <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-[10px] text-neutral-400 flex-1">
                      <LinkIcon className="w-3 h-3" />
                      <span>Paste a YouTube URL here...</span>
                    </div>
                    <div className="px-2.5 py-1 rounded-lg bg-[#2563EB] text-white text-[10px] font-bold flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" />
                      <span>Summarize Video</span>
                    </div>
                  </div>

                  {/* Video Overview Row */}
                  <div className="flex flex-col sm:flex-row gap-3 items-start">
                    <div className="w-full sm:w-36 aspect-video rounded-xl overflow-hidden bg-neutral-900 relative shrink-0">
                      <img 
                        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=360&q=80" 
                        alt="Thumbnail" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-6 h-6 rounded-full bg-white/90 flex items-center justify-center text-neutral-900">
                          <Play className="w-2.5 h-2.5 fill-neutral-900" />
                        </div>
                      </div>
                      <span className="absolute bottom-1 right-1 px-1 rounded bg-black/80 font-mono text-[8px] text-white">42:17</span>
                    </div>

                    <div className="min-w-0 flex-1 space-y-1">
                      <h4 className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-white line-clamp-2">
                        The Future of Artificial Intelligence | Opportunities, Risks & What's Next
                      </h4>
                      <div className="flex items-center gap-2 text-[10px] text-neutral-500">
                        <span className="font-semibold text-neutral-700 dark:text-neutral-300">Kurzgesagt – In a Nutshell</span>
                        <span>•</span>
                        <span>2.4M views</span>
                      </div>
                      <div className="flex items-center gap-2 pt-1">
                        <span className="px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold text-[9px]">
                          ▶ Open on YouTube
                        </span>
                        <span className="px-2 py-0.5 rounded border border-neutral-200 dark:border-neutral-700 text-[9px] text-neutral-600 dark:text-neutral-300">
                          Save
                        </span>
                        <span className="px-2 py-0.5 rounded border border-neutral-200 dark:border-neutral-700 text-[9px] text-neutral-600 dark:text-neutral-300">
                          Share
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Mini Stats Bar */}
                  <div className="grid grid-cols-4 gap-2 py-1.5 px-2 rounded-xl bg-neutral-50 dark:bg-neutral-850/50 border border-neutral-200/80 dark:border-neutral-800 text-center">
                    <div>
                      <p className="text-[8px] text-neutral-400">Language</p>
                      <p className="text-[10px] font-bold text-neutral-800 dark:text-neutral-200">English</p>
                    </div>
                    <div>
                      <p className="text-[8px] text-neutral-400">Duration</p>
                      <p className="text-[10px] font-bold text-neutral-800 dark:text-neutral-200">42:17</p>
                    </div>
                    <div>
                      <p className="text-[8px] text-neutral-400">Views</p>
                      <p className="text-[10px] font-bold text-neutral-800 dark:text-neutral-200">2.4M</p>
                    </div>
                    <div>
                      <p className="text-[8px] text-neutral-400">Likes</p>
                      <p className="text-[10px] font-bold text-neutral-800 dark:text-neutral-200">125K</p>
                    </div>
                  </div>

                  {/* Mini Tabs Preview */}
                  <div className="flex items-center gap-3 text-[10px] font-semibold border-b border-neutral-200/70 dark:border-neutral-800 pb-1 text-neutral-500 overflow-x-auto no-scrollbar">
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold">Summary</span>
                    <span>Transcript</span>
                    <span>Timestamps</span>
                    <span>Key Facts</span>
                    <span>Quotes</span>
                    <span>Action Items</span>
                    <span>Concepts</span>
                    <span>Pros & Cons</span>
                  </div>

                  {/* Mini TL;DR Card */}
                  <div className="p-3 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200/70 dark:border-indigo-900/50 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-1">
                        <Zap className="w-3 h-3 fill-current" />
                        TL;DR
                      </span>
                      <span className="text-[9px] font-mono text-neutral-400">2 min read</span>
                    </div>
                    <p className="text-[10px] text-neutral-700 dark:text-neutral-300 leading-relaxed">
                      AI is rapidly transforming industries, creating new opportunities while also bringing significant risks. The video explores the current state of AI, its potential benefits and challenges, and what individuals and society need to do to prepare for the future.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Everything You Need in One Place Card */}
            <div className="lg:col-span-4 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#131B2E] border border-neutral-200/90 dark:border-neutral-800 shadow-xl space-y-6 text-left">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shadow-xs">
                <Sparkles className="w-5 h-5 fill-current" />
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 dark:text-white tracking-tight leading-tight">
                  Everything You Need <br />
                  in One Place
                </h3>
              </div>

              {/* Feature Checklist */}
              <ul className="space-y-3 text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-300">
                <li className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span>Executive summaries</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span>Key takeaways</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span>Important facts & data</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span>Chapters & timestamps</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span>Quotes & action items</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span>AI Q&A</span>
                </li>
              </ul>

              {/* Start Summarizing Button */}
              <button
                type="button"
                onClick={() => setIsAuthModalOpen(true)}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-sm shadow-lg shadow-indigo-600/25 active:scale-98 transition-all cursor-pointer"
              >
                <span>Start Summarizing Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 5. TRUSTED BY LOGOS BAR                                                   */}
          {/* ========================================================================= */}
          <div className="mt-20 pt-8 border-t border-neutral-200/70 dark:border-neutral-800/80 text-center max-w-4xl mx-auto space-y-4">
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
              Trusted by learners, professionals and creators
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-60 dark:opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
              {/* YouTube */}
              <div className="flex items-center gap-1.5 font-bold text-sm text-neutral-800 dark:text-neutral-200">
                <Play className="w-4 h-4 fill-red-600 text-red-600" />
                <span>YouTube</span>
              </div>
              {/* Google */}
              <div className="flex items-center gap-1.5 font-bold text-sm text-neutral-800 dark:text-neutral-200">
                <span className="text-blue-500 font-extrabold">G</span>
                <span>Google</span>
              </div>
              {/* OpenAI */}
              <div className="flex items-center gap-1.5 font-bold text-sm text-neutral-800 dark:text-neutral-200">
                <Sparkles className="w-4 h-4 text-emerald-500" />
                <span>OpenAI</span>
              </div>
              {/* Notion */}
              <div className="flex items-center gap-1.5 font-bold text-sm text-neutral-800 dark:text-neutral-200 font-mono">
                <span className="w-4 h-4 rounded bg-neutral-900 text-white flex items-center justify-center text-[10px]">N</span>
                <span>Notion</span>
              </div>
              {/* Microsoft */}
              <div className="flex items-center gap-1.5 font-bold text-sm text-neutral-800 dark:text-neutral-200">
                <div className="grid grid-cols-2 gap-0.5 w-3.5 h-3.5">
                  <div className="bg-red-500 rounded-[1px]" />
                  <div className="bg-green-500 rounded-[1px]" />
                  <div className="bg-blue-500 rounded-[1px]" />
                  <div className="bg-yellow-500 rounded-[1px]" />
                </div>
                <span>Microsoft</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ========================================================================= */}
      {/* AUTH MODAL DIALOG                                                         */}
      {/* ========================================================================= */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-md bg-white dark:bg-[#131B2E] border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 relative text-center">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsAuthModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl text-neutral-400 hover:text-neutral-800 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-[#2563EB] text-white flex items-center justify-center mx-auto shadow-md shadow-blue-500/30">
                <Play className="w-5 h-5 fill-white text-white translate-x-0.2" />
              </div>
              <h3 className="text-2xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
                Welcome to VidBrief.ai
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                Sign in to analyze YouTube videos and unlock structured executive briefings.
              </p>
            </div>

            {/* Firebase Auth Error Warning */}
            {authError && (
              <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-left text-xs text-neutral-800 dark:text-neutral-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-800 dark:text-amber-300">Firebase Domain Notice</span>
                  <button
                    onClick={clearAuthError}
                    className="text-neutral-400 hover:text-neutral-700 text-[10px]"
                  >
                    Dismiss
                  </button>
                </div>
                <p className="text-[11px] text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  Firebase requires adding &quot;localhost&quot; to authorized domains. You can use instant guest access below with no setup needed!
                </p>
              </div>
            )}

            {/* Buttons */}
            <div className="space-y-3 pt-2">
              {/* Google Sign In */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isSigningIn || loading}
                className="w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-2xl border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-semibold text-sm transition-all shadow-2xs active:scale-[0.98] disabled:opacity-60 cursor-pointer"
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
                <span>Continue with Google</span>
              </button>

              {/* Instant Guest / Local Mode */}
              <button
                type="button"
                onClick={handleGuestLogin}
                className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-sm shadow-md shadow-indigo-600/25 active:scale-[0.98] transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 fill-current" />
                <span>Instant Access (Guest Mode)</span>
              </button>
            </div>

            <p className="text-[11px] text-neutral-400">
              No credit card required. Free tier includes full briefing tools.
            </p>
          </div>
        </div>
      )}

      {/* Pricing Modal */}
      <PricingModal
        isOpen={isPricingModalOpen}
        onClose={() => setIsPricingModalOpen(false)}
      />
    </div>
  );
};
