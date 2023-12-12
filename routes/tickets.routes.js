import express from 'express';
import { isTicketValid, createTicket } from '../controllers/trains.controllers.js';
import { AdminAuthentification, AdminOrHimselfAuthentification} from '../middleware/auth.js';

const ticketsRoutes = express.Router();

ticketsRoutes.post('/', createTicket);

ticketsRoutes.post('/:id', AdminAuthentification, isTicketValid);

export default ticketsRoutes;
