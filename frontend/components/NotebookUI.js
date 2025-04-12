import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

export default function NotebookUI({ user }) {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [socket, setSocket] = useState(null);
  const [users, setUsers] = useState([]);
  const [room, setRoom] = useState("");
  const [inRoom, setInRoom] = useState(false);

  useEffect(() => {
    if (!user || !user.name) {
      console.error("User not authenticated");
      return;
    }

    const newSocket = io({ path: "/api/socket" });

    newSocket.on("connect", () => console.log("Connected to socket"));
    newSocket.on("user-list", (userList) => setUsers(userList));
    newSocket.on("code-update", (newCode) => setCode(newCode));

    setSocket(newSocket);

    return () => {
      newSocket.disconnect(); // Ensure cleanup
    };
  }, [user]);

  const joinRoom = () => {
    if (!user || !user.name) {
      alert("Error: User not authenticated. Please log in.");
      return;
    }
    if (!room) {
      alert("Please enter a room name.");
      return;
    }
    if (socket) {
      socket.emit("join-room", { username: user.name, room });
      setInRoom(true);
    }
  };

  const handleChange = (e) => {
    const newCode = e.target.value;
    setCode(newCode);
    if (socket && inRoom) {
      socket.emit("code-update", { room, code: newCode });
    }
  };

  const runCode = async () => {
    setLoading(true);
    setOutput("");

    try {
      const response = await fetch("/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();
      setOutput(data.output);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col p-6 space-y-4 bg-gray-900 text-white h-screen">
      <h2 className="text-2xl font-bold">Notebook Editor</h2>

      {!inRoom && (
        <div className="flex space-x-2">
          <input
            className="p-2 rounded-md text-black"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            placeholder="Enter Room Name"
          />
          <button className="bg-green-500 px-4 py-2 rounded-md" onClick={joinRoom}>
            Join Room
          </button>
        </div>
      )}

      {inRoom && (
        <>
          <div className="bg-gray-800 p-4 rounded-md">
            <h3 className="text-lg font-semibold">🟢 Users in {room}</h3>
            <ul>
              {users.map((username, index) => (
                <li key={index} className="text-green-400">{username}</li>
              ))}
            </ul>
          </div>
          <textarea
            className="w-full h-40 p-2 rounded-md text-black"
            value={code}
            onChange={handleChange}
            placeholder="Write Python code here..."
          />
          <button
            className="bg-blue-500 px-4 py-2 rounded-md"
            onClick={runCode}
            disabled={loading}
          >
            {loading ? "Running..." : "Run Code"}
          </button>
          <div className="bg-gray-800 p-4 rounded-md mt-4">
            <h3 className="text-lg font-semibold">Output:</h3>
            <pre className="text-green-400">{output || "No output yet."}</pre>
          </div>
        </>
      )}
    </div>
  );
}
