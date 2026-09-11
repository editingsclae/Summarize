import React, { useState } from 'react';
import { 
  Play, 
  Sparkles, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ArrowLeft,
  Sun,
  Moon,
  Zap, 
  Clock, 
  Target, 
  ShieldCheck, 
  FileText, 
  Lightbulb, 
  BarChart3, 
  CheckCircle2, 
  Star
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface LoginPageProps {
  onNavigateToHome?: () => void;
  onSuccess?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ 
  onNavigateToHome,
  onSuccess 
}) => {
  const { signIn, signInAsGuest, loading, authError, clearAuthError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSigningIn, setIsSigningIn] = useState(false);

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

  const handleEmailSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    const displayName = email.split('@')[0] || 'User';
    signInAsGuest(displayName, email || 'user@vidbrief.ai');
    if (onSuccess) onSuccess();
  };

  const handleGoogleLogin = async () => {
    setIsSigningIn(true);
    clearAuthError();
    try {
      await signIn();
      if (onSuccess) onSuccess();
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleGithubLogin = () => {
    signInAsGuest('GitHub User', 'github.user@vidbrief.ai');
    if (onSuccess) onSuccess();
  };

  const handleGuestLogin = () => {
    signInAsGuest('Firas (Local Dev)', 'firas@localhost');
    if (onSuccess) onSuccess();
  };

  return (
    <div className="min-h-screen w-full bg-white dark:bg-[#090D16] text-neutral-900 dark:text-neutral-100 flex flex-col font-sans transition-colors duration-150 antialiased selection:bg-indigo-500 selection:text-white">
      {/* ========================================================================= */}
      {/* 1. TOP HEADER                                                             */}
      {/* ========================================================================= */}
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between border-b border-neutral-100 dark:border-neutral-850">
        {/* Brand Logo & Back to Home */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onNavigateToHome}
            className="flex items-center gap-2.5 text-left cursor-pointer group"
          >
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-2xs group-hover:bg-indigo-700 transition-colors">
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
          </button>

          {onNavigateToHome && (
            <button
              type="button"
              onClick={onNavigateToHome}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors cursor-pointer pl-3 border-l border-neutral-200 dark:border-neutral-800"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to overview</span>
            </button>
          )}
        </div>

        {/* Top Right: Theme Toggle & Sign up */}
        <div className="flex items-center gap-3">
          {/* Unified Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-lg text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800/80 transition-colors cursor-pointer border border-transparent hover:border-neutral-200/60 dark:border-neutral-700/60"
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          <div className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
            <span>Don't have an account? </span>
            <button
              type="button"
              onClick={handleGuestLogin}
              className="text-neutral-900 dark:text-white font-semibold hover:underline cursor-pointer"
            >
              Sign up
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. MAIN 2-COLUMN LOGIN BODY                                               */}
      {/* ========================================================================= */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* ----------------------------------------------------------------------- */}
        {/* LEFT COLUMN: Pitch, Visual Graphic, Features, Testimonial                */}
        {/* ----------------------------------------------------------------------- */}
        <div className="lg:col-span-7 space-y-7 text-left">
          {/* AI Powered Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-850/80 border border-neutral-200/80 dark:border-neutral-700/80 text-[11px] font-medium text-neutral-700 dark:text-neutral-300 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />
            <span className="tracking-wide">AI-Powered YouTube Intelligence</span>
          </div>

          {/* Headline */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-neutral-950 dark:text-white tracking-[-0.03em] leading-[1.1]">
              Turn YouTube Videos into <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-600 dark:from-indigo-400 dark:via-indigo-300 dark:to-blue-400">
                Actionable Insights
              </span>
            </h1>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-xl leading-relaxed font-normal">
              Save hours of research and get clear, structured summaries with key takeaways, facts, timestamps and more — powered by Google Gemini.
            </p>
          </div>

          {/* 4 Feature Items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            {/* 1. AI-Powered Analysis */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 border border-neutral-200/60 dark:border-neutral-700/60 flex items-center justify-center shrink-0">
                <Zap className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-neutral-900 dark:text-white">AI-Powered Analysis</h4>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Get intelligent, structured summaries in seconds.
                </p>
              </div>
            </div>

            {/* 2. Save Hours */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 border border-neutral-200/60 dark:border-neutral-700/60 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-neutral-900 dark:text-white">Save Hours</h4>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Skip the watching, get the key insights immediately.
                </p>
              </div>
            </div>

            {/* 3. Accurate & Reliable */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 border border-neutral-200/60 dark:border-neutral-700/60 flex items-center justify-center shrink-0">
                <Target className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-neutral-900 dark:text-white">Accurate &amp; Reliable</h4>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Powered by Google Gemini for high-quality results.
                </p>
              </div>
            </div>

            {/* 4. Trusted by Millions */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 border border-neutral-200/60 dark:border-neutral-700/60 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-neutral-900 dark:text-white">100% Secure</h4>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Your data and summaries remain private.
                </p>
              </div>
            </div>
          </div>

          {/* Precision Graphic Illustration (Video + Overlapping Summary Card) */}
          <div className="relative pt-3 pb-1 select-none">
            <div className="relative flex items-center justify-center max-w-lg mx-auto sm:mx-0">
              {/* Tilted Video Card */}
              <div className="w-56 sm:w-64 aspect-video rounded-xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.35)] border border-neutral-200/80 dark:border-neutral-700 relative -rotate-3 bg-neutral-900 shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=640&q=80" 
                  alt="Scenic Video Thumbnail" 
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
                <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/80 font-mono text-[9px] font-semibold text-white leading-none">
                  12:48
                </span>
              </div>

              {/* Overlapping Summary Card */}
              <div className="absolute -right-2 sm:right-4 top-2 w-44 sm:w-48 p-2.5 rounded-xl bg-white dark:bg-[#0D1321] border border-neutral-200/80 dark:border-neutral-800 shadow-[0_8px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.4)] space-y-1.5 z-10">
                <div className="flex items-center gap-2 p-1.5 rounded-lg bg-neutral-50 dark:bg-neutral-850/70 text-neutral-800 dark:text-neutral-200 text-[11px] font-medium">
                  <FileText className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                  <span>Summary</span>
                </div>
                <div className="flex items-center gap-2 p-1.5 rounded-lg bg-neutral-50 dark:bg-neutral-850/70 text-neutral-800 dark:text-neutral-200 text-[11px] font-medium">
                  <Lightbulb className="w-3 h-3 text-amber-500" />
                  <span>Key Takeaways</span>
                </div>
                <div className="flex items-center gap-2 p-1.5 rounded-lg bg-neutral-50 dark:bg-neutral-850/70 text-neutral-800 dark:text-neutral-200 text-[11px] font-medium">
                  <BarChart3 className="w-3 h-3 text-blue-500" />
                  <span>Important Facts</span>
                </div>
                <div className="flex items-center gap-2 p-1.5 rounded-lg bg-neutral-50 dark:bg-neutral-850/70 text-neutral-800 dark:text-neutral-200 text-[11px] font-medium">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                  <span>Action Items</span>
                </div>
              </div>

              {/* Floating "Powered by Google Gemini" badge */}
              <div className="absolute left-6 -bottom-3 px-3 py-1 rounded-lg bg-white dark:bg-[#0D1321] border border-neutral-200/80 dark:border-neutral-800 shadow-xs flex items-center gap-1.5 text-[11px] font-medium text-neutral-700 dark:text-neutral-300 z-10">
                <Sparkles className="w-3 h-3 text-indigo-600 dark:text-indigo-400 fill-current" />
                <span>Powered by <strong className="font-semibold text-neutral-900 dark:text-white">Google Gemini</strong></span>
              </div>
            </div>

            {/* Handwritten Doodle text */}
            <div className="text-center sm:text-right pt-6 sm:pr-14">
              <p 
                style={{ fontFamily: 'Caveat, cursive' }} 
                className="text-indigo-600 dark:text-indigo-400 text-xl font-bold rotate-[-2deg] tracking-wide inline-block"
              >
                Better insights. Faster.
              </p>
            </div>
          </div>

          {/* Testimonial Card */}
          <div className="max-w-md p-3.5 rounded-xl bg-neutral-50/60 dark:bg-neutral-900/40 border border-neutral-200/70 dark:border-neutral-800/80 space-y-2">
            <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
              &quot;VidBrief.ai is indispensable. I can scan 2-hour technical talks and get all the core takeaways in minutes.&quot;
            </p>
            <div className="flex items-center justify-between pt-0.5">
              <div className="flex items-center gap-2">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80" 
                  alt="Ahmed K." 
                  className="w-5 h-5 rounded-full object-cover"
                />
                <div>
                  <p className="text-xs font-semibold text-neutral-900 dark:text-white leading-none">Ahmed K.</p>
                  <p className="text-[10px] text-neutral-400 mt-0.5">Product Engineer</p>
                </div>
              </div>
              <div className="flex items-center gap-0.5 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* RIGHT COLUMN: The Login Card                                            */}
        {/* ----------------------------------------------------------------------- */}
        <div className="lg:col-span-5 flex justify-center w-full">
          <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0D1321] border border-neutral-200/90 dark:border-neutral-800 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-none space-y-6 text-center">
            {/* Card Header */}
            <div className="space-y-1.5 text-center">
              <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white mb-2 shadow-2xs">
                <Play className="w-4 h-4 fill-white translate-x-0.2" />
              </div>
              <h2 className="text-2xl font-bold text-neutral-950 dark:text-white tracking-tight">
                Welcome back
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                Sign in to your account to continue
              </p>
            </div>

            {/* Firebase Warning Notification */}
            {authError && (
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-left text-xs text-neutral-800 dark:text-neutral-200 space-y-1">
                <div className="flex items-center justify-between font-semibold text-amber-800 dark:text-amber-300">
                  <span>Firebase Domain Notice</span>
                  <button onClick={clearAuthError} className="text-neutral-400 hover:text-neutral-700 text-[10px]">
                    Dismiss
                  </button>
                </div>
                <p className="text-[11px] text-neutral-600 dark:text-neutral-300">
                  {authError.includes('unauthorized-domain') 
                    ? 'Firebase requires adding localhost to authorized domains. Use Instant Access below!' 
                    : authError}
                </p>
              </div>
            )}

            {/* Email & Password Form */}
            <form onSubmit={handleEmailSignIn} className="space-y-4 text-left">
              {/* Email Address */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full pl-9 pr-3.5 py-2 rounded-lg border border-neutral-200/90 dark:border-neutral-750 bg-neutral-50/50 dark:bg-neutral-900/50 text-xs sm:text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-indigo-500/80 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full pl-9 pr-9 py-2 rounded-lg border border-neutral-200/90 dark:border-neutral-750 bg-neutral-50/50 dark:bg-neutral-900/50 text-xs sm:text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-indigo-500/80 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-xs pt-0.5">
                <label className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-3.5 h-3.5 rounded border-neutral-300 text-indigo-600 focus:ring-indigo-500 accent-indigo-600"
                  />
                  <span>Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={handleGuestLogin}
                  className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>

              {/* Primary Sign In Button */}
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100 font-medium text-xs sm:text-sm shadow-2xs active:scale-[0.98] transition-all cursor-pointer mt-1"
              >
                <span>Sign in</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* OR Divider */}
            <div className="relative my-3">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-200/80 dark:border-neutral-800" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-white dark:bg-[#0D1321] text-neutral-400 font-medium uppercase tracking-wider text-[10px]">
                  OR
                </span>
              </div>
            </div>

            {/* Social Logins & Dev Instant Access */}
            <div className="space-y-2">
              {/* Continue with Google */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isSigningIn || loading}
                className="w-full flex items-center justify-center gap-2.5 px-4 py-2 rounded-lg border border-neutral-200/90 dark:border-neutral-750 hover:bg-neutral-50 dark:hover:bg-neutral-800/80 text-neutral-800 dark:text-neutral-200 font-medium text-xs sm:text-sm transition-all shadow-2xs active:scale-[0.98] disabled:opacity-60 cursor-pointer"
              >
                {isSigningIn ? (
                  <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
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

              {/* Continue with GitHub */}
              <button
                type="button"
                onClick={handleGithubLogin}
                className="w-full flex items-center justify-center gap-2.5 px-4 py-2 rounded-lg border border-neutral-200/90 dark:border-neutral-750 hover:bg-neutral-50 dark:hover:bg-neutral-800/80 text-neutral-800 dark:text-neutral-200 font-medium text-xs sm:text-sm transition-all shadow-2xs active:scale-[0.98] cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>Continue with GitHub</span>
              </button>

              {/* Dev Mode Instant Guest Access */}
              <button
                type="button"
                onClick={handleGuestLogin}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-indigo-50/70 dark:bg-indigo-950/40 hover:bg-indigo-100/80 dark:hover:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-semibold text-xs sm:text-sm border border-indigo-200/70 dark:border-indigo-800/60 transition-all shadow-2xs active:scale-[0.98] cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 fill-current" />
                <span>Instant Access (Guest Mode)</span>
              </button>
            </div>

            {/* Terms and Privacy Policy Note */}
            <p className="text-[11px] text-neutral-400 dark:text-neutral-500 pt-1 leading-relaxed">
              By continuing, you agree to our{' '}
              <a href="#terms" className="underline hover:text-neutral-600 dark:hover:text-neutral-300">Terms of Service</a>
              {' '}and{' '}
              <a href="#privacy" className="underline hover:text-neutral-600 dark:hover:text-neutral-300">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
