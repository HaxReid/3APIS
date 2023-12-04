import express from 'express';
import { getAllStations, getStationByName, createStation, updateStation, deleteStation } from '../controllers/stations.controllers.js';
import authenticate from '../middleware/auth.js';

const stationsRoutes = express.Router();

stationsRoutes.get('/', getAllStations);

stationsRoutes.get('/:stationName', getStationByName);

stationsRoutes.post('/',  createStation);

stationsRoutes.put('/:stationName',  updateStation);

stationsRoutes.delete('/:stationName',  deleteStation);

export default stationsRoutes;
