import express from 'express';
import { createServer } from 'http'; 
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app); // 👈 Bọc Express vào HTTP Server

// Khởi tạo Socket.io và gắn nó vào HTTP Server
const io = new Server(httpServer, {
  cors: {
    origin: "*", // Để test thì cứ cho phép hết đã sếp nhé
    methods: ["GET", "POST"]
  }
});

const PORT = 5000;

// ❗ QUAN TRỌNG: Phải dùng httpServer để listen, KHÔNG dùng app.listen
httpServer.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});