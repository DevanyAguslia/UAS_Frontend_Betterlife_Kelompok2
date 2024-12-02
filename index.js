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
import moodRoute from './routes/api/moodRoute.js';

// Mendapatkan dirname untuk modul ES
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

// Menghubungkan rute buku
app.use('/api/books', booksRoute);

// Melayani file statis dari direktori public
app.use(express.static(path.join(__dirname, 'public')));

// Routes untuk API
app.use('/api/pomodoro', pomodoroRouter);
app.use('/api/task', taskRouter);

// Rute untuk melayani file index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Menangani semua rute lainnya untuk mendukung mode HTML5 History
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

// Middleware untuk menangani error
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});