// CodeEditor.tsx
import Editor from "@monaco-editor/react";
import { useRef } from "react";

/* 
  CodeEditor component renders the Monaco code editor.
  It manages the code input state via props.
  Currently, it does not handle code submission or backend connection.
  You can enhance this component by adding:
    - A submit button or keyboard shortcut (e.g., Ctrl+Enter) to trigger code execution.
    - Integration with the backend API to execute the code.
    - Passing the output to a parent component or OutputPanel for display.
*/
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

