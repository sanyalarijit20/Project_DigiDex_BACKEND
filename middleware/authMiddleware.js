// authMiddleware.js

const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (req, res, next) {
  // 1. Get token from header
  const authHeader = req.header('Authorization');

  // 2. Check if header exists
  if (!authHeader) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // 3. Split the "Bearer <token>" string
    const token = authHeader.split(' ')[1];

    // 4. Check if token exists after split
    if (!token) {
      return res.status(401).json({ message: 'Token is not valid' });
    }

    // 5. Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};