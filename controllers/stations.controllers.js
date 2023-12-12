import Stations from '../models/Stations.js';
import Trains from '../models/Trains.js';


const getAllStations = async (req, res) => {
  try {      
      const stations = await Stations.find();

      res.status(201).json({ stations });
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

    res.status(201).json(station);
  } catch (error) {
    console.error('Erreur lors de la récupération de la station par ID:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération de la station par ID.' });
  }
};

const createStation = async (req, res) => {
  const station = req.body;
  if (!station.open_hour) {
      station.open_hour = new Date();
  }
  if (!station.close_hour) {
      station.close_hour = new Date();
      station.close_hour.setHours(station.close_hour.getHours() + 8);
  }
  try {
    const trainStation = await Stations.create(station);
    res.status(201).json(trainStation);
  } catch (err) {
      res.status(500).json(err);
  }
};

const updateStation = async (req, res) => {
  const stationId = req.params.id;
  const station = req.body;
  try {
      const result = await Stations.findByIdAndUpdate(stationId, station, {new: true});
      if (!result) {
          res.status(404).json({message: "Station non trouvée"});
      } else {
          res.status(201).json(result);
      }
  } catch (err) {
      res.status(500).json(err);
  }
};

const deleteStation = async (req, res) => {
  const stationId = req.params.id;
  try {
      await Trains.deleteMany({
          $or: [
              {start_station: stationId},
              {end_station: stationId}
          ]
      });
      const result = await Stations.findByIdAndDelete(stationId);
      if (result) {
          res.status(200).json(result);
      } else {
          res.status(404).json({message: "Station non trouvée"});
      }
  } catch (err) {
      res.status(500).json(err);
  }
};

  export { getAllStations, getOneStation, createStation, updateStation, deleteStation };
  