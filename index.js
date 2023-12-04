import express from 'express';
import bodyParser from 'body-parser';
import { connectDB } from './utils/connectDB.js';
import usersRoutes from './routes/users.routes.js';
import trainsRoutes from './routes/trains.routes.js';
import stationsRoutes from './routes/stations.routes.js';
import dotenv from 'dotenv';

// Charger les variables d'environnement depuis le fichier .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/users', usersRoutes);
app.use('/api/trains', trainsRoutes);
app.use('/api/stations', stationsRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
