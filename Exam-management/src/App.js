import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthNew from './components/authnew';
import Details from './components/Details';
import AdminDashboard from './components/AdminDashboard';
import ExamScheduling from './components/ExamScheduling';
import StudentExamRegistration from './components/StudentExamRegistration';
import CalendarView from './components/CalendarView';
import RoomManagement from './components/RoomManagement';
import SeatingAllocation from './components/SeatingAllocation';
import HomePage from './components/HomePage'; // Home page after login
import SeatSelector from './components/SeatSelector'; // Seat selection page
import SeatingTable from './components/SeatingTable'; // Seating arrangement table

function App() {
  return (
    <Router> 
      <Routes>
        <Route path="/authnew" element={<AuthNew />} />
        <Route path="/details" element={<Details />} />
        <Route path="/admin" element={<AdminDashboard />} />
         {/* Routes for Exam Management */}
         <Route path="/exam-scheduling" element={<ExamScheduling />} />
        <Route path="/stduentexamination" element={<StudentExamRegistration />} />
        <Route path="/calendar-view" element={<CalendarView />} />
        <Route path="/room" element={<RoomManagement />} />
        <Route path="/seat" element={<SeatingAllocation />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/select-seats" element={<SeatSelector />} />
        <Route path="/ss" element={<SeatingTable />} />
      </Routes>
    </Router>
  );
}

export default App;
 //connected from details to seatselector page