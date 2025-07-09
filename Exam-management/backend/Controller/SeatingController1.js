/*const Seating = require('../models/Seating');

exports.createSeating = async (req, res) => {
  try {
    console.log('Incoming request data:', req.body); // Log the incoming request data
    const { roomNumber, rows, columns, seatData } = req.body;

    // Validate the request data
    if (!roomNumber || !rows || !columns || !Array.isArray(seatData)) {
      return res.status(400).json({ error: 'Invalid request payload' });
    }

    const newSeating = await Seating.create({ roomNumber, rows, columns, seatData });
    res.status(201).json(newSeating);
  } catch (error) {
    console.error('Error creating seating:', error); // Log the error
    res.status(500).json({ error: error.message });
  }
};

exports.getSeating = async (req, res) => {
  try {
    const seating = await Seating.findAll();
    res.status(200).json(seating);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};*/