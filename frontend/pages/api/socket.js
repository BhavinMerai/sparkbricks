import { Server } from "socket.io";

const users = {}; // { socketId: { username, room } }
const rooms = {}; // { roomName: [socketId, socketId] }

export default function handler(req, res) {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server, { path: "/api/socket", addTrailingSlash: false });

    io.on("connection", (socket) => {
      console.log("A user connected:", socket.id);

      socket.on("join-room", ({ username, room }) => {
        if (!username) {
          socket.emit("error", "User not authenticated.");
          return;
        }

        users[socket.id] = { username, room };
        socket.join(room);

        if (!rooms[room]) {
          rooms[room] = [];
        }
        rooms[room].push(socket.id);

        io.to(room).emit("user-list", rooms[room].map(id => users[id]?.username));
      });

      socket.on("code-update", ({ room, code }) => {
        socket.to(room).emit("code-update", code);
      });

      socket.on("code-output", ({ room, output }) => {
        socket.to(room).emit("code-output", output);
      });

      socket.on("disconnect", () => {
        const { room } = users[socket.id] || {};
        if (room) {
          rooms[room] = rooms[room].filter(id => id !== socket.id);
          io.to(room).emit("user-list", rooms[room].map(id => users[id]?.username));
        }
        delete users[socket.id];
      });
    });

    res.socket.server.io = io;
  }

  res.end();
}
