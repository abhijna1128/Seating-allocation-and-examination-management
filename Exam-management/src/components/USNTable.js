/*import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './USNTable.css'; // Include a CSS file for styling the table

const USNTable = () => {
  const [usnData, setUsnData] = useState([]);
  const [rows, setRows] = useState(0);
  const [columns, setColumns] = useState(0);
  const [classroomNumber, setClassroomNumber] = useState('');

  useEffect(() => {
    // Replace with the actual API endpoint to fetch the seating arrangement
    axios
      .post('/api/allocate-seats', {
        // Add your required payload here
        classroomNumber: '101',
        branch1: 'CSE',
        subject1: 'Maths',
        startingUSN1: '1',
        branch2: 'ECE',
        subject2: 'Physics',
        startingUSN2: '10',
        rows: 5,
        columns: 4,
        seatType: 'double',
      })
      .then((response) => {
        setUsnData(response.data.usnArrangement);
        setRows(response.data.rows);
        setColumns(response.data.columns);
        setClassroomNumber(response.data.classroomNumber);
      })
      .catch((error) => {
        console.error('Error fetching USN data:', error);
      });
  }, []);

  return (
    <div className="container">
      <h1>Seating Arrangement</h1>
      <h3>Classroom Number: {classroomNumber}</h3>

      <table className="usn-table">
        <thead>
          <tr>
            <th>Row</th>
            {Array.from({ length: columns }, (_, i) => (
              <th key={i}>Column {i + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {usnData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>Row {rowIndex + 1}</td>
              {row.map((usn, colIndex) => (
                <td key={`${rowIndex}-${colIndex}`}>
                  {usn ? (
                    <div className="usn-cell">
                      <span>{usn}</span>
                    </div>
                  ) : (
                    <span>Empty</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default USNTable;*/
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Container, Row, Col } from 'react-bootstrap';

const SeatingArrangement = () => {
  const [usns, setUsns] = useState([]);
  const [rows, setRows] = useState([]);
  const columns = 8; // Number of USN columns as per the seating arrangement

  useEffect(() => {
    // Fetch USNs from the backend
    axios
      .get('http://localhost:3000/api/seating') // Replace with your API endpoint
      .then((response) => {
        console.log('API Response:', response.data); // Debugging
        setUsns(response.data);

        // Group USNs into rows for rendering
        const groupedRows = [];
        for (let i = 0; i < response.data.length; i += columns) {
          groupedRows.push(response.data.slice(i, i + columns));
        }
        setRows(groupedRows);
      })
      .catch((err) => {
        console.error('Error fetching USNs:', err);
      });
  }, []);

  return (
    <Container className="mt-4">
      <h4 className="text-center">Sahyadri College of Engineering & Management, Mangaluru</h4>
      <Row>
        <Col>
          <p>
            <strong>Exam Date:</strong> ___________ <strong>Exam Time:</strong> ___________
          </p>
        </Col>
        <Col>
          <p>
            <strong>Room No:</strong> ___________ <strong>Block:</strong> ___________
          </p>
        </Col>
      </Row>
      <Table bordered className="mt-4">
        <thead>
          <tr>
            {Array.from({ length: columns }).map((_, index) => (
              <th key={index}>USN</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((usn, colIndex) => (
                <td key={colIndex}>{usn}</td>
              ))}
              {Array.from({ length: columns - row.length }).map((_, index) => (
                <td key={index}></td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <p>
        <strong>USN of Absentees:</strong> ___________________________________________
      </p>
      <p>
        <strong>No. of Answer Booklets Used:</strong> ___________
      </p>
      <p>
        <strong>SL No. of Blank Answer Books Returned:</strong> ________________________
      </p>
      <p>
        <strong>SL No. of Defective/Replaced Answer Books:</strong> Defective: _______ Replaced: _______
      </p>
      <Row>
        <Col>
          <p>
            <strong>Name of the Invigilator:</strong> ___________________________
          </p>
          <p>
            <strong>Department:</strong> ___________________________
          </p>
        </Col>
        <Col>
          <p>
            <strong>Sign with Date:</strong> ___________________________
          </p>
          <p>
            <strong>Contact Number:</strong> ___________________________
          </p>
        </Col>
      </Row>
      <p className="text-end">
        <strong>Signature of DCS/CS</strong>
      </p>
    </Container>
  );
};

export default SeatingArrangement;
