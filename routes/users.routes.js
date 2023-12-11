import express from 'express';
import { getAllUsers, getOneUser, createUser, updateUser, deleteUser, loginUser } from '../controllers/users.controllers.js';
import { AdminAuthentification, HimselfAuthentification, AdminOrHimselfAuthentification} from '../middleware/auth.js';

const usersRoutes = express.Router();

usersRoutes.get('/', AdminAuthentification, getAllUsers);

usersRoutes.get('/:userId', getOneUser);

usersRoutes.post('/login', loginUser);

usersRoutes.post('/', createUser);

usersRoutes.put('/:userId', updateUser);

usersRoutes.delete('/:userId', deleteUser);


export default usersRoutes;
