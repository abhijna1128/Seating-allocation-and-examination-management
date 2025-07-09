const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const db = require('../config/db'); // Adjust based on your project structure

// Registration endpoint
router.post('/register', async (req, res) => {
    const { email, password, role } = req.body;

    try {
        // Check if the user already exists
        const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database
        const [result] = await db.query(
            'INSERT INTO users (email, password, role) VALUES (?, ?, ?)',
            [email, hashedPassword, role || 'user'] // Default role is 'user'
        );

        console.log('User registered successfully:', { id: result.insertId, email, role });

        // Generate a JWT token
        const token = jwt.sign(
            { id: result.insertId, email, role: role || 'user' },
            process.env.JWT_SECRET, // Ensure this is defined in your .env file
            { expiresIn: '1h' }
        );

        res.status(201).json({ message: 'User registered successfully', token });
    } catch (err) {
        console.error('Error during registration:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Login endpoint (already implemented)
/*router.post('/login', async (req, res) => {
  try {
      const { email, password } = req.body;
      console.log('Received email:', email);  // Log the email
      console.log('Received password:', password);  // Log the password

      // Check if user exists in the database
      const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

      // If user is not found, return an error
      if (!user || user.length === 0) {
          return res.status(400).json({ message: 'User not found' });
      }

      // Access the user data correctly (as user[0] if the result is an array)
      const foundUser = user[0];  // Access the first result if it’s an array
      console.log('Fetched user:', foundUser);

      // Compare the hashed password
      const passwordMatch = await bcrypt.compare(password, foundUser.password);
      if (!passwordMatch) {
          return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Generate JWT token
      const token = jwt.sign(
          { id: foundUser.id, email: foundUser.email, role: foundUser.role },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
      );

      res.json({ message: 'Login successful', token });
  } catch (error) {
      console.error('Error during login:', error.message);
      res.status(500).json({ message: 'An error occurred during login' });
  }
});*/
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Received email:', email);  // Log the email
    console.log('Received password:', password);  // Log the password

    // Check if user exists in the database
    const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    if (!user || user.length === 0) {
      return res.status(400).json({ message: 'User not found' });
    }
    console.log('Fetched user:', user);

    // Compare the hashed password
    const passwordMatch = await bcrypt.compare(password, user[0].password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user[0].id, email: user[0].email, role: user[0].role },
      process.env.JWT_SECRET, // Ensure this is defined in your .env file
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login successful', token, role: user[0].role });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ message: 'An error occurred during login' });
  }
});




module.exports = router;
