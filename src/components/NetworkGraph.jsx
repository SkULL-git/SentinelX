import React, { useState } from 'react';
import { Database, Monitor, Server, Globe, ShieldAlert, Shield } from 'lucide-react';

const NODE_CONFIG = {
  internet:  { label: "Internet",  defaultX: 50,  defaultY: 150, type: 'globe' },
  gateway:   { label: "Gateway",   defaultX: 190, defaultY: 150, type: 'shield' },
  hostA:     { label: "Host A",    defaultX: 350, defaultY: 90,  type: 'monitor', pivot: true },
  hostB:     { label: "Host B",    defaultX: 350, defaultY: 215, type: 'monitor' },
  server:    { label: "Server",    defaultX: 510, defaultY: 90,  type: 'server',  pivot: true },
  hostC:     { label: "Host C",    defaultX: 660, defaultY: 160, type: 'monitor', pivot: true },
  database:  { label: "Database",  defaultX: 800, defaultY: 160, type: 'database',pivot: true },
};

const RISK_STYLE = {
  Critical: { ring: '#ef4444', glow: 'rgba(239,68,68,0.40)', text: 'text-red-400', badge: 'bg-red-950 text-red-400 border-red-800' },
  High:     { ring: '#f59e0b', glow: 'rgba(245,158,11,0.40)', text: 'text-amber-400', badge: 'bg-amber-950 text-amber-400 border-amber-800' },
  Medium:   { ring: '#eab308', glow: 'rgba(234,179,8,0.25)',  text: 'text-yellow-400', badge: 'bg-yellow-950 text-yellow-400 border-yellow-800' },
  Low:      { ring: '#22c55e', glow: 'rgba(34,197,94,0.20)',  text: 'text-emerald-400', badge: 'bg-emerald-950 text-emerald-400 border-emerald-800' },
};

export const NetworkGraph = ({ graphData }) => {
  const nodes = graphData?.nodes || [
    { id: "internet",  name: "External Internet",    ip: "203.0.113.5",  role: "Attacker Origin",            risk: "Critical", x: 50,  y: 150, isPivot: false },
    { id: "gateway",   name: "Edge Firewall Gateway", ip: "10.0.0.1",     role: "Perimeter Router",            risk: "Low",      x: 190, y: 150, isPivot: false },
    { id: "hostA",     name: "Host A",               ip: "10.0.0.12",    role: "Compromised Entry Host",      risk: "Medium",   x: 350, y: 90,  isPivot: true },
    { id: "hostB",     name: "Host B",               ip: "10.0.0.14",    role: "Unaffected Workstation",      risk: "Low",      x: 350, y: 215, isPivot: false },
    { id: "server",    name: "Auth Server",          ip: "10.0.0.20",    role: "Target Server (S3/S4)",       risk: "High",     x: 510, y: 90,  isPivot: true },
    { id: "hostC",     name: "Host C",               ip: "10.0.0.34",    role: "Target Pivot (S5)",           risk: "High",     x: 660, y: 160, isPivot: true },
    { id: "database",  name: "Production DB",        ip: "10.0.0.50",    role: "Critical Asset (S6 Impact)",  risk: "Critical", x: 800, y: 160, isPivot: true },
  ];

  const edges = graphData?.edges || [
    { source: "internet",  target: "gateway",  isAttackPath: true,  status: "Active" },
    { source: "gateway",   target: "hostA",   isAttackPath: true,  status: "Active" },
    { source: "gateway",   target: "hostB",   isAttackPath: false, status: "Normal" },
    { source: "hostA",     target: "server",  isAttackPath: true,  status: "Active" },
    { source: "hostA",     target: "hostB",   isAttackPath: false, status: "Normal" },
    { source: "server",    target: "hostC",   isAttackPath: true,  status: "Predicted" },
    { source: "hostC",     target: "database",isAttackPath: true,  status: "Potential" },
  ];

  const [selectedNode, setSelectedNode] = useState(nodes.find(n => n.id === 'server'));

  const getNodePosition = (id) => {
    const n = nodes.find(n => n.id === id);
    return n ? { x: n.x, y: n.y } : { x: 0, y: 0 };
  };

  const EdgeLine = ({ edge, idx }) => {
    const src = getNodePosition(edge.source);
    const tgt = getNodePosition(edge.target);
    const isActive = edge.status === 'Active';
    const isPredicted = edge.status === 'Predicted';
    const isPotential = edge.status === 'Potential';

    const color = isActive ? '#ef4444' : isPredicted ? '#f59e0b' : isPotential ? '#f97316' : '#334155';
    const dash = isActive ? '8 5' : isPredicted ? '6 4' : isPotential ? '4 4' : '0';
    const width = edge.isAttackPath ? 2.5 : 1.5;
    const markerId = `arrow-${edge.source}-${edge.target}`;

    return (
      <g key={idx}>
        <defs>
          <marker id={markerId} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={color} />
          </marker>
        </defs>
        {/* Shadow line for attack paths */}
        {edge.isAttackPath && (
          <line x1={src.x} y1={src.y} x2={tgt.x} y2={tgt.y}
            stroke={color} strokeWidth={6} strokeOpacity={0.08} />
        )}
        <line
          x1={src.x} y1={src.y}
          x2={tgt.x} y2={tgt.y}
          stroke={color}
          strokeWidth={width}
          strokeDasharray={dash}
          markerEnd={`url(#${markerId})`}
          strokeLinecap="round"
          style={edge.isAttackPath ? { animation: 'dash-flow 1.5s linear infinite' } : {}}
        />
      </g>
    );
  };

  const NodeCircle = ({ node }) => {
    const riskStyle = RISK_STYLE[node.risk] || RISK_STYLE.Low;
    const isSelected = selectedNode?.id === node.id;
    const isHighRisk = node.risk === 'Critical' || node.risk === 'High';

    return (
      <g
        key={node.id}
        transform={`translate(${node.x}, ${node.y})`}
        onClick={() => setSelectedNode(node)}
        style={{ cursor: 'pointer' }}
      >
        {/* Glow ring for high-risk nodes */}
        {isHighRisk && (
          <circle r={28} fill="none"
            stroke={riskStyle.ring}
            strokeWidth={1.5}
            strokeOpacity={0.3}
            style={{ animation: 'status-ping 2s ease-in-out infinite' }}
          />
        )}
        {/* Selection halo */}
        {isSelected && (
          <circle r={26} fill="none" stroke="#06b6d4" strokeWidth={2.5} strokeOpacity={0.8} />
        )}
        {/* Main body */}
        <circle
          r={22}
          fill={isSelected ? '#0c1a2e' : '#1e293b'}
          stroke={isSelected ? '#06b6d4' : riskStyle.ring}
          strokeWidth={isSelected ? 2.5 : 2}
        />
        {/* IP Indicator dot */}
        {node.isPivot && (
          <circle cx={16} cy={-16} r={5} fill={riskStyle.ring} />
        )}
        {/* Host label text */}
        <text y={36} textAnchor="middle" fill="#f1f5f9" fontSize="10" fontWeight="700" fontFamily="JetBrains Mono, monospace">
          {node.name}
        </text>
        <text y={48} textAnchor="middle" fill="#64748b" fontSize="8.5" fontFamily="JetBrains Mono, monospace">
          {node.ip}
        </text>
      </g>
    );
  };

  const riskBadge = selectedNode ? (RISK_STYLE[selectedNode.risk] || RISK_STYLE.Low).badge : '';

  return (
    <div className="soc-card p-5 border border-slate-800">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Network Topology & Attack Path Overlay
          </h3>
          <p className="text-[11px] text-slate-400">
            Cross-host behavioural correlation to identify attacker lateral movement vectors
          </p>
        </div>
        <div className="flex items-center space-x-3 text-[10px] font-mono">
          <span className="flex items-center space-x-1.5">
            <span className="w-6 border-t-2 border-dashed border-red-500 inline-block"></span>
            <span className="text-red-400">Active Attack Path</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <span className="w-6 border-t-2 border-dashed border-amber-400 inline-block"></span>
            <span className="text-amber-400">Predicted Path</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <span className="w-6 border-t border-slate-600 inline-block"></span>
            <span className="text-slate-400">Normal</span>
          </span>
        </div>
      </div>

      {/* Predicted Path Banner */}
      <div className="mb-4 p-2.5 rounded bg-red-950/30 border border-red-800/60 text-xs font-mono text-red-300 flex items-center justify-between">
        <span>⚠ Predicted Lateral Movement Path: <strong>Host A (10.0.0.12) → Auth Server (10.0.0.20) → Host C (10.0.0.34) → Production DB (10.0.0.50)</strong></span>
        <span className="text-[10px] text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800">Demo Prediction</span>
      </div>

      {/* SVG Network Map */}
      <div className="bg-slate-950/70 rounded-xl border border-slate-800/80 overflow-x-auto bg-grid">
        <svg
          viewBox="0 0 870 280"
          className="w-full min-w-[600px]"
          style={{ minHeight: '280px' }}
        >
          <style>{`
            @keyframes dash-flow { to { stroke-dashoffset: -24; } }
          `}</style>

          {/* Render Edges first (behind nodes) */}
          {edges.map((edge, i) => <EdgeLine key={i} edge={edge} idx={i} />)}

          {/* Render Nodes */}
          {nodes.map((node) => <NodeCircle key={node.id} node={node} />)}
        </svg>
      </div>

      {/* Selected Node Inspector */}
      {selectedNode && (
        <div className="mt-4 p-4 rounded-lg bg-slate-900/80 border border-slate-700 flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2.5 rounded-lg border ${(RISK_STYLE[selectedNode.risk] || RISK_STYLE.Low).badge} bg-opacity-20`}>
              <Server className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-bold text-slate-100">{selectedNode.name}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${riskBadge}`}>
                  {selectedNode.risk} Risk
                </span>
                {selectedNode.isPivot && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-red-950/70 text-red-400 border border-red-800">
                    Lateral Pivot
                  </span>
                )}
              </div>
              <div className="mt-0.5 text-xs text-slate-400 font-mono">
                IP: <span className="text-cyan-300 font-bold">{selectedNode.ip}</span>
                {' '}·{' '}
                Role: <span className="text-slate-300">{selectedNode.role}</span>
              </div>
            </div>
          </div>
          <div className="text-[10px] text-slate-500 font-mono italic">
            Click any node to inspect its details
          </div>
        </div>
      )}
    </div>
  );
};
