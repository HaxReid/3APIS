import { Cart } from "../model/Cart.js";

export async function saveOneToCart(newArticle) {
  const cartArticle = new Cart({
    name: newArticle.name,
    description: newArticle.description,
    price: newArticle.price,
  });
  const savedData = await cartArticle.save();
}
