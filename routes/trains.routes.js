import express from 'express';
import { getAllTrains, getOneTrain, createTrain, updateTrain, deleteTrain } from '../controllers/trains.controllers.js';
import { authenticateRole } from '../middleware/auth.js';

const trainsRoutes = express.Router();

trainsRoutes.get('/', getAllTrains);

trainsRoutes.get('/:trainId', getOneTrain);

trainsRoutes.post('/', authenticateRole, createTrain);

trainsRoutes.put('/:trainId', authenticateRole, updateTrain);

trainsRoutes.delete('/:trainId', authenticateRole, deleteTrain);

export default trainsRoutes;
