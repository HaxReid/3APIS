import Stations from '../models/Stations.js';

const getAllStations = async (req, res) => {
  try {      
      const stations = await Stations.find();

      res.json({ stations });
  } catch (error) {
      console.error('Error getting stations:', error);
      res.status(500).json({ message: 'Erreur lors de la récupération des stations.' });
  }
};
  
const getOneStation = async (req, res) => {
  try {
    const stationId = req.params.stationId;

    const station = await Stations.findById(stationId);

    if (!station) {
      return res.status(404).json({ message: 'Station non trouvée.' });
    }

    res.json(station);
  } catch (error) {
    console.error('Erreur lors de la récupération de la station par ID:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération de la station par ID.' });
  }
};

const createStation = async (req, res) => {
  try {

    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Seulement un admin peut create une station.' });
    }

    const { name, open_hour, close_hour, image } = req.body;

    const newStation = new Stations({
      name,
      open_hour,
      close_hour,
      image,
    });

    const savedStation = await newStation.save();

    res.status(201).json(savedStation);
  } catch (error) {
    console.error('Erreur lors de la création de la station :', error);
    res.status(500).json({ message: 'Erreur lors de la création de la station.' });
  }
};

const updateStation = async (req, res) => {
  try {

    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Seulement un admin peut update une station.' });
    }

    const stationId = req.params.stationId;

    const { name, open_hour, close_hour, image } = req.body;

    const stationToUpdate = await Stations.findById(stationId);

    if (!stationToUpdate) {
      return res.status(404).json({ message: 'Station non trouvée.' });
    }

    stationToUpdate.name = name;
    stationToUpdate.open_hour = open_hour;
    stationToUpdate.close_hour = close_hour;
    stationToUpdate.image = image;

    const updatedStation = await stationToUpdate.save();

    res.json(updatedStation);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la station :', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la station.' });
  }
};

const deleteStation = async (req, res) => {
  try {

    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Seulement un admin peut delete une station.' });
    }

    const stationId = req.params.stationId;

    const stationToDelete = await Stations.findById(stationId);

    if (!stationToDelete) {
      return res.status(404).json({ message: 'Station non trouvée.' });
    }

    await stationToDelete.remove();

    res.json({ message: 'Station supprimée avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la station :', error);
    res.status(500).json({ message: 'Erreur lors de la suppression de la station.' });
  }
};

  export { getAllStations, getOneStation, createStation, updateStation, deleteStation };
  