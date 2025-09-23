import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    price: Number,
  },
  { timestamps: { createdAt: "created_at" } }
);

const Article = mongoose.model("Article", ArticleSchema);

export { Article };
