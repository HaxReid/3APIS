import type { Request, Response } from 'express'
import Todo from '../models/Todo'
type Todo = {
  text: string
  id: string
}

export async function getTodos(req: Request, res: Response<Todo[]>) {
  try {
    const todoList = await Todo.find({})
    res.send(
      todoList.map((todo) => ({
        text: todo.text ?? 'ERROR',
        id: todo._id.toString(),
      })),
    )
  } catch (error) {
    res.sendStatus(500)
  }
}
