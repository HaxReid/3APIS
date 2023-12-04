// userRoutes.js
import express from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/users.controllers.js';
import authenticate from '../middleware/auth.js';

const usersRoutes = express.Router();

// Endpoint pour obtenir tous les utilisateurs (accessible sans authentification)
usersRoutes.get('/', getAllUsers);

// Endpoint pour obtenir un utilisateur par ID (accessible sans authentification)
usersRoutes.get('/:userId', getUserById);

// Middleware d'authentification pour les routes suivantes
usersRoutes.use(authenticate);

// Endpoint pour créer un nouvel utilisateur
usersRoutes.post('/', createUser);

// Endpoint pour mettre à jour un utilisateur
usersRoutes.put('/:userId', updateUser);

// Endpoint pour supprimer un utilisateur
usersRoutes.delete('/:userId', deleteUser);

export default usersRoutes;
