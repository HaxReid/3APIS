import mongoose from "mongoose";
import type { Document, Schema } from "mongoose";
import type { NewPost, Post } from "../../types";
interface IPost extends NewPost, Document {}

const PostSchema: Schema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  img: String,
  author: String,
  likes: Number,
});
const PostMongoose = mongoose.model<IPost>("Post", PostSchema);

export { PostMongoose };
