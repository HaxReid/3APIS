import fs from "fs/promises";

export async function getAllArticles(newArticle) {
  const dataBuffer = await fs.readFile("./bdd-articles/articles.json");
  const dataString = dataBuffer.toString();
  const dataArray = JSON.parse(dataString);
  return dataArray;
}
