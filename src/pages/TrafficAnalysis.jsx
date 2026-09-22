import React from 'react';
import { UploadCloud, FileText, CheckCircle2, Play, RefreshCw, Activity, ArrowRight, ShieldCheck, AlertTriangle, Cpu } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const TrafficAnalysis = ({
  trafficSummary,
  fileDetails,
  dataMode,
  errorMessage,
  onFileUpload,
  onLoadScenario,
  onStartAnalysis,
  isAnalyzing
}) => {
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      onFileUpload(file);
    }
  };

  const handleDemoClick = () => {
    onLoadScenario();
  };

  const isRealData = dataMode === 'real' && fileDetails;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-100">Network Traffic Analysis</h1>
          <p className="text-xs text-slate-400 mt-1">
            Ingest raw packet captures (.pcap, .pcapng) or IPFIX flow CSV telemetry to synthesize continuous temporal network states.
          </p>
        </div>
        <span className="px-3 py-1 rounded text-xs font-mono bg-cyan-950 text-cyan-400 border border-cyan-800">
          Telemetry Ingestion Engine
        </span>
      </div>

      {/* Telemetry Status Disclaimer */}
      {isRealData ? (
        <div className="p-3.5 rounded-lg bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-between text-xs text-emerald-200">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>Network Telemetry Processed</strong> — Dynamic dataset generated from <span className="font-mono text-emerald-300 font-semibold">{fileDetails.name}</span> ({fileDetails.sizeFormatted})
            </span>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-900 text-emerald-300 border border-emerald-700 uppercase font-bold">
            Processed Successfully
          </span>
        </div>
      ) : (
        <div className="p-3.5 rounded-lg bg-cyan-950/30 border border-cyan-500/30 flex items-center justify-between text-xs text-cyan-200">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              <strong>Network Telemetry Engine</strong> — Upload custom packet telemetry (.pcap, .pcapng, .csv) or load representative prototype scenario.
            </span>
          </div>
          <span className="text-[10px] font-mono text-cyan-400 uppercase">SIH Prototype</span>
        </div>
      )}

      {/* Error Message Banner */}
      {errorMessage && (
        <div className="p-4 rounded-lg bg-red-950/50 border border-red-500/50 text-xs text-red-200 flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-red-300">Processing Error:</strong>
            <p className="mt-0.5 text-red-200 font-mono">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Upload Zone */}
      <div className="soc-card p-6 border border-dashed border-slate-700 bg-slate-950/40 text-center hover:border-cyan-500/50 transition">
        <div className="max-w-md mx-auto space-y-3">
          <div className="w-12 h-12 mx-auto rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <UploadCloud className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-200">Upload Network Traffic</h3>
          <p className="text-xs text-slate-400">
            Select a packet capture or flow dataset. Supported formats: <span className="font-mono text-cyan-300 font-semibold">.pcap, .pcapng, .csv</span>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <label className="px-4 py-2 rounded-lg text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white cursor-pointer transition flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Select File</span>
              <input type="file" accept=".pcap,.pcapng,.csv" onChange={handleFileChange} className="hidden" />
            </label>

            <button
              onClick={handleDemoClick}
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 transition flex items-center space-x-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Load Prototype Attack Scenario</span>
            </button>
          </div>

          {/* Upload Status Details */}
          {fileDetails && (
            <div className="mt-4 p-3 rounded-lg bg-slate-900 border border-cyan-500/40 text-xs font-mono text-cyan-300 text-left space-y-1">
              <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 mb-1.5">
                <span className="font-bold text-slate-200 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  {fileDetails.name}
                </span>
                <span className="text-[10px] text-emerald-400 px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800">
                  Processed
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-400">
                <div>File Size: <span className="text-slate-200">{fileDetails.sizeFormatted}</span></div>
                <div>Extracted Packets: <span className="text-cyan-300 font-bold">{fileDetails.packets.toLocaleString()}</span></div>
                <div>Extracted Flows: <span className="text-cyan-300 font-bold">{fileDetails.flows.toLocaleString()}</span></div>
                <div>Capture Duration: <span className="text-amber-400 font-bold">{fileDetails.durationMinutes} min</span></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Traffic Summary Cards */}
      <div>
        <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-3">
          Extracted Traffic Telemetry Summary
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="soc-card p-3 border border-slate-800 font-mono">
            <span className="text-[10px] text-slate-500 block">Total Packets</span>
            <span className="text-base font-bold text-slate-100">{trafficSummary.totalPackets.toLocaleString()}</span>
          </div>

          <div className="soc-card p-3 border border-slate-800 font-mono">
            <span className="text-[10px] text-slate-500 block">Unique Flows</span>
            <span className="text-base font-bold text-cyan-400">{trafficSummary.totalFlows.toLocaleString()}</span>
          </div>

          <div className="soc-card p-3 border border-slate-800 font-mono">
            <span className="text-[10px] text-slate-500 block">Unique Source IPs</span>
            <span className="text-base font-bold text-slate-100">{trafficSummary.uniqueSourceIps}</span>
          </div>

          <div className="soc-card p-3 border border-slate-800 font-mono">
            <span className="text-[10px] text-slate-500 block">Unique Dest IPs</span>
            <span className="text-base font-bold text-slate-100">{trafficSummary.uniqueDestIps}</span>
          </div>

          <div className="soc-card p-3 border border-slate-800 font-mono">
            <span className="text-[10px] text-slate-500 block">Protocols</span>
            <span className="text-sm font-bold text-emerald-400">{trafficSummary.protocols.join(' / ')}</span>
          </div>

          <div className="soc-card p-3 border border-slate-800 font-mono">
            <span className="text-[10px] text-slate-500 block">Duration</span>
            <span className="text-base font-bold text-amber-400">{trafficSummary.durationMinutes} min</span>
          </div>
        </div>
      </div>

      {/* Traffic Activity Chart */}
      <div className="soc-card p-5 border border-slate-800">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-slate-100">Flow Volume Over Time Windows</h3>
            <p className="text-[11px] text-slate-400">Packet throughput discretization into continuous temporal slices</p>
          </div>
          <span className="text-[10px] font-mono text-cyan-400">Time-window size = 5m</span>
        </div>

        <div className="h-60 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={trafficSummary.timeSeries} margin={{ top: 10, right: 30, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="time" stroke="#64748b" tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <YAxis stroke="#64748b" tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '8px',
                  color: '#f8fafc',
                  fontSize: '12px',
                  fontFamily: 'monospace'
                }}
              />
              <Bar dataKey="packets" fill="#06b6d4" radius={[4, 4, 0, 0]} name="Packets / Window" />
              <Bar dataKey="flows" fill="#6366f1" radius={[4, 4, 0, 0]} name="Flows" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Action Trigger */}
      <div className="pt-2 flex justify-end">
        <button
          onClick={onStartAnalysis}
          disabled={isAnalyzing}
          className="px-6 py-3 rounded-lg text-sm font-bold bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white shadow-lg shadow-cyan-600/30 transition flex items-center space-x-2"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>{isAnalyzing ? 'Processing network telemetry...' : 'Start Predictive Analysis'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

