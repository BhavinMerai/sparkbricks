// components/Toolbar.tsx
import axios from "axios";
import Link from "next/link";

export default function Toolbar({ code, setOutput }) {
  const runCode = async () => {
    try {
      const response = await axios.post("/api/execute", { code });
      setOutput(response.data.output);
    } catch (error) {
      setOutput("Error running code");
    }
  };

  return (
    <div className="flex items-center justify-between bg-gray-900 px-4 py-2 border-b border-gray-800">
      <div className="text-sm text-gray-400">Notebook.ipynb</div>
      <div className="space-x-2 flex items-center">
        <Link href="/" passHref>
          <button className="bg-gray-700 hover:bg-gray-600 text-white text-sm px-4 py-1 rounded-md">
            ⬅ Home
          </button>
        </Link>
        <button
          onClick={runCode}
          className="bg-green-600 hover:bg-green-500 text-white text-sm px-4 py-1 rounded-md"
        >
          ▶ Run
        </button>
        <button
          className="bg-red-600 hover:bg-red-500 text-white text-sm px-4 py-1 rounded-md"
        >
          ■ Stop
        </button>
      </div>
    </div>
  );
}
