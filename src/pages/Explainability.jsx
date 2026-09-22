import React from 'react';
import { ExplainabilityChart } from '../components/ExplainabilityChart';
import { HelpCircle, Brain, Eye, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const Explainability = ({ explainability }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-xl font-bold text-slate-100">Explainable AI (XAI)</h1>
            <span className="px-3 py-0.5 rounded text-xs font-mono font-bold bg-cyan-950 text-cyan-400 border border-cyan-800">
              FEATURE ATTRIBUTION
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Transparent model attribution answering why the World Model forecasts elevated risk.
          </p>
        </div>
        <span className="px-3 py-1 rounded text-xs font-mono bg-cyan-950 text-cyan-300 border border-cyan-800">
          SHAP Analysis Engine
        </span>
      </div>

      {/* Main Explainability Component */}
      <ExplainabilityChart explainability={explainability} />

      {/* Analyst Interpretation & Trust Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="soc-card p-5 border border-slate-800">
          <div className="flex items-center space-x-2 mb-3 pb-2 border-b border-slate-800">
            <Brain className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-bold text-slate-100">Model Interpretability Principles</h3>
          </div>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Additive Feature Attribution:</strong> Quantifies exact feature contributions (+32% SYN, +24% port scan).</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>No Black-Box Decisions:</strong> Every predicted state transition is paired with empirical evidence.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Actionable Lead Time:</strong> Gives SOC analysts ~15 minutes to pre-emptively isolate target assets.</span>
            </li>
          </ul>
        </div>

        <div className="soc-card p-5 border border-slate-800">
          <div className="flex items-center space-x-2 mb-3 pb-2 border-b border-slate-800">
            <Eye className="w-5 h-5 text-indigo-400" />
            <h3 className="text-sm font-bold text-slate-100">SOC Analyst Guidance</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            The World Model detects a sequence shift from port scanning (S2) to active credential spraying (S3/S4).
          </p>
          <div className="mt-3 p-3 bg-amber-950/30 border border-amber-500/40 rounded text-xs text-amber-200">
            <strong>Recommended Action:</strong> Temporarily lock Kerberos ticket granting service (TGS) retries on Server (10.0.0.20) and isolate Host A (10.0.0.12).
          </div>
        </div>
      </div>
    </div>
  );
};
