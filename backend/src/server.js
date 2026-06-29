const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./config/db');
const authRoutes = require('./modules/auth/auth.routes');
const {errorHandler} =
    require("./middleware/error.middleware");
const helmet = require("helmet");
const cors = require("cors");
const limiter = require('./config/rateLimiter');
const resumeRoutes = require('./resume/resume.routes');
const interviewRoutes = require('./Interview/interview.routes');
const interviewSessionRoutes = require('./interviewSession/interviewSession.routes');




connectDB();

const app = express();
app.use(express.json());

app.use(helmet());

app.use(cors());

app.use(limiter);

app.use('/api/auth', authRoutes);

app.use('/api/resume', resumeRoutes);

app.use('/api/interview', interviewRoutes);

app.use('/api/interview-session', interviewSessionRoutes);

// app.use('*', (req, res) => {
//     res.status(404).json({
//         success: false,
//         message: 'Route not found',
//     });
// });

app.use(errorHandler);

app.get('/', (req, res) =>{
    res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>{
    console.log(`Server running in ${PORT}`);
});