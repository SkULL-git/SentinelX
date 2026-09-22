import React from 'react';
import {
  LayoutDashboard, Activity, Layers, Cpu, Flame, ShieldAlert, HelpCircle, Network,
  Radio, Sparkles, ChevronRight, CircleDot
} from 'lucide-react';

const navItems = [
  { id: 'overview', label: 'Command Center', icon: LayoutDashboard, group: 'Monitor' },
  { id: 'traffic', label: 'Traffic Analysis', icon: Activity, group: 'Monitor' },
  { id: 'states', label: 'Network States', icon: Layers, group: 'Predict' },
  { id: 'world-model', label: 'World Model', icon: Cpu, group: 'Predict' },
  { id: 'attack-sim', label: 'Attack Simulation', icon: Flame, group: 'Predict' },
  { id: 'mitre', label: 'MITRE ATT&CK', icon: ShieldAlert, group: 'Investigate' },
  { id: 'explainability', label: 'Explainability', icon: HelpCircle, group: 'Investigate' },
  { id: 'network-graph', label: 'Network Graph', icon: Network, group: 'Investigate' },
];

const groups = ['Monitor', 'Predict', 'Investigate'];

export const Sidebar = ({ activeTab, setActiveTab }) => (
  <aside className="flex w-[68px] lg:w-[272px] bg-[#070d17]/95 border-r border-slate-800/80 flex-col h-screen sticky top-0 shrink-0 z-30 sidebar-shell">
    <div className="p-5 border-b border-slate-800/80">
      <div className="flex items-center justify-center gap-3 lg:justify-start">
        <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 shadow-lg shadow-cyan-500/20">
          <Radio className="h-5 w-5 text-white" />
          <span className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/15" />
        </div>
        <div className="hidden min-w-0 lg:block">
          <h1 className="truncate text-sm font-black tracking-[0.08em] text-white">SENTINELX</h1>
          <p className="mt-0.5 text-[10px] font-mono uppercase tracking-[0.18em] text-cyan-400">Predictive Defence</p>
        </div>
      </div>
      <div className="mt-4 hidden rounded-xl lg:block border border-slate-800 bg-slate-950/60 p-3">
        <div className="flex items-center justify-between text-[9px] font-mono uppercase tracking-wider text-slate-500">
          <span>Environment</span>
          <span className="text-emerald-400">Demo</span>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" /><span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" /></span>
          <span className="text-[11px] font-semibold text-slate-300">Predictive engine online</span>
        </div>
      </div>
    </div>

    <nav className="flex-1 overflow-y-auto px-3 py-4">
      {groups.map((group) => (
        <div key={group} className="mb-5">
          <div className="hidden px-2.5 pb-2 text-[9px] lg:block font-mono uppercase tracking-[0.18em] text-slate-600">{group}</div>
          <div className="space-y-1">
            {navItems.filter((item) => item.group === group).map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button key={item.id} title={item.label} onClick={() => setActiveTab(item.id)} className={`group relative flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-xs font-medium transition-all duration-200 ${isActive ? 'border-cyan-400/20 bg-cyan-400/[0.08] text-cyan-300 shadow-lg shadow-cyan-950/10' : 'border-transparent text-slate-500 hover:border-slate-800 hover:bg-slate-900/70 hover:text-slate-200'}`}>
                  {isActive && <span className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />}
                  <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-cyan-400' : 'text-slate-600 group-hover:text-slate-300'}`} />
                  <span className="hidden flex-1 text-left lg:block">{item.label}</span>
                  {isActive && <ChevronRight className="hidden h-3.5 w-3.5 text-cyan-500/70 lg:block" />}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </nav>

    <div className="border-t border-slate-800/80 p-2 lg:p-4">
      <div className="rounded-xl border border-indigo-500/15 bg-gradient-to-br p-2.5 lg:p-3.5 from-indigo-500/[0.08] to-cyan-500/[0.04]">
        <div className="flex items-center justify-center gap-2 text-[10px] lg:justify-start font-semibold text-slate-300">
          <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
          <span className="hidden lg:inline">SentinelX Copilot</span>
        </div>
        <p className="mt-1.5 hidden text-[10px] leading-relaxed text-slate-500">Explain forecasts, evidence and next-step investigation priorities from this demo scenario.</p>
        <div className="mt-3 hidden items-center gap-2 text-[9px] font-mono uppercase tracking-wider text-slate-600 lg:flex"><CircleDot className="h-3 w-3 text-emerald-400" /> Context synced</div>
      </div>
    </div>
  </aside>
);
