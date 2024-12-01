import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Import routes
import pomodoroRouter from './routes/api/pomodoroRoute.js';
import taskRouter from './routes/api/taskRoute.js';

// Get dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Menggunakan dotenv untuk konfigurasi environment variables
dotenv.config();

// Inisialisasi express
const app = express();

// Mendapatkan PORT dan MONGO_URL dari environment variables
const PORT = process.env.PORT || 8000;
const MONGOURL = process.env.MONGO_URL || 'mongodb://localhost:27017/betterlife_db';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes for API
app.use('/api/pomodoro', pomodoroRouter);
app.use('/api/task', taskRouter);

// Route for serving index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle all other routes to support HTML5 History Mode
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Koneksi ke MongoDB
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

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});