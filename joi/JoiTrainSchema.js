import Joi from 'joi';
import Stations from "../models/Stations.js";

const existingStation = async (value, helpers) => {
    const station = await Stations.findOne({name: value});
    if (!station) {
        return helpers.error('Cette station n\'existe pas', { value });
    }
    return value;
}

const JoiTrainSchema = Joi.object({
    name: Joi.string().required(),
    start_station: Joi.string().required().custom(existingStation , 'Station exists validation'),
    end_station: Joi.string().required().custom(existingStation , 'Station exists validation'),
    time_of_departure: Joi.date().optional()
});

export default JoiTrainSchema;