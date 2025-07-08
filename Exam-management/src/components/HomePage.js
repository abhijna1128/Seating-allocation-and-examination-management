import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'; // Import the CSS file

const HomePage = () => {
  const navigate = useNavigate();

  const handleProceed = () => {
    navigate('/authnew'); // Redirect to the AuthNew page
  };

  return (
    <div className="homepage">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="overlay">
          <div className="hero-content">
            <h1 className="hero-title">College Exam Management System</h1>
            <p className="hero-text">
              Manage exams, seating arrangements, and results with ease using our efficient and user-friendly system.
            </p>
            <Button className="hero-button" onClick={handleProceed}>
              Proceed to Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
