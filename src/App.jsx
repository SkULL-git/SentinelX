import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { Overview } from './pages/Overview';
import { TrafficAnalysis } from './pages/TrafficAnalysis';
import { NetworkStates } from './pages/NetworkStates';
import { WorldModel } from './pages/WorldModel';
import { AttackSimulation } from './pages/AttackSimulation';
import { MitreAttack } from './pages/MitreAttack';
import { Explainability } from './pages/Explainability';
import { NetworkGraphPage } from './pages/NetworkGraphPage';
import { AIAssistant } from './components/AIAssistant';

import { demoScenarioData } from './data/demoScenario';
import { trafficService } from './services/trafficService';
import { telemetryApi } from './services/telemetryApi';

/* ─────────────────────────────────────────────── */
/* Toast Component                                 */
/* ─────────────────────────────────────────────── */
const Toast = ({ message, onDismiss }) => {
  if (!message) return null;
  return (
    <div
      className="fixed bottom-24 right-5 z-50 max-w-sm bg-slate-900/95 border border-cyan-500/40 text-slate-100 px-4 py-3 rounded-xl shadow-2xl shadow-cyan-950/50 font-mono text-xs flex items-start space-x-2.5 backdrop-blur-md cursor-pointer"
      onClick={onDismiss}
    >
      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping shrink-0 mt-1" />
      <span>{message}</span>
    </div>
  );
};

/* ─────────────────────────────────────────────── */
/* Analysis Loading Overlay                        */
/* ─────────────────────────────────────────────── */
const AnalyzingOverlay = ({ stepText = "Processing Network Telemetry..." }) => (
  <div className="fixed inset-0 z-50 bg-[#0b0f19]/90 backdrop-blur-md flex items-center justify-center">
    <div className="text-center space-y-4">
      <div className="relative w-16 h-16 mx-auto">
        <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20 animate-ping" />
        <div className="absolute inset-2 rounded-full border-2 border-t-cyan-400 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
          </svg>
        </div>
      </div>
      <div>
        <p className="text-sm font-bold text-cyan-400 font-mono">{stepText}</p>
        <p className="text-xs text-slate-400 mt-1">World Model unrolling K-step temporal horizon</p>
      </div>
      <div className="flex justify-center space-x-1">
        {[0, 1, 2, 3, 4].map(i => (
          <div
            key={i}
            className="w-1.5 h-4 bg-cyan-500/40 rounded-full animate-pulse"
            style={{ animationDelay: `${i * 100}ms` }}
          />
        ))}
      </div>
    </div>
  </div>
);

/* ─────────────────────────────────────────────── */
/* Main App                                        */
/* ─────────────────────────────────────────────── */
function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [scenarioData, setScenarioData] = useState(demoScenarioData);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // File upload state management
  const [dataMode, setDataMode] = useState('demo'); // 'demo' | 'processing' | 'real' | 'error'
  const [fileDetails, setFileDetails] = useState(null);
  const [processingStep, setProcessingStep] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const graphData = {
    nodes: scenarioData.networkNodes,
    edges: scenarioData.networkEdges,
  };

  const showToast = (msg, duration = 4000) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), duration);
  };

  const handleLoadScenario = async () => {
    setDataMode('demo');
    setFileDetails(null);
    setErrorMessage(null);
    showToast('Loading prototype scenario dataset...');
    await trafficService.loadDemoScenario();
    setScenarioData({ ...demoScenarioData });
    showToast('✓ Prototype scenario loaded — all pages reflect telemetry data.');
  };

  const handleStartAnalysis = async () => {
    setIsAnalyzing(true);
    setProcessingStep('Unrolling K-step temporal state horizon...');
    setTimeout(() => {
      setIsAnalyzing(false);
      setProcessingStep(null);
      showToast('✓ Predictive analysis complete — World Model projected 3 future attack states.');
      setActiveTab('states');
    }, 1600);
  };

  const handleResetDemo = () => {
    setDataMode('demo');
    setFileDetails(null);
    setErrorMessage(null);
    setScenarioData({ ...demoScenarioData });
    setActiveTab('overview');
    showToast('Application reset to baseline state.');
  };

  const handleFileUpload = async (file) => {
    setErrorMessage(null);
    setDataMode('processing');
    setIsAnalyzing(true);
    setProcessingStep(`Uploading ${file.name}...`);

    try {
      setProcessingStep('Processing packets and extracting network features...');
      const result = await telemetryApi.uploadTelemetryFile(file);

      setProcessingStep('Building temporal network states...');
      await new Promise((res) => setTimeout(res, 400));

      setScenarioData(result);
      setFileDetails(result.fileDetails);
      setDataMode('real');
      setIsAnalyzing(false);
      setProcessingStep(null);
      showToast(`✓ Processed ${file.name} successfully! ${result.fileDetails.packets.toLocaleString()} packets extracted.`);
    } catch (err) {
      console.error('File upload failed:', err);
      setIsAnalyzing(false);
      setProcessingStep(null);
      setDataMode('error');
      setErrorMessage(err.message || 'Failed to process telemetry file.');
      showToast(`❌ Error: ${err.message || 'Failed to process telemetry file.'}`);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#060b14] text-slate-200 app-shell">
      {/* ── Sidebar ── */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar
          onLoadScenario={handleLoadScenario}
          onStartAnalysis={handleStartAnalysis}
          onResetDemo={handleResetDemo}
          isAnalyzing={isAnalyzing}
        />

        {/* Analysis overlay */}
        {isAnalyzing && <AnalyzingOverlay stepText={processingStep || "Processing Network Telemetry..."} />}

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div key={activeTab} className="page-enter">
          {activeTab === 'overview' && (
            <Overview
              scenarioData={scenarioData}
              onLoadScenario={handleLoadScenario}
              onStartAnalysis={handleStartAnalysis}
              isAnalyzing={isAnalyzing}
              onNavigateTab={setActiveTab}
            />
          )}
          {activeTab === 'traffic' && (
            <TrafficAnalysis
              trafficSummary={scenarioData.trafficSummary}
              fileDetails={fileDetails}
              dataMode={dataMode}
              errorMessage={errorMessage}
              onFileUpload={handleFileUpload}
              onLoadScenario={handleLoadScenario}
              onStartAnalysis={handleStartAnalysis}
              isAnalyzing={isAnalyzing}
            />
          )}
          {activeTab === 'states' && (
            <NetworkStates states={scenarioData.networkStates} />
          )}
          {activeTab === 'world-model' && (
            <WorldModel scenarioData={scenarioData} />
          )}
          {activeTab === 'attack-sim' && (
            <AttackSimulation scenarioData={scenarioData} />
          )}
          {activeTab === 'mitre' && (
            <MitreAttack mappings={scenarioData.mitreMappings} />
          )}
          {activeTab === 'explainability' && (
            <Explainability explainability={scenarioData.explainability} />
          )}
          {activeTab === 'network-graph' && (
            <NetworkGraphPage graphData={graphData} />
          )}
          </div>
        </main>
        <AIAssistant scenarioData={scenarioData} />
      </div>

      {/* ── Toast Notification ── */}
      <Toast message={toastMessage} onDismiss={() => setToastMessage(null)} />
    </div>
  );
}

export default App;

