import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
    departureHour: { type: String, required: true },
    arrivalHour: { type: String, required: true },
    trainId: { type: String, required: true },
    userId: { type: String, required: true },
    statut: { type: String, required: true, default: 'valide' }
});

const ticket = mongoose.model('ticket', ticketSchema);

export default ticket;
