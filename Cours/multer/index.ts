import express from "express";
import multer from "multer";

const upload = multer({ dest: "uploads/" });
const app = express();

app.use("/", express.static("public"));

app.post("/api", upload.single("avatar"), (req, res) => {
  console.log(req.body);
  res.status(201).json("enregistré");
});

app.listen(3000);
