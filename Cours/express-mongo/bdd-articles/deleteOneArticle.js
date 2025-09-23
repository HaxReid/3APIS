import { Article } from "../model/Article.js";

export async function deleteOneArticle(_id) {
  await Article.findByIdAndDelete(_id);
}
