// node index.js --add toDoItem
// node index.js --ls
// node index.js --rm toDoItem

const yargs = require('yargs')
const { addTodo } = require('./addTodo')
const { rmTodo } = require('./rmTodo')
const { lsTodo } = require('./lsTodo')
const argv = yargs
  .option('add', {
    type: 'string',
    alias: 'a',
  })
  .option('ls', {
    type: 'boolean',
  })
  .option('rm', {
    type: 'string',
  }).argv

if (argv.add) {
  addTodo(argv.add)
}
if (argv.rm) {
  rmTodo(argv.rm)
}
if (argv.ls) {
  lsTodo()
}
