import mongoose from 'mongoose';

const trainsSchema = new mongoose.Schema({
  _id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  start_station: { type: String, required: true },
  end_station: { type: String, required: true },
  time_of_departure: { type: Date, required: true }
});

const Trains = mongoose.model('Trains', trainsSchema);
module.exports = Trains;
