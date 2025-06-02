// components/NotebookLayout.tsx
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import FileExplorer from "./FileExplorer";
import CodeEditor from "./CodeEditor";
import OutputPanel from "./OutputPanel";
import Toolbar from "./Toolbar";

export default function NotebookLayout() {
  const [code, setCode] = useState("print('Hello, World!')");
  const [output, setOutput] = useState("");

  return (
    <div className="flex h-screen bg-gray-950 text-white overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Toolbar code={code} setOutput={setOutput} />
        <div className="flex flex-1 overflow-hidden">
          <FileExplorer />
          <div className="flex flex-col flex-1 overflow-hidden">
            <div className="flex-1 p-2 overflow-auto">
              <CodeEditor code={code} onChange={setCode} onRun={() => {}} />
            </div>
            <div className="h-1/3 border-t border-gray-800 p-2 overflow-auto bg-black">
              <OutputPanel output={output} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
