// trainRoutes.js
import express from 'express';
import { getAllTrains, getTrainByName, createTrain, updateTrain, deleteTrain } from '../controllers/trains.controllers.js';
import authenticate from '../middleware/auth.js';

const trainsRoutes = express.Router();

trainsRoutes.get('/', getAllTrains);

trainsRoutes.get('/:trainName', getTrainByName);

trainsRoutes.post('/',  createTrain);

trainsRoutes.put('/:trainName',  updateTrain);

trainsRoutes.delete('/:trainName',  deleteTrain);

export default trainsRoutes;
