//with page havinh json format outpt
/*import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Import Axios for HTTP requests

const SeatingManagement = () => {
  const { examType } = useParams();  // Get exam type from the URL
  const [classroomNumber, setClassroomNumber] = useState('');
  const [branch1, setBranch1] = useState('');
  const [subject1, setSubject1] = useState('');
  const [startingUSN1, setStartingUSN1] = useState('');
  const [branch2, setBranch2] = useState('');
  const [subject2, setSubject2] = useState('');
  const [startingUSN2, setStartingUSN2] = useState('');
  const [rows, setRows] = useState('');
  const [columns, setColumns] = useState('');
  const [seatType, setSeatType] = useState('');
  const [response, setResponse] = useState(null); // To hold the response from the backend

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to be sent
    const requestData = {
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
    };

    try {
      // Send POST request to the backend
      const res = await axios.post('http://localhost:3000/api/seating/allocate-seats', requestData);

      // Store the response data in the state to display on the frontend
      setResponse(res.data);
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
  
  try {
    const response = await axios.post('http://localhost:3000/api/seating/allocate-seats', requestData);
    console.log(response.data.message); // Show success message
} catch (error) {
    console.error('Error storing seating data:', error);
}
};

  return (
    <Container>
      <Row className="mt-4">
        <Col>
          <h4>{examType === 'internal' ? 'Internal Exam' : 'Semester End Exam'} Seating Management</h4>
          <Form onSubmit={handleSubmit}>
            {/* Form fields as before }
            <Form.Group controlId="classroomNumber">
              <Form.Label>Classroom Number</Form.Label>
              <Form.Control 
                type="text" 
                value={classroomNumber} 
                onChange={(e) => setClassroomNumber(e.target.value)} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="branch1">
              <Form.Label>Branch 1</Form.Label>
              <Form.Control 
                type="text" 
                value={branch1} 
                onChange={(e) => setBranch1(e.target.value)} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="subject1">
              <Form.Label>Subject 1</Form.Label>
              <Form.Control 
                type="text" 
                value={subject1} 
                onChange={(e) => setSubject1(e.target.value)} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="startingUSN1">
              <Form.Label>Starting USN 1</Form.Label>
              <Form.Control 
                type="text" 
                value={startingUSN1} 
                onChange={(e) => setStartingUSN1(e.target.value)} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="branch2">
              <Form.Label>Branch 2</Form.Label>
              <Form.Control 
                type="text" 
                value={branch2} 
                onChange={(e) => setBranch2(e.target.value)} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="subject2">
              <Form.Label>Subject 2</Form.Label>
              <Form.Control 
                type="text" 
                value={subject2} 
                onChange={(e) => setSubject2(e.target.value)} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="startingUSN2">
              <Form.Label>Starting USN 2</Form.Label>
              <Form.Control 
                type="text" 
                value={startingUSN2} 
                onChange={(e) => setStartingUSN2(e.target.value)} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="rows">
              <Form.Label>Rows</Form.Label>
              <Form.Control 
                type="number" 
                value={rows} 
                onChange={(e) => setRows(e.target.value)} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="columns">
              <Form.Label>Columns</Form.Label>
              <Form.Control 
                type="number" 
                value={columns} 
                onChange={(e) => setColumns(e.target.value)} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="seatType">
              <Form.Label>Seat Type</Form.Label>
              <Form.Control 
                as="select" 
                value={seatType} 
                onChange={(e) => setSeatType(e.target.value)} 
                required
              >
                <option value="3-seater">3-Seater</option>
                <option value="5-seater">5-Seater</option>
              </Form.Control>
            </Form.Group>

            <Button type="submit" variant="success">
              Submit
            </Button>
          </Form>

          {/* Display response from backend }
          {response && (
            <div className="mt-4">
              <h5>Seating Arrangement Response</h5>
              <pre>{JSON.stringify(response, null, 2)}</pre>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default SeatingManagement;*/

//with next page for table
/*import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Import Axios for HTTP requests
import { useNavigate } from 'react-router-dom';


const SeatingManagement = () => { // Get exam type from the URL
  const navigate = useNavigate(); 
  const { examType } = useParams();  // Get exam type from the URL
  const [classroomNumber, setClassroomNumber] = useState('');
  const [branch1, setBranch1] = useState('');
  const [subject1, setSubject1] = useState('');
  const [startingUSN1, setStartingUSN1] = useState('');
  const [branch2, setBranch2] = useState('');
  const [subject2, setSubject2] = useState('');
  const [startingUSN2, setStartingUSN2] = useState('');
  const [rows, setRows] = useState('');
  const [columns, setColumns] = useState('');
  const [seatType, setSeatType] = useState('');
  const [response, setResponse] = useState(null); // To hold the response from the backend

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to be sent
    const requestData = {
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
    };

    try {
      // Send POST request to the backend
      const res = await axios.post('http://localhost:3000/api/seating/allocate-seats', requestData);

      // Store the response data in the state to display on the frontend
      setResponse(res.data);
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
  

  try {
    // Send POST request to store data in the database
    await axios.post('http://localhost:3000/api/seating/allocate-seats', requestData);

    // Redirect to the seating table page
    navigate('/seating-table');
  } catch (error) {
    console.error('Error sending data to backend:', error);
  }
};


  return (
    <Container>
      <Row className="mt-4">
        <Col>
          <h4>{examType === 'internal' ? 'Internal Exam' : 'Semester End Exam'} Seating Management</h4>
          <Form onSubmit={handleSubmit}>
            {/* Form fields as before }
            <Form.Group controlId="classroomNumber">
              <Form.Label>Classroom Number</Form.Label>
              <Form.Control 
                type="text" 
                value={classroomNumber} 
                onChange={(e) => setClassroomNumber(e.target.value)} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="branch1">
              <Form.Label>Branch 1</Form.Label>
              <Form.Control 
                type="text" 
                value={branch1} 
                onChange={(e) => setBranch1(e.target.value)} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="subject1">
              <Form.Label>Subject 1</Form.Label>
              <Form.Control 
                type="text" 
                value={subject1} 
                onChange={(e) => setSubject1(e.target.value)} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="startingUSN1">
              <Form.Label>Starting USN 1</Form.Label>
              <Form.Control 
                type="text" 
                value={startingUSN1} 
                onChange={(e) => setStartingUSN1(e.target.value)} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="branch2">
              <Form.Label>Branch 2</Form.Label>
              <Form.Control 
                type="text" 
                value={branch2} 
                onChange={(e) => setBranch2(e.target.value)} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="subject2">
              <Form.Label>Subject 2</Form.Label>
              <Form.Control 
                type="text" 
                value={subject2} 
                onChange={(e) => setSubject2(e.target.value)} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="startingUSN2">
              <Form.Label>Starting USN 2</Form.Label>
              <Form.Control 
                type="text" 
                value={startingUSN2} 
                onChange={(e) => setStartingUSN2(e.target.value)} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="rows">
              <Form.Label>Rows</Form.Label>
              <Form.Control 
                type="number" 
                value={rows} 
                onChange={(e) => setRows(e.target.value)} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="columns">
              <Form.Label>Columns</Form.Label>
              <Form.Control 
                type="number" 
                value={columns} 
                onChange={(e) => setColumns(e.target.value)} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="seatType">
              <Form.Label>Seat Type</Form.Label>
              <Form.Control 
                as="select" 
                value={seatType} 
                onChange={(e) => setSeatType(e.target.value)} 
                required
              >
                <option value="3-seater">3-Seater</option>
                <option value="5-seater">5-Seater</option>
              </Form.Control>
            </Form.Group>

            <Button type="submit" variant="success">
              Submit
            </Button>
          </Form>

          {/* Display response from backend*}
          {response && (
            <div className="mt-4">
              <h5>Seating Arrangement Response</h5>
              <pre>{JSON.stringify(response, null, 2)}</pre>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default SeatingManagement;*/

//with table format in tha same page
/*import React, { useState,useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Import Axios for HTTP requests

const SeatingManagement = () => {
  const { examType } = useParams();  // Get exam type from the URL
  const [classroomNumber, setClassroomNumber] = useState('');
  const [branch1, setBranch1] = useState('');
  const [subject1, setSubject1] = useState('');
  const [startingUSN1, setStartingUSN1] = useState('');
  const [branch2, setBranch2] = useState('');
  const [subject2, setSubject2] = useState('');
  const [startingUSN2, setStartingUSN2] = useState('');
  const [rows, setRows] = useState('');
  const [columns, setColumns] = useState('');
  const [seatType, setSeatType] = useState('');
  const [response, setResponse] = useState(null); // To hold the response from the backend

  useEffect(() => {
    // Handle logic specific to the examType
    console.log("Managing seating for ${examType} exam");
  }, [examType]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to be sent
    const requestData = {
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
    };

    try {
      // Send POST request to the backend
      const res = await axios.post('http://localhost:3000/api/seating/allocate-seats', requestData);

      // Store the response data in the state to display on the frontend
      setResponse(res.data);
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
  };

  return (
    <Container>
      <Row className="mt-4">
        <Col>
          <h4>{examType === 'internal' ? 'Internal Exam' : 'Semester End Exam'} Seating Management</h4>
          <Form onSubmit={handleSubmit}>
            {/* Form fields as before }
            <Form.Group controlId="classroomNumber">
              <Form.Label>Classroom Number</Form.Label>
              <Form.Control 
                type="text" 
                value={classroomNumber} 
                onChange={(e) => setClassroomNumber(e.target.value)} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="branch1">
              <Form.Label>Branch 1</Form.Label>
              <Form.Control 
                type="text" 
                value={branch1} 
                onChange={(e) => setBranch1(e.target.value)} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="subject1">
              <Form.Label>Subject 1</Form.Label>
              <Form.Control 
                type="text" 
                value={subject1} 
                onChange={(e) => setSubject1(e.target.value)} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="startingUSN1">
              <Form.Label>Starting USN 1</Form.Label>
              <Form.Control 
                type="text" 
                value={startingUSN1} 
                onChange={(e) => setStartingUSN1(e.target.value)} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="branch2">
              <Form.Label>Branch 2</Form.Label>
              <Form.Control 
                type="text" 
                value={branch2} 
                onChange={(e) => setBranch2(e.target.value)} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="subject2">
              <Form.Label>Subject 2</Form.Label>
              <Form.Control 
                type="text" 
                value={subject2} 
                onChange={(e) => setSubject2(e.target.value)} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="startingUSN2">
              <Form.Label>Starting USN 2</Form.Label>
              <Form.Control 
                type="text" 
                value={startingUSN2} 
                onChange={(e) => setStartingUSN2(e.target.value)} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="rows">
              <Form.Label>Rows</Form.Label>
              <Form.Control 
                type="number" 
                value={rows} 
                onChange={(e) => setRows(e.target.value)} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="columns">
              <Form.Label>Columns</Form.Label>
              <Form.Control 
                type="number" 
                value={columns} 
                onChange={(e) => setColumns(e.target.value)} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="seatType">
              <Form.Label>Seat Type</Form.Label>
              <Form.Control 
                as="select" 
                value={seatType} 
                onChange={(e) => setSeatType(e.target.value)} 
                required
              >
                <option value="3-seater">3-Seater</option>
                <option value="5-seater">5-Seater</option>
              </Form.Control>
            </Form.Group>

            <Button type="submit" variant="success">
              Submit
            </Button>
          </Form>

          {/* Display response from backend }
          {response && (
            <div className="mt-4">
              <h5>Seating Arrangement Response</h5>
              <pre>{JSON.stringify(response, null, 2)}</pre>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default SeatingManagement;*/
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios'; // Import Axios for HTTP requests

const SeatingManagement = () => {
  const { examType } = useParams();  // Get exam type from the URL
  const navigate = useNavigate(); // Initialize useNavigate hook for navigation
  const [classroomNumber, setClassroomNumber] = useState('');
  const [branch1, setBranch1] = useState('');
  const [subject1, setSubject1] = useState('');
  const [startingUSN1, setStartingUSN1] = useState('');
  const [branch2, setBranch2] = useState('');
  const [subject2, setSubject2] = useState('');
  const [startingUSN2, setStartingUSN2] = useState('');
  const [rows, setRows] = useState('');
  const [columns, setColumns] = useState('');
  const [seatType, setSeatType] = useState('');
  const [response, setResponse] = useState(null); // To hold the response from the backend

  useEffect(() => {
    // Handle logic specific to the examType
    console.log(`Managing seating for ${examType} exam`);
  }, [examType]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to be sent
    const requestData = {
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
    };

    try {
      // Send POST request to the backend
      const res = await axios.post('http://localhost:3000/api/seating/allocate-seats', requestData);

      // Store the response data in the state to display on the frontend
      setResponse(res.data);
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
  };

  const handlePrintGrid = () => {
    // Navigate to the SeatingArrangement page
    navigate('/seating-arrangement');
  };

  return (
    <Container>
      <Row className="mt-4">
        <Col>
          <h4>{examType === 'internal' ? 'Internal Exam' : 'Semester End Exam'} Seating Management</h4>
          <Form onSubmit={handleSubmit}>
            {/* Form fields as before */}
            <Form.Group controlId="classroomNumber">
              <Form.Label>Classroom Number</Form.Label>
              <Form.Control 
                type="text" 
                value={classroomNumber} 
                onChange={(e) => setClassroomNumber(e.target.value)} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="branch1">
              <Form.Label>Branch 1</Form.Label>
              <Form.Control 
                type="text" 
                value={branch1} 
                onChange={(e) => setBranch1(e.target.value)} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="subject1">
              <Form.Label>Subject 1</Form.Label>
              <Form.Control 
                type="text" 
                value={subject1} 
                onChange={(e) => setSubject1(e.target.value)} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="startingUSN1">
              <Form.Label>Starting USN 1</Form.Label>
              <Form.Control 
                type="text" 
                value={startingUSN1} 
                onChange={(e) => setStartingUSN1(e.target.value)} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="branch2">
              <Form.Label>Branch 2</Form.Label>
              <Form.Control 
                type="text" 
                value={branch2} 
                onChange={(e) => setBranch2(e.target.value)} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="subject2">
              <Form.Label>Subject 2</Form.Label>
              <Form.Control 
                type="text" 
                value={subject2} 
                onChange={(e) => setSubject2(e.target.value)} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="startingUSN2">
              <Form.Label>Starting USN 2</Form.Label>
              <Form.Control 
                type="text" 
                value={startingUSN2} 
                onChange={(e) => setStartingUSN2(e.target.value)} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="rows">
              <Form.Label>Rows</Form.Label>
              <Form.Control 
                type="number" 
                value={rows} 
                onChange={(e) => setRows(e.target.value)} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="columns">
              <Form.Label>Columns</Form.Label>
              <Form.Control 
                type="number" 
                value={columns} 
                onChange={(e) => setColumns(e.target.value)} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="seatType">
              <Form.Label>Seat Type</Form.Label>
              <Form.Control 
                as="select" 
                value={seatType} 
                onChange={(e) => setSeatType(e.target.value)} 
                required
              >
                <option value="3-seater">3-Seater</option>
                <option value="5-seater">5-Seater</option>
              </Form.Control>
            </Form.Group>

            <Button type="submit" variant="success">
              Submit
            </Button>
          </Form>

          {/* Display response from backend */}
          {response && (
            <div className="mt-4">
              <h5>Seating Arrangement Response</h5>
              <pre>{JSON.stringify(response, null, 2)}</pre>
              {/* Print Grid Button */}
              <Button onClick={handlePrintGrid} variant="primary" className="mt-3">
                Print Grid
              </Button>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default SeatingManagement;
