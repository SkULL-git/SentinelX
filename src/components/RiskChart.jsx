import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine
} from 'recharts';

export const RiskChart = ({ data, title = "Future Risk Trajectory Simulation" }) => {
  const chartData = data || [
    { time: 'Now', risk: 32, label: 'Baseline' },
    { time: '+10 min', risk: 48, label: 'Reconnaissance' },
    { time: '+20 min', risk: 67, label: 'Discovery' },
    { time: '+30 min', risk: 81, label: 'Credential Access (Pred)' },
    { time: '+40 min', risk: 91, label: 'Lateral Movement (Pred)' },
    { time: '+50 min', risk: 96, label: 'Impact (Potential)' },
  ];

  return (
    <div className="soc-card p-5 border border-slate-800">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-sm font-bold text-slate-100">{title}</h3>
          <p className="text-[11px] text-slate-400">
            Projected risk probability progression over time windows
          </p>
        </div>
        <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-amber-950/80 text-amber-400 border border-amber-800">
          Projected risk — Demo Simulation
        </span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 30, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.6} />
                <stop offset="50%" stopColor="#f59e0b" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="time" stroke="#64748b" tick={{ fontSize: 11, fill: '#94a3b8' }} />
            <YAxis domain={[0, 100]} stroke="#64748b" tick={{ fontSize: 11, fill: '#94a3b8' }} unit="%" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                borderColor: '#334155',
                borderRadius: '8px',
                color: '#f8fafc',
                fontSize: '12px',
                fontFamily: 'monospace'
              }}
              formatter={(value) => [`${value}%`, 'Simulated Risk Score']}
            />
            <ReferenceLine y={70} stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'High Risk Threshold (70%)', fill: '#ef4444', fontSize: 10 }} />
            <Area
              type="monotone"
              dataKey="risk"
              stroke="#ef4444"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#riskGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
        <span className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
          <span>S1-S3 Observed</span>
        </span>
        <span className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
          <span>S4-S6 Predicted Future Horizon</span>
        </span>
      </div>
    </div>
  );
};
