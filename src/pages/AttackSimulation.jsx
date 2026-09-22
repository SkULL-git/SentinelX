import React from 'react';
import { AttackTimeline } from '../components/AttackTimeline';
import { RiskChart } from '../components/RiskChart';
import { Flame, Cpu, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';

export const AttackSimulation = ({ scenarioData }) => {
  const { currentSituation, attackTrajectory, riskTimeline, networkStates } = scenarioData;

  const kStepStates = networkStates.slice(2, 6); // S3, S4, S5, S6

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-xl font-bold text-slate-100">Attack Trajectory Simulation</h1>
            <span className="px-3 py-0.5 rounded text-xs font-mono font-bold bg-amber-950 text-amber-400 border border-amber-800">
              CORE FEATURE
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Predictive multi-step sequence simulation forecasting future attack states before execution.
          </p>
        </div>

        <span className="px-3 py-1 rounded text-xs font-mono bg-amber-950/80 text-amber-400 border border-amber-800 font-semibold">
          Prototype Simulation
        </span>
      </div>

      {/* Highlights Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="soc-card p-4 border border-cyan-500/30 font-mono">
          <span className="text-[10px] text-slate-400 block uppercase">Current Stage</span>
          <span className="text-lg font-bold text-cyan-400">{currentSituation.currentStage} (S3)</span>
        </div>

        <div className="soc-card p-4 border border-amber-500/40 bg-amber-950/20 font-mono">
          <span className="text-[10px] text-amber-400 block uppercase font-bold">Predicted Next Stage</span>
          <span className="text-lg font-bold text-amber-300">{currentSituation.predictedNextStage} (S4)</span>
        </div>

        <div className="soc-card p-4 border border-emerald-500/30 font-mono">
          <span className="text-[10px] text-slate-400 block uppercase">Model Confidence</span>
          <span className="text-lg font-bold text-emerald-400">{scenarioData.scenarioInfo.predictionConfidence}%</span>
        </div>
      </div>

      {/* K-Step Future Simulation Section */}
      <div className="soc-card p-5 border border-amber-500/40 bg-slate-950/80 soc-glow-amber">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              K-Step Future Simulation Engine
            </h3>
            <p className="text-[11px] text-amber-300/90 font-mono">
              Projected future states if current network behaviour continues.
            </p>
          </div>
          <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2.5 py-1 rounded border border-cyan-800">
            Unrolled Horizon K=3
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {kStepStates.map((st, idx) => {
            const isCurrent = st.id === "S3";
            const isPredicted = st.id === "S4" || st.id === "S5";

            return (
              <div
                key={st.id}
                className={`p-4 rounded-xl border font-mono transition ${
                  isCurrent
                    ? 'bg-cyan-950/80 border-cyan-500 text-cyan-200'
                    : isPredicted
                    ? 'bg-amber-950/40 border-amber-500/60 text-amber-200'
                    : 'bg-red-950/30 border-red-800 text-red-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                    {st.id}
                  </span>
                  <span className="text-[10px] opacity-80">{st.timestamp}</span>
                </div>
                <h4 className="text-sm font-bold truncate">{st.name}</h4>
                <p className="text-[10px] opacity-75 mt-1 line-clamp-2">{st.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Trajectory & Risk Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AttackTimeline trajectory={attackTrajectory} />
        <RiskChart data={riskTimeline} title="Projected Risk Timeline (+40 Min Horizon)" />
      </div>
    </div>
  );
};

