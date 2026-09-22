import React from 'react';
import { MitreTimeline } from '../components/MitreTimeline';
import { Shield, ArrowRight, Info, AlertTriangle, Layers } from 'lucide-react';

export const MitreAttack = ({ mappings }) => {
  const attackStages = [
    { name: "Reconnaissance", code: "TA0043", status: "COMPLETED" },
    { name: "Discovery", code: "TA0007", status: "CURRENT", current: true },
    { name: "Credential Access", code: "TA0006", status: "PREDICTED_NEXT", predicted: true },
    { name: "Lateral Movement", code: "TA0008", status: "PREDICTED_FUTURE", predicted: true },
    { name: "Impact", code: "TA0040", status: "POTENTIAL" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-100">MITRE ATT&CK Mapping</h1>
          <p className="text-xs text-slate-400 mt-1">
            Predicted attacker behaviour is mapped to MITRE ATT&CK for standardized threat context.
          </p>
        </div>
        <span className="px-3 py-1 rounded text-xs font-mono bg-cyan-950 text-cyan-400 border border-cyan-800">
          Standardized Threat Taxonomy
        </span>
      </div>

      {/* Mandatory Notice */}
      <div className="p-4 rounded-lg bg-indigo-950/40 border border-indigo-500/40 text-xs text-indigo-200 flex items-start space-x-3">
        <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-slate-100">IMPORTANT ARCHITECTURAL NOTICE:</strong>
          <p className="mt-1 leading-relaxed text-slate-300">
            MITRE ATT&CK provides threat context for operational response; it is <span className="underline decoration-cyan-400 font-bold text-cyan-300">not</span> the prediction model. The predictions are generated directly by the underlying Neural World Model state transition matrix.
          </p>
        </div>
      </div>

      {/* Timeline Header Bar */}
      <div className="soc-card p-5 border border-slate-800">
        <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block mb-3">
          ATT&CK Matrix Tactic Progression Horizon
        </span>

        <div className="flex items-center space-x-2 overflow-x-auto pb-1">
          {attackStages.map((st, i) => (
            <React.Fragment key={st.code}>
              <div
                className={`p-3 rounded-lg border font-mono text-xs flex flex-col items-center min-w-[130px] transition ${
                  st.current
                    ? 'bg-red-950/80 border-red-500 text-red-300 font-bold shadow-md shadow-red-900/30'
                    : st.predicted
                    ? 'bg-amber-950/60 border-amber-500 text-amber-300 font-semibold ring-1 ring-amber-500/30'
                    : 'bg-slate-900/50 border-slate-800 text-slate-400'
                }`}
              >
                <span className="font-bold">{st.name}</span>
                <span className="text-[9px] opacity-75 mt-0.5">{st.code}</span>
              </div>
              {i < attackStages.length - 1 && (
                <ArrowRight className="w-4 h-4 text-slate-600 shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Main Mapping Component */}
      <MitreTimeline mappings={mappings} />
    </div>
  );
};
