import React, { useMemo, useRef, useState } from 'react';
import { Bot, ChevronDown, Send, Sparkles, X, Zap, Command, Activity } from 'lucide-react';

const QUICK_PROMPTS = [
  'Why is the network high risk?',
  'What happens next?',
  'Explain the current prediction',
  'What should the SOC analyst check first?',
];

const buildReply = (prompt, scenarioData) => {
  const p = prompt.toLowerCase();
  const { scenarioInfo, currentSituation, explainability, earlyWarning } = scenarioData;

  if (p.includes('what happens next') || p.includes('next')) {
    return `The model projects **${currentSituation.predictedNextStage}** as the next stage, with a current risk score of ${currentSituation.riskScore}% and an estimated lead time of ${currentSituation.leadTime}. The strongest signals are abnormal SYN activity, sequential scanning, and rising authentication failures.`;
  }

  if (p.includes('why') || p.includes('risk')) {
    return `The network is flagged **${currentSituation.status}** because multiple features are moving together: failed authentication is accelerating, unique port activity is elevated, and inter-host traffic is becoming less typical. The demo model assigns ${scenarioInfo.currentRiskScore}% current risk and ${scenarioInfo.predictionConfidence}% prediction confidence.`;
  }

  if (p.includes('prediction') || p.includes('forecast')) {
    return `The demo forecast points from **${currentSituation.currentStage} → ${currentSituation.predictedNextStage}**. The leading driver is **${explainability.drivingFeatures[0].name}** (${explainability.drivingFeatures[0].contribution}% contribution in this simulated explanation). The early-warning panel estimates ${earlyWarning.leadTime} of lead time.`;
  }

  if (p.includes('check') || p.includes('soc analyst') || p.includes('first')) {
    return `Start with the highest-signal telemetry: validate the ${explainability.drivingFeatures[0].name.toLowerCase()}, review authentication failures on the core auth server, and inspect the ${earlyWarning.threat.toLowerCase()} path. Treat these as investigation priorities, not automated verdicts.`;
  }

  return `I’m running in demo mode. I can summarize the current network state, explain the predicted attack progression, surface the strongest contributing signals, or suggest analyst investigation priorities.`;
};

const renderInline = (text) => {
  return text.split(/(\*\*.*?\*\*)/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="text-slate-100 font-semibold">{part.slice(2, -2)}</strong>;
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
};

export const AIAssistant = ({ scenarioData }) => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: 'SentinelX AI is ready. Ask me about the current threat, predicted progression, evidence, or analyst priorities.',
    },
  ]);
  const scrollRef = useRef(null);

  const contextLine = useMemo(
    () => `${scenarioData.currentSituation.currentStage} → ${scenarioData.currentSituation.predictedNextStage}`,
    [scenarioData]
  );

  const sendMessage = (value) => {
    const prompt = value.trim();
    if (!prompt || isThinking) return;

    setMessages((prev) => [...prev, { role: 'user', text: prompt }]);
    setInput('');
    setIsThinking(true);

    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: buildReply(prompt, scenarioData) },
      ]);
      setIsThinking(false);
      window.setTimeout(() => scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' }), 50);
    }, 650);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div className="mb-3 w-[min(390px,calc(100vw-28px))] overflow-hidden rounded-2xl border border-cyan-400/20 bg-[#09111e]/95 shadow-2xl shadow-cyan-950/40 backdrop-blur-xl ai-assistant-panel">
          <div className="relative border-b border-slate-800/80 px-4 py-3.5">
            <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 shadow-lg shadow-cyan-500/20">
                  <Bot className="h-4 w-4 text-white" />
                  <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#09111e] bg-emerald-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-white">SentinelX AI</p>
                    <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-1.5 py-0.5 text-[9px] font-mono font-semibold uppercase tracking-wider text-cyan-300">Demo</span>
                  </div>
                  <p className="mt-0.5 text-[10px] text-slate-400">Context: {contextLine}</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-800 hover:text-slate-200" aria-label="Close assistant">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div ref={scrollRef} className="max-h-[430px] space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-[11px] leading-relaxed ${message.role === 'user' ? 'rounded-br-md bg-cyan-600/90 text-white' : 'rounded-bl-md border border-slate-800 bg-slate-900/80 text-slate-300'}`}>
                  {message.role === 'assistant' && (
                    <div className="mb-1.5 flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-wider text-cyan-400">
                      <Sparkles className="h-3 w-3" />
                      Analysis
                    </div>
                  )}
                  <span>{renderInline(message.text)}</span>
                </div>
              </div>
            ))}
            {isThinking && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-slate-800 bg-slate-900/80 px-3.5 py-2.5">
                  {[0, 1, 2].map((n) => <span key={n} className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-400/70" style={{ animationDelay: `${n * 120}ms` }} />)}
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-slate-800/80 px-3 py-3">
            <div className="mb-2.5 flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
              {QUICK_PROMPTS.map((prompt) => (
                <button key={prompt} onClick={() => sendMessage(prompt)} className="shrink-0 rounded-full border border-slate-700/80 bg-slate-900/70 px-2.5 py-1.5 text-[9px] font-medium text-slate-400 transition hover:border-cyan-500/30 hover:text-cyan-300">
                  {prompt}
                </button>
              ))}
            </div>
            <form onSubmit={(e) => { e.preventDefault(); sendMessage(input); }} className="flex items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-950/80 p-1.5 focus-within:border-cyan-500/40">
              <Command className="ml-1 h-3.5 w-3.5 text-slate-600" />
              <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask SentinelX about this scenario..." className="min-w-0 flex-1 bg-transparent px-1 py-2 text-[11px] text-slate-200 outline-none placeholder:text-slate-600" />
              <button type="submit" disabled={!input.trim() || isThinking} className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-600 text-white transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-30">
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
            <div className="mt-2 flex items-center justify-between px-1 text-[9px] font-mono uppercase tracking-wider text-slate-600">
              <span>Demo responses · no external API</span>
              <span className="flex items-center gap-1"><Activity className="h-2.5 w-2.5" /> Live context</span>
            </div>
          </div>
        </div>
      )}

      <button onClick={() => setOpen((v) => !v)} className="group flex items-center gap-2 rounded-2xl border border-cyan-400/30 bg-[#0a1524]/95 px-3.5 py-2.5 shadow-xl shadow-cyan-950/30 backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-cyan-300/50">
        <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 shadow-lg shadow-cyan-500/20">
          {open ? <ChevronDown className="h-4 w-4 text-white" /> : <Bot className="h-4 w-4 text-white" />}
          <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#0a1524] bg-emerald-400" />
        </div>
        <div className="pr-1 text-left">
          <p className="text-[11px] font-bold text-slate-100">Ask SentinelX AI</p>
          <p className="text-[9px] font-mono uppercase tracking-wider text-cyan-400">Threat copilot · demo</p>
        </div>
        <Zap className="h-3.5 w-3.5 text-amber-300 transition group-hover:scale-110" />
      </button>
    </div>
  );
};
