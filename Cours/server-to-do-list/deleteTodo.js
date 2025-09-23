import fs from "fs";

export function deleteTodo(req, res) {
  let data = "";
  req.on("data", function (chunk) {
    data += chunk.toString();
  });
  req.on("end", function () {
    const body = JSON.parse(data);
    deleteOneTodoBDD(body.todo);
    res.writeHead(201);
    res.end("deleted");
  });

  function deleteOneTodoBDD(todoToDelete) {
    const todoListBuffer = fs.readFileSync("items.txt");
    const todoListString = todoListBuffer.toString();
    const todoListArray = todoListString.split("\n");
    const purgedToDolist = todoListArray.filter((item) => item);

    const elementInd = purgedToDolist.findIndex((toDo) => todoToDelete == toDo);
    purgedToDolist.splice(elementInd, 1);

    if (elementInd === -1) {
      res.writeHead(404);
      res.end("Todo non trouvé");
      return;
    }

    let newTodoList = "";
    purgedToDolist.forEach((element) => {
      newTodoList = newTodoList + element + "\n";
    });
    fs.writeFileSync("items.txt", newTodoList);
  }
}
