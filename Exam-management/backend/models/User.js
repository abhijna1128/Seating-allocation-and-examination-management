// backend/models/User.js
const pool = require('../config/db'); // Import the MySQL pool connection

// Method to find user by email
const findUserByEmail = (email, callback) => {
  const query = 'SELECT * FROM users WHERE email = ?';
  pool.query(query, [email], (err, results) => {
    if (err) {
      return callback(err);
    }
    return callback(null, results[0]); // Return the first result (user)
  });
};

// Method to create a new user
const createUser = (email, password, role, callback) => {
  const query = 'INSERT INTO users (email, password, role) VALUES (?, ?, ?)';
  pool.query(query, [email, password, role], (err, results) => {
    if (err) {
      return callback(err);
    }
    return callback(null, results);
  });
};

module.exports = {
  findUserByEmail,
  createUser,
};
