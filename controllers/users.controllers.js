import Users from '../models/Users.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { JoiLoggingSchema } from '../joi/JoiLoggingSchema.js';
import { JoiUserSchema } from '../joi/JoiUserSchema.js';
dotenv.config();

const getAllUsers = async (req, res) => {
    try{
      const users = await Users.find();
      if (!users) {
        return res.status(204).json({ message: 'Utilisateurs non trouvés.' });
      }
      res.status(200).json({message: "Utilisateurs trouvés"}, { users });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs.' });
    }
  };
  
const getOneUser = async (req, res) => {
  const userId = req.params.id;
  try {
      const user = await Users.findById(userId);
      if (user) {
          res.status(200).json({message: "Utilisateur trouvé"}, { user });
      } else {
          res.status(204).json("Utilisateur non trouvé");
      }
  } catch (err) {
      res.status(500).json({ message: 'Erreur lors de la récupération de l\'utilisateurs' });
  }
};
  
const createUser = async (req, res) => {
  const validatedData = JoiUserSchema.validate(req.body, { abortEarly: false });
  const user = validatedData.value;
  if(user.password) {
    user.password = await bcrypt.hash(user.password, 10);
    try {
      const result = await Users.create(user);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur.' });
    }
  } else {
    res.status(400).json({ message: 'Le mot de passe est obligatoire.' });
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.id;
  const user = req.body;
  const currentUserRole = req.user.role;
  if (user.role === 'admin' && currentUserRole !== 'admin') {
    return res.status(403).json({ message: 'Vous n\'avez pas la permission de définir le rôle "admin".' });
  }
  if(user.password) {
    user.password = await bcrypt.hash(user.password, 10);
    try {
      const result = await Users.findByIdAndUpdate(userId, user);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur.' });
    }
  } else {
    res.status(400).json({ message: 'Le mot de passe est obligatoire.' });
  }
};
  
const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const result = await Users.findByIdAndDelete(userId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur.' });
  }
};
  
const loginUser = async (req, res) => {
  const validatedData = JoiLoggingSchema.validate(req.body, { abortEarly: false });
  const { email, password } = validatedData.value;
  try {
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Identifiants invalides.' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Identifiants invalides.' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.status(200).json({ data: [{token: token, _id: user._id}], message: 'Utilisateur connecté.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la connexion.' });
  }
};

 export { getAllUsers, getOneUser, createUser, updateUser, deleteUser, loginUser };
