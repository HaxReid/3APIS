import express from 'express';
import { getAllStations, getOneStation, createStation, updateStation, deleteStation } from '../controllers/stations.controllers.js';
import {authenticateRole} from '../middleware/auth.js';

const stationsRoutes = express.Router();

stationsRoutes.get('/', getAllStations);

stationsRoutes.get('/:stationId', getOneStation);

stationsRoutes.post('/', authenticateRole, createStation);

stationsRoutes.put('/:stationId', authenticateRole, updateStation);

stationsRoutes.delete('/:stationId',  authenticateRole, deleteStation);

export default stationsRoutes;
