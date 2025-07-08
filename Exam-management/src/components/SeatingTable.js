/*import React from 'react';
import { Table, Container } from 'react-bootstrap';

const SeatingTable = ({ seatingData }) => (
  <Container>
    <h2>Seating Arrangement</h2>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Exam Date</th>
          <th>Classroom Number</th>
          <th>Exam Time</th>
          <th>Exam Block</th>
          <th>Seating Allotment</th>
        </tr>
      </thead>
      <tbody>
        {/* Render seating data here }
      </tbody>
    </Table>
  </Container>
);

export default SeatingTable;*/
/*import React, { useEffect, useState } from "react";
//import "./SeatingTable.css";

function SeatingTable() {
  const [seatingData, setSeatingData] = useState([]);

  useEffect(() => {
    // Fetch seating data from the backend (replace with your API endpoint)
    fetch("/api/seating-data")  // Endpoint for fetching seating data
      .then((response) => response.json())
      .then((data) => {
        // Assuming the backend returns only USNs or modify accordingly
        setSeatingData(data.seatingArrangement || []);
      })
      .catch((error) => console.error("Error fetching seating data:", error));
  }, []);

  return (
    <div className="seating-container">
      <h1>Sahyadri College of Engineering & Management, Mangaluru</h1>

      <h2>Seating Arrangement</h2>
      <table className="seating-arrangement">
        <thead>
          <tr>
            <th>SN</th>
            <th>USN</th>
            <th>SN</th>
            <th>USN</th>
            <th>SN</th>
            <th>USN</th>
            <th>SN</th>
            <th>USN</th>
          </tr>
        </thead>
        <tbody>
          {seatingData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SeatingTable;*/
import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import axios from 'axios';

const SeatingTable = () => {
  const [seatingData, setSeatingData] = useState([]);

  useEffect(() => {
    // Fetch seating data from the backend
    const fetchSeatingData = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/seating/get-seats');
        setSeatingData(res.data);
      } catch (error) {
        console.error('Error fetching seating data:', error);
      }
    };

    fetchSeatingData();
  }, []);

  return (
    <Container>
      <h4 className="mt-4">Seating Arrangement</h4>
      <Table bordered>
        <thead>
          <tr>
            <th>SN</th>
            <th>USN</th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {seatingData.map((row, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{row.usn}</td>
              {/* Render more data if needed */}
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default SeatingTable;
