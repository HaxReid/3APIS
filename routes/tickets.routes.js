import express from 'express';
import { isTicketValid, createTicket } from '../controllers/tickets.controllers.js';
import { AdminAuthentification, AdminOrHimselfAuthentification} from '../middleware/auth.js';

const ticketsRoutes = express.Router();

ticketsRoutes.post('/', createTicket);

ticketsRoutes.post('/:id', AdminAuthentification, isTicketValid);

export default ticketsRoutes;
