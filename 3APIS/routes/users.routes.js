import express from 'express';
import { getAllUsers, getOneUser, createUser, updateUser, deleteUser, loginUser } from '../controllers/users.controllers.js';
import { AdminAuthentification, HimselfAuthentification, AdminOrHimselfAuthentification } from '../middleware/auth.js';

const usersRoutes = express.Router();

usersRoutes.get('/', AdminAuthentification, getAllUsers);

usersRoutes.get('/:id', AdminOrHimselfAuthentification, getOneUser);

usersRoutes.post('/', createUser);

usersRoutes.put('/:id', AdminOrHimselfAuthentification, updateUser);

usersRoutes.delete('/:id', HimselfAuthentification, deleteUser);

usersRoutes.post('/login', loginUser);

export default usersRoutes;
