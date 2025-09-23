import { Article } from "../model/Article.js";
export async function saveOneArticle(articleToSave) {
  const { name, description, price } = articleToSave;
  const article = new Article({
    name: name,
    description: description,
    price: price,
  });
  await article.save();
}
