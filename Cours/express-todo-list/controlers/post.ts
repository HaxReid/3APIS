import type { Request, Response } from 'express'
import Todo from '../models/Todo'

export async function postTodo(req: Request, res: Response) {
  try {
    if (req.body.todo === '') {
      res.sendStatus(204)
      return
    }
    await Todo.create({ text: req.body.todo })
    res.sendStatus(201)
  } catch (error) {
    res.sendStatus(500)
  }
}
