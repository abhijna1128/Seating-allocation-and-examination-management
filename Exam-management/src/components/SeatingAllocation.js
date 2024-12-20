import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';

const SeatingAllocation = () => {
  const [rooms, setRooms] = useState([
    { roomNumber: '101', rows: 5, columns: 5, benchType: '3-seater' },
    { roomNumber: '102', rows: 4, columns: 4, benchType: '5-seater' },
  ]);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [students, setStudents] = useState([]);
  const [studentName, setStudentName] = useState('');

  const handleAddStudent = () => {
    setStudents([...students, { name: studentName }]);
    setStudentName('');
  };

  const handleRoomChange = (e) => {
    setSelectedRoom(e.target.value);
  };

  const generateSeating = () => {
    const room = rooms.find((room) => room.roomNumber === selectedRoom);
    if (!room) return;

    let seatingArrangements = [];
    let studentIndex = 0;

    for (let row = 0; row < room.rows; row++) {
      for (let col = 0; col < room.columns; col++) {
        if (students[studentIndex]) {
          seatingArrangements.push({
            roomNumber: room.roomNumber,
            row,
            col,
            student: students[studentIndex].name,
          });
          studentIndex++;
        }
      }
    }

    console.log('Generated Seating:', seatingArrangements);
    alert('Seating generated!');
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={8}>
          <h3 className="text-center">Seating Allocation</h3>

          <Form>
            <Form.Group controlId="formRoomSelection">
              <Form.Label>Select Room</Form.Label>
              <Form.Control as="select" value={selectedRoom} onChange={handleRoomChange}>
                <option value="">Select Room</option>
                {rooms.map((room, index) => (
                  <option key={index} value={room.roomNumber}>
                    {room.roomNumber} ({room.rows}x{room.columns})
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formStudentName">
              <Form.Label>Student Name</Form.Label>
              <Form.Control
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Enter student name"
              />
            </Form.Group>

            <Button variant="primary" onClick={handleAddStudent} className="mt-3">
              Add Student
            </Button>
          </Form>

          <Button variant="success" onClick={generateSeating} className="mt-3">
            Generate Seating
          </Button>

          <Table striped bordered hover className="mt-5">
            <thead>
              <tr>
                <th>Room Number</th>
                <th>Row</th>
                <th>Column</th>
                <th>Student</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index}>
                  <td>{selectedRoom}</td>
                  <td>{index % 5}</td>
                  <td>{Math.floor(index / 5)}</td>
                  <td>{student.name}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default SeatingAllocation;
