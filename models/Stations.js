import mongoose from 'mongoose';

const stationsSchema = new mongoose.Schema({
});

const Stations = mongoose.model('Stations', stationsSchema);
module.exports = Stations;
