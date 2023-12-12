import Trains from '../models/Trains.js';
import Ticket from '../models/Tickets.js';
import { JoiTrainSchema } from '../joi/JoiTrainSchema.js';

const getAllTrains = async (req, res) => {
  try {
    let query = Trains.find();
    if (!query) {
      return res.status(404).json({ message: 'Trains non trouvés.' });
    }
    if (req.query.sort) {
      const sortFields = req.query.sort.split(',');
      query = query.sort(sortFields.join(' '));
    }
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    query = query.limit(limit);
    const trains = await query.exec();
    res.status(201).json(trains);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

  
const getOneTrain = async (req, res) => {
  const trainId = req.params.id;
  try {
    const train = await Trains.findById(trainId);
    if (!train) {
      return res.status(404).json({ message: 'Train non trouvé.' });
    }
    res.status(201).json(train);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur lors de la récupération du train par ID.' });
  }
};
  
const createTrain = async (req, res) => {
  const validatedData = JoiTrainSchema.validate(req.body, { abortEarly: false });
  const train = validatedData.value;
  const start_station = req.body.start_station;
  const end_station = req.body.end_station;
  if (!start_station || !end_station) {
      res.status(400).json({message: "start_station et end_station sont obligatoires"});
  }
  if (!train.time_of_departure) {
    train.time_of_departure = new Date();
  }
  try {
    const result = await Trains.create(train);
    res.status(201).json({message: "Train créé"}, result);
  } catch (err) {
      res.status(500).json(err);
  }
};
  
const updateTrain = async (req, res) => {
  const trainId = req.params.id;
  const train = req.body;
  try {
      const result = await Trains.findByIdAndUpdate(trainId, train, {new: true});
      if (!result) {
          res.status(404).json({message: "Train non trouvé"});
      } else {
          res.status(201).json({message: "Train modifié"}, result);
      }
  } catch (err) {
      res.status(500).json(err);
  }
};
  
const deleteTrain = async (req, res) => {
  const trainId = req.params.id;
  try {
    const ticketIds = await Ticket.find({ trainId }).distinct('_id');

    await Ticket.updateMany(
      { _id: { $in: ticketIds } },
      { $set: { statut: 'invalid' } }
    );

    const result = await Trains.findByIdAndDelete(trainId);

    if (!result) {
      return res.status(404).json({ message: "Train non trouvé" });
    }

    res.status(200).json({ message: "Train supprimé et tickets annulés", result });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du train et de l\'annulation des tickets.' });
  }
};


  export { getAllTrains, getOneTrain, createTrain, updateTrain, deleteTrain};
  