const fs = require('fs')
exports.lsTodo = () => {
  const todos = fs.readFileSync('items.txt')
  console.log(todos.toString())
}
