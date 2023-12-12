import express from 'express';
import { getAllTrains, getOneTrain, createTrain, updateTrain, deleteTrain } from '../controllers/trains.controllers.js';
import { AdminAuthentification } from '../middleware/auth.js';

const trainsRoutes = express.Router();

trainsRoutes.get('/', getAllTrains);

trainsRoutes.get('/:trainId', getOneTrain);

trainsRoutes.post('/', AdminAuthentification, createTrain);

trainsRoutes.put('/:trainId', AdminAuthentification, updateTrain);

trainsRoutes.delete('/:trainId', AdminAuthentification, deleteTrain);

export default trainsRoutes;
