// trainRoutes.js
import express from 'express';
import { getAllTrains, getTrainById, createTrain, updateTrain, deleteTrain } from '../controllers/trains.controllers.js';
import authenticate from '../middleware/auth.js';

const trainsRoutes = express.Router();

trainsRoutes.get('/', getAllTrains);

trainsRoutes.get('/:trainId', getTrainById);

trainsRoutes.use(authenticate);

trainsRoutes.post('/', createTrain);

trainsRoutes.put('/:trainId', updateTrain);

trainsRoutes.delete('/:trainId', deleteTrain);

export default trainsRoutes;
