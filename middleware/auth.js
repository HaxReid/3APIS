import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const authenticate = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Accès non autorisé. Token manquant.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    if (req.user.role !== 'admin' && req.user.role !== 'user') {
      return res.status(403).json({ message: 'Accès non autorisé. Rôle non valide.' });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Accès non autorisé. Token invalide.' });
  }
};


export default authenticate;
