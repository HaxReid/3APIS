import express from 'express';
import { getAllStations, getOneStation, createStation, updateStation, deleteStation } from '../controllers/stations.controllers.js';
import { AdminAuthentification} from '../middleware/auth.js';

const stationsRoutes = express.Router();

stationsRoutes.get('/', getAllStations);

stationsRoutes.get('/:id', getOneStation);

stationsRoutes.post('/', AdminAuthentification, createStation);

stationsRoutes.put('/:id', AdminAuthentification, updateStation);

stationsRoutes.delete('/:id', AdminAuthentification, deleteStation);

export default stationsRoutes;
