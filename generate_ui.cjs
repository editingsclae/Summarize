const fs = require('fs');
const path = require('path');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

ensureDir('src/components/layout');
ensureDir('src/components/video');
ensureDir('src/components/summary');
ensureDir('src/components/insights');

// Write AppLayout.tsx
fs.writeFileSync('src/components/layout/AppLayout.tsx', `
import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { RightSidebar } from './RightSidebar';
import { Menu } from 'lucide-react';

interface AppLayoutProps {
  children: React.ReactNode;
  rightSidebarContent?: React.ReactNode;
}

export function AppLayout({ children, rightSidebarContent }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#F8FAFC] dark:bg-neutral-950 overflow-hidden font-sans">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Left Sidebar */}
      <div className={\`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 \${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}\`}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen min-w-0">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <div className="flex-1 overflow-auto">
          <div className="flex flex-col lg:flex-row max-w-[1600px] mx-auto w-full">
            {/* Center Content */}
            <main className="flex-1 p-4 lg:p-8 min-w-0">
              {children}
            </main>

            {/* Right Sidebar */}
            {rightSidebarContent && (
              <aside className="w-full lg:w-[360px] xl:w-[400px] p-4 lg:p-8 lg:pl-0 flex-shrink-0">
                <div className="sticky top-8">
                  {rightSidebarContent}
                </div>
              </aside>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
`);

// Write Sidebar.tsx
fs.writeFileSync('src/components/layout/Sidebar.tsx', `
import React from 'react';
import { Home, FileVideo, History, Bookmark, Compass, Settings, Check, X, Play } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function Sidebar({ onClose }: { onClose?: () => void }) {
  const { user } = useAuth();
  
  return (
    <div className="h-full bg-[#1A1F2C] text-white flex flex-col">
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
            <Play className="w-4 h-4 text-white fill-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">VidBrief<span className="text-indigo-400">.ai</span></h1>
            <p className="text-[10px] text-slate-400">YouTube Video Summarizer</p>
          </div>
        </div>
        <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="px-4 py-2 flex-1 overflow-y-auto space-y-1">
        <NavItem icon={Home} label="Home" active />
        <NavItem icon={FileVideo} label="New Summary" />
        <NavItem icon={History} label="History" />
        <NavItem icon={Bookmark} label="Saved" />
        <NavItem icon={Compass} label="Explore" />
        <NavItem icon={Settings} label="Settings" />

        <div className="mt-8 mb-4 px-3 flex items-center justify-between">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Recent Summaries</h3>
          <button className="text-xs text-indigo-400 hover:text-indigo-300">View all</button>
        </div>

        <div className="space-y-3 px-1">
          <RecentItem title="The Future of AI" time="42:17" ago="2 hours ago" />
          <RecentItem title="How to Build a Startup" time="18:32" ago="5 hours ago" />
          <RecentItem title="Clean Energy Explained" time="28:16" ago="1 day ago" />
          <RecentItem title="The Psychology of Money" time="12:45" ago="2 days ago" />
        </div>
      </div>

      <div className="p-4">
        <div className="bg-gradient-to-br from-indigo-900 to-[#1A1F2C] rounded-2xl p-4 border border-indigo-800/50 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3 opacity-20">
            <div className="w-16 h-16 bg-indigo-500 blur-2xl rounded-full" />
          </div>
          <div className="relative z-10">
            <div className="text-amber-400 mb-1 text-lg">👑</div>
            <h4 className="font-bold text-white mb-3">Upgrade to Pro</h4>
            <ul className="space-y-2 mb-4">
              <li className="flex items-center gap-2 text-xs text-slate-300"><Check className="w-3.5 h-3.5 text-indigo-400" /> Unlimited summaries</li>
              <li className="flex items-center gap-2 text-xs text-slate-300"><Check className="w-3.5 h-3.5 text-indigo-400" /> PDF & Markdown export</li>
              <li className="flex items-center gap-2 text-xs text-slate-300"><Check className="w-3.5 h-3.5 text-indigo-400" /> Advanced AI analysis</li>
            </ul>
            <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-medium transition-colors shadow-inner shadow-white/10">
              Upgrade Now →
            </button>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3 px-2">
          {user ? (
            <>
              <img src={user.photoURL || 'https://ui-avatars.com/api/?name=User'} alt="User" className="w-10 h-10 rounded-full border border-slate-700" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{user.displayName || 'User'}</p>
                <p className="text-xs text-slate-400 truncate">{user.email}</p>
              </div>
            </>
          ) : (
            <div className="flex-1">
              <button className="w-full text-left text-sm font-medium text-white">Sign In</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function NavItem({ icon: Icon, label, active }: { icon: any, label: string, active?: boolean }) {
  return (
    <button className={\`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 \${active ? 'bg-indigo-600/20 text-indigo-400' : 'text-slate-300 hover:bg-white/5 hover:text-white'}\`}>
      <Icon className={\`w-5 h-5 \${active ? 'text-indigo-400' : 'text-slate-400'}\`} />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}

function RecentItem({ title, time, ago }: { title: string, time: string, ago: string }) {
  return (
    <button className="w-full flex items-center gap-3 text-left group">
      <div className="w-12 h-8 rounded bg-slate-800 flex-shrink-0 overflow-hidden relative border border-slate-700 group-hover:border-indigo-500 transition-colors">
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-800 to-slate-700" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium text-slate-200 truncate group-hover:text-white transition-colors">{title}</p>
        <p className="text-[10px] text-slate-500">{time} • {ago}</p>
      </div>
    </button>
  );
}
`);

// Header
fs.writeFileSync('src/components/layout/Header.tsx', `
import React, { useState } from 'react';
import { Menu, Search, Bell, Sparkles } from 'lucide-react';
import { ThemeToggle } from '../ThemeToggle';
import { useAuth } from '../../context/AuthContext';

export function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const { user } = useAuth();
  const [url, setUrl] = useState('');

  return (
    <header className="h-20 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 px-4 lg:px-8 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4 flex-1">
        <button onClick={onMenuClick} className="lg:hidden p-2 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800">
          <Menu className="w-5 h-5" />
        </button>
        
        <div className="max-w-2xl w-full flex items-center gap-2">
          <div className="relative flex-1 group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-neutral-400 group-focus-within:text-indigo-500 transition-colors" />
            </div>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="block w-full pl-10 pr-4 py-3 border border-neutral-200 dark:border-neutral-700 rounded-2xl leading-5 bg-neutral-50 dark:bg-neutral-800 placeholder-neutral-400 focus:outline-none focus:bg-white dark:focus:bg-neutral-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm shadow-sm"
              placeholder="Paste a YouTube URL here..."
            />
          </div>
          <button className="hidden sm:flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-medium shadow-md shadow-indigo-600/20 transition-all active:scale-95">
            <Sparkles className="w-4 h-4" />
            Summarize Video
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-5 ml-4">
        <ThemeToggle />
        <button className="relative p-2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-neutral-900"></span>
        </button>
        {user && (
          <div className="hidden sm:flex items-center gap-3 pl-3 border-l border-neutral-200 dark:border-neutral-800">
            <img src={user.photoURL || 'https://ui-avatars.com/api/?name=User'} alt="User" className="w-9 h-9 rounded-full border border-neutral-200 dark:border-neutral-700" />
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">{user.displayName || 'User'}</span>
          </div>
        )}
      </div>
    </header>
  );
}
`);
