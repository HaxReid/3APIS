import fs from "fs/promises";
import { getAllArticles } from "./getAllArticles";

export async function saveOneArticle(newArticle) {
  const articles = await getAllArticles();
  let id = articles.length;
  let duplicated = articles.find((art) => art.id === id);

  while (duplicated) {
    duplicated = articles.find((art) => art.id === id);
    id++;
  }
  articles.push({ ...newArticle, id });
  await fs.writeFile("./bdd-articles/articles.json", JSON.stringify(articles));
}
