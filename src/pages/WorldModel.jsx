import React from 'react';
import { WorldModelDiagram } from '../components/WorldModelDiagram';
import { Cpu, Zap, Info, ShieldCheck, ArrowRight, Activity, Terminal } from 'lucide-react';

export const WorldModel = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-xl font-bold text-slate-100">Network World Model</h1>
            <span className="px-3 py-0.5 rounded text-xs font-mono font-bold bg-cyan-950 text-cyan-400 border border-cyan-800">
              CORE INNOVATION
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Simulates dynamic environment transitions to forecast attacker progression prior to compromise execution.
          </p>
        </div>
        <span className="px-3 py-1 rounded text-xs font-mono bg-amber-950 text-amber-400 border border-amber-800 font-semibold">
          Demo Prediction
        </span>
      </div>

      {/* Main Diagram */}
      <WorldModelDiagram />

      {/* Deep Technical Explanation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="soc-card p-5 border border-slate-800">
          <div className="flex items-center space-x-2.5 mb-3 pb-2 border-b border-slate-800">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-bold text-slate-100">Why World Models in Cyber Defence?</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Traditional intrusion detection systems (IDS) operate <span className="text-red-400 font-semibold">reactively</span> by matching known signatures or flagging past anomalies after an exploit occurs.
          </p>
          <p className="text-xs text-slate-300 leading-relaxed mt-2">
            In contrast, an <span className="text-cyan-400 font-semibold">AI World Model</span> models the temporal state transition dynamics of the entire network environment:
          </p>
          <div className="mt-3 p-3 bg-slate-950 rounded border border-slate-800 text-xs font-mono text-cyan-300">
            P(S&#x209C;&#x208A;&#x2081; | S&#x2081;, S&#x2082;, ..., S&#x209C;)
          </div>
          <p className="text-xs text-slate-400 mt-2">
            This enables security teams to simulate K-steps into the future and take proactive counter-measures before lateral movement completes.
          </p>
        </div>

        <div className="soc-card p-5 border border-slate-800">
          <div className="flex items-center space-x-2.5 mb-3 pb-2 border-b border-slate-800">
            <Terminal className="w-5 h-5 text-indigo-400" />
            <h3 className="text-sm font-bold text-slate-100">Model Specification & Training Objective</h3>
          </div>
          <div className="space-y-3 text-xs font-mono">
            <div className="flex justify-between p-2 bg-slate-900/60 rounded border border-slate-800">
              <span className="text-slate-400">Architecture</span>
              <span className="text-cyan-300 font-bold">Deep Recurrent LSTM / Transformer</span>
            </div>
            <div className="flex justify-between p-2 bg-slate-900/60 rounded border border-slate-800">
              <span className="text-slate-400">Loss Function</span>
              <span className="text-slate-200">MSE State Vector Loss + Cross Entropy</span>
            </div>
            <div className="flex justify-between p-2 bg-slate-900/60 rounded border border-slate-800">
              <span className="text-slate-400">Unroll Horizon (K)</span>
              <span className="text-amber-400 font-bold">K = 3 Steps (~30 min Lead Time)</span>
            </div>
            <div className="flex justify-between p-2 bg-slate-900/60 rounded border border-slate-800">
              <span className="text-slate-400">State Vector Dims</span>
              <span className="text-slate-200">8 Feature Telemetry Channels</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
