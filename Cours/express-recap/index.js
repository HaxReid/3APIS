import express from "express";
import monMiddleWare from "./monMiddleWare.js";
const PORT = process.env.PORT;

const users = [
  { name: "Loic", id: 1 },
  { name: "Mael", id: 2 },
  { name: "Francois", id: 4 },
];
const app = express();
app.use(express.json());

const userRoutes = express.Router();
app.use("/api/user", userRoutes);

// renvoyer le tableau "users" :
userRoutes.get("/", (req, res) => {
  res.send(users);
});

// Ajouter un user au tableau "users" :
userRoutes.post("/", (req, res) => {
  users.push(req.body);
  res.sendStatus(201);
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

export { app };
