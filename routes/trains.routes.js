import express from 'express';
import { getAllTrains, getOneTrain, createTrain, updateTrain, deleteTrain } from '../controllers/trains.controllers.js';
import { AdminAuthentification, HimselfAuthentification, AdminOrHimselfAuthentification} from '../middleware/auth.js';

const trainsRoutes = express.Router();

trainsRoutes.get('/', getAllTrains);

trainsRoutes.get('/:trainId', getOneTrain);

trainsRoutes.post('/', createTrain);

trainsRoutes.put('/:trainId', updateTrain);

trainsRoutes.delete('/:trainId', deleteTrain);

export default trainsRoutes;
