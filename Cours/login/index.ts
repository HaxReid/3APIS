import express from "express";
import { controlValueNoNull } from "./middleware/controlValueNoNull";
import { login } from "./controlers/login";
import { singin } from "./controlers/singin";
import { connectDB } from "./utils/connectDB";
import "dotenv/config";
import { fieldsControl } from "./middleware/fieldsControl";

// const email_true = "";
// const pwd_true = "azerty";

connectDB();
const app = express();
app.use(express.json());

app.post("/login", controlValueNoNull, login);
app.post("/signin", controlValueNoNull, fieldsControl, singin);

app.listen(3000, () => console.log("server on"));
