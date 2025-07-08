/*import React from 'react';
import { Container, Row, Col, Nav, Card } from 'react-bootstrap';
import './dashboard.css';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <Container fluid>
      <Row>
        <Col md={3} className="bg-light vh-100">
          <h3 className="text-center mt-4">Admin Dashboard</h3>
          <Nav className="flex-column mt-4">
            <Nav.Item>
              <Link to="/manage-users" className="nav-link">Manage Users</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/calendar-view" className="nav-link">Calendar View</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/details" className="nav-link">Exam Schedule</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/exam-management" className="nav-link">Exam Management</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to=".33/components/SeatSelector" className="nav-link">Seating Management</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/reports" className="nav-link">Reports</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/settings" className="nav-link">Settings</Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col md={9}>
          <h4 className="mt-4">Welcome, Admin!</h4>
          <Card className="mt-4">
            <Card.Body>
              <h5>Manage Users, View Exams, Schedule, and more...</h5>
              <p>Use the navigation menu on the left to explore features.</p>
            </Card.Body>
          </Card>
          <Row className="mt-4">
            <Col md={6}>
              <Card>
                <Card.Body>
                  <h6>Quick Links</h6>
                  <ul>
                    <li>
                      <Link to="/calendar-view">Go to Calendar View</Link>
                    </li>
                    <li>
                      <Link to="/exam-schedule">View Exam Schedule</Link>
                    </li>
                    <li>
                      <Link to="/seating-management">Manage Seating</Link>
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card>
                <Card.Body>
                  <h6>Recent Activity</h6>
                  <p>Last login: Today, 10:30 AM</p>
                  <p>Upcoming Exams: 5</p>
                  <p>Pending Requests: 2</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;*/
import React, { useState } from 'react';
import { Container, Row, Col, Nav, Card, Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './dashboard.css';

const AdminDashboard = () => {
  const location = useLocation(); // To determine the active link
  const navigate = useNavigate(); // For programmatic navigation
  const [showExamTypeSelector, setShowExamTypeSelector] = useState(false); // State to toggle Exam Type selection

  const handleExamTypeChange = (type) => {
    // Navigate to the appropriate page based on selected exam type
    if (type === 'internal') {
      navigate('/seating-management/internal'); // Navigate to Seating Management for internal exam
    } else if (type === 'semester') {
      navigate('/details'); // Navigate to Details page for external exam
    }
    setShowExamTypeSelector(false); // Hide the selector after selection
  };

  return (
    <Container fluid className="dashboard-container">
      <Row>
        {/* Sidebar */}
        <Col md={3} className="sidebar vh-100">
          <h3 className="text-center mt-4">Admin Dashboard</h3>
          <Nav className="flex-column mt-4">
            <Nav.Item>
              <Link
                to="/manage-users"
                className={`nav-link ${location.pathname === '/manage-users' ? 'active' : ''}`}
              >
                Manage Users
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link
                to="/calendar-view"
                className={`nav-link ${location.pathname === '/calendar-view' ? 'active' : ''}`}
              >
                Calendar View
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link
                to="/details"
                className={`nav-link ${location.pathname === '/details' ? 'active' : ''}`}
              >
                Exam Schedule
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link
                to="#"
                onClick={() => setShowExamTypeSelector(true)} // Show selector when clicked
                className={`nav-link ${showExamTypeSelector ? 'active' : ''}`}
              >
                Select Exam Type
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link
                to="/settings"
                className={`nav-link ${location.pathname === '/settings' ? 'active' : ''}`}
              >
                Settings
              </Link>
            </Nav.Item>
          </Nav>
        </Col>

        {/* Main Content */}
        <Col md={9} className="main-content">
          <h4 className="mt-4">Welcome, Admin!</h4>

          {showExamTypeSelector ? (
            // Render Select Exam Type Options
            <Row className="mt-4">
              <Col>
                <h5>Select Exam Type</h5>
                <Button
                  variant="primary"
                  onClick={() => handleExamTypeChange('internal')}
                  className="me-3"
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
          ) : (
            // Default Dashboard Content
            <>
              <Card className="mt-4 welcome-card">
                <Card.Body>
                  <h5>Manage Users, View Exams, Schedule, and more...</h5>
                  <p>Use the navigation menu on the left to explore features.</p>
                  <Button variant="primary" className="me-3">
                    Get Started
                  </Button>
                  <Button variant="outline-secondary">Learn More</Button>
                </Card.Body>
              </Card>

              {/* Quick Access Section */}
              <Row className="mt-5">
                {/* Manage Users */}
                <Col md={4}>
                  <Card className="feature-card">
                    <Card.Body>
                      <h6 className="card-title">Manage Users</h6>
                      <p className="card-text">
                        Add, remove, and update user accounts with ease.
                      </p>
                      <Button
                        variant="primary"
                        size="sm"
                        as={Link}
                        to="/manage-users"
                      >
                        Manage Now
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>

                {/* Exam Management */}
                <Col md={4}>
                  <Card className="feature-card">
                    <Card.Body>
                      <h6 className="card-title">Exam Management</h6>
                      <p className="card-text">
                        Schedule, modify, and oversee exams efficiently.
                      </p>
                      <Button
                        variant="primary"
                        size="sm"
                        as={Link}
                        to="/exam-management"
                      >
                        Manage Exams
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>

                {/* Select Exam Type */}
                <Col md={4}>
                  <Card className="feature-card">
                    <Card.Body>
                      <h6 className="card-title">Select Exam Type</h6>
                      <p className="card-text">
                        Choose the type of exam for better management.
                      </p>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => setShowExamTypeSelector(true)} // Show selector
                      >
                        Select Now
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
