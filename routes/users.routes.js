import express from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/users.controllers.js';
import authenticate from '../middleware/auth.js';

const usersRoutes = express.Router();

usersRoutes.get('/', getAllUsers);

usersRoutes.get('/:userId', getUserById);

usersRoutes.use(authenticate);

usersRoutes.post('/', createUser);

usersRoutes.put('/:userId', updateUser);

usersRoutes.delete('/:userId', deleteUser);

export default usersRoutes;
