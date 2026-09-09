import React from 'react';
import { Check, X, Zap, Sparkles, ShieldCheck } from 'lucide-react';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-neutral-900 w-full max-w-4xl max-h-[90vh] rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-800/30">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Subscription Plans
            </span>
            <h3 className="text-xl font-extrabold text-neutral-900 dark:text-white mt-1">
              Supercharge Your Video Research
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pricing Cards */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Free Tier */}
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5 flex flex-col justify-between">
            <div>
              <h4 className="text-base font-bold text-neutral-900 dark:text-white">Free Starter</h4>
              <p className="text-xs text-neutral-500 mt-1">For casual learners and light viewers</p>
              <div className="mt-4 mb-5">
                <span className="text-3xl font-black text-neutral-900 dark:text-white">$0</span>
                <span className="text-xs text-neutral-500"> / forever</span>
              </div>
              <ul className="space-y-2.5 text-xs text-neutral-700 dark:text-neutral-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>3 summaries per day</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>Videos up to 30 minutes</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>Standard executive summary</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>Markdown export</span>
                </li>
              </ul>
            </div>
            <button
              onClick={onClose}
              className="mt-6 w-full py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              Current Active Plan
            </button>
          </div>

          {/* Pro Tier (Featured) */}
          <div className="rounded-2xl border-2 border-indigo-600 dark:border-indigo-500 bg-indigo-50/30 dark:bg-indigo-950/20 p-5 flex flex-col justify-between relative shadow-lg">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
              Most Popular
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Professional</span>
              </div>
              <h4 className="text-base font-bold text-neutral-900 dark:text-white mt-1">VidBrief Pro</h4>
              <p className="text-xs text-neutral-500 mt-1">For researchers, analysts, and students</p>
              <div className="mt-4 mb-5">
                <span className="text-3xl font-black text-neutral-900 dark:text-white">$15</span>
                <span className="text-xs text-neutral-500"> / month</span>
              </div>
              <ul className="space-y-2.5 text-xs text-neutral-700 dark:text-neutral-300">
                <li className="flex items-center gap-2 font-medium text-neutral-900 dark:text-white">
                  <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>Unlimited video briefings</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>Long videos up to 3+ hours</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>All 11 structured report modules</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>Interactive Video Q&A Assistant</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>Executive PDF Document Export</span>
                </li>
              </ul>
            </div>
            <button
              onClick={onClose}
              className="mt-6 w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold text-white shadow-sm transition-colors"
            >
              Upgrade to Pro (Demo)
            </button>
          </div>

          {/* Team Tier */}
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5 flex flex-col justify-between">
            <div>
              <h4 className="text-base font-bold text-neutral-900 dark:text-white">Team & Enterprise</h4>
              <p className="text-xs text-neutral-500 mt-1">For companies, agencies, and teams</p>
              <div className="mt-4 mb-5">
                <span className="text-3xl font-black text-neutral-900 dark:text-white">$49</span>
                <span className="text-xs text-neutral-500"> / month</span>
              </div>
              <ul className="space-y-2.5 text-xs text-neutral-700 dark:text-neutral-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>Everything in Pro for 5 seats</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>Shared team intelligence archive</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>Notion & Slack integrations</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>REST API & Webhooks</span>
                </li>
              </ul>
            </div>
            <button
              onClick={onClose}
              className="mt-6 w-full py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              Contact Enterprise
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
