import mongoose from 'mongoose';

const stationsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    open_hour: { type: String, required: true },
    close_hour: { type: String, required: true },
    image: { type: String, required: true }
});

const Stations = mongoose.model('Stations', stationsSchema);

export default Stations;
