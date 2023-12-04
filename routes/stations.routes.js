import express from 'express';
import { getAllStations, getStationById, createStation, updateStation, deleteStation } from '../controllers/stations.controllers.js';
import authenticate from '../middleware/auth.js';

const stationsRoutes = express.Router();

stationsRoutes.get('/', getAllStations);

stationsRoutes.get('/:stationId', getStationById);

stationsRoutes.use(authenticate);

stationsRoutes.post('/', createStation);

stationsRoutes.put('/:stationId', updateStation);

stationsRoutes.delete('/:stationId', deleteStation);

export default stationsRoutes;
