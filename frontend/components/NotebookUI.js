import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

export default function NotebookUI({ user }) {
  const [cells, setCells] = useState([
    { id: 1, type: 'code', content: '# Start coding here...', output: '', collapsed: false }
  ]);
  const [socket, setSocket] = useState(null);
  const [users, setUsers] = useState([]);
  const [room, setRoom] = useState("");
  const [inRoom, setInRoom] = useState(false);
  const [activeCell, setActiveCell] = useState(1);
  const [activeTab, setActiveTab] = useState("notebook");

  // Socket connection
  useEffect(() => {
    if (!user?.name) return;
    
    const newSocket = io({ path: "/api/socket" });
    newSocket.on("connect", () => console.log("Connected to socket"));
    newSocket.on("user-list", setUsers);
    newSocket.on("cell-update", (updatedCells) => setCells(updatedCells));
    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, [user]);

  const joinRoom = () => {
    if (!user?.name) return alert("Please log in");
    if (!room) return alert("Enter room name");
    socket?.emit("join-room", { username: user.name, room });
    setInRoom(true);
  };

  // Cell operations
  const addCell = (index, type = 'code') => {
    const newCell = { 
      id: Date.now(), 
      type,
      content: type === 'code' ? '# New code cell' : '## New markdown',
      output: '',
      collapsed: false
    };
    const newCells = [...cells];
    newCells.splice(index + 1, 0, newCell);
    setCells(newCells);
    setActiveCell(newCell.id);
    socket?.emit("cell-update", { room, cells: newCells });
  };

  const removeCell = (id) => {
    if (cells.length <= 1) return alert("Cannot remove the last cell");
    const newCells = cells.filter(cell => cell.id !== id);
    setCells(newCells);
    socket?.emit("cell-update", { room, cells: newCells });
  };

  const runCell = async (id) => {
    const cell = cells.find(c => c.id === id);
    if (!cell || cell.type !== 'code') return;

    const newCells = cells.map(c => 
      c.id === id ? {...c, output: 'Running...'} : c
    );
    setCells(newCells);

    try {
      const response = await fetch("/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: cell.content })
      });
      const data = await response.json();
      
      setCells(cells.map(c => 
        c.id === id ? {...c, output: data.result || data.output} : c
      ));
    } catch (error) {
      setCells(cells.map(c => 
        c.id === id ? {...c, output: `Error: ${error.message}`} : c
      ));
    }
  };

  const updateCellContent = (id, content) => {
    const newCells = cells.map(cell => 
      cell.id === id ? {...cell, content} : cell
    );
    setCells(newCells);
    socket?.emit("cell-update", { room, cells: newCells });
  };

  return (
    <div className="notebook-container bg-[#f5f5f5] text-gray-800 h-screen flex">
      {/* Kaggle-style sidebar */}
      <div className="w-64 bg-[#2c2c2c] text-white p-4">
        <div className="text-xl font-bold mb-6">SparkBricks</div>
        <div className="space-y-2">
          <div className="text-[#20beff] font-medium">Data Engineering</div>
          <div className="text-gray-400">Notebooks</div>
          <div className="text-gray-400">Datasets</div>
          <div className="text-gray-400">Competitions</div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Kaggle-style tabs */}
        <div className="bg-white border-b flex">
          <button 
            className={`px-4 py-2 ${activeTab === 'notebook' ? 'border-b-2 border-[#20beff] text-[#20beff]' : 'text-gray-600'}`}
            onClick={() => setActiveTab('notebook')}
          >
            Notebook
          </button>
          <button 
            className={`px-4 py-2 ${activeTab === 'data' ? 'border-b-2 border-[#20beff] text-[#20beff]' : 'text-gray-600'}`}
            onClick={() => setActiveTab('data')}
          >
            Data
          </button>
        </div>

        {/* Toolbar */}
        <div className="bg-white p-2 flex items-center border-b">
          <button className="px-3 py-1 bg-[#20beff] text-white rounded mr-2">
            Save Version
          </button>
          <button 
            className="px-3 py-1 bg-white border border-gray-300 rounded mr-2"
            onClick={() => addCell(cells.length - 1)}
          >
            + Code
          </button>
          <button 
            className="px-3 py-1 bg-white border border-gray-300 rounded"
            onClick={() => addCell(cells.length - 1, 'markdown')}
          >
            + Markdown
          </button>
        </div>

        {/* Cells container */}
        <div className="flex-1 overflow-auto p-4 bg-white">
          {cells.map((cell, index) => (
            <div 
              key={cell.id} 
              className={`cell mb-4 border border-[#e0e0e0] rounded-lg ${activeCell === cell.id ? 'ring-2 ring-[#20beff]' : ''}`}
              onClick={() => setActiveCell(cell.id)}
            >
              <div className="cell-toolbar bg-[#f5f5f5] p-1 flex justify-between items-center">
                <div className="flex items-center">
                  <span className="text-xs font-mono px-2 text-gray-500">
                    {cell.type === 'code' ? `In [${index + 1}]:` : 'Markdown'}
                  </span>
                </div>
                <div>
                  {cell.type === 'code' && (
                    <button 
                      className="text-xs px-2 py-1 bg-[#20beff] text-white rounded mr-1"
                      onClick={(e) => { e.stopPropagation(); runCell(cell.id); }}
                    >
                      Run
                    </button>
                  )}
                  <button 
                    className="text-xs px-2 py-1 bg-white border border-gray-300 text-gray-700 rounded"
                    onClick={(e) => { e.stopPropagation(); removeCell(cell.id); }}
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="cell-content p-2">
                {cell.type === 'code' ? (
                  <textarea
                    className="w-full font-mono text-sm p-2 border border-[#e0e0e0] rounded"
                    value={cell.content}
                    onChange={(e) => updateCellContent(cell.id, e.target.value)}
                    rows={5}
                  />
                ) : (
                  <textarea
                    className="w-full p-2 border border-[#e0e0e0] rounded"
                    value={cell.content}
                    onChange={(e) => updateCellContent(cell.id, e.target.value)}
                    rows={3}
                  />
                )}
              </div>

              {cell.output && cell.type === 'code' && (
                <div className="cell-output bg-white p-3 border-t border-[#e0e0e0]">
                  <div className="text-xs text-gray-500 mb-1">Out [{index + 1}]:</div>
                  <pre className="text-sm font-mono whitespace-pre-wrap">{cell.output}</pre>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}