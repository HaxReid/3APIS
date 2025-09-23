import { Router } from "express";
import { saveOneArticleToCart } from "../bdd-cart/saveOneArticle.js";
import { getAllCardArticles } from "../bdd-cart/getAllArticles.js";
import { getAllArticles } from "../bdd-articles/getAllArticles.js";
import { auth } from "../middleware/auth.js";
const cartRoutes = Router();

cartRoutes.patch("/:articleId", auth, async (req, res) => {
  const { articleId } = req.params;
  const articles = await getAllArticles();
  const article = articles.find((art) => art.id == articleId);
  if (!article) return res.sendStatus(404);
  await saveOneArticleToCart(article);
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
