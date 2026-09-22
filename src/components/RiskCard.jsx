import React from 'react';
import { AlertTriangle, Clock, ArrowRight, ShieldAlert } from 'lucide-react';

export const RiskCard = ({ situation }) => {
  const {
    currentStateId = "S3",
    currentStage = "Discovery",
    predictedNextStage = "Credential Access",
    riskScore = 72,
    leadTime = "~15 min",
    status = "HIGH RISK",
  } = situation || {};

  const stages = [
    { name: "Normal", state: "S1" },
    { name: "Reconnaissance", state: "S2" },
    { name: "Discovery", state: "S3", current: true },
    { name: "Credential Access", state: "S4", predicted: true },
    { name: "Lateral Movement", state: "S5" },
  ];

  return (
    <div className="soc-card p-5 border border-red-500/30 soc-glow-red relative overflow-hidden">
      {/* Top Banner Status */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20">
            <ShieldAlert className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wide">
                Current Security Situation
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-red-950 text-red-400 border border-red-800 uppercase tracking-wider">
                {status}
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              World Model forecast based on current network state {currentStateId}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-right">
            <span className="text-[10px] font-mono text-slate-400 uppercase block">Estimated Lead Time</span>
            <div className="flex items-center justify-end space-x-1 text-amber-400 font-mono font-bold text-sm">
              <Clock className="w-3.5 h-3.5" />
              <span>{leadTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4">
        <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
          <span className="text-[11px] text-slate-400 font-mono block">Current Network State</span>
          <span className="text-lg font-bold text-cyan-400 font-mono">{currentStateId}</span>
        </div>

        <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
          <span className="text-[11px] text-slate-400 font-mono block">Current Stage</span>
          <span className="text-sm font-bold text-slate-200">{currentStage}</span>
        </div>

        <div className="bg-slate-900/60 p-3 rounded-lg border border-amber-900/40 bg-amber-950/20">
          <span className="text-[11px] text-amber-400 font-mono block">Predicted Next Stage</span>
          <span className="text-sm font-bold text-amber-300">{predictedNextStage}</span>
        </div>

        <div className="bg-slate-900/60 p-3 rounded-lg border border-red-900/40 bg-red-950/20">
          <span className="text-[11px] text-red-400 font-mono block">Simulated Risk</span>
          <span className="text-lg font-bold text-red-400 font-mono">{riskScore}%</span>
        </div>
      </div>

      {/* Compact Attack Trajectory */}
      <div className="mt-2 pt-3 border-t border-slate-800/80">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
            Attack Trajectory Horizon
          </span>
          <span className="text-[10px] font-mono text-cyan-400">
            Demo Prediction • 87% Confidence
          </span>
        </div>

        <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto pb-1">
          {stages.map((st, idx) => (
            <React.Fragment key={st.state}>
              <div
                className={`px-3 py-1.5 rounded text-xs font-mono flex flex-col items-center min-w-[110px] border transition ${
                  st.current
                    ? 'bg-cyan-950/80 text-cyan-300 border-cyan-500/60 font-bold shadow-md shadow-cyan-900/30'
                    : st.predicted
                    ? 'bg-amber-950/60 text-amber-300 border-amber-500/50 font-semibold ring-1 ring-amber-500/30'
                    : 'bg-slate-900/50 text-slate-400 border-slate-800'
                }`}
              >
                <div className="flex items-center space-x-1">
                  <span>{st.name}</span>
                </div>
                <span className="text-[9px] opacity-75">{st.state}</span>
              </div>

              {idx < stages.length - 1 && (
                <ArrowRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
