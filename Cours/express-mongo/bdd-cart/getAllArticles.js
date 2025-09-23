import { Cart } from "../model/Cart.js";
export async function getAllCardArticles(newArticle) {
  const cartsArticles = await Cart.find({});
  return cartsArticles;
}
