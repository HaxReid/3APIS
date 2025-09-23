import express from "express";
import { connectDB } from "./utils/connectDB";
import { getPost } from "./controlers/getPost";
import "dotenv/config";
import cors from "cors";
import { postPost } from "./controlers/postPost";
import { patchPost } from "./controlers/patchPost";
import { getAuthor } from "./middleware/getAuthor";

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/post", getPost);
app.post("/post",getAuthor, postPost);
app.patch("/post/:id", patchPost);

app.listen(5000, () => console.log("server on"));
