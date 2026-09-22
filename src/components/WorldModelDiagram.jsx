import React from 'react';
import { Cpu, ArrowRight, Activity, Sparkles, Layers, ShieldCheck } from 'lucide-react';

export const WorldModelDiagram = () => {
  return (
    <div className="soc-card p-6 border border-cyan-500/30 bg-gradient-to-b from-slate-900/90 via-[#0b0f19] to-slate-950/90 soc-glow-cyan">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-base font-bold text-slate-100 uppercase tracking-wide">
              Network World Model Architecture
            </h3>
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950 text-cyan-400 border border-cyan-800">
              Temporal Dynamics Simulator
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Learns temporal transition probability <span className="font-mono text-cyan-300">P(S&#x209C;&#x208A;&#x2081; | S&#x209C;)</span> over continuous feature vectors
          </p>
        </div>

        <span className="px-3 py-1 rounded text-xs font-mono bg-amber-950/80 text-amber-400 border border-amber-800/80 font-semibold">
          Demo Prediction
        </span>
      </div>

      {/* Main Visual Flow Diagram */}
      <div className="py-6 px-4 bg-slate-950/60 rounded-xl border border-slate-800 relative">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          
          {/* Historical States */}
          <div className="w-full lg:w-1/3 bg-slate-900/80 p-4 rounded-lg border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                Historical Network States
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                Observed
              </span>
            </div>

            <div className="flex items-center justify-around space-x-2">
              <div className="p-3 bg-slate-950 rounded border border-slate-800 text-center min-w-[70px]">
                <span className="text-xs font-mono font-bold text-slate-300 block">S1</span>
                <span className="text-[9px] text-slate-500 font-mono">Normal</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-600 shrink-0" />
              <div className="p-3 bg-slate-950 rounded border border-slate-800 text-center min-w-[70px]">
                <span className="text-xs font-mono font-bold text-slate-300 block">S2</span>
                <span className="text-[9px] text-slate-500 font-mono">Recon</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-600 shrink-0" />
              <div className="p-3 bg-cyan-950/60 rounded border border-cyan-500/50 text-center min-w-[70px] shadow-md shadow-cyan-900/30">
                <span className="text-xs font-mono font-bold text-cyan-400 block">S3</span>
                <span className="text-[9px] text-cyan-300 font-mono font-semibold">Current</span>
              </div>
            </div>
            <p className="text-[10px] text-slate-500 mt-3 text-center font-mono">
              Dense state feature embeddings S&#x209C; = [packet_cnt, syn_rate, auth_fails...]
            </p>
          </div>

          {/* Core Central World Model Box */}
          <div className="w-full lg:w-1/3 flex flex-col items-center justify-center">
            <div className="w-full p-5 bg-gradient-to-br from-cyan-950/60 via-slate-900 to-indigo-950/60 rounded-xl border border-cyan-500/50 text-center relative shadow-xl shadow-cyan-950/40">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-inner">
                <Cpu className="w-6 h-6 animate-pulse" />
              </div>
              <h4 className="text-sm font-extrabold text-slate-100 tracking-wider">
                WORLD MODEL
              </h4>
              <p className="text-xs text-cyan-400 font-mono font-semibold mt-0.5">
                LSTM / Transformer Model
              </p>
              <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
                <div className="flex justify-between px-2 font-mono">
                  <span>State Transition:</span>
                  <span className="text-cyan-300 font-bold">P(S&#x209C;&#x208A;&#x2081; | S&#x209C;)</span>
                </div>
                <div className="flex justify-between px-2 font-mono">
                  <span>Latent Memory:</span>
                  <span className="text-indigo-300 font-bold">Hidden State H&#x209C;</span>
                </div>
              </div>
            </div>
          </div>

          {/* Predicted Future States */}
          <div className="w-full lg:w-1/3 bg-slate-900/80 p-4 rounded-lg border border-amber-500/30">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                Future Network States
              </span>
              <span className="text-[10px] font-mono text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800">
                K-Step Forecast
              </span>
            </div>

            <div className="flex items-center justify-around space-x-2">
              <div className="p-3 bg-amber-950/40 rounded border border-amber-500/40 text-center min-w-[70px]">
                <span className="text-xs font-mono font-bold text-amber-300 block">S4</span>
                <span className="text-[9px] text-amber-400 font-mono">Cred Access</span>
              </div>
              <ArrowRight className="w-4 h-4 text-amber-500/60 shrink-0" />
              <div className="p-3 bg-amber-950/30 rounded border border-amber-600/30 text-center min-w-[70px]">
                <span className="text-xs font-mono font-bold text-amber-400 block">S5</span>
                <span className="text-[9px] text-amber-400 font-mono">Lat Move</span>
              </div>
              <ArrowRight className="w-4 h-4 text-red-500/60 shrink-0" />
              <div className="p-3 bg-red-950/30 rounded border border-red-800 text-center min-w-[70px]">
                <span className="text-xs font-mono font-bold text-red-400 block">S6</span>
                <span className="text-[9px] text-red-400 font-mono">Impact</span>
              </div>
            </div>
            <p className="text-[10px] text-amber-400/80 mt-3 text-center font-mono">
              Simulated future vectors generated before compromise occurs
            </p>
          </div>

        </div>
      </div>

      {/* Model Spec Table */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
        <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
          <span className="text-[10px] text-slate-500 uppercase block">Model Class</span>
          <span className="font-bold text-slate-200">Temporal World Model</span>
        </div>
        <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
          <span className="text-[10px] text-slate-500 uppercase block">Architecture</span>
          <span className="font-bold text-cyan-400">LSTM / Transformer</span>
        </div>
        <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
          <span className="text-[10px] text-slate-500 uppercase block">Input Vector</span>
          <span className="font-bold text-slate-200">Historical States [S&#x2081;..S&#x209C;]</span>
        </div>
        <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
          <span className="text-[10px] text-slate-500 uppercase block">Output Projection</span>
          <span className="font-bold text-amber-400">Future States [S&#x209C;&#x208A;&#x2081;..S&#x209C;&#x208A;&#x2096;]</span>
        </div>
      </div>
    </div>
  );
};
