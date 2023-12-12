import Joi from 'joi';

const JoiTrainSchema = Joi.object({
    name: Joi.string().required(),
    start_station: Joi.string().required(),
    end_station: Joi.string().required(),
    time_of_departure: Joi.date().optional()
});

export default JoiTrainSchema;