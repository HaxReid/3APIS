import Trains from '../models/Trains.js';
import Tickets from '../models/Tickets.js';

const isTicketValid = async (req, res) => {
    const ticketId = req.params.id;
    try {
      const ticket = await Tickets.findById(ticketId);
      if (!ticket) {
        return res.status(401).json({message: "Ticket non trouvé"});
      }
      const train = await Trains.findById(ticket.trainId);
      if (!train) {
        return  res.status(401).json({message: "Train non trouvé"});
      }
      if (ticket.departureHour > train.time_of_departure) {
        return res.status(401).json({message: "Ticket expiré"});
      }
      if (ticket.statut === "invalid") {
        return res.status(401).json({message: "Ticket invalide"});
      }
      return res.status(201).json({message: "Ticket valide"});
    } catch (error) {
      return res.status(500).json({ message: 'Erreur lors de la vérification du ticket.' });
    }
  };

  const createTicket = async (req, res) => {
    const ticket = req.body;
    try {
        const result = await Tickets.create(ticket);
        return res.status(201).json({message: "ticket créé"}, result);
    } catch (error) {
        return res.status(500).json({ message: 'Erreur lors de la création du ticket.' });
    }
  };

export { isTicketValid, createTicket };
