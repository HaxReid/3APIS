import { getAllArticles } from "./getAllArticles";
import fs from "fs/promises";

export async function deleteOneArticle(id) {
  const articles = await getAllArticles();
  const indexToDelete = articles.findIndex((art) => art.id == id);
  if (indexToDelete === -1) {
    throw "not found";
  }
  articles.splice(indexToDelete, 1);
  await fs.writeFile("./bdd-articles/articles.json", JSON.stringify(articles));
}
