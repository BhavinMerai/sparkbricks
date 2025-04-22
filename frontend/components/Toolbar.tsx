import React, { useState } from "react";
import { executeCode, getJobStatus } from "../services/api";

export default function Toolbar({ code, setOutput }) {
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState(null);

  const runCode = async () => {
    setIsRunning(true);
    setError(null);
    setOutput("Running...");

    try {
      // Submit code and get run_id
      const run_id = await executeCode(code);

      // Poll for status until finished
      let statusResponse;
      const pollInterval = 2000; // 2 seconds

      while (true) {
        statusResponse = await getJobStatus(run_id);
        if (statusResponse.status === "RUNNING") {
          await new Promise((resolve) => setTimeout(resolve, pollInterval));
        } else {
          break;
        }
      }

      if (statusResponse.status === "SUCCESS") {
        setOutput(statusResponse.output || "Execution completed successfully.");
      } else if (statusResponse.status === "FAILED") {
        setOutput(statusResponse.output || "Execution failed.");
      } else if (statusResponse.status === "TIMEOUT") {
        setOutput("Execution timed out.");
      } else {
        setOutput(`Execution ended with status: ${statusResponse.status}`);
      }
    } catch (err) {
      setError(err.message);
      setOutput(`Error: ${err.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="flex items-center justify-between bg-gray-900 px-4 py-2 border-b border-gray-800">
      <div className="text-sm text-gray-400">Notebook.ipynb</div>
      <div className="space-x-2 flex items-center">
        <button
          onClick={runCode}
          className="bg-green-600 hover:bg-green-500 text-white text-sm px-4 py-1 rounded-md"
          disabled={isRunning}
        >
          {isRunning ? "Running..." : "▶ Run"}
        </button>
      </div>
      {error && (
        <div className="ml-4 text-sm text-red-600 font-semibold">
          Error: {error}
        </div>
      )}
    </div>
  );
}
