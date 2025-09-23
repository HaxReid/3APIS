import http from "http";
import fs from "fs";
import { getTodos } from "./getTodos.js";
import { addTodo } from "./addTodo.js";
import { deleteTodo } from "./deleteTodo.js";

const server = http.createServer(maCallback);

server.listen(3000, () => {
  console.log("en écoute sur le port 3000");
});

function maCallback(request, response) {
  // ALLOW CORS
  // response.setHeader("Access-Control-Allow-Origin", "*");
  // response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  // response.setHeader("Access-Control-Allow-Headers", "Content-Type");
  // response.setHeader("Access-Control-Allow-Credentials", true);
  // SERVEUR DES PAGES INDEX ET FORM :
  const { method, url } = request;

  if (url === "/" && method === "GET") {
    response.setHeader("Content-Type", "text/html");
    const htmlPage = fs.readFileSync(`./public/index.html`);
    response.end(htmlPage);
    return;
  }

  if (url === "/favicon.ico" && method === "GET") {
    response.setHeader("Content-Type", "image/x-icon");
    const favico = fs.readFileSync(`./public/favicon.png`);
    response.end(favico);
    return;
  }

  if (url !== "/api/todos") {
    response.writeHead(404);
    response.end("cette adresse n'existe pas");
    return;
  }

  response.setHeader("Content-Type", "application/json");
  if (method === "GET") {
    getTodos(request, response);
    return;
  }

  if (method == "POST") {
    addTodo(request, response);
    return;
  }

  if (method === "DELETE") {
    deleteTodo(request, response);
    return;
  }
}
