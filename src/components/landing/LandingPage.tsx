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
  BarChart3
} from 'lucide-react';
import { PricingModal } from '../PricingModal';

interface LandingPageProps {
  onNavigateToLogin: (pendingUrl?: string) => void;
  onStartSummarize?: (url: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ 
  onNavigateToLogin,
}) => {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);

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
    onNavigateToLogin(youtubeUrl.trim() || undefined);
  };

  return (
    <div className="min-h-screen w-full bg-white dark:bg-[#090D16] text-neutral-900 dark:text-neutral-100 flex flex-col font-sans transition-colors duration-150 antialiased selection:bg-indigo-500 selection:text-white">
      {/* ========================================================================= */}
      {/* 1. TOP NAVBAR                                                             */}
      {/* ========================================================================= */}
      <header className="w-full bg-white/80 dark:bg-[#090D16]/80 backdrop-blur-md border-b border-neutral-200/80 dark:border-neutral-800/80 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-2xs">
              <Play className="w-3.5 h-3.5 fill-white text-white translate-x-0.2" />
            </div>
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-semibold text-base tracking-tight text-neutral-900 dark:text-white">
                VidBrief.ai
              </span>
              <span className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 text-[10px] font-medium border border-neutral-200/60 dark:border-neutral-700/60">
                Pro
              </span>
            </div>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-600 dark:text-neutral-400">
            <a 
              href="#home" 
              className="text-neutral-900 dark:text-white font-semibold py-1 transition-colors"
            >
              Home
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
          <div className="flex items-center gap-2.5">
            {/* Unified Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-lg text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800/80 transition-colors cursor-pointer border border-transparent hover:border-neutral-200/60 dark:hover:border-neutral-700/60"
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Sign In Button */}
            <button
              type="button"
              onClick={() => onNavigateToLogin()}
              className="hidden sm:inline-flex px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800/80 transition-all cursor-pointer"
            >
              Sign In
            </button>

            {/* Get Started Free CTA */}
            <button
              type="button"
              onClick={() => onNavigateToLogin()}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100 font-medium text-xs sm:text-sm shadow-2xs active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. HERO SECTION                                                           */}
      {/* ========================================================================= */}
      <main className="flex-1 w-full relative overflow-hidden" id="home">
        {/* Subtle Radial Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[360px] bg-gradient-to-b from-indigo-100/40 via-purple-50/20 to-transparent dark:from-indigo-950/20 dark:via-transparent dark:to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-16 sm:pb-20 relative">
          {/* Hero Header */}
          <div className="text-center max-w-2xl mx-auto space-y-4">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-850/80 border border-neutral-200/80 dark:border-neutral-700/80 text-[11px] font-medium text-neutral-700 dark:text-neutral-300 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />
              <span className="tracking-wide">AI-Powered YouTube Intelligence</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-neutral-950 dark:text-white tracking-[-0.03em] leading-[1.08]">
              Turn YouTube Videos into <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-600 dark:from-indigo-400 dark:via-indigo-300 dark:to-blue-400">
                Actionable Insights
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-lg mx-auto leading-relaxed font-normal">
              Get professional, structured summaries with key takeaways, facts, timestamps and more — powered by Google Gemini.
            </p>

            {/* URL Input Form */}
            <div className="pt-2 max-w-xl mx-auto">
              <form 
                onSubmit={handleHeroSubmit}
                className="flex flex-col sm:flex-row items-center gap-2 p-1.5 rounded-xl bg-white dark:bg-[#0D1321] border border-neutral-200/90 dark:border-neutral-750 shadow-[0_2px_12px_rgba(0,0,0,0.04)] dark:shadow-none focus-within:border-indigo-500/80 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all"
              >
                <div className="flex items-center gap-2.5 flex-1 w-full px-3 py-1.5">
                  <LinkIcon className="w-4 h-4 text-neutral-400 shrink-0" />
                  <input
                    type="url"
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    placeholder="Paste a YouTube URL here..."
                    className="w-full bg-transparent text-xs sm:text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 sm:py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-medium text-xs sm:text-sm shadow-2xs active:scale-[0.98] transition-all shrink-0 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 fill-current" />
                  <span>Summarize Video</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* FLOATING LEFT & RIGHT ELEMENTS (Desktop)                                   */}
          {/* ========================================================================= */}
          {/* Floating Left: Annotation + Video Card */}
          <div className="hidden lg:block absolute left-4 xl:left-8 top-28 z-20 pointer-events-none select-none">
            <div className="relative mb-2 ml-4">
              <p 
                style={{ fontFamily: 'Caveat, cursive' }} 
                className="text-indigo-600 dark:text-indigo-400 text-xl font-bold -rotate-6 tracking-wide"
              >
                Paste any <br /> YouTube video
              </p>
              <svg 
                className="w-7 h-7 text-indigo-400 dark:text-indigo-500 ml-12 -mt-1" 
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

            {/* Precision Video Card */}
            <div className="w-60 aspect-video rounded-xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] border border-neutral-200/80 dark:border-neutral-700 relative -rotate-3 bg-neutral-900 group">
              <img 
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=640&q=80" 
                alt="Scenic Video Preview" 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 w-6 h-6 rounded-md bg-[#FF0000] flex items-center justify-center text-white shadow-xs">
                <Play className="w-3 h-3 fill-white text-white translate-x-0.2" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-9 h-9 rounded-full bg-white/95 backdrop-blur-xs flex items-center justify-center text-neutral-900 shadow-md">
                  <Play className="w-3.5 h-3.5 fill-neutral-900 translate-x-0.2" />
                </div>
              </div>
              <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/80 font-mono text-[9px] font-semibold text-white leading-none">
                12:48
              </div>
            </div>
          </div>

          {/* Floating Right: Annotation + Stack of Insight Cards */}
          <div className="hidden lg:block absolute right-4 xl:right-8 top-28 z-20 pointer-events-none select-none">
            <div className="relative mb-2 text-right mr-4">
              <p 
                style={{ fontFamily: 'Caveat, cursive' }} 
                className="text-indigo-600 dark:text-indigo-400 text-xl font-bold rotate-6 tracking-wide"
              >
                Get a complete <br /> AI summary
              </p>
              <svg 
                className="w-7 h-7 text-indigo-400 dark:text-indigo-500 ml-auto mr-8 -mt-1" 
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

            {/* Precision Stack of Cards */}
            <div className="w-52 space-y-1.5 rotate-2">
              <div className="p-2 rounded-lg bg-white/95 dark:bg-[#0D1321]/95 border border-neutral-200/80 dark:border-neutral-800 shadow-xs flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-amber-50 dark:bg-amber-950/60 text-amber-500 flex items-center justify-center shrink-0">
                  <Lightbulb className="w-3 h-3" />
                </div>
                <span className="text-xs font-medium text-neutral-800 dark:text-neutral-200">Key Takeaways</span>
              </div>

              <div className="p-2 rounded-lg bg-white/95 dark:bg-[#0D1321]/95 border border-neutral-200/80 dark:border-neutral-800 shadow-xs flex items-center gap-2 translate-x-2">
                <div className="w-5 h-5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-500 flex items-center justify-center shrink-0">
                  <BarChart3 className="w-3 h-3" />
                </div>
                <span className="text-xs font-medium text-neutral-800 dark:text-neutral-200">Important Facts</span>
              </div>

              <div className="p-2 rounded-lg bg-white/95 dark:bg-[#0D1321]/95 border border-neutral-200/80 dark:border-neutral-800 shadow-xs flex items-center gap-2 -translate-x-1">
                <div className="w-5 h-5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-500 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3 h-3" />
                </div>
                <span className="text-xs font-medium text-neutral-800 dark:text-neutral-200">Action Items</span>
              </div>

              <div className="p-2 rounded-lg bg-white/95 dark:bg-[#0D1321]/95 border border-neutral-200/80 dark:border-neutral-800 shadow-xs flex items-center gap-2 translate-x-1.5">
                <div className="w-5 h-5 rounded-md bg-purple-50 dark:bg-purple-950/60 text-purple-500 flex items-center justify-center shrink-0">
                  <QuoteIcon className="w-3 h-3" />
                </div>
                <span className="text-xs font-medium text-neutral-800 dark:text-neutral-200">Quotes</span>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 3. VALUE PROPS HORIZONTAL BAR                                             */}
          {/* ========================================================================= */}
          <div className="mt-14 pt-8 border-t border-neutral-200/80 dark:border-neutral-800/80 max-w-5xl mx-auto" id="features">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {/* Item 1 */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 border border-neutral-200/60 dark:border-neutral-700/60 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-neutral-900 dark:text-white">AI-Powered Analysis</h4>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">Powered by Google Gemini</p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 border border-neutral-200/60 dark:border-neutral-700/60 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-neutral-900 dark:text-white">Save Hours</h4>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">Get key insights in seconds</p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 border border-neutral-200/60 dark:border-neutral-700/60 flex items-center justify-center shrink-0">
                  <Target className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-neutral-900 dark:text-white">Structured Summaries</h4>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">Organized &amp; easy to read</p>
                </div>
              </div>

              {/* Item 4 */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 border border-neutral-200/60 dark:border-neutral-700/60 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-neutral-900 dark:text-white">100% Secure</h4>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">Your data stays private</p>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 4. PRODUCT SHOWCASE & EVERYTHING YOU NEED IN ONE PLACE                    */}
          {/* ========================================================================= */}
          <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center max-w-6xl mx-auto" id="how-it-works">
            {/* Left: Engineered Dashboard Mockup Preview */}
            <div className="lg:col-span-8 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-[#0B101D] shadow-[0_12px_40px_-10px_rgba(0,0,0,0.06)] dark:shadow-[0_12px_40px_-10px_rgba(0,0,0,0.35)] overflow-hidden text-left">
              {/* Window Bar */}
              <div className="px-4 py-2 bg-neutral-50 dark:bg-[#080C14] border-b border-neutral-200/80 dark:border-neutral-800 flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                <span className="text-[10px] text-neutral-400 dark:text-neutral-500 font-mono ml-2">vidbrief.ai/app</span>
              </div>

              {/* Mockup App Interface */}
              <div className="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-neutral-200/80 dark:divide-neutral-800">
                {/* Mini Sidebar */}
                <div className="w-full sm:w-44 p-3 bg-neutral-50/50 dark:bg-[#090D16] shrink-0 space-y-3.5 text-left">
                  <div className="flex items-center gap-1.5 px-1">
                    <div className="w-4 h-4 rounded bg-indigo-600 flex items-center justify-center text-white">
                      <Play className="w-2 h-2 fill-white" />
                    </div>
                    <span className="font-semibold text-[11px] text-neutral-900 dark:text-white">VidBrief.ai</span>
                    <span className="px-1 rounded bg-neutral-200 dark:bg-neutral-800 text-[8px] font-medium text-neutral-600 dark:text-neutral-300">Pro</span>
                  </div>

                  <div className="space-y-0.5">
                    <div className="px-2 py-1.5 rounded-md bg-neutral-200/70 dark:bg-neutral-800 text-neutral-900 dark:text-white text-[10px] font-semibold flex items-center gap-2">
                      <FileText className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                      <span>Home</span>
                    </div>
                    <div className="px-2 py-1.5 rounded-md text-neutral-600 dark:text-neutral-400 text-[10px] font-medium flex items-center gap-2">
                      <PlusCircle className="w-3 h-3" />
                      <span>New Summary</span>
                    </div>
                    <div className="px-2 py-1.5 rounded-md text-neutral-600 dark:text-neutral-400 text-[10px] font-medium flex items-center gap-2">
                      <HistoryIcon className="w-3 h-3" />
                      <span>History</span>
                    </div>
                    <div className="px-2 py-1.5 rounded-md text-neutral-600 dark:text-neutral-400 text-[10px] font-medium flex items-center gap-2">
                      <Bookmark className="w-3 h-3" />
                      <span>Saved</span>
                    </div>
                    <div className="px-2 py-1.5 rounded-md text-neutral-600 dark:text-neutral-400 text-[10px] font-medium flex items-center gap-2">
                      <Compass className="w-3 h-3" />
                      <span>Explore</span>
                    </div>
                    <div className="px-2 py-1.5 rounded-md text-neutral-600 dark:text-neutral-400 text-[10px] font-medium flex items-center gap-2">
                      <Settings className="w-3 h-3" />
                      <span>Settings</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-neutral-200/80 dark:border-neutral-800 space-y-1">
                    <p className="text-[9px] font-medium text-neutral-400 uppercase tracking-wider px-1">Recent</p>
                    <div className="p-1 rounded bg-neutral-200/60 dark:bg-neutral-800/60 text-[9px] font-medium text-neutral-800 dark:text-neutral-200 truncate">
                      The Future of AI
                    </div>
                    <div className="p-1 text-[9px] text-neutral-500 dark:text-neutral-400 truncate">
                      How to Build a Startup
                    </div>
                  </div>
                </div>

                {/* Main Mock Content */}
                <div className="flex-1 p-4 space-y-3 bg-white dark:bg-[#0B101D]">
                  {/* Video Overview Row */}
                  <div className="flex flex-col sm:flex-row gap-3 items-start">
                    <div className="w-full sm:w-32 aspect-video rounded-lg overflow-hidden bg-neutral-900 relative shrink-0">
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
                      <h4 className="font-semibold text-xs text-neutral-900 dark:text-white line-clamp-2">
                        The Future of Artificial Intelligence | Opportunities, Risks &amp; What's Next
                      </h4>
                      <div className="flex items-center gap-1.5 text-[10px] text-neutral-500">
                        <span className="font-medium text-neutral-700 dark:text-neutral-300">Kurzgesagt – In a Nutshell</span>
                        <span>•</span>
                        <span>2.4M views</span>
                      </div>
                    </div>
                  </div>

                  {/* Mini Metric Bar */}
                  <div className="grid grid-cols-4 gap-1.5 py-1.5 px-2 rounded-lg bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800 text-center">
                    <div>
                      <p className="text-[8px] text-neutral-400">Language</p>
                      <p className="text-[10px] font-semibold text-neutral-800 dark:text-neutral-200">English</p>
                    </div>
                    <div>
                      <p className="text-[8px] text-neutral-400">Duration</p>
                      <p className="text-[10px] font-semibold text-neutral-800 dark:text-neutral-200">42:17</p>
                    </div>
                    <div>
                      <p className="text-[8px] text-neutral-400">Views</p>
                      <p className="text-[10px] font-semibold text-neutral-800 dark:text-neutral-200">2.4M</p>
                    </div>
                    <div>
                      <p className="text-[8px] text-neutral-400">Likes</p>
                      <p className="text-[10px] font-semibold text-neutral-800 dark:text-neutral-200">125K</p>
                    </div>
                  </div>

                  {/* Mini TL;DR Card */}
                  <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200/80 dark:border-neutral-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                        <Zap className="w-3 h-3 fill-current" />
                        Executive TL;DR
                      </span>
                      <span className="text-[9px] font-mono text-neutral-400">2 min read</span>
                    </div>
                    <p className="text-[10px] text-neutral-600 dark:text-neutral-300 leading-relaxed">
                      AI is rapidly transforming industries, creating new opportunities while also bringing significant risks. The briefing explores the current state of foundational models, practical implications, and key action steps.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Everything You Need in One Place Card */}
            <div className="lg:col-span-4 p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0B101D] border border-neutral-200/90 dark:border-neutral-800 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-none space-y-6 text-left">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shadow-2xs">
                <Sparkles className="w-4 h-4 fill-current" />
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white tracking-tight leading-tight">
                  Everything You Need <br />
                  in One Place
                </h3>
              </div>

              {/* Feature Checklist */}
              <ul className="space-y-2.5 text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-300">
                <li className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span>Executive summaries</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span>Key takeaways</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span>Important facts &amp; data</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span>Chapters &amp; timestamps</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span>Quotes &amp; action items</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span>Interactive AI Q&amp;A</span>
                </li>
              </ul>

              {/* Start Summarizing Button */}
              <button
                type="button"
                onClick={() => onNavigateToLogin()}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100 font-medium text-sm shadow-2xs active:scale-[0.99] transition-all cursor-pointer"
              >
                <span>Start Summarizing Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 5. TRUSTED BY LOGOS BAR                                                   */}
          {/* ========================================================================= */}
          <div className="mt-20 pt-8 border-t border-neutral-200/80 dark:border-neutral-800/80 text-center max-w-4xl mx-auto space-y-4">
            <p className="text-[11px] font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
              Trusted by learners, professionals and creators
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-50 dark:opacity-40 grayscale hover:grayscale-0 hover:opacity-90 transition-all duration-200">
              {/* YouTube */}
              <div className="flex items-center gap-1.5 font-semibold text-xs text-neutral-800 dark:text-neutral-200">
                <Play className="w-3.5 h-3.5 fill-red-600 text-red-600" />
                <span>YouTube</span>
              </div>
              {/* Google */}
              <div className="flex items-center gap-1.5 font-semibold text-xs text-neutral-800 dark:text-neutral-200">
                <span className="text-blue-500 font-bold">G</span>
                <span>Google</span>
              </div>
              {/* OpenAI */}
              <div className="flex items-center gap-1.5 font-semibold text-xs text-neutral-800 dark:text-neutral-200">
                <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                <span>OpenAI</span>
              </div>
              {/* Notion */}
              <div className="flex items-center gap-1.5 font-semibold text-xs text-neutral-800 dark:text-neutral-200 font-mono">
                <span className="w-3.5 h-3.5 rounded bg-neutral-900 text-white flex items-center justify-center text-[9px]">N</span>
                <span>Notion</span>
              </div>
              {/* Microsoft */}
              <div className="flex items-center gap-1.5 font-semibold text-xs text-neutral-800 dark:text-neutral-200">
                <div className="grid grid-cols-2 gap-0.5 w-3 h-3">
                  <div className="bg-red-500 rounded-[0.5px]" />
                  <div className="bg-green-500 rounded-[0.5px]" />
                  <div className="bg-blue-500 rounded-[0.5px]" />
                  <div className="bg-yellow-500 rounded-[0.5px]" />
                </div>
                <span>Microsoft</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Pricing Modal */}
      <PricingModal
        isOpen={isPricingModalOpen}
        onClose={() => setIsPricingModalOpen(false)}
      />
    </div>
  );
};
