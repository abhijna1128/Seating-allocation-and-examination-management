import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Details = () => {
  const [classroomNumber, setClassroomNumber] = useState('');
  const [blockFloor, setBlockFloor] = useState('');
  const [branch1, setBranch1] = useState('');
  const [subject1, setSubject1] = useState('');
  const [branch2, setBranch2] = useState('');
  const [subject2, setSubject2] = useState('');
  //const [benchType, setBenchType] = useState('3-seater'); // Default bench type
  const [startingUsnBranch1, setStartingUsnBranch1] = useState('');
  const [startingUsnBranch2, setStartingUsnBranch2] = useState('');
  const [examDate, setExamDate] = useState('');
  const [examTime, setExamTime] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission

    // Pass seat allocation details to the SeatSelector component (via route or context)
    const allocationData = {
      classroomNumber,
      blockFloor,
      //benches: benchType,
      branch1: { name: branch1, subject: subject1, startingUsn: startingUsnBranch1 },
      branch2: { name: branch2, subject: subject2, startingUsn: startingUsnBranch2 },
      examDate,
      examTime,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/details', allocationData);
      console.log('Response data:', response.data); // Log the response data
      navigate('/select-seats', { state: { allocationData, results: response.data } });
    } catch (error) {
      console.error('There was an error saving the details!', error);
    }
  };
  return (
    <Container>
      <h2 className="mb-4">Seat Allotment</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formClassroomNumber" className="mb-3">
          <Form.Label>Classroom Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter classroom number"
            value={classroomNumber}
            onChange={(e) => setClassroomNumber(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBlockFloor" className="mb-3">
          <Form.Label>Block/Floor</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter block or floor"
            value={blockFloor}
            onChange={(e) => setBlockFloor(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBranch1" className="mb-3">
          <Form.Label>Branch 1</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter branch 1"
            value={branch1}
            onChange={(e) => setBranch1(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formSubject1" className="mb-3">
          <Form.Label>Subject 1</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter subject 1"
            value={subject1}
            onChange={(e) => setSubject1(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formStartingUsnBranch1" className="mb-3">
          <Form.Label>Starting USN for Branch 1</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter starting USN for Branch 1"
            value={startingUsnBranch1}
            onChange={(e) => setStartingUsnBranch1(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBranch2" className="mb-3">
          <Form.Label>Branch 2</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter branch 2"
            value={branch2}
            onChange={(e) => setBranch2(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formSubject2" className="mb-3">
          <Form.Label>Subject 2</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter subject 2"
            value={subject2}
            onChange={(e) => setSubject2(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formStartingUsnBranch2" className="mb-3">
          <Form.Label>Starting USN for Branch 2</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter starting USN for Branch 2"
            value={startingUsnBranch2}
            onChange={(e) => setStartingUsnBranch2(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formExamDate" className="mb-3">
          <Form.Label>Exam Date</Form.Label>
          <Form.Control
            type="date"
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formExamTime" className="mb-3">
          <Form.Label>Exam Time</Form.Label>
          <Form.Control
            type="time"
            value={examTime}
            onChange={(e) => setExamTime(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Save Details
        </Button>
      </Form>
    </Container>
  );
};

export default Details;