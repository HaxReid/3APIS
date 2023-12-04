import express from 'express';
import { getAllStations, getStationByName, createStation, updateStation, deleteStation } from '../controllers/stations.controllers.js';
import authenticate from '../middleware/auth.js';

const stationsRoutes = express.Router();

stationsRoutes.get('/', getAllStations);

stationsRoutes.get('/:stationName', getStationByName);

stationsRoutes.post('/', authenticate, createStation);

stationsRoutes.put('/:stationName', authenticate, updateStation);

stationsRoutes.delete('/:stationName', authenticate, deleteStation);

export default stationsRoutes;
