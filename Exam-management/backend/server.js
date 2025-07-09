const express = require("express");
//const bodyParser = require("body-parser");
const cors = require('cors')
//const internalExamRoute = require('./routes/internalExam');
const seatingManagementRoutes = require('./routes/seatingManagement');
const seatAllocationController = require("./Controller/seatAllocationController");
const authRoutes = require('./routes/auth');
//const seatingRoutes = require('./routes/seatingRoutes');
const seatingController = require("./Controller/seatingController");
const app = express();
const PORT = 3000;
const dotenv = require('dotenv');
dotenv.config();

app.use(cors());

// Middleware
app.use(express.json());
//app.use(bodyParser.json());
 
// Routes
app.use('/api', authRoutes);
//app.use('/internal-exam', internalExamRoute);
app.use('/api/seating', seatingManagementRoutes);
app.post("/allocateSeats", seatAllocationController.allocateSeats);
//app.use('/api/seating', seatingRoutes);
//app.post('/allocate-seats', seatingController.allocateSeats);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
