import express from 'express';
import { getAllStations, getOneStation, createStation, updateStation, deleteStation } from '../controllers/stations.controllers.js';
import { AdminAuthentification} from '../middleware/auth.js';

const stationsRoutes = express.Router();

stationsRoutes.get('/', getAllStations);

stationsRoutes.get('/:stationId', getOneStation);

stationsRoutes.post('/', AdminAuthentification, createStation);

stationsRoutes.put('/:stationId', AdminAuthentification, updateStation);

stationsRoutes.delete('/:stationId', AdminAuthentification, deleteStation);

export default stationsRoutes;
