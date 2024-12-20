import React from 'react';
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

export default AdminDashboard;
