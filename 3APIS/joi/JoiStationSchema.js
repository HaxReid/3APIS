import Joi from 'joi';

const JoiStationSchema = Joi.object({
    name: Joi.string().required(),
    open_hour: Joi.date().optional(),
    close_hour: Joi.date().optional(),
    image: Joi.string().required()
});

export default JoiStationSchema;