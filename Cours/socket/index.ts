import express from "express";
import { Server } from "socket.io";
import http from "http";

const app = express();
app.use(express.static("public"));
const monServer = http.createServer(app);
const monServeurSocket = new Server(monServer);

monServeurSocket.on("connection", (socket) => {
  console.log("client connecté");
  socket.on("disconnect", () => {
    console.log("client déconnecté");
  });
  socket.on("chat message", (message) => {
    console.log("message envoyé : ", message);
    monServeurSocket.emit("chat message", message);
  });
});

monServer.listen(3000, () => console.log("server on"));
