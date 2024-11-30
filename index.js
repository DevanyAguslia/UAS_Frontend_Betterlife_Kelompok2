import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors';

// Import routes
import pomodoroRouter from './routes/api/pomodoroRoute.js';

// Menggunakan dotenv untuk konfigurasi environment variables
dotenv.config();

// Inisialisasi express
const app = express();

// Mendapatkan PORT dan MONGO_URL dari environment variables
const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

// Koneksi ke MongoDB
mongoose.connect(MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database is connected successfully.");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => console.log("Error connecting to database:", error));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/api/pomodoro', pomodoroRouter);
