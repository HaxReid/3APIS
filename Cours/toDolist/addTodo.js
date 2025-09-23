const fs = require('fs')

exports.addTodo = (params) => {
  const oldTodo = fs.readFileSync('items.txt')
  fs.writeFileSync('items.txt', oldTodo + '\n' + params)
}
