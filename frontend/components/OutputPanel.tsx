import { useEffect, useRef } from "react";

/* 
  OutputPanel component displays the output of code execution.
  It supports loading and error states for better user feedback.
  Props:
    - output: string | null - the output text to display
    - isLoading: boolean - whether the output is currently loading
    - error: string | null - error message if any
*/
export default function OutputPanel({ output, isLoading, error }) {
  const outputRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when output changes
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  return (
    <div
      className="bg-black text-green-400 p-4 font-mono h-full overflow-auto rounded-xl shadow-inner"
      ref={outputRef}
    >
      <h2 className="text-lg font-semibold text-white mb-2">Output:</h2>
      {isLoading ? (
        <div className="text-white">Loading...</div>
      ) : error ? (
        <div className="text-red-500">Error: {error}</div>
      ) : (
        <pre>{output || "Run your code to see output here..."}</pre>
      )}
    </div>
  );
}
