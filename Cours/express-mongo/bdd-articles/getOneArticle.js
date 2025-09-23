import { Article } from "../model/Article.js";
export async function getOneArticle(_id) {
  const article = await Article.findById(_id);
  return article;
}
