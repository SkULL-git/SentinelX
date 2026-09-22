import { demoScenarioData } from '../data/demoScenario';

/**
 * Service to simulate network traffic ingestion and telemetry extraction.
 * Interface designed for clean async integration with backend PyShark/PCAP processor.
 */
export const trafficService = {
  /**
   * Load the master demo scenario dataset
   */
  async loadDemoScenario() {
    // Simulate short network fetch latency for realism
    await new Promise((resolve) => setTimeout(resolve, 300));
    return {
      success: true,
      summary: demoScenarioData.trafficSummary,
      scenario: demoScenarioData.scenarioInfo,
    };
  },

  /**
   * Simulate uploading custom PCAP or CSV file
   */
  async uploadTrafficFile(file) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return {
      success: true,
      filename: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      summary: demoScenarioData.trafficSummary,
      message: `Parsed ${file.name} successfully into 4,260 flows across 6 temporal windows.`,
    };
  }
};
