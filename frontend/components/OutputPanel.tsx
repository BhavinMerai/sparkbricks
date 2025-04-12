// components/OutputPanel.tsx
import { useEffect, useRef } from "react";

export default function OutputPanel({ output }) {
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  return (
    <div className="bg-black text-green-400 p-4 font-mono h-full overflow-auto rounded-xl shadow-inner" ref={outputRef}>
      <h2 className="text-lg font-semibold text-white mb-2">Output:</h2>
      <pre>{output || "Run your code to see output here..."}</pre>
    </div>
  );
}
