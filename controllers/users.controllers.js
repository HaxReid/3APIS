import Users from '../models/Users.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const getAllUsers = async (req, res) => {
    try{
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Seulement un admin peut consulter la liste des utilisateurs ' });
      }

      const users = await Users.find();
      res.json({ users });
    } catch (error) {
      console.error('Error getting users:', error);
      res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs.' });
    }
  };
  
  const getOneUser = async (req, res) => {
    try {
      const userEmail = req.params.userEmail; 
  
      const user = await Users.findOne({ email: userEmail });
  
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé.' });
      }
  
      res.json(user);
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur par e-mail:', error);
      res.status(500).json({ message: 'Erreur serveur lors de la récupération de l\'utilisateur par e-mail.' });
    }
};
  
const createUser = async (req, res) => {
  try {
    const { email, pseudo, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Users({
      email,
      pseudo,
      password: hashedPassword,
      role,
    });

    const savedUser = await newUser.save();

    const token = jwt.sign(
      { email: savedUser.email, role: savedUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, user: savedUser});
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur :', error);
    res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur.' });
  }
};

const updateUser = async (req, res) => {
  try {
    const userIdToUpdate = req.params.userId;
    const currentUserId = req.user.userId;
    const currentUserRole = req.user.role;

    if (!(currentUserRole === 'admin' || currentUserId === userIdToUpdate)) {
      return res.status(403).json({ message: 'Vous n\'avez pas la permission de mettre à jour cet utilisateur.' });
    }

    const { email, pseudo, password, role } = req.body;
    const userToUpdate = await Users.findById(userIdToUpdate);

    if (!userToUpdate) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      userToUpdate.password = hashedPassword;
    }

    userToUpdate.email = email;
    userToUpdate.pseudo = pseudo;
    userToUpdate.role = role;

    const updatedUser = await userToUpdate.save();

    res.json(updatedUser);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur.' });
  }
};
  
const deleteUser = async (req, res) => {
  try {
    const userEmailToDelete = req.params.userEmail;
    const currentUserEmail = req.user.email;
    const currentUserRole = req.user.role;

    const userToDelete = await Users.findOne({ email: userEmailToDelete });

    if (!userToDelete) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    if (!(currentUserRole === 'admin' || currentUserEmail === userEmailToDelete)) {
      return res.status(403).json({ message: 'Vous n\'avez pas la permission de supprimer cet utilisateur.' });
    }

    await userToDelete.remove();

    res.json({ message: 'Utilisateur supprimé.' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'utilisateur :', error);
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur.' });
  }
};

  
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Identifiants invalides.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Identifiants invalides.' });
    }

    const token = jwt.sign(
      { email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, user: { email: user.email, role: user.role } });
  } catch (error) {
    console.error('Erreur lors de la connexion :', error);
    res.status(500).json({ message: 'Erreur lors de la connexion.' });
  }
};


  export { getAllUsers, getOneUser, createUser, updateUser, deleteUser, loginUser };
