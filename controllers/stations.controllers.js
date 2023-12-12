import Stations from '../models/Stations.js';
import Trains from '../models/Trains.js';


const getAllStations = async (req, res) => {
  try {      
      const stations = await Stations.find();

      if (!stations) {
          return res.status(404).json({ message: 'Stations non trouvées.' });
      }
      res.status(201).json({ stations });
  } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération des stations.' });
  }
};
  
const getOneStation = async (req, res) => {
  const stationId = req.params.id;
  try {
    const station = await Stations.findById(stationId);

    if (!station) {
      return res.status(404).json({ message: 'Station non trouvée.' });
    }

    res.status(201).json(station);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur lors de la récupération de la station par ID.' });
  }
};

const createStation = async (req, res) => {
  const station = req.body;
  if (!station.open_hour || !station.close_hour) {
      station.open_hour = new Date();
      station.close_hour = new Date();
      station.close_hour.setHours(station.close_hour.getHours() + 8);
  }
  try {
    const result = await Stations.create(station);
    res.status(201).json({message: "Station créée"}, result);
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
          res.status(201).json({message: "Station modifiée"}, result);
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
          res.status(200).json({message: "Station supprimée"}, result);
      } else {
          res.status(404).json({message: "Station non trouvée"});
      }
  } catch (err) {
      res.status(500).json(err);
  }
};

  export { getAllStations, getOneStation, createStation, updateStation, deleteStation };
  