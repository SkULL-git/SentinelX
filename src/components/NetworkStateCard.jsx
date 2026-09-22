import React from 'react';
import { Layers, Activity, AlertCircle, Clock } from 'lucide-react';

export const NetworkStateCard = ({ state, isSelected, onClick }) => {
  const isCurrent = state.status === "Current State";
  const isPredicted = state.status.includes("Predicted");

  return (
    <div
      onClick={onClick}
      className={`soc-card p-4 border cursor-pointer transition-all duration-200 ${
        isSelected
          ? 'border-cyan-500/80 bg-cyan-950/20 ring-1 ring-cyan-500/40 shadow-lg shadow-cyan-950/50'
          : isCurrent
          ? 'border-red-500/40 bg-red-950/10'
          : isPredicted
          ? 'border-amber-500/40 bg-amber-950/10'
          : 'border-slate-800 hover:border-slate-700 bg-slate-900/50'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span
            className={`w-7 h-7 rounded-md font-mono font-bold text-xs flex items-center justify-center ${
              isCurrent
                ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                : isPredicted
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                : 'bg-slate-800 text-slate-300 border border-slate-700'
            }`}
          >
            {state.id}
          </span>
          <div>
            <h4 className="text-xs font-bold text-slate-100">{state.name}</h4>
            <span className="text-[10px] font-mono text-slate-400">{state.timestamp}</span>
          </div>
        </div>

        <span
          className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase ${
            isCurrent
              ? 'bg-red-950 text-red-400 border border-red-800'
              : isPredicted
              ? 'bg-amber-950 text-amber-400 border border-amber-800'
              : 'bg-slate-800 text-slate-400'
          }`}
        >
          {state.status}
        </span>
      </div>

      <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
        <div className="bg-slate-950/60 p-2 rounded border border-slate-800/80">
          <span className="text-[10px] text-slate-500 block">Packets</span>
          <span className="font-bold text-slate-200">{state.packets.toLocaleString()}</span>
        </div>
        <div className="bg-slate-950/60 p-2 rounded border border-slate-800/80">
          <span className="text-[10px] text-slate-500 block">Unique Ports</span>
          <span className="font-bold text-cyan-400">{state.uniquePorts}</span>
        </div>
        <div className="bg-slate-950/60 p-2 rounded border border-slate-800/80">
          <span className="text-[10px] text-slate-500 block">SYN Rate</span>
          <span className={`font-bold ${state.synRate === 'Normal' ? 'text-emerald-400' : 'text-amber-400'}`}>
            {state.synRate}
          </span>
        </div>
        <div className="bg-slate-950/60 p-2 rounded border border-slate-800/80">
          <span className="text-[10px] text-slate-500 block">Auth Failures</span>
          <span className={`font-bold ${state.authFailures > 10 ? 'text-red-400' : 'text-slate-300'}`}>
            {state.authFailures}
          </span>
        </div>
      </div>
    </div>
  );
};
