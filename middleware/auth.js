import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const authenticate = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Accès non autorisé. Token manquant.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {   
      return res.status(401).json({ error: 'Unauthorized' });
    }
    req.user = user;
    next();
  });
};

const authenticateRole = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Accès non autorisé. Token manquant.' });
  }

  const userRole = getRoleFromToken(token);

  if (!userRole) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  req.userRole = userRole;

  next();
};


const getRoleFromToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    return decoded.role;
  } catch (error) {
    console.error('Erreur lors de la récupération du rôle à partir du jeton :', error);
    return null;
  }
};
export { authenticate, authenticateRole };