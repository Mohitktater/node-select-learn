const sql = require("../models/db.js");
const bcrypt = require('bcrypt');
const config = require('../config/config.js');
const jwt = require('jsonwebtoken');
const { TokenExpiredError, JsonWebTokenError } = jwt;

// Token Verification
exports.tokenverification = async (req, res) => {
  const token = req.headers.authorization;
 
  try {
    if (!token || token == null) {
      console.log('token is missing');
      // No token provided
      return res.status(422).json({
        message: 'Token is missing',
        type: 'error',
      });
    }

    const decoded = jwt.verify(token, config.jwtSecret);
    const userId = decoded.userId;

    // Continue with your logic...
    
    res.status(200).json({
      message: 'Token is valid',
      type: 'success',
      userId,
    });
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      console.log('token is expired');
      // Token has expired
      return res.status(200).json({
        message: 'Token has expired',
        type: 'error',
      });
    } else if (err instanceof JsonWebTokenError) {
      console.log('token is invalid');
      // Token is invalid or mismatched
      return res.status(200).json({
        message: 'Invalid token',
        type: 'error',
      });
    } else {
      // Other errors
      console.log('internal server error');
      console.error(err);
      return res.status(500).json({
        message: 'Internal server error',
        type: 'error',
      });
    }
  }
};


 
