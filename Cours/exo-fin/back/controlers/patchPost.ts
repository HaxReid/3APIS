import type { Request, Response } from "express";
import type { NewPost } from "../../types";
import { PostMongoose } from "../models/Post";

export async function patchPost(
  req: Request<{ id: string }, {}, NewPost>,
  res: Response
) {
  const newPost = await PostMongoose.findByIdAndUpdate(req.params.id, req.body);
  res.status(201).send(newPost);
}
