import React from 'react';
import { HelpCircle, TrendingUp, CheckCircle, ShieldAlert, Award } from 'lucide-react';

export const ExplainabilityChart = ({ explainability }) => {
  const data = explainability || {
    predictedStage: "Credential Access",
    confidence: 87,
    reasoning: "Multiple behavioural indicators show a transition from reconnaissance/discovery activity toward credential-focused activity.",
    drivingFeatures: [
      { name: "Abnormal SYN Activity", contribution: 32, details: "3.4x spike in TCP SYN packets" },
      { name: "Sequential Port Scanning", contribution: 24, details: "94 unique ports probed" },
      { name: "Failed Authentication", contribution: 21, details: "19 failed auth attempts (10x jump)" },
      { name: "Unusual Inter-host Traffic", contribution: 15, details: "Host A to Server uncharacteristic flow" },
      { name: "Increased Connection Rate", contribution: 8, details: "Flow duration dropped to 1.5s" },
    ],
    evidenceCard: {
      primaryDriver: "TCP SYN Sweep + Auth Retries",
      entropyScore: "0.89 (High Anomaly)",
      modelConfidenceScore: "0.87",
      leadTimeWindow: "15 - 20 Minutes",
    }
  };

  return (
    <div className="soc-card p-5 border border-slate-800">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-cyan-400" />
            Explainable AI (XAI) Attribution
          </h3>
          <p className="text-[11px] text-slate-400">
            Why is the model predicting increased risk for Credential Access?
          </p>
        </div>
        <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-cyan-950 text-cyan-400 border border-cyan-800">
          Feature Contribution Weights
        </span>
      </div>

      {/* Main Reasoning Callout */}
      <div className="p-4 rounded-lg bg-cyan-950/20 border border-cyan-500/30 mb-5">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-bold text-cyan-300 font-mono">
            Prediction: High probability of {data.predictedStage}
          </span>
          <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
            {data.confidence}% Confidence
          </span>
        </div>
        <p className="text-xs text-slate-300 italic">
          "{data.reasoning}"
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Horizontal Bar Chart (2 cols) */}
        <div className="lg:col-span-2 space-y-3">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Ranked Feature Contributions
          </span>

          {data.drivingFeatures.map((feat, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-200">{idx + 1}. {feat.name}</span>
                <span className="font-mono font-bold text-cyan-400">+{feat.contribution}%</span>
              </div>

              {/* Progress Bar Container */}
              <div className="h-2.5 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800 flex">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full transition-all duration-500"
                  style={{ width: `${feat.contribution}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-500 font-mono">{feat.details}</p>
            </div>
          ))}
        </div>

        {/* Prediction Evidence Card (1 col) */}
        <div className="bg-slate-950/70 p-4 rounded-lg border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-3 pb-2 border-b border-slate-800">
              <Award className="w-4 h-4 text-cyan-400" />
              <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
                Prediction Evidence
              </h4>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div>
                <span className="text-[10px] text-slate-500 block uppercase">Primary Driver</span>
                <span className="font-bold text-amber-400">{data.evidenceCard?.primaryDriver}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block uppercase">Network Entropy Score</span>
                <span className="font-bold text-cyan-400">{data.evidenceCard?.entropyScore}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block uppercase">Confidence Score</span>
                <span className="font-bold text-emerald-400">{data.evidenceCard?.modelConfidenceScore}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block uppercase">Forecast Window</span>
                <span className="font-bold text-indigo-400">{data.evidenceCard?.leadTimeWindow}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] text-slate-500">
            Model attribution computed via telemetry feature contribution analysis.
          </div>
        </div>
      </div>
    </div>
  );
};

