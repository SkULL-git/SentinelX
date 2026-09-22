import React from 'react';
import { ChevronRight, Cpu, Layers, GitCommit, ShieldAlert, BarChart2, Eye } from 'lucide-react';

const pipelineSteps = [
  { step: 1, title: 'PCAP / Flow Data', desc: 'Raw network telemetry & IPFIX flow records' },
  { step: 2, title: 'Feature Extraction', desc: 'Computes packet rates, port counts, SYN ratios' },
  { step: 3, title: 'Time Windowing', desc: 'Discretizes continuous flows into temporal slices' },
  { step: 4, title: 'Network State (S_t)', desc: 'Encodes telemetry into dense state vectors' },
  { step: 5, title: 'World Model', desc: 'LSTM / Transformer predicts state dynamics P(S_{t+1}|S_t)' },
  { step: 6, title: 'K-Step Simulation', desc: 'Simulates future network states S_{t+1}...S_{t+k}' },
  { step: 7, title: 'Attack Trajectory', desc: 'Forecasts progression toward critical assets' },
  { step: 8, title: 'MITRE & XAI', desc: 'Maps techniques & computes feature attributions' },
];

export const HowItWorks = () => {
  return (
    <div className="soc-card p-5 border border-slate-800">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            Predictive Cyber Defence Engine Architecture
          </h3>
          <p className="text-[11px] text-slate-400">
            Sequential workflow from raw packet capture to explainable future threat forecasting
          </p>
        </div>
        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
          Modular Pipeline
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {pipelineSteps.map((s) => (
          <div
            key={s.step}
            className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 hover:border-cyan-500/30 transition relative group"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="w-5 h-5 rounded-full bg-cyan-500/10 text-cyan-400 text-[10px] font-mono font-bold flex items-center justify-center border border-cyan-500/20">
                {s.step}
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400 transition" />
            </div>
            <h4 className="text-xs font-bold text-slate-200">{s.title}</h4>
            <p className="text-[11px] text-slate-400 mt-1 leading-snug">{s.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800/80 bg-slate-950/40 p-3 rounded-lg flex items-center justify-between text-xs">
        <span className="text-slate-400 italic">
          "Instead of only detecting what is happening now, we learn how the network is evolving, simulate its future states, and predict where an attack is likely to go next."
        </span>
        <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold shrink-0 ml-4">
          Core Thesis
        </span>
      </div>
    </div>
  );
};
