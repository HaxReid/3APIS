import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Users from '../models/Users.js';
dotenv.config();

const AdminAuthentification = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (token) {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Users.findById(decodedToken.id);
    if (user.role === 'admin') {
      req.user = user;
      next();
    } else {
      res.status(403).json({ message: 'Vous n\'avez pas la permission d\'accéder à cette ressource.' });
    }
  } else {
    res.status(401).json({ message: 'Vous devez être connecté pour accéder à cette ressource.' });
  }
}

const HimselfAuthentification = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (token) {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Users.findById(decodedToken.id);
    if ((user && user._id.toString() === req.params.id)) {
      req.user = user;
      next();
    } else {
      res.status(403).json({ message: 'Vous n\'avez pas la permission d\'accéder à cette ressource.' });
    }
  } else {
    res.status(401).json({ message: 'Vous devez être connecté pour accéder à cette ressource.' });
  }
}

const AdminOrHimselfAuthentification = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (token) {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Users.findById(decodedToken.id);
    if ((user && user._id.toString() === req.params.id) || user.role === 'admin') {
      req.user = user;
      next();
    } else {
      res.status(403).json({ message: 'Vous n\'avez pas la permission d\'accéder à cette ressource.' });
    }
  } else {
    res.status(401).json({ message: 'Vous devez être connecté pour accéder à cette ressource.' });
  }
}


export { AdminAuthentification, HimselfAuthentification, AdminOrHimselfAuthentification }