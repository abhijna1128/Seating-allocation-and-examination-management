import React, { useState } from 'react';
import axios from 'axios';
import './Seatselector.css';

const SeatSelector = () => {
  const [rows, setRows] = useState(1);
  const [columns, setColumns] = useState(1);
  const [seats, setSeats] = useState([]);
  const [deletedSeats, setDeletedSeats] = useState([]);

  // Function to generate the grid
  const generateGrid = () => {
    const newSeats = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        newSeats.push({
          id: `${i}-${j}`,
          row: i,
          col: j,
          type: 1, // Default type is 1-seater
        });
      }
    }
    setSeats(newSeats);
    setDeletedSeats([]); // Clear deleted seats on new grid generation
  };

  // Function to delete a seat
  const deleteSeat = (seatId) => {
    const seatToDelete = seats.find((seat) => seat.id === seatId);
    setSeats(seats.filter((seat) => seat.id !== seatId));
    setDeletedSeats([...deletedSeats, seatToDelete]);
  };

  // Function to recover a deleted seat
  const recoverSeat = (seatId) => {
    const seatToRecover = deletedSeats.find((seat) => seat.id === seatId);
    setDeletedSeats(deletedSeats.filter((seat) => seat.id !== seatId));
    setSeats([...seats, seatToRecover]);
  };

  // Function to update the seat type
  const updateSeatType = (seatId, type) => {
    setSeats(
      seats.map((seat) =>
        seat.id === seatId ? { ...seat, type: parseInt(type) } : seat
      )
    );
  };

  // Function to save the grid
  const saveGrid = async () => {
    const data = {
      rows,
      columns,
      seat_data: seats
    };

    try {
      const response = await axios.post('http://localhost:5000/api/seating-grid', data);
      console.log(response.data);
      alert('Seating grid saved successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to save seating grid');
    }
  };

  return (
    <div className="container">
      <div className="header"></div>
      <div className="title">Sahyadri College of Engineering & Management, Mangaluru</div>

      {/* Inputs for Rows and Columns */}
      <div className="label" style={{ left: '293px', top: '174px' }}>No. of Rows:</div>
      <input
        type="number"
        className="input"
        style={{ left: '445px', top: '174px' }}
        min="1"
        max="10"
        value={rows}
        onChange={(e) => setRows(Number(e.target.value))}
      />
      <div className="label" style={{ left: '875px', top: '174px' }}>No. of Columns:</div>
      <input
        type="number"
        className="input"
        style={{ left: '1070px', top: '174px' }}
        min="1"
        max="10"
        value={columns}
        onChange={(e) => setColumns(Number(e.target.value))}
      />

      {/* Submit button to generate the grid */}
      <button
        className="submit-button"
        style={{ left: '670px', top: '220px' }}
        onClick={generateGrid}
      >
        Generate Grid
      </button>

      {/* Save button to save the grid */}
      <button
        className="save-button"
        style={{ left: '770px', top: '220px' }}
        onClick={saveGrid}
      >
        Save Grid
      </button>

      {/* Grid Display */}
      <div className="generated-table" style={{ position: 'absolute', left: '290px', top: '260px' }}>
        {seats.map((seat) => (
          <div
            key={seat.id}
            className="box"
            style={{ left: `${seat.col * 276}px`, top: `${seat.row * 60}px` }}
          >
            <select
              className="dropdown"
              style={{ position: 'absolute', left: '10px', top: '10px', width: '90px' }}
              value={seat.type}
              onChange={(e) => updateSeatType(seat.id, e.target.value)}
            >
              {[...Array(10)].map((_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
            <button
              className="input"
              style={{ position: 'absolute', left: '150px', top: '10px' }}
              onClick={() => deleteSeat(seat.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Recover Deleted Seats */}
      <div className="deleted-area" id="deleted-area">
        {deletedSeats.map((seat) => (
          <button
            key={seat.id}
            className="input recover-button"
            style={{ position: 'absolute', left: `${seat.col * 276 + 390}px`, top: `${seat.row * 60 + 275}px`, backgroundColor: 'red' }}
            onClick={() => recoverSeat(seat.id)}
          >
            Recover
          </button>
        ))}
      </div>
    </div>
  );
};

export default SeatSelector;