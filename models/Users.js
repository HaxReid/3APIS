import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
    _id: { type: Number, required: true, unique: true  },
    email: { type: String, required: true, unique: true },
    pseudo: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin', 'employee'], default: 'user' }
});

const Users = mongoose.model('Users', usersSchema);
module.exports = Users;
