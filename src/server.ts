import express from 'express';
import { createServer } from 'http'; 
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);


const io = new Server(httpServer, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"]
  }
});

const PORT = 5000;


httpServer.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});