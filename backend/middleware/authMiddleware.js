const jwt = require('jsonwebtoken');

// Middleware to verify JWT and check roles
const protect = (requiredRole = null) => {
  return (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
      return res.status(403).json({ message: 'No token provided.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token.' });
      }

      req.user = decoded; // Attach decoded token data to request

      // If a specific role is required, check it
      if (requiredRole && req.user.role !== requiredRole) {
        return res.status(403).json({ message: `Access denied. ${requiredRole}s only.` });
      }

      next();
    });
  };
};

module.exports = { protect };
