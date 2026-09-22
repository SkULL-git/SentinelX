import React from 'react';
import { NetworkGraph } from '../components/NetworkGraph';
import { Network, Info, ShieldAlert } from 'lucide-react';

export const NetworkGraphPage = ({ graphData }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-100">Attack Path & Network Topology</h1>
          <p className="text-xs text-slate-400 mt-1">
            Visualizing attacker movement vectors and cross-host propagation forecasts.
          </p>
        </div>
        <span className="px-3 py-1 rounded text-xs font-mono bg-cyan-950 text-cyan-400 border border-cyan-800">
          Spatial Graph Correlation
        </span>
      </div>

      {/* Concept Banner */}
      <div className="p-3.5 rounded-lg bg-indigo-950/30 border border-indigo-500/30 flex items-center space-x-3 text-xs text-indigo-200">
        <Info className="w-5 h-5 text-cyan-400 shrink-0" />
        <div>
          <span className="font-bold">Topology Intelligence:</span> Cross-host behavioural correlation helps identify possible attacker movement across internal subnets before privileges are escalated.
        </div>
      </div>

      {/* Main Interactive Network Topology Component */}
      <NetworkGraph graphData={graphData} />
    </div>
  );
};
