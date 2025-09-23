import fs from "fs";

export function getTodos(req, res) {
  const todoListBuffer = fs.readFileSync("items.txt");
  const todoListString = todoListBuffer.toString();
  const todoListArray = todoListString.split("\n");
  const purgedToDolist = todoListArray.filter((item) => item);
  res.end(JSON.stringify(purgedToDolist));
}
