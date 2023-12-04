// trainRoutes.js
import express from 'express';
import { getAllTrains, getTrainByName, createTrain, updateTrain, deleteTrain } from '../controllers/trains.controllers.js';
import authenticate from '../middleware/auth.js';

const trainsRoutes = express.Router();

trainsRoutes.get('/', getAllTrains);

trainsRoutes.get('/:trainName', getTrainByName);

trainsRoutes.post('/', authenticate, createTrain);

trainsRoutes.put('/:trainName', authenticate, updateTrain);

trainsRoutes.delete('/:trainName', authenticate, deleteTrain);

export default trainsRoutes;
