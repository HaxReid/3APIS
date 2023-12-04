import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export function connectDB() {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/RailRoad';

  mongoose
    .connect(mongoURI,)
    .then(() => {
      console.log('Connecté à MongoDB');
    })
    .catch((err) => {
      console.error('Erreur de connexion à la base de données MongoDB');
      console.error(err);
    });
}
