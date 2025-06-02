// components/FileExplorer.tsx
export default function FileExplorer() {
  return (
    <div className="w-64 bg-gray-800 text-white h-full border-r border-gray-700 p-4">
      <h3 className="text-lg font-semibold mb-4">Files</h3>
      <ul className="space-y-2">
        <li className="hover:bg-gray-700 px-2 py-1 rounded cursor-pointer">
          dataset.csv
        </li>
        <li className="hover:bg-gray-700 px-2 py-1 rounded cursor-pointer">
          notebook1.py
        </li>
      </ul>
    </div>
  );
}
