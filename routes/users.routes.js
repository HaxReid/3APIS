import express from 'express';
import { getAllUsers, getOneUser, createUser, updateUser, deleteUser, loginUser } from '../controllers/users.controllers.js';
import authenticate from '../middleware/auth.js';

const usersRoutes = express.Router();

usersRoutes.get('/', getAllUsers);

usersRoutes.get('/:userEmail', getOneUser);

usersRoutes.post('/login', loginUser);

usersRoutes.post('/', createUser);

usersRoutes.put('/:userEmail',  updateUser);

usersRoutes.delete('/:userEmail',  deleteUser);


export default usersRoutes;
