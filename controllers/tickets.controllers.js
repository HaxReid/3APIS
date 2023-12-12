import Tickets from '../models/Tickets.js';

const getAllTickets = async (req, res) => { 
try {      
    const tickets = await Tickets.find();

    res.json({ tickets });
} catch (error) {
    console.error('Error getting tickets:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des tickets.' });
}
};

const getOneTickets = async (req, res) => {
try {
    const ticketId = req.params.ticketId;

    const ticket = await Tickets.findById(ticketId);

    if (!ticket) {
    return res.status(404).json({ message: 'ticket non trouvée.' });
    }

    res.json(ticket);
} catch (error) {
    console.error('Erreur lors de la récupération de la ticket par ID:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération de la ticket par ID.' });
}
};

const createTickets = async (req, res) => {
try {

    const { departureHour, arrivalHour,trainId } = req.body;

    const newTickets = new Tickets({
    departureHour,
    arrivalHour,
    trainId,
    userId,
    statut,
    });

    const savedTickets = await newTickets.save();

    res.status(201).json(savedTickets);
} catch (error) {
    console.error('Erreur lors de la création du ticket :', error);
    res.status(500).json({ message: 'Erreur lors de la création du ticket.' });
}
};

const updateTickets = async (req, res) => {
try {


    const ticketId = req.params.ticketId;

    const { departureHour, arrivalHour,trainId,userId } = req.body;

    const ticketToUpdate = await Tickets.findById(ticketId);

    if (!ticketToUpdate) {
    return res.status(404).json({ message: 'Tickets non trouvé.' });
    }

    ticketToUpdate.departureHour = departureHour;
    ticketToUpdate.arrivalHour = arrivalHour;
    ticketToUpdate.trainId = trainId;
    ticketToUpdate.userId = userId;
    ticketToUpdate.statut = statut;

    const updatedticket = await ticketToUpdate.save();

    res.json(updatedTickets);
} catch (error) {
    console.error('Erreur lors de la mise à jour du  ticket :', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du ticket.' });
}
};

const deleteTickets = async (req, res) => {
try {


    const ticketId = req.params.ticketId;

    const ticketToDelete = await Tickets.findById(ticketId);

    if (!ticketToDelete) {
    return res.status(404).json({ message: 'Ticket non trouvé.' });
    }

    await ticketToDelete.remove();

    res.json({ message: 'Ticket supprimé avec succès.' });
} catch (error) {
    console.error('Erreur lors de la suppression du ticket :', error);
    res.status(500).json({ message: 'Erreur lors de la suppression du ticket.' });
}
};

export { getAllTickets, getOneTickets, createTickets, updateTickets, deleteTickets };
