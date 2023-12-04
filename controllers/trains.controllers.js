import Trains from '../models/Trains.js';

const getAllTrains = async (req, res) => {
  try {
    let query = Trains.find();

    if (req.query.sort) {
      const sortFields = req.query.sort.split(',');
      query = query.sort(sortFields.join(' '));
    }

    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    query = query.limit(limit);

    const trains = await query.exec();

    res.json(trains);
  } catch (error) {
    console.error('Error fetching trains:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

  
const getTrainByName = async (req, res) => {
  try {
    const trainName = req.params.trainName;

    const train = await Trains.findOne({name: trainName});

    if (!train) {
      return res.status(404).json({ message: 'Train non trouvé.' });
    }

    res.json(train);
  } catch (error) {
    console.error('Erreur lors de la récupération du train par ID:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération du train par ID.' });
  }
};
  
const createTrain = async (req, res) => {
  try {

    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Seulement un admin peut create un train.' });
    }

    const { name, start_station, end_station, time_of_departure } = req.body;

    const newTrain = new Trains({
      name,
      start_station,
      end_station,
      time_of_departure,
    });

    const savedTrain = await newTrain.save();

    res.status(201).json(savedTrain);
  } catch (error) {
    console.error('Erreur lors de la création du train :', error);
    res.status(500).json({ message: 'Erreur lors de la création du train.' });
  }
};
  
const updateTrain = async (req, res) => {
  try {

    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Seulement un admin peut update un train.' });
    }

    const trainName = req.params.trainName;

    const { name, start_station, end_station, time_of_departure } = req.body;

    const trainToUpdate = await Trains.findOne({name: trainName});

    if (!trainToUpdate) {
      return res.status(404).json({ message: 'Train non trouvée.' });
    }

    trainToUpdate.name = name;
    trainToUpdate.start_station = start_station;
    trainToUpdate.end_station = end_station;
    trainToUpdate.time_of_departure = time_of_departure;

    const updatedTrain = await trainToUpdate.save();

    res.json(updatedTrain);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du train :', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du train.' });
  }
};
  
const deleteTrain = async (req, res) => {
  try {

    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Seulement un admin peut delete un train.' });
    }

    const trainName = req.params.trainName;

    const trainToDelete = await Trains.findOne({name: trainName});

    if (!trainToDelete) {
      return res.status(404).json({ message: 'Train non trouvée.' });
    }

    await trainToDelete.remove();

    res.json({ message: 'Train supprimé avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la suppression du train :', error);
    res.status(500).json({ message: 'Erreur lors de la suppression du train.' });
  }
};
  
  export { getAllTrains, getTrainByName, createTrain, updateTrain, deleteTrain };
  