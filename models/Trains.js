import mongoose from 'mongoose';

const trainsSchema = new mongoose.Schema({
});

const Trains = mongoose.model('Trains', trainsSchema);
module.exports = Trains;
