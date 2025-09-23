import type { Request, Response } from "express";
import type { Post } from "../../types";
import { PostMongoose } from "../models/Post";

export async function getPost(req: Request, res: Response) {
  const post: Post = {
    img: "https://mui.com/static/images/cards/contemplative-reptile.jpg",
    title: "Lizard",
    _id: "2",
    description:
      "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
    date: new Date(),
    author: "LB",
    likes: 3,
  };
  res.send([post]);
}
