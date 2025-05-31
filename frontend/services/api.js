import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/v1";

/**
 * Submit code for execution.
 * Returns the run_id to track the job.
 * Accepts token for Authorization header.
 */
export async function executeCode(code, token) {
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await axios.post(
      `${API_BASE_URL}/execute`,
      { code },
      { headers }
    );
    return response.data.run_id;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to execute code");
  }
}

/**
 * Get the status and output of a code execution job by run_id.
 * Accepts token for Authorization header.
 */
export async function getJobStatus(run_id, token) {
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await axios.get(`${API_BASE_URL}/status/${run_id}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to get job status");
  }
}
