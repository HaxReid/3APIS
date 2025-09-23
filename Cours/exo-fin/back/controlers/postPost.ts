import type { Request, Response } from "express";
import type { NewPost } from "../../types";
import { PostMongoose } from "../models/Post";

export async function postPost(req: Request<{}, {}, NewPost>, res: Response) {
  const newPost = new PostMongoose({ ...req.body });
  const newSavedPost = await newPost.save();
  res.status(201).send(newSavedPost._id);
}
