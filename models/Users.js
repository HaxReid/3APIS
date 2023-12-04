import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
});

const Users = mongoose.model('Users', usersSchema);
module.exports = Users;
