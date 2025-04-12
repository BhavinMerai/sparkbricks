// CodeEditor.tsx
import Editor from "@monaco-editor/react";
import { useRef } from "react";

export default function CodeEditor({ code, setCode }: any) {
  const editorRef = useRef(null);

  return (
    <div className="code-editor-wrapper">
      <Editor
        height="400px"
        defaultLanguage="python"
        value={code}
        onChange={(value) => setCode(value || "")}
        theme="vs-dark"
        options={{
          fontSize: 16,
          minimap: { enabled: false },
          wordWrap: "on",
        }}
      />
    </div>
  );
}
