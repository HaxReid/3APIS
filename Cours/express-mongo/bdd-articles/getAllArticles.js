import { Article } from "../model/Article.js";
export async function getAllArticles() {
  const articles = await Article.find({}, ["name", "_id"]);
  return articles;
}
