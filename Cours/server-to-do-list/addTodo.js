import fs from "fs";

export function addTodo(req, res) {
  let data = "";
  req.on("data", function (chunk) {
    data += chunk.toString();
  });
  req.on("end", function () {
    const body = JSON.parse(data);
    saveTodoBDD(body.todo);
    res.writeHead(201);
    res.end("received");
  });
}

function saveTodoBDD(item) {
  const oldTodoList = fs.readFileSync("items.txt");
  fs.writeFileSync("items.txt", oldTodoList + "\n" + item);
}
