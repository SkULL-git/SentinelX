import React, { useEffect, useState } from 'react';
import { Bell, Clock, Play, RefreshCw, RotateCcw, ShieldCheck } from 'lucide-react';

export const Topbar = ({ onLoadScenario, onStartAnalysis, onResetDemo, isAnalyzing }) => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-20 border-b border-slate-800/80 bg-[#070d17]/85 px-4 py-3 backdrop-blur-xl sm:px-6 topbar-shell">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-400/20 bg-emerald-400/[0.06] sm:hidden">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="truncate">
              <div className="flex items-center gap-2">
                <h2 className="truncate text-sm font-bold text-slate-100">AI World Models for Predictive Cyber Defence</h2>
                <span className="hidden rounded-full border border-cyan-400/15 bg-cyan-400/[0.07] px-2 py-0.5 text-[9px] font-mono font-semibold tracking-wider text-cyan-300 md:inline-block">SIH PROTOTYPE</span>
              </div>
              <p className="hidden text-[10px] text-slate-500 sm:block">Anticipate attacker progression from network state transitions.</p>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2.5">
          <div className="hidden items-center gap-2 rounded-xl border border-emerald-400/15 bg-emerald-400/[0.04] px-3 py-2 lg:flex">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" /><span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" /></span>
            <span className="text-[10px] font-mono text-emerald-300">ENGINE ONLINE</span>
          </div>
          <div className="hidden items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-2 md:flex">
            <Clock className="h-3.5 w-3.5 text-cyan-400" />
            <span className="font-mono text-[10px] text-slate-500">{time.toLocaleDateString('en-GB')}</span>
            <span className="font-mono text-[10px] font-semibold text-slate-300">{time.toLocaleTimeString('en-GB', { hour12: false })}</span>
          </div>
          <button className="hidden rounded-xl border border-slate-800 bg-slate-900/60 p-2 text-slate-500 transition hover:border-slate-700 hover:text-slate-200 sm:block" title="Alerts"><Bell className="h-4 w-4" /></button>
          <button onClick={onLoadScenario} className="hidden rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-[10px] font-semibold text-slate-300 transition hover:border-cyan-500/25 hover:text-cyan-300 sm:flex sm:items-center sm:gap-2"><RefreshCw className="h-3.5 w-3.5 text-cyan-400" />Load Demo</button>
          <button onClick={onStartAnalysis} disabled={isAnalyzing} className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 px-3.5 py-2 text-[10px] font-bold text-white shadow-lg shadow-cyan-950/40 transition hover:from-cyan-500 hover:to-indigo-500 disabled:cursor-wait disabled:opacity-50"><Play className="h-3.5 w-3.5 fill-current" />{isAnalyzing ? 'Running' : 'Analyze'}</button>
          <button onClick={onResetDemo} className="hidden rounded-xl border border-slate-800 bg-slate-900/60 p-2 text-slate-500 transition hover:text-slate-200 sm:block" title="Reset demo"><RotateCcw className="h-4 w-4" /></button>
        </div>
      </div>
    </header>
  );
};
