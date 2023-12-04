import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

// Connectez-vous à votre base de données MongoDB
mongoose.connect("mongodb+srv://PeGrn:123456a@cluster0.2l0ukxt.mongodb.net/?retryWrites=true&w=majority", {
useNewUrlParser: true,
useUnifiedTopology: true,
});

// Schéma Mongoose pour les utilisateurs
const userSchema = new mongoose.Schema({
email: String,
pseudo: String,
password: String,
role: String,
});

const UserModel = mongoose.model("User", userSchema);

// Route pour créer un nouvel utilisateur
app.post("/users", async (req, res) => {
try {
    const user = new UserModel(req.body);
    await user.save();
    res.status(201).json(user);
} catch (error) {
    res.status(400).json({ message: error.message });
}
});

// Route pour lire les informations d'un utilisateur
app.get("/users/:id", async (req, res) => {
try {
    const user = await UserModel.findById(req.params.id);
    res.status(200).json(user);
} catch (error) {
    res.status(404).json({ message: "User not found" });
}
});

// Route pour récupérer tous les utilisateurs
app.get("/users", async (req, res) => {
try {
    const users = await UserModel.find();
    res.status(200).json(users);
} catch (error) {
    res.status(500).json({ message: error.message });
}
});

// Route pour mettre à jour un utilisateur
app.patch("/users/:id", async (req, res) => {
try {
    await UserModel.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ message: "User updated successfully" });
} catch (error) {
    res.status(404).json({ message: "User not found" });
}
});

// Route pour supprimer un utilisateur
app.delete("/users/:id", async (req, res) => {
try {
    await UserModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
} catch (error) {
    res.status(404).json({ message: "User not found" });
}
});

app.listen(3000, () => {
console.log("Server started on port 3000");
});
