import express from 'express';
import bodyParser from 'body-parser';
import { connectDB } from './utils/connectDB.js';
import usersRoutes from './routes/users.routes.js';
import trainsRoutes from './routes/trains.routes.js';
import stationsRoutes from './routes/stations.routes.js';
import ticketsRoutes from './routes/tickets.routes.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(bodyParser.json());

app.use('/api/users', usersRoutes);
app.use('/api/trains', trainsRoutes);
app.use('/api/stations', stationsRoutes);
app.use('/api/tickets', ticketsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
