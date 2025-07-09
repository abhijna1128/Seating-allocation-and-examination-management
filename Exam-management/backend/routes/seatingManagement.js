/*const express = require('express');
const pool = require('../config/db');
const router = express.Router();

router.post('/allocate-seats', async (req, res) => {
  const {
    classroomNumber,
    branch1,
    subject1,
    startingUSN1,
    branch2,
    subject2,
    startingUSN2,
    rows,
    columns,
    seatType,
  } = req.body;

  try {
    // Get students for Branch 1
    const [studentsBranch1] = await pool.query(
      `SELECT * FROM students WHERE branch = ? AND (subject1 = ? OR subject2 = ? OR subject3 = ?) AND usn >= ? LIMIT ?`,
      [branch1, subject1, subject1, subject1, startingUSN1, rows * columns]
    );

    // Get students for Branch 2
    const [studentsBranch2] = await pool.query(
      `SELECT * FROM students WHERE branch = ? AND (subject1 = ? OR subject2 = ? OR subject3 = ?) AND usn >= ? LIMIT ?`,
      [branch2, subject2, subject2, subject2, startingUSN2, rows * columns]
    );

    // Combine and allocate seats
    const totalSeats = rows * columns;
    const seatingArrangement = [];
    const students = [...studentsBranch1, ...studentsBranch2].slice(0, totalSeats);

    let count = 0;
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < columns; j++) {
        if (count < students.length) {
          row.push(students[count]);
          count++;
        } else {
          row.push(null); // Empty seat
        }
      }
      seatingArrangement.push(row);
    }

    res.status(200).json({
      message: 'Seating arrangement created successfully',
      classroomNumber,
      seatType,
      seatingArrangement,
    });
  } catch (error) {
    console.error('Error in seat allocation:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;*/
/*const express = require('express');
const pool = require('../config/db');
const router = express.Router();

router.post('/allocate-seats', async (req, res) => {
  const {
    classroomNumber,
    branch1,
    subject1,
    startingUSN1,
    branch2,
    subject2,
    startingUSN2,
    rows,
    columns,
    seatType,
  } = req.body;

  try {
    const totalBenches = rows * columns; // Total number of benches
    const totalSeats = totalBenches * 2; // Total seats (2 students per bench)

    // Fetch students for Branch 1
    const [studentsBranch1] = await pool.query(
      `SELECT * FROM students WHERE branch = ? AND (subject1 = ? OR subject2 = ? OR subject3 = ?) AND usn >= ? LIMIT ?`,
      [branch1, subject1, subject1, subject1, startingUSN1, totalBenches]
    );

    // Fetch students for Branch 2
    const [studentsBranch2] = await pool.query(
      `SELECT * FROM students WHERE branch = ? AND (subject1 = ? OR subject2 = ? OR subject3 = ?) AND usn >= ? LIMIT ?`,
      [branch2, subject2, subject2, subject2, startingUSN2, totalBenches]
    );

    // Check if we have enough students
    if (studentsBranch1.length < totalBenches || studentsBranch2.length < totalBenches) {
      return res.status(400).json({
        message: 'Not enough students available for the given branches or criteria.',
      });
    }

    // Allocate students to benches
    const seatingArrangement = [];
    let branch1Index = 0;
    let branch2Index = 0;

    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < columns; j++) {
        if (branch1Index < studentsBranch1.length && branch2Index < studentsBranch2.length) {
          const bench = {
            student1: studentsBranch1[branch1Index], // Student from Branch 1
            student2: studentsBranch2[branch2Index], // Student from Branch 2
          };
          row.push(bench);
          branch1Index++;
          branch2Index++;
        } else {
          row.push(null); // Empty bench if no more students
        }
      }
      seatingArrangement.push(row);
    }

    res.status(200).json({
      message: 'Seating arrangement created successfully',
      classroomNumber,
      seatType,
      seatingArrangement,
    });
  } catch (error) {
    console.error('Error in seat allocation:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;*/

//output is coming for this 
const express = require('express');
const pool = require('../config/db'); // Ensure your db.js file sets up the MySQL pool/connection
const router = express.Router();

router.post('/allocate-seats', async (req, res) => {
  const {
    classroomNumber,
    branch1,
    subject1,
    startingUSN1,
    branch2,
    subject2,
    startingUSN2,
    rows,
    columns,
    seatType,
  } = req.body;

  try {
    const totalBenches = rows * columns; // Total number of benches
    const totalSeats = totalBenches * 2; // Total seats (2 students per bench)

    // Fetch students for Branch 1
    const [studentsBranch1] = await pool.query(
      `SELECT * FROM students WHERE branch = ? AND (subject1 = ? OR subject2 = ? OR subject3 = ?) AND usn >= ? LIMIT ?`,
      [branch1, subject1, subject1, subject1, startingUSN1, totalBenches]
    );

    // Fetch students for Branch 2
    const [studentsBranch2] = await pool.query(
      `SELECT * FROM students WHERE branch = ? AND (subject1 = ? OR subject2 = ? OR subject3 = ?) AND usn >= ? LIMIT ?`,
      [branch2, subject2, subject2, subject2, startingUSN2, totalBenches]
    );

    // Check if we have enough students
    if (studentsBranch1.length < totalBenches || studentsBranch2.length < totalBenches) {
      return res.status(400).json({
        message: 'Not enough students available for the given branches or criteria.',
      });
    }

    // Allocate students to benches
    const seatingArrangement = [];
    let branch1Index = 0;
    let branch2Index = 0;

    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < columns; j++) {
        if (branch1Index < studentsBranch1.length && branch2Index < studentsBranch2.length) {
          const bench = {
            student1: studentsBranch1[branch1Index], // Student from Branch 1
            student2: studentsBranch2[branch2Index], // Student from Branch 2
          };
          row.push(bench);
          branch1Index++;
          branch2Index++;
        } else {
          row.push(null); // Empty bench if no more students
        }
      }
      seatingArrangement.push(row);
    }

    // Store seating arrangement into the database
    const seatingData = {
      classroomNumber,
      branch1,
      subject1,
      startingUSN1,
      branch2,
      subject2,
      startingUSN2,
      rows,
      columns,
      seatType,
      arrangement: seatingArrangement, // No need to stringify yet
    };

    // Insert query for each student pair
    const insertQuery = `
      INSERT INTO seating_data ( 
        classroom_number, 
        branch1, 
        subject1, 
        starting_usn1, 
        branch2, 
        subject2, 
        starting_usn2, 
        \`rows\`, 
        \`columns\`, 
        seat_type, 
        seating_arrangement
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // Loop through seating arrangement and insert each unique student pair
    const insertedPairs = new Set();

    const promises = seatingArrangement.flat().map(async (arrangement) => {
      const student1 = arrangement.student1;
      const student2 = arrangement.student2;
    
      // Create a unique identifier for the student pair
      const studentPairId = `${student1.usn}-${student2.usn}`;
      
      // If this pair has already been inserted, skip it
      if (insertedPairs.has(studentPairId)) {
        return; // Skip this insertion
      }
    
      // Mark the pair as inserted
      insertedPairs.add(studentPairId);

      // Ensure each student is stored uniquely
      const student1Data = {
        id: student1.id,
        usn: student1.usn,
        name: student1.name,
        branch: student1.branch,
        course: student1.course,
        subjects: [student1.subject1, student1.subject2, student1.subject3]
      };

      const student2Data = {
        id: student2.id,
        usn: student2.usn,
        name: student2.name,
        branch: student2.branch,
        course: student2.course,
        subjects: [student2.subject1, student2.subject2, student2.subject3]
      };

      // Insert data for each pair of students (store students uniquely)
      await pool.query(insertQuery, [
        seatingData.classroomNumber,
        seatingData.branch1,
        seatingData.subject1,
        seatingData.startingUSN1,
        seatingData.branch2,
        seatingData.subject2,
        seatingData.startingUSN2,
        seatingData.rows,
        seatingData.columns,
        seatingData.seatType,
        JSON.stringify([student1Data, student2Data]), // Store student data as JSON
      ]);
    });

    // Wait for all the insert queries to complete
    await Promise.all(promises);

    // Send a successful response with seating data
    res.status(200).json({
      message: 'Seating arrangement created and stored successfully',
      classroomNumber,
      branch1,
      subject1,
      startingUSN1,
      branch2,
      subject2,
      startingUSN2,
      rows,
      columns,
      seatType,
      seatingArrangement,
    });
  } catch (error) {
    console.error('Error in seat allocation:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});
/*router.get('/seatingArrangement', async (req, res) => {
  try {
    // Query to get seating arrangement data
    const [result] = await pool.query('SELECT * FROM seating_data');
    
    if (result.length === 0) {
      return res.status(404).json({ message: 'No seating arrangements found.' });
    }

    // Map the query result to a formatted seating arrangement response
    const seatingArrangement = result.map(row => {
      return {
        classroomNumber: row.classroom_number,
        seatingArrangement: JSON.parse(row.seating_arrangement), // Parse JSON stored in database
      };
    });

    // Send the seating arrangement data as the response
    res.json(seatingArrangement);  // Returning all seating arrangements from the table
  } catch (error) {
    console.error('Error fetching seating arrangement data:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});*/

module.exports = router;