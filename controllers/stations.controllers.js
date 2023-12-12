import Stations from '../models/Stations.js';
import Trains from '../models/Trains.js';
import Tickets from '../models/Tickets.js';
import { JoiStationSchema } from '../joi/JoiStationSchema.js';

const getAllStations = async (req, res) => {
  try {      
      const stations = await Stations.find();

      if (!stations) {
          return res.status(204).json({ message: 'Stations non trouvées.' });
      }
      res.status(200).json({ stations });
  } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération des stations.' });
  }
};
  
const getOneStation = async (req, res) => {
  const stationId = req.params.id;
  try {
    const station = await Stations.findById(stationId);

    if (!station) {
      return res.status(204).json({ message: 'Station non trouvée.' });
    }

    res.status(200).json(station);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur lors de la récupération de la station par ID.' });
  }
};

const createStation = async (req, res) => {
  const validatedData = JoiStationSchema.validate(req.body, { abortEarly: false });
  const station = validatedData.value;
  if (!station.open_hour || !station.close_hour) {
      station.open_hour = new Date();
      station.close_hour = new Date();
      station.close_hour.setHours(station.close_hour.getHours() + 8);
  }
  try {
    const result = await Stations.create(station);
    res.status(200).json({message: "Station créée"}, result);
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
          res.status(204).json({message: "Station non trouvée"});
      } else {
          res.status(200).json({message: "Station modifiée"}, result);
      }
  } catch (err) {
      res.status(500).json(err);
  }
};

const deleteStation = async (req, res) => {
  const stationId = req.params.id;
  try {
      const trainIds = await Trains.find({
        $or: [
          { start_station: stationId },
          { end_station: stationId }
        ]
      }).distinct('_id');

      await Trains.deleteMany({
          $or: [
              {start_station: stationId},
              {end_station: stationId}
          ]
      });

      await Tickets.deleteMany({ trainId: { $in: trainIds } });
      const result = await Stations.findByIdAndDelete(stationId);
      if (result) {
          res.status(200).json({message: "Station supprimée"}, result);
      } else {
          res.status(204).json({message: "Station non trouvée"});
      }
  } catch (err) {
      res.status(500).json(err);
  }
};

  export { getAllStations, getOneStation, createStation, updateStation, deleteStation };
  