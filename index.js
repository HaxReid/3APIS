import express from 'express';
import bodyParser from 'body-parser';
import { connectDB } from './utils/connectDB.js';
import usersRoutes from './routes/users.routes.js';
import trainsRoutes from './routes/trains.routes.js';
import stationsRoutes from './routes/stations.routes.js';
import dotenv from 'dotenv';
import { importDataForCollection } from './utils/importData.js';
import Users from './models/Users.js';
import Trains from './models/Trains.js';
import Stations from './models/Stations.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();
await importDataForCollection('./datas/users.csv', Users);
await importDataForCollection('./datas/trains.csv', Trains);
await importDataForCollection('./datas/stations.csv', Stations);

app.use(bodyParser.json());

app.use('/api/users', usersRoutes);
app.use('/api/trains', trainsRoutes);
app.use('/api/stations', stationsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
