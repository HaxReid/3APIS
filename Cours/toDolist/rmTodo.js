const fs = require('fs')

exports.rmTodo = (findThis) => {
  const fs = require('fs')
  const allTodos = fs.readFileSync('items.txt')
  todoArray = allTodos.toString().split('\n')
  const elementInd = todoArray.findIndex((toDo) => findThis == toDo)
  todoArray.splice(elementInd, 1)
  let newTodoList = ''
  todoArray.forEach((element) => {
    newTodoList = newTodoList + element + '\n'
  })
  fs.writeFileSync('items.txt', newTodoList)
}

exports.rmTodo
