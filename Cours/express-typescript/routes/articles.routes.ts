import { getAllArticles } from "../bdd-articles/getAllArticles";
import { deleteOneArticle } from "../bdd-articles/deleteOneArticle";
import { saveOneArticle } from "../bdd-articles/saveOneArticle";
import { Router } from "express";
import type { Response, Request } from "express";

const articleRoutes = Router();

articleRoutes.post("/", async (req: Request, res: Response) => {
  const newArticle = req.body;
  if (!(newArticle.name && newArticle.description && newArticle.price)) {
    return res.sendStatus(400);
  }
  await saveOneArticle(newArticle);
  res.sendStatus(201);
});
articleRoutes.get("/", async (req, res) => {
  const articles = await getAllArticles();
  res.send(articles);
});
articleRoutes.get("/:id", async (req, res) => {
  const id = req.params.id;
  const articles = await getAllArticles();
  const article = articles.find((art) => art.id === parseInt(id));
  if (!article) res.sendStatus(404);
  res.send(article);
});
articleRoutes.delete("/:id", async (req, res) => {
  try {
    await deleteOneArticle(req.params.id);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(404);
  }
});

export default articleRoutes;
