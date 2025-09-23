import { Router } from "express";
import { saveOneToCart } from "../bdd-cart/saveOneToCart.js";
import { getAllCardArticles } from "../bdd-cart/getAllArticles.js";
import { getOneArticle } from "../bdd-articles/getOneArticle.js";
const cartRoutes = Router();

cartRoutes.patch("/:articleId", async (req, res) => {
  const { articleId } = req.params;
  const article = await getOneArticle(articleId);
  if (!article) return res.sendStatus(404);
  await saveOneToCart(article);
  res.sendStatus(201);
});
cartRoutes.get("/amount", async (req, res) => {
  const cartArticles = await getAllCardArticles();
  const amount = cartArticles.reduce(
    (accumulator, article) => accumulator + article.price,
    0
  );
  res.send({ amount: amount });
});

export default cartRoutes;
