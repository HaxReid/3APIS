import Joi from 'joi';

const JoiTicketSchema = Joi.object({
    trainId: Joi.string().required(),
    departureHour: Joi.date().iso().required(),
    arrivalHour: Joi.date().iso().required(),
    statut: Joi.string().valid('valid', 'invalid')
});

export default JoiTicketSchema;