import fs from "fs/promises";

export async function getAllCardArticles(newArticle) {
  const dataBuffer = await fs.readFile("./bdd-cart/articles.json");
  const dataString = dataBuffer.toString();
  const dataArray = JSON.parse(dataString);
  return dataArray;
}
