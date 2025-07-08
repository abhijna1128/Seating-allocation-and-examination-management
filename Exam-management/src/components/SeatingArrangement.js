/*import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SeatingArrangementPage = () => {
  const [seatingData, setSeatingData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeatingData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/seating/seatingArrangement');
        const data = response.data;

        // Ensure data is structured as expected
        if (Array.isArray(data.seatingArrangement)) {
          setSeatingData(data.seatingArrangement);  // Set seating arrangement data if it's an array
        } else {
          console.error('Seating arrangement data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching seating data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeatingData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h3>Seating Arrangement</h3>
      {seatingData.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Row</th>
              <th>Seat 1 (Student 1)</th>
              <th>Seat 2 (Student 2)</th>
            </tr>
          </thead>
          <tbody>
            {seatingData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((bench, benchIndex) => (
                  <td key={benchIndex}>
                    {bench ? (
                      <>
                        <div>Student 1: {bench.student1.name}</div>
                        <div>Student 2: {bench.student2.name}</div>
                      </>
                    ) : (
                      <div>No students</div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No seating arrangement data available.</div>
      )}
    </div>
  );
};

export default SeatingArrangementPage;*/
import React from "react";
import "./SeatingArrangement.css";

const SeatingArrangement = () => {
  const seatingData = [
    { sn: 1, usn: "CSE001" },
    { sn: 6, usn: "AIML001" },
    { sn: 11, usn: "CSE006" },
    { sn: 16, usn: "AIML006" },
    { sn: 21, usn: "CSE011" },
    { sn: 26, usn: "AIML011" },
    { sn: 2, usn: "CSE002" },
    { sn: 7, usn: "AIML002" },
    { sn: 12, usn: "CSE007" },
    { sn: 17, usn: "AIML007" },
    { sn: 22, usn: "CSE012" },
    { sn: 27, usn: "AIML012" },
    { sn: 3, usn: "CSE003" },
    { sn: 8, usn: "AIML003" },
    { sn: 13, usn: "CSE008" },
    { sn: 18, usn: "AIML008" },
    { sn: 23, usn: "CSE013" },
    { sn: 28, usn: "AIML013" },
    { sn: 4, usn: "CSE004" },
    { sn: 9, usn: "AIML004" },
    { sn: 14, usn: "CSE009" },
    { sn: 19, usn: "AIML009" },
    { sn: 24, usn: "CSE014" },
    { sn: 29, usn: "AIML014" },
    { sn: 5, usn: "CSE005" },
    { sn: 10, usn: "AIML005" },
    { sn: 15, usn: "CSE010" },
    { sn: 20, usn: "AIML010" },
    { sn: 25, usn: "CSE015" },
    { sn: 30, usn: "AIML015" },
  ];

  return (
    <div className="container">
      <h1 className="header">
        Sahyadri College of Engineering & Management, Mangaluru
      </h1>
      <div className="info">
        <div>
          <label>Exam date:</label>
          <input type="text" defaultValue="27-12-2024" />
        </div>
        <div>
          <label>Exam Time:</label>
          <input type="text" defaultValue="8:30 AM" />
        </div>
        <div>
          <label>Room No:</label>
          <input type="text" defaultValue="101" />
        </div>
        <div>
          <label>Block:</label>
          <input type="text" defaultValue="First Floor" />
        </div>
      </div>

      <div className="course-info">
        <table>
          <thead>
            <tr>
              <th>Course name</th>
              <th>No. of candidates</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Data Structures (CSE)</td>
              <td>15</td>
            </tr>
            <tr>
              <td>Artificial Intelligence (AIML)</td>
              <td>15</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="seating-arrangement">
        <h2>SEATING ARRANGEMENT</h2>
        <table className="seat-table">
          <thead>
            <tr>
              <th>SN</th>
              <th>USN</th>
              <th>SN</th>
              <th>USN</th>
              <th>SN</th>
              <th>USN</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {seatingData.slice(rowIndex * 6, rowIndex * 6 + 6).map((seat) => (
                  <React.Fragment key={seat.sn}>
                    <td>{seat.sn}</td>
                    <td>{seat.usn}</td>
                  </React.Fragment>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="absentees-section">
        <label>USN of Absentees:</label>
        <input type="text" />
      </div>

      <div className="footer">
        <div>
          <label>No. of Answer Booklet Used:</label>
          <input type="text" />
        </div>
        <div>
          <label>Sl. No. of Blank Answer Books Returned:</label>
          <input type="text" />
        </div>
        <div>
          <label>Sl. No. of Defective/Replaced Answer Books:</label>
          <div>
            <label>Defective:</label>
            <input type="text" />
            <label>Replaced:</label>
            <input type="text" />
          </div>
        </div>
      </div>
      <div className="invigilator">
        <p>Name of the Invigilator:</p>
        <p>Department:</p>
        <p>Sign with Date:</p>
        <p>Contact Number:</p>
      </div>
    </div>
  );
};

export default SeatingArrangement;
