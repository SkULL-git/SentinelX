import React from 'react';
import { Shield, ExternalLink, Info, AlertTriangle } from 'lucide-react';

export const MitreTimeline = ({ mappings }) => {
  const data = mappings || [];

  return (
    <div className="soc-card p-5 border border-slate-800">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <Shield className="w-4 h-4 text-cyan-400" />
            MITRE ATT&CK Threat Framework Mapping
          </h3>
          <p className="text-[11px] text-slate-400">
            Standardized threat taxonomy mapping derived from predicted network state shifts
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-[10px] font-mono bg-cyan-950 text-cyan-300 px-2 py-1 rounded border border-cyan-800">
            v14 Enterprise Matrix
          </span>
        </div>
      </div>

      {/* Mandatory Disclaimer Box */}
      <div className="mb-5 p-3 rounded-lg bg-indigo-950/30 border border-indigo-500/30 flex items-start space-x-2 text-xs text-indigo-200">
        <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Important Framework Clarification:</span> MITRE ATT&CK provides standardized threat taxonomy and context for security analysts; it is <span className="underline decoration-cyan-400 font-semibold">not</span> the prediction model itself.
        </div>
      </div>

      {/* Mapping Cards Table */}
      <div className="space-y-3">
        {data.map((item, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-lg border transition ${
              item.status === 'OBSERVED'
                ? 'bg-slate-900/60 border-slate-800'
                : item.status === 'PREDICTED'
                ? 'bg-amber-950/20 border-amber-500/40 ring-1 ring-amber-500/20'
                : 'bg-slate-950/40 border-slate-800'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center space-x-3">
                <span className="px-2.5 py-1 rounded font-mono font-bold text-xs bg-slate-950 text-cyan-400 border border-cyan-800">
                  {item.techniqueId}
                </span>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">{item.techniqueName}</h4>
                  <span className="text-[10px] text-slate-400 font-mono">Tactic: {item.tactic}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-[10px] font-mono text-slate-400">{item.stageCategory}</span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                    item.status === 'OBSERVED'
                      ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                      : item.status === 'PREDICTED'
                      ? 'bg-amber-950 text-amber-300 border border-amber-800'
                      : 'bg-slate-950 text-slate-500 border border-slate-800'
                  }`}
                >
                  {item.status}
                </span>
              </div>
            </div>

            {/* Indicators */}
            <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex flex-wrap gap-1.5">
              {item.indicators?.map((ind, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-950 text-slate-300 border border-slate-800"
                >
                  • {ind}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
