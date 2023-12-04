import mongoose from 'mongoose';

const stationsSchema = new mongoose.Schema({
    _id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    open_hour: { type: String, required: true },
    close_hour: { type: String, required: true },
    image: { type: String, required: true }
});

const Stations = mongoose.model('Stations', stationsSchema);
module.exports = Stations;
