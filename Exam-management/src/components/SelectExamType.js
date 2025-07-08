import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const SelectExamType = () => {
  const navigate = useNavigate();

  const handleExamTypeChange = (type) => {
    if (type === 'semester') {
      // Navigate to the Details page
      navigate('/details');
    }
  };

  return (
    <Container>
      <Row className="mt-4">
        <Col>
          <h4>Select Exam Type</h4>
          <Button
            variant="primary"
            onClick={() => handleExamTypeChange('internal')}
            className="mr-3"
          >
            Internal Exam
          </Button>
          <Button
            variant="primary"
            onClick={() => handleExamTypeChange('semester')}
          >
            Semester End Exam
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default SelectExamType;