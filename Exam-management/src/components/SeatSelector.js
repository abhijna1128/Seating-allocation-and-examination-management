
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SeatSelector.css';

const SeatSelector = () => {
  const [roomNumber, setRoomNumber] = useState('');
  const [rows, setRows] = useState(1);
  const [columns, setColumns] = useState(1);
  const navigate = useNavigate();
  const [seats, setSeats] = useState([]);
  const [deletedSeats, setDeletedSeats] = useState([]);

  const generateGrid = () => {
    const newSeats = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        newSeats.push({
          id: `${i}-${j}`,
          row: i,
          col: j,
          type: 3, // Default type is 3-seater
        });
      }
    }
    setSeats(newSeats);
  };

  const saveGrid = async () => {
    const data = {
      roomNumber,
      rows,
      columns,
      seatData: seats,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/seating', data);
      console.log(response.data);
      alert('Seating grid saved successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to save seating grid');
    }
  };

  const submitGrid = async () => {
    const data = {
      roomNumber,
      rows,
      columns,
      seatData: seats,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/seating', data);
      console.log(response.data);
      alert('Seating grid submitted successfully!');
      navigate('/seating-assignment');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit seating grid');
    }
  };

  const updateSeatType = (seatId, newType) => {
    setSeats((prevSeats) =>
      prevSeats.map((seat) =>
        seat.id === seatId ? { ...seat, type: Number(newType) } : seat
      )
    );
  };

  const deleteSeat = (seatId) => {
    setSeats((prevSeats) => {
      const seatToDelete = prevSeats.find((seat) => seat.id === seatId);
      setDeletedSeats((prevDeleted) => [...prevDeleted, seatToDelete]);
      return prevSeats.filter((seat) => seat.id !== seatId);
    });
  };
  
  const recoverSeat = (seatId) => {
    setDeletedSeats((prevDeleted) => {
      const seatToRecover = prevDeleted.find((seat) => seat.id === seatId);
      setSeats((prevSeats) => [...prevSeats, seatToRecover]);
      return prevDeleted.filter((seat) => seat.id !== seatId);
    });
  };
  

  const goToNextPage = () => {
    navigate('/seating-assignment');
  };

  return (
    <div className="container">
      <div className="header"></div>
      <div className="title">Sahyadri College of Engineering & Management, Mangaluru</div>

      <div className="label room-label">Room Number:</div>
      <input
        type="text"
        className="input room-input"
        value={roomNumber}
        onChange={(e) => setRoomNumber(e.target.value)}
      />

      <div className="label rows-label">No. of Rows:</div>
      <input
        type="number"
        className="input rows-input"
        min="1"
        max="10"
        value={rows}
        onChange={(e) => setRows(Number(e.target.value))}
      />

      <div className="label columns-label">No. of Columns:</div>
      <input
        type="number"
        className="input columns-input"
        min="1"
        max="10"
        value={columns}
        onChange={(e) => setColumns(Number(e.target.value))}
      />

      <button className="button generate-button" onClick={generateGrid}>Generate Grid</button>
      <button className="button save-button" onClick={saveGrid}>Save Grid</button>
      <button className="button submit-button" onClick={submitGrid}>Submit Grid</button>
      <button className="button next-page-button" onClick={goToNextPage}>Next Page</button>

      {/* Seat Display */}
      <div
        className="generated-table"
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {seats.map((seat) => (
          <div key={seat.id} className="box">
            <span>Row {seat.row}, Col {seat.col}</span>
            <select
              className="dropdown"
              value={seat.type}
              onChange={(e) => updateSeatType(seat.id, e.target.value)}
            >
              <option value="3">3</option>
              <option value="5">5</option>
            </select>
            <button
              className="button delete-button"
              onClick={() => deleteSeat(seat.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <div className="recovery-section">
  <h3>Deleted Seats</h3>
  {deletedSeats.map((seat) => (
    <div key={seat.id} className="deleted-seat">
      <span>Row {seat.row}, Col {seat.col}</span>
      <button
        className="button recovery-button"
        onClick={() => recoverSeat(seat.id)}
      >
        Recover
      </button>
    </div>
  ))}
</div>

        
    </div>
  );
};

export default SeatSelector;