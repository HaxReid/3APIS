import fs from "fs/promises";
import { getAllCardArticles } from "./getAllArticles.js";

export async function saveOneArticleToCart(newArticle) {
  const articles = await getAllCardArticles();
  articles.push(newArticle);
  await fs.writeFile("./bdd-cart/articles.json", JSON.stringify(articles));
}
