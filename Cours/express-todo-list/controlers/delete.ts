import type { Request, Response } from 'express'
import Todo from '../models/Todo'

export async function deleteTodo(req: Request<{ id: string }>, res: Response) {
  try {
    const id = req.params.id
    const deletedTodo = await Todo.findByIdAndDelete(id)
    if (!deletedTodo) return res.sendStatus(404)
    res.sendStatus(201)
  } catch (error) {
    res.sendStatus(500)
  }
}
