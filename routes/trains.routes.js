import express from 'express';
import { getAllTrains, getOneTrain, createTrain, updateTrain, deleteTrain } from '../controllers/trains.controllers.js';
import { AdminAuthentification, AdminOrHimselfAuthentification } from '../middleware/auth.js';

const trainsRoutes = express.Router();

trainsRoutes.get('/', getAllTrains);

trainsRoutes.get('/:id', getOneTrain);

trainsRoutes.post('/', AdminAuthentification, createTrain);

trainsRoutes.put('/:id', AdminAuthentification, updateTrain);

trainsRoutes.delete('/:id', AdminAuthentification, deleteTrain);

export default trainsRoutes;
