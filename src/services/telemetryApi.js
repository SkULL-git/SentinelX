/**
 * Frontend API client to communicate with SentinelX FastAPI backend server.
 */

const API_BASE_URL = 'http://localhost:8000/api';

export const telemetryApi = {
  /**
   * Uploads a .pcap, .pcapng, or .csv file to the backend telemetry processing engine.
   * @param {File} file 
   * @returns {Promise<Object>} Processed dataset
   */
  async uploadTelemetryFile(file) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/analyze-telemetry`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      let errorMessage = 'Failed to process telemetry file on backend server.';
      try {
        const errorData = await response.json();
        if (errorData.detail) {
          errorMessage = errorData.detail;
        }
      } catch (e) {
        // Fallback to response status text
        errorMessage = response.statusText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    return await response.json();
  },

  /**
   * Checks health status of backend service.
   */
  async checkHealth() {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      return response.ok;
    } catch (e) {
      return false;
    }
  }
};
