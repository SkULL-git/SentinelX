import React from 'react';
import { ArrowDown, AlertOctagon, CheckCircle2, Flame, ShieldAlert } from 'lucide-react';

export const AttackTimeline = ({ trajectory }) => {
  const items = trajectory || [
    { stage: "Discovery", stateId: "S3", status: "CURRENT", riskLevel: "High (72%)", time: "T = +20m", description: "Active directory & network service enumeration" },
    { stage: "Credential Access", stateId: "S4", status: "PREDICTED_NEXT", riskLevel: "High (81%)", time: "T = +30m", description: "Forecasted credential spraying & password guessing" },
    { stage: "Lateral Movement", stateId: "S5", status: "PREDICTED_FUTURE", riskLevel: "Critical (91%)", time: "T = +40m", description: "Forecasted SMB execution to pivot to Host C" },
    { stage: "Impact", stateId: "S6", status: "POTENTIAL", riskLevel: "Critical (96%)", time: "T = +50m", description: "Potential data exfiltration from core Database server" },
  ];

  return (
    <div className="soc-card p-5 border border-slate-800">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-400" />
            Attack Trajectory Forecast
          </h3>
          <p className="text-[11px] text-slate-400">
            K-Step multi-stage progression simulated by Network World Model
          </p>
        </div>
        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
          State Projection
        </span>
      </div>

      <div className="space-y-4">
        {items.map((item, idx) => {
          const isCurrent = item.status === "CURRENT";
          const isNext = item.status === "PREDICTED_NEXT";
          const isFuture = item.status === "PREDICTED_FUTURE";
          const isPotential = item.status === "POTENTIAL";

          return (
            <div key={item.stateId} className="relative">
              <div
                className={`p-4 rounded-xl border transition-all duration-200 ${
                  isCurrent
                    ? 'bg-red-950/20 border-red-500/60 soc-glow-red'
                    : isNext
                    ? 'bg-amber-950/20 border-amber-500/50 ring-1 ring-amber-500/20'
                    : isFuture
                    ? 'bg-amber-950/10 border-amber-600/30'
                    : 'bg-slate-900/50 border-slate-800'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center space-x-3">
                    <span
                      className={`w-8 h-8 rounded-lg font-mono font-bold text-xs flex items-center justify-center ${
                        isCurrent
                          ? 'bg-red-500 text-slate-950 font-extrabold'
                          : isNext
                          ? 'bg-amber-500 text-slate-950 font-extrabold'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {item.stateId}
                    </span>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-slate-100">{item.stage}</span>
                        <span className="text-[10px] font-mono text-slate-400">({item.time})</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{item.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="text-xs font-mono font-bold text-slate-300">
                      {item.riskLevel}
                    </span>
                    <span
                      className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${
                        isCurrent
                          ? 'bg-red-950 text-red-400 border border-red-800'
                          : isNext
                          ? 'bg-amber-950 text-amber-300 border border-amber-800'
                          : isFuture
                          ? 'bg-amber-950/60 text-amber-400 border border-amber-900'
                          : 'bg-slate-950 text-slate-500 border border-slate-800'
                      }`}
                    >
                      {isCurrent ? 'CURRENT' : isNext ? 'PREDICTED NEXT' : isFuture ? 'PREDICTED FUTURE' : 'POTENTIAL'}
                    </span>
                  </div>
                </div>
              </div>

              {idx < items.length - 1 && (
                <div className="flex justify-center my-1.5">
                  <ArrowDown className="w-4 h-4 text-slate-600 animate-bounce" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
