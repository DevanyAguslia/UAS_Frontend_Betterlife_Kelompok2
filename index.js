import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Import routes
import pomodoroRouter from './routes/api/pomodoroRoute.js';
import taskRouter from './routes/api/taskRoute.js';
import authRouter from './routes/api/authRoute.js';
import userRouter from './routes/api/userRoute.js';
import booksRoute from './routes/api/booksRoute.js';
import diaryRouter from './routes/api/diaryRoute.js';
import moodRoute from './routes/api/moodRoute.js';

// Get the directory name for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables using dotenv
dotenv.config();

// Initialize the Express application
const app = express();

// Retrieve the port and MongoDB URL from environment variables
const PORT = process.env.PORT || 8000;
const MONGOURL = process.env.MONGO_URL || 'mongodb://localhost:27017/betterlife_db';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register routes for different API paths
app.use('/api/books', booksRoute);
app.use('/api/diary', diaryRouter);
app.use('/api/pomodoro', pomodoroRouter);
app.use('/api/task', taskRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/mood', moodRoute);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the index.html file when accessing the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Catch all route to support HTML5 History mode for single page applications
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Connection to MongoDB
mongoose.connect(MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database is connected successfully.");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log(`Access the application at http://localhost:${PORT}`);
    });
}).catch((error) => console.log("Error connecting to database:", error));

// Middleware for handling errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});