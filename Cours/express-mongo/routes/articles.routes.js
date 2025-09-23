import { getAllArticles } from "../bdd-articles/getAllArticles.js";
import { deleteOneArticle } from "../bdd-articles/deleteOneArticle.js";
import { saveOneArticle } from "../bdd-articles/saveOneArticle.js";
import { getOneArticle } from "../bdd-articles/getOneArticle.js";
import { Router } from "express";

const articleRoutes = Router();

articleRoutes.post("/", async (req, res) => {
  try {
    const newArticle = req.body;
    if (!(newArticle.name && newArticle.description && newArticle.price)) {
      return res.sendStatus(400);
    }
    await saveOneArticle(newArticle);
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
    console.log(error);
  }
});
articleRoutes.get("/", async (req, res) => {
  const articles = await getAllArticles();
  res.send(articles);
});
articleRoutes.get("/:id", async (req, res) => {
  const id = req.params.id;
  const article = await getOneArticle(id);
  if (!article) return res.sendStatus(404);
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
