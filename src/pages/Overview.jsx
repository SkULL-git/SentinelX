import React from 'react';
import { MetricCard } from '../components/MetricCard';
import { RiskCard } from '../components/RiskCard';
import { EarlyWarning } from '../components/EarlyWarning';
import { RiskChart } from '../components/RiskChart';
import { AttackTimeline } from '../components/AttackTimeline';
import { MitreTimeline } from '../components/MitreTimeline';
import { ExplainabilityChart } from '../components/ExplainabilityChart';
import { HowItWorks } from '../components/HowItWorks';
import {
  ShieldAlert, Cpu, Activity, Server, Play, RefreshCw,
  ArrowRight, Clock, Zap, BarChart2, Lock
} from 'lucide-react';

export const Overview = ({
  scenarioData,
  onLoadScenario,
  onStartAnalysis,
  isAnalyzing,
  onNavigateTab
}) => {
  const { scenarioInfo, currentSituation, earlyWarning, riskTimeline, mitreMappings, explainability, attackTrajectory } = scenarioData;

  return (
    <div className="space-y-6">

      {/* ── Hero Header Banner ───────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-3xl border border-cyan-400/15 bg-gradient-to-br from-[#0b1524] via-[#09111d] to-[#060b14] p-6 shadow-2xl shadow-black/30 sm:p-7">
        {/* Subtle background decoration */}
        <div className="absolute inset-0 bg-grid opacity-60 pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />

        <div className="relative flex flex-wrap items-center justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-3xl font-black text-white tracking-tight">
                Predictive Cyber Defence
              </h1>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-950/80 text-cyan-400 border border-cyan-700 shadow-lg shadow-cyan-900/30">
                AI WORLD MODEL · SIH 2026
              </span>
            </div>
            <div className="mb-3 flex flex-wrap items-center gap-2 text-[10px] font-mono uppercase tracking-[0.16em] text-slate-500">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/15 bg-emerald-400/[0.04] px-2.5 py-1 text-emerald-300"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />Telemetry stream healthy</span>
              <span className="rounded-full border border-slate-700/80 bg-slate-900/70 px-2.5 py-1">Temporal horizon K=3</span>
            </div>
            <p className="text-base font-semibold text-cyan-300 mb-1">
              From reactive detection to proactive intervention
            </p>
            <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
              Learn evolving network behaviour, simulate future states, and forecast attack progression before compromise advances.
              World Model unrolls a K-step temporal horizon to predict the next attacker move.
            </p>

            {/* Quick nav pills */}
            <div className="flex flex-wrap gap-2 mt-4">
              {[
                { label: 'Network States', tab: 'states' },
                { label: 'World Model', tab: 'world-model' },
                { label: 'Attack Simulation', tab: 'attack-sim' },
                { label: 'MITRE Mapping', tab: 'mitre' },
                { label: 'Explainability', tab: 'explainability' },
              ].map(item => (
                <button
                  key={item.tab}
                  onClick={() => onNavigateTab(item.tab)}
                  className="px-3 py-1 rounded-full text-[11px] font-semibold bg-slate-800/70 hover:bg-slate-700 text-slate-300 border border-slate-700 transition flex items-center gap-1"
                >
                  <ArrowRight className="w-3 h-3 text-cyan-400" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch gap-3 xl:min-w-[360px]">
            <button
              onClick={onLoadScenario}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 transition flex items-center justify-center space-x-2 shadow"
            >
              <RefreshCw className="w-4 h-4 text-cyan-400" />
              <span>Load Demo Scenario</span>
            </button>

            <button
              onClick={onStartAnalysis}
              disabled={isAnalyzing}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white shadow-xl shadow-cyan-900/40 transition flex items-center justify-center space-x-2 ${isAnalyzing ? 'opacity-60 cursor-wait' : ''}`}
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{isAnalyzing ? 'Analyzing...' : 'Start Predictive Analysis'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Threat posture strip ─────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-red-400/15 bg-red-400/[0.035] p-4">
          <div className="flex items-center justify-between"><span className="text-[9px] font-mono uppercase tracking-[0.18em] text-red-300/80">Threat posture</span><ShieldAlert className="h-4 w-4 text-red-400" /></div>
          <div className="mt-2 flex items-end gap-2"><span className="text-2xl font-black text-white">HIGH</span><span className="mb-1 text-[10px] font-mono text-red-300">72 / 100</span></div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-800"><div className="h-full w-[72%] rounded-full bg-gradient-to-r from-amber-400 to-red-500" /></div>
        </div>
        <div className="rounded-2xl border border-cyan-400/15 bg-cyan-400/[0.025] p-4">
          <div className="flex items-center justify-between"><span className="text-[9px] font-mono uppercase tracking-[0.18em] text-cyan-300/80">Prediction window</span><Clock className="h-4 w-4 text-cyan-400" /></div>
          <div className="mt-2 text-2xl font-black text-white">~15 min</div>
          <p className="mt-1 text-[10px] text-slate-500">before projected credential access</p>
        </div>
        <div className="rounded-2xl border border-indigo-400/15 bg-indigo-400/[0.025] p-4">
          <div className="flex items-center justify-between"><span className="text-[9px] font-mono uppercase tracking-[0.18em] text-indigo-300/80">Model confidence</span><Cpu className="h-4 w-4 text-indigo-400" /></div>
          <div className="mt-2 text-2xl font-black text-white">87%</div>
          <p className="mt-1 text-[10px] text-slate-500">demo forecast certainty for next-stage transition</p>
        </div>
      </div>

      {/* ── 4 Main KPI Metrics ───────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <MetricCard
          title="Current Risk Score"
          value={scenarioInfo.currentRiskScore}
          unit="%"
          color="red"
          badge="SIMULATED"
          icon={ShieldAlert}
          subtitle="State S3 · Discovery phase detected"
        />
        <MetricCard
          title="Prediction Confidence"
          value={scenarioInfo.predictionConfidence}
          unit="%"
          color="cyan"
          badge="DEMO MODEL"
          icon={Cpu}
          subtitle="World Model temporal forecast certainty"
        />
        <MetricCard
          title="Active Monitored Hosts"
          value={scenarioInfo.activeHosts}
          color="emerald"
          badge="TRACKED"
          icon={Server}
          subtitle="Internal + perimeter endpoints"
        />
        <MetricCard
          title="Suspicious Flows"
          value={scenarioInfo.suspiciousFlows}
          color="amber"
          badge="ANOMALOUS"
          icon={Activity}
          subtitle="Elevated SYN + auth failure velocity"
        />
      </div>

      {/* ── Current Situation + Early Warning ────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <RiskCard situation={currentSituation} />
        </div>
        <div className="xl:col-span-1">
          <EarlyWarning earlyWarning={earlyWarning} />
        </div>
      </div>

      {/* ── Attack Trajectory + Risk Timeline ────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <AttackTimeline trajectory={attackTrajectory} />
        <RiskChart data={riskTimeline} />
      </div>

      {/* ── Driving Features + MITRE Highlights ──────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <ExplainabilityChart explainability={explainability} />

        {/* Compact MITRE summary card */}
        <div className="soc-card p-5 border border-slate-800 flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <Lock className="w-4 h-4 text-cyan-400" />
                MITRE ATT&CK Framework Summary
              </h3>
              <p className="text-[11px] text-slate-400">Predicted threat technique timeline</p>
            </div>
            <button
              onClick={() => onNavigateTab('mitre')}
              className="text-[11px] text-cyan-400 hover:text-cyan-300 font-mono flex items-center gap-1 transition"
            >
              Full view <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3 flex-1">
            {[
              { id: 'T1046', name: 'Network Service Discovery', tactic: 'Discovery', status: 'OBSERVED', color: 'text-cyan-400 bg-cyan-950 border-cyan-800' },
              { id: 'T1110', name: 'Brute Force / Password Spraying', tactic: 'Credential Access', status: 'PREDICTED', color: 'text-amber-300 bg-amber-950 border-amber-800' },
              { id: 'T1021.002', name: 'Remote Services: SMB/Admin Shares', tactic: 'Lateral Movement', status: 'FUTURE', color: 'text-slate-400 bg-slate-900 border-slate-700' },
            ].map(item => (
              <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs">
                <div className="flex items-center gap-2.5">
                  <span className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] border ${item.color}`}>
                    {item.id}
                  </span>
                  <div>
                    <div className="font-semibold text-slate-200">{item.name}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{item.tactic}</div>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${item.color}`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── How It Works Architecture ─────────────────────────────── */}
      <HowItWorks />
    </div>
  );
};
