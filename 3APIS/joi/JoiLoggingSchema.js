import Joi from 'joi';

const JoiLoggingSchema = Joi.object({
    pseudo: Joi.string().required(),
    password: Joi.string().required(),
});

export default JoiLoggingSchema;