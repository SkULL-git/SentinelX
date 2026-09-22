import React, { useState } from 'react';
import { NetworkStateCard } from '../components/NetworkStateCard';
import { Layers, ArrowRight, Code, Database, Info } from 'lucide-react';

export const NetworkStates = ({ states }) => {
  const [selectedStateId, setSelectedStateId] = useState("S3");
  const selectedState = states.find((s) => s.id === selectedStateId) || states[2];

  const vectorLabels = [
    { label: "packet_count", val: selectedState.packets },
    { label: "byte_count", val: selectedState.bytes },
    { label: "syn_rate", val: selectedState.synRate },
    { label: "unique_ports", val: selectedState.uniquePorts },
    { label: "auth_failures", val: selectedState.authFailures },
    { label: "avg_packet_size", val: selectedState.avgPacketSize },
    { label: "flow_duration", val: selectedState.flowDuration },
    { label: "inter_arrival_time", val: selectedState.interArrivalTime },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-100">Network State Representation</h1>
          <p className="text-xs text-slate-400 mt-1">
            Raw network traffic is transformed into time-based network states for temporal modelling.
          </p>
        </div>
        <span className="px-3 py-1 rounded text-xs font-mono bg-cyan-950 text-cyan-400 border border-cyan-800">
          Dense Vector Embedding
        </span>
      </div>

      {/* Explanation Banner */}
      <div className="p-3.5 rounded-lg bg-indigo-950/30 border border-indigo-500/30 flex items-center space-x-3 text-xs text-indigo-200">
        <Info className="w-5 h-5 text-cyan-400 shrink-0" />
        <div>
          <span className="font-bold">Core Concept:</span> The World Model learns how these network states evolve over time by mapping continuous packet streams into discrete vector states S&#x2081;, S&#x2082;, S&#x2083;...
        </div>
      </div>

      {/* Horizontal State Timeline */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
            Temporal State Sequence (S1 → S5)
          </span>
          <span className="text-[10px] text-slate-500 font-mono">Click state to inspect feature vector</span>
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          {states.slice(0, 5).map((st, idx) => (
            <React.Fragment key={st.id}>
              <div
                onClick={() => setSelectedStateId(st.id)}
                className={`px-4 py-2.5 rounded-lg cursor-pointer transition border text-xs font-mono min-w-[140px] text-center ${
                  selectedStateId === st.id
                    ? 'bg-cyan-950 text-cyan-300 border-cyan-500 font-bold ring-2 ring-cyan-500/40 shadow-lg shadow-cyan-950/50'
                    : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold">{st.id}</span>
                  <span className="text-[9px] opacity-75">{st.name}</span>
                </div>
                <div className="text-[10px] text-slate-400">{st.timestamp}</div>
              </div>

              {idx < 4 && <ArrowRight className="w-4 h-4 text-slate-600 shrink-0" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Grid of All State Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {states.slice(0, 5).map((st) => (
          <NetworkStateCard
            key={st.id}
            state={st}
            isSelected={selectedStateId === st.id}
            onClick={() => setSelectedStateId(st.id)}
          />
        ))}
      </div>

      {/* Selected State Feature Vector Inspector */}
      <div className="soc-card p-5 border border-cyan-500/40 bg-slate-950/90 soc-glow-cyan">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <Code className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="text-sm font-bold text-slate-100 font-mono">
                Feature Vector: {selectedState.id} ({selectedState.name})
              </h3>
              <p className="text-[11px] text-slate-400">{selectedState.description}</p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
            Vector Dimension = 8
          </span>
        </div>

        {/* Dense Vector Code Display */}
        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-xs text-cyan-300 mb-4 overflow-x-auto">
          <span className="text-slate-400 font-bold">{selectedState.id} = [</span>
          {vectorLabels.map((v, i) => (
            <span key={i}>
              <span className="text-amber-400 font-semibold">{v.label}</span>
              <span className="text-slate-300">: {v.val}</span>
              {i < vectorLabels.length - 1 ? ', ' : ''}
            </span>
          ))}
          <span className="text-slate-400 font-bold">]</span>
        </div>

        {/* Visual Bar Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          {vectorLabels.map((v, i) => (
            <div key={i} className="p-3 bg-slate-900/60 rounded border border-slate-800">
              <span className="text-[10px] text-slate-500 block truncate">{v.label}</span>
              <span className="text-sm font-bold text-slate-100 mt-1 block">{v.val}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
