const jwt = require('jsonwebtoken');
const config = require('./config');

// Middleware to verify JWT
module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(200).json({ error: 'Access denied' });
  }

  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(200).json({ error: 'Invalid token' });
    }
    req.userId = decoded.userId;
    next();
    
  });
};
