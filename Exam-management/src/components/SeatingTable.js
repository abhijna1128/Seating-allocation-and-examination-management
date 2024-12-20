import React from 'react';
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
        {/* Render seating data here */}
      </tbody>
    </Table>
  </Container>
);

export default SeatingTable;
