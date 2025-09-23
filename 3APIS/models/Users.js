import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    pseudo: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
});

const Users = mongoose.model('Users', usersSchema);

export default Users;
