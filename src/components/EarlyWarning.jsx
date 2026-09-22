import React from 'react';
import { AlertTriangle, Clock, ShieldAlert, Zap } from 'lucide-react';

export const EarlyWarning = ({ earlyWarning }) => {
  const data = earlyWarning || {
    title: "EARLY WARNING",
    threat: "Potential Lateral Movement",
    probability: "81%",
    confidence: "87%",
    leadTime: "~15 min",
    priority: "HIGH",
    message: "Current network behaviour indicates a high probability of progression toward lateral movement.",
    label: "Prototype Simulation",
  };

  return (
    <div className="soc-card p-5 border border-amber-500/40 bg-gradient-to-r from-amber-950/30 via-slate-900/80 to-red-950/20 relative overflow-hidden soc-glow-amber">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <Zap className="w-5 h-5 animate-pulse text-amber-400" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-xs font-bold text-amber-400 uppercase tracking-widest font-mono">
                {data.title}
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-950 text-red-400 border border-red-800 uppercase">
                {data.priority} PRIORITY
              </span>
            </div>
            <p className="text-sm font-bold text-slate-100 mt-0.5">
              Threat: {data.threat}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-1 rounded text-[11px] font-mono bg-slate-950 text-amber-400 border border-amber-500/30">
            {data.label}
          </span>
        </div>
      </div>

      {/* Message Body */}
      <p className="mt-3 text-xs text-slate-300 leading-relaxed font-sans">
        "{data.message}"
      </p>

      {/* Stats footer */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 grid grid-cols-3 gap-3 text-center">
        <div className="bg-slate-950/60 p-2 rounded border border-slate-800">
          <span className="text-[10px] text-slate-400 font-mono block">Probability</span>
          <span className="text-sm font-bold font-mono text-amber-400">{data.probability}</span>
        </div>

        <div className="bg-slate-950/60 p-2 rounded border border-slate-800">
          <span className="text-[10px] text-slate-400 font-mono block">Model Confidence</span>
          <span className="text-sm font-bold font-mono text-cyan-400">{data.confidence}</span>
        </div>

        <div className="bg-slate-950/60 p-2 rounded border border-slate-800">
          <span className="text-[10px] text-slate-400 font-mono block">Estimated Lead Time</span>
          <div className="flex items-center justify-center space-x-1 text-sm font-bold font-mono text-emerald-400">
            <Clock className="w-3 h-3" />
            <span>{data.leadTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

