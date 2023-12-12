import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    trainId: { type: String, required: true },
    departureHour: { type: Date, required: true },
    arrivalHour: { type: Date, required: true },
    statut: { type: String, required: true, default: 'valid' }
});

const ticket = mongoose.model('ticket', ticketSchema);

export default ticket;
