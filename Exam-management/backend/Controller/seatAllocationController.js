//working code
  // const db = require("../config/db"); // Assuming a database connection is established in db.js
// Allocate seats based on input
/*exports.allocateSeats = async (req, res) => {
  const {
    classroom_number,
    no_of_rows,
    no_of_columns,
    course_id1,
    course_id2,
    starting_student_id1,
    starting_student_id2,
    seat_types,
  } = req.body;

  try {
    // Validate that seat_types length matches total benches
    const totalBenches = no_of_rows * no_of_columns;
    if (seat_types.length !== totalBenches) {
      return res
        .status(400)
        .json({
          message: `Invalid input: seat_types must contain exactly ${totalBenches} entries.`,
        });
    }

    // Fetch classroom ID based on classroom number
    const [classroomRows] = await db.query(
      "SELECT classroom_id FROM Classrooms WHERE classroom_number = ?",
      [classroom_number]
    );
    if (!classroomRows.length)
      return res.status(404).json({ message: "Classroom not found" });

    const classroom_id = classroomRows[0].classroom_id;

    // Fetch students for the given courses starting from specified student IDs
    const [studentsCourse1] = await db.query(
      "SELECT student_id FROM Students WHERE student_id >= ? AND student_id IN (SELECT student_id FROM StudentCourses WHERE course_id = ?) ORDER BY student_id",
      [starting_student_id1, course_id1]
    );

    const [studentsCourse2] = await db.query(
      "SELECT student_id FROM Students WHERE student_id >= ? AND student_id IN (SELECT student_id FROM StudentCourses WHERE course_id = ?) ORDER BY student_id",
      [starting_student_id2, course_id2]
    );

    // Prepare seat allocation logic
    const allocations = [];
    let seatIndex = 0;

    for (let row = 1; row <= no_of_rows; row++) {
      for (let col = 1; col <= no_of_columns; col++) {
        let seatType = seat_types[seatIndex];
        let student1 = studentsCourse1.shift();
        let student2 = studentsCourse2.shift();

        if (seatType === "three_seater" && student1 && student2) {
          allocations.push({
            classroom_id,
            no_of_rows: row,
            no_of_columns: col,
            seat_type: seatType,
            seat_number: `Seat-${seatIndex + 1}`,
            student_ids: [student1.student_id, student2.student_id],
          });
        } else if (seatType === "five_seater") {
          allocations.push({
            classroom_id,
            no_of_rows: row,
            no_of_columns: col,
            seat_type: seatType,
            seat_number: `Seat-${seatIndex + 1}`,
            student_ids: [student1?.student_id, student2?.student_id].filter(
              Boolean
            ),
          });
        }

        seatIndex++;
      }
    }

    // Insert into ClassroomSeatAllocation table
    for (const allocation of allocations) {
      for (const student_id of allocation.student_ids) {
        await db.query(
          "INSERT INTO ClassroomSeatAllocation (classroom_id, no_of_rows, no_of_columns, seat_type, seat_number, student_id, course_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [
            allocation.classroom_id,
            allocation.no_of_rows,
            allocation.no_of_columns,
            allocation.seat_type,
            allocation.seat_number,
            student_id,
            allocation.student_ids.indexOf(student_id) === 0
              ? course_id1
              : course_id2,
          ]
        );
      }
    }

    res.json({ message: "Seats allocated successfully", allocations });
  } catch (error) {
    console.error("Database query error:", error);
    res
      .status(500)
      .json({ message: "An error occurred while allocating seats", error });
  }
};
*/

const db = require("../config/db"); // Assuming a database connection is established in db.js

// Allocate seats based on input
exports.allocateSeats = async (req, res) => {
  const {
    classroom_number,
    no_of_rows,
    no_of_columns,
    course_id1,
    course_id2,
    starting_student_id1,
    starting_student_id2,
    seat_types,
  } = req.body;

  try {
    // Validate that seat_types length matches total benches
    const totalBenches = no_of_rows * no_of_columns;
    if (seat_types.length !== totalBenches) {
      return res.status(400).json({
        message: `Invalid input: seat_types must contain exactly ${totalBenches} entries.`,
      });
    }

    // Fetch classroom ID based on classroom number
    const [classroomRows] = await db.query(
      "SELECT classroom_id FROM Classrooms WHERE classroom_number = ?",
      [classroom_number]
    );
    if (!classroomRows.length)
      return res.status(404).json({ message: "Classroom not found" });

    const classroom_id = classroomRows[0].classroom_id;

    // Fetch students for the given courses starting from specified student IDs
    const [studentsCourse1] = await db.query(
      "SELECT student_id FROM Students WHERE student_id >= ? AND student_id IN (SELECT student_id FROM StudentCourses WHERE course_id = ?) ORDER BY student_id",
      [starting_student_id1, course_id1]
    );

    const [studentsCourse2] = await db.query(
      "SELECT student_id FROM Students WHERE student_id >= ? AND student_id IN (SELECT student_id FROM StudentCourses WHERE course_id = ?) ORDER BY student_id",
      [starting_student_id2, course_id2]
    );

    // Prepare seat allocation logic
    const allocations = [];
    let seatIndex = 0;

    // Consider students with student_id >= starting_student_id for each course
    let filteredStudentsCourse1 = studentsCourse1.filter(
      (student) => student.student_id >= starting_student_id1
    );
    let filteredStudentsCourse2 = studentsCourse2.filter(
      (student) => student.student_id >= starting_student_id2
    );

    for (let row = 1; row <= no_of_rows; row++) {
      for (let col = 1; col <= no_of_columns; col++) {
        let seatType = seat_types[seatIndex];
        let student1 = filteredStudentsCourse1.shift();
        let student2 = filteredStudentsCourse2.shift();

        // Allocate seats based on seat type and available students
        if (seatType === "three_seater" && student1 && student2) {
          allocations.push({
            classroom_id,
            no_of_rows: row,
            no_of_columns: col,
            seat_type: seatType,
            seat_number: `Seat-${seatIndex + 1}`,
            student_ids: [student1.student_id, student2.student_id],
          });
        } else if (seatType === "five_seater" && student1) {
          allocations.push({
            classroom_id,
            no_of_rows: row,
            no_of_columns: col,
            seat_type: seatType,
            seat_number: `Seat-${seatIndex + 1}`,
            student_ids: [student1.student_id, student2?.student_id].filter(Boolean),
          });
        }

        seatIndex++;
      }
    }

    // Insert into ClassroomSeatAllocation table
    for (const allocation of allocations) {
      for (const student_id of allocation.student_ids) {
        await db.query(
          "INSERT INTO ClassroomSeatAllocation (classroom_id, no_of_rows, no_of_columns, seat_type, seat_number, student_id, course_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [
            allocation.classroom_id,
            allocation.no_of_rows,
            allocation.no_of_columns,
            allocation.seat_type,
            allocation.seat_number,
            student_id,
            allocation.student_ids.indexOf(student_id) === 0 ? course_id1 : course_id2,
          ]
        );
      }
    }

    res.json({ message: "Seats allocated successfully", allocations });
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({ message: "An error occurred while allocating seats", error });
  }
};
/*const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Assuming db is set up for MySQL connection

// Endpoint for seat allocation based on exam type
router.post('/allocate-seats', async (req, res) => {
  const {
    examType,
    classroomNumber,
    branch1,
    subject1,
    startingUSN1,
    branch2,
    subject2,
    startingUSN2,
    rows,
    columns,
    seatType
  } = req.body;

  try {
    let studentsBranch1 = [];
    let studentsBranch2 = [];
    let studentsForAllocation = [];

    // Fetch students based on exam type
    if (examType === 'internal') {
      // Internal Exam: 2 students from different years and subjects but same branch
      const [students1] = await db.query(`
        SELECT * FROM students
        WHERE branch = ? AND subject != ? AND usn >= ?
        ORDER BY usn ASC LIMIT ?`,
        [branch1, subject1, startingUSN1, Math.floor((rows * columns) / 2)]
      );

      const [students2] = await db.query(`
        SELECT * FROM students
        WHERE branch = ? AND subject != ? AND usn >= ?
        ORDER BY usn ASC LIMIT ?`,
        [branch1, subject2, startingUSN2, Math.floor((rows * columns) / 2)]
      );

      studentsBranch1 = [...students1, ...students2];
    } else if (examType === 'semester') {
      // Semester Exam: Seat allocation logic for 3-seater and 5-seater
      if (seatType === '3-seater') {
        // Different branch, different subject students for 3-seater
        const [students1] = await db.query(`
          SELECT * FROM students
          WHERE branch != ? AND subject != ? AND usn >= ?
          ORDER BY usn ASC LIMIT ?`,
          [branch1, subject1, startingUSN1, Math.floor((rows * columns) / 2)]
        );

        const [students2] = await db.query(`
          SELECT * FROM students
          WHERE branch != ? AND subject != ? AND usn >= ?
          ORDER BY usn ASC LIMIT ?`,
          [branch2, subject2, startingUSN2, Math.floor((rows * columns) / 2)]
        );

        studentsForAllocation = [...students1, ...students2];
      } else if (seatType === '5-seater') {
        // Same subject students for 5-seater
        const [students] = await db.query(`
          SELECT * FROM students
          WHERE subject = ? AND usn >= ?
          ORDER BY usn ASC LIMIT ?`,
          [subject1, startingUSN1, Math.floor((rows * columns) / 2)]
        );

        studentsForAllocation = students;
      }
    }

    // Step 2: Insert classroom data into `classrooms` table
    const [classroomResult] = await db.query(`
      INSERT INTO classrooms (classroom_number, branch1, subject1, starting_usn1, branch2, subject2, starting_usn2, rows, columns, seat_type, exam_type)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [classroomNumber, branch1, subject1, startingUSN1, branch2, subject2, startingUSN2, rows, columns, seatType, examType]
    );

    const classroomId = classroomResult.insertId;

    // Step 3: Allocate seats to students in the classroom
    let studentIndex = 0;
    for (let row = 1; row <= rows; row++) {
      for (let col = 1; col <= columns; col++) {
        if (studentIndex < studentsForAllocation.length) {
          const student = studentsForAllocation[studentIndex];
          await db.query(`
            INSERT INTO seating_arrangements (classroom_id, row, column, seat_type, student_usn)
            VALUES (?, ?, ?, ?, ?)`,
            [classroomId, row, col, seatType, student.usn]
          );
          studentIndex++;
        }
      }
    }

    // Step 4: Return response
    res.status(200).json({ message: 'Seats allocated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error allocating seats' });
  }
});

module.exports = router;*/

