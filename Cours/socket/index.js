"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var socket_io_1 = require("socket.io");
var http = require("http");
var app = express();
app.use(express.static("public"));
var monServer = http.createServer(app);
var monServeurSocket = new socket_io_1.Server(monServer);
monServeurSocket.on("connection", function (socket) {
    console.log("client connecté");
    socket.on("disconnect", function () {
        console.log("client déconnecté");
    });
    socket.on("chat message", function (message) {
        console.log("message envoyé : ", message);
        monServeurSocket.emit("chat message", message);
    });
});
monServer.listen(3000, function () { return console.log("server on"); });
