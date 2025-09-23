import express from "express";
// import cartRoutes from "./routes/cart.routes.js";
import articleRoutes from "./routes/articles.routes";
// import { auth } from "./middleware/auth.js";

const app = express();
app.use(express.json());
app.use("/api/article", articleRoutes);
// app.use("/api/cart",auth, cartRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
