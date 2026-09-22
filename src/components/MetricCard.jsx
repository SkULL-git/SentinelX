import React from 'react';

export const MetricCard = ({ title, value, unit = '', subtitle, icon: Icon, color = 'cyan', badge }) => {
  const colorStyles = {
    red: {
      border: 'border-red-500/30',
      text: 'text-red-400',
      glow: 'shadow-red-950/40',
      badgeBg: 'bg-red-950/60 text-red-400 border-red-800/60',
      iconBg: 'bg-red-500/10 text-red-400',
    },
    cyan: {
      border: 'border-cyan-500/30',
      text: 'text-cyan-400',
      glow: 'shadow-cyan-950/40',
      badgeBg: 'bg-cyan-950/60 text-cyan-400 border-cyan-800/60',
      iconBg: 'bg-cyan-500/10 text-cyan-400',
    },
    amber: {
      border: 'border-amber-500/30',
      text: 'text-amber-400',
      glow: 'shadow-amber-950/40',
      badgeBg: 'bg-amber-950/60 text-amber-400 border-amber-800/60',
      iconBg: 'bg-amber-500/10 text-amber-400',
    },
    emerald: {
      border: 'border-emerald-500/30',
      text: 'text-emerald-400',
      glow: 'shadow-emerald-950/40',
      badgeBg: 'bg-emerald-950/60 text-emerald-400 border-emerald-800/60',
      iconBg: 'bg-emerald-500/10 text-emerald-400',
    },
  };

  const style = colorStyles[color] || colorStyles.cyan;

  return (
    <div className={`soc-card soc-card-hover p-4 border ${style.border} ${style.glow}`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{title}</span>
        {Icon && (
          <div className={`p-2 rounded-lg ${style.iconBg}`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <div className="flex items-baseline space-x-1">
          <span className={`text-3xl font-extrabold font-mono tracking-tight ${style.text}`}>
            {value}
          </span>
          {unit && <span className="text-sm font-medium text-slate-400">{unit}</span>}
        </div>
        {badge && (
          <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${style.badgeBg}`}>
            {badge}
          </span>
        )}
      </div>

      {subtitle && <p className="mt-2 text-[11px] text-slate-400 truncate">{subtitle}</p>}
    </div>
  );
};
