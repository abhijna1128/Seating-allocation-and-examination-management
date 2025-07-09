const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
const pool = require('../config/db'); // Your database pool or connection
//const { generateSeatingArrangement } = require('../utils/seatingUtils'); // Utility function for generating seating

// Controller function for allocating seats
app.post('/api/seating/allocate-seats', (req, res) => {
  const {
      classroomNumber,
      branch1,
      subject1,
      rows,
      columns,
      seatType,
      allocatedSeats
  } = req.body;

  // Query to insert data into seating_data table
  const query = `
      INSERT INTO seating_data (classroom_number, branch1, subject1, rows, columns, seat_type, allocated_seats)
      VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
      classroomNumber,
      branch1,
      subject1,
      rows,
      columns,
      seatType,
      JSON.stringify(allocatedSeats) // Store seat allocation as JSON
  ];

  db.execute(query, values, (err, results) => {
      if (err) {
          console.error('Error inserting data:', err);
          return res.status(500).send({ error: 'Failed to store seating data' });
      }

      res.status(200).send({ message: 'Seating data stored successfully', data: results });
  });
});