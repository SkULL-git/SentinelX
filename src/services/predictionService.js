import { demoScenarioData } from '../data/demoScenario';

/**
 * World Model Prediction Service Interface
 * 
 * Provides prediction data, state transitions, K-step simulation,
 * MITRE ATT&CK mapping, and XAI explainability metrics.
 * Decoupled to allow drop-in replacement with FastAPI/Python ML backend.
 */
export const predictionService = {
  /**
   * Fetch current situation overview
   */
  async getCurrentSituation() {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return {
      ...demoScenarioData.currentSituation,
      earlyWarning: demoScenarioData.earlyWarning,
    };
  },

  /**
   * Fetch horizontal network states (S1 to S6)
   */
  async getNetworkStates() {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return demoScenarioData.networkStates;
  },

  /**
   * Run K-step temporal simulation using World Model
   */
  async runKStepSimulation(steps = 3) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    const states = demoScenarioData.networkStates;
    const currentIdx = 2; // S3
    const projected = states.slice(currentIdx, currentIdx + steps + 1);
    
    return {
      simulationId: `sim-k${steps}-${Date.now()}`,
      currentIdx,
      projectedStates: projected,
      riskTimeline: demoScenarioData.riskTimeline,
      confidence: demoScenarioData.scenarioInfo.predictionConfidence,
      modelType: "LSTM / Transformer World Model",
    };
  },

  /**
   * Fetch MITRE ATT&CK mappings
   */
  async getMitreMappings() {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return demoScenarioData.mitreMappings;
  },

  /**
   * Fetch Explainability / SHAP driving feature breakdown
   */
  async getExplainability() {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return demoScenarioData.explainability;
  },

  /**
   * Fetch Network topology nodes and attack path edges
   */
  async getNetworkGraphData() {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return {
      nodes: demoScenarioData.networkNodes,
      edges: demoScenarioData.networkEdges,
    };
  }
};
