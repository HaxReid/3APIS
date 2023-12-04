// trainRoutes.js
import express from 'express';
import { getAllTrains, getTrainById, createTrain, updateTrain, deleteTrain } from '../controllers/trains.controllers.js';
import authenticate from '../middleware/auth.js';

const trainsRoutes = express.Router();

// Endpoint pour obtenir tous les trains (accessible sans authentification)
trainsRoutes.get('/', getAllTrains);

// Endpoint pour obtenir un train par ID (accessible sans authentification)
trainsRoutes.get('/:trainId', getTrainById);

// Middleware d'authentification pour les routes suivantes
trainsRoutes.use(authenticate);

// Endpoint pour créer un nouveau train
trainsRoutes.post('/', createTrain);

// Endpoint pour mettre à jour un train
trainsRoutes.put('/:trainId', updateTrain);

// Endpoint pour supprimer un train
trainsRoutes.delete('/:trainId', deleteTrain);

export default trainsRoutes;
