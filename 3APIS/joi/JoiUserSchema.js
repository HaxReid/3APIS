import Joi from 'joi';

const JoiUserSchema = Joi.object({
    email: Joi.string().email().required(),
    pseudo: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().required()
});

export default JoiUserSchema;