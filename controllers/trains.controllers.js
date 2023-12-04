import Trains from '../models/Trains.js';
import {isValidObjectId} from '../utils/isValidObjectId.js';

const getAllTrains = async(req, res) => {
  try {      
    const trains = await Trains.find();

    res.json({ trains });
  } catch (error) {
      console.error('Error getting trains:', error);
      res.status(500).json({ message: 'Erreur lors de la récupération des trains.' });
  }
};
  
  const getTrainById = (req, res) => {
    console.log('Controller: Get train by ID');
    // Logique pour obtenir un train par ID depuis la base de données
    // Envoyer la réponse appropriée
  };
  
  const createTrain = (req, res) => {
    console.log('Controller: Create train');
    // Logique pour créer un nouveau train dans la base de données
    // Envoyer la réponse appropriée
  };
  
  const updateTrain = (req, res) => {
    console.log('Controller: Update train');
    // Logique pour mettre à jour un train dans la base de données
    // Envoyer la réponse appropriée
  };
  
  const deleteTrain = (req, res) => {
    console.log('Controller: Delete train');
    // Logique pour supprimer un train depuis la base de données
    // Envoyer la réponse appropriée
  };
  
  export { getAllTrains, getTrainById, createTrain, updateTrain, deleteTrain };
  