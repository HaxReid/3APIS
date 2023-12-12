import express from 'express';
import { getAllTickets, getOneTickets, createTickets, updateTickets, deleteTickets} from '../controllers/tickets.controllers.js';

const ticketsRoutes = express.Router();

ticketsRoutes.get('/', getAllTickets);

ticketsRoutes.get('/:ticketId', getOneTickets);

ticketsRoutes.post('/', createTickets);

ticketsRoutes.put('/:ticketId',  updateTickets);

ticketsRoutes.delete('/:ticketId', deleteTickets);

export default ticketsRoutes;
