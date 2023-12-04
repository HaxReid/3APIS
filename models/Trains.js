import mongoose from 'mongoose';

const trainsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  start_station: { type: String, required: true },
  end_station: { type: String, required: true },
  time_of_departure: { type: Date, required: true }
});

const Trains = mongoose.model('Trains', trainsSchema);

export default Trains;
