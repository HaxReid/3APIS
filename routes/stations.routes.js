// stationRoutes.js
import express from 'express';
import { getAllStations, getStationById, createStation, updateStation, deleteStation } from '../controllers/stations.controllers.js';
import authenticate from '../middleware/auth.js';

const stationsRoutes = express.Router();

// Endpoint pour obtenir toutes les stations (accessible sans authentification)
stationsRoutes.get('/', getAllStations);

// Endpoint pour obtenir une station par ID (accessible sans authentification)
stationsRoutes.get('/:stationId', getStationById);

// Middleware d'authentification pour les routes suivantes
stationsRoutes.use(authenticate);

// Endpoint pour créer une nouvelle station
stationsRoutes.post('/', createStation);

// Endpoint pour mettre à jour une station
stationsRoutes.put('/:stationId', updateStation);

// Endpoint pour supprimer une station
stationsRoutes.delete('/:stationId', deleteStation);

export default stationsRoutes;
