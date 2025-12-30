const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const studentRoutes = require('./modules/student/studentRoutes');
const lessionReportRoutes = require('./modules/lessionReport/lessionReportRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/students', studentRoutes);
app.use('/lession-report', lessionReportRoutes); // Keeping path consistent with NestJS module name/prefix if applicable. 
// Nest used 'lession-report' module. Usually generic controller route. 
// Standard in Nest is usually controller-bound. If controller had @Controller('lession-report'), then yes.
// I'll assume standard /lession-report.

app.get('/', (req, res) => {
    res.send('Sola System Backend (Express + Drizzle)');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
