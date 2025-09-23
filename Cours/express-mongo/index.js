import express from "express";
import cartRoutes from "./routes/cart.routes.js";
import articleRoutes from "./routes/articles.routes.js";
import { auth } from "./middleware/auth.js";
import mongoose from "mongoose";

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_ID}:${process.env.MONGO_PWD}@cluster0.3w9flsd.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("connecté à mongo DB");
  })
  .catch((err) => {
    console.log(`Erreur de connection à la base de donnée`);
    console.log(err);
  });

const app = express();
app.use(express.json());
app.use("/api/article", articleRoutes);
app.use("/api/cart", auth, cartRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
