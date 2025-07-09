const express = require('express');
const db = require('../config/db'); // Import the database connection

const router = express.Router();

// Fetch students for internal exam
router.post('/fetch-internal-students', (req, res) => {
  const { branch, subject } = req.body;

  if (!branch || !subject) {
    return res.status(400).json({ message: 'Branch and subject are required.' });
  }

  // Fetch two students from different years in the same branch and subject
  const query = `
    SELECT * 
    FROM students 
    WHERE branch = ? AND subject = ? 
    GROUP BY year 
    LIMIT 2;
  `;

  db.query(query, [branch, subject], (err, results) => {
    if (err) {
      console.error('Error fetching data from the database:', err.message);
      return res.status(500).json({ message: 'Database query failed.' });
    }

    res.status(200).json({
      message: 'Students fetched successfully for internal exam.',
      data: results,
    });
  });
});

module.exports = router;
