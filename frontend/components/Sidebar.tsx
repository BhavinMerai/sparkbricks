// components/Sidebar.tsx
import { FileText, Settings, Folder } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="w-16 h-full bg-gray-900 border-r border-gray-700 flex flex-col items-center py-4 space-y-4">
      <button className="text-gray-300 hover:text-white">
        <Folder size={24} />
      </button>
      <button className="text-gray-300 hover:text-white">
        <FileText size={24} />
      </button>
      <button className="text-gray-300 hover:text-white">
        <Settings size={24} />
      </button>
    </div>
  );
}
