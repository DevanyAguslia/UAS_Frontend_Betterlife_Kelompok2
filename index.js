import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Inisialisasi express
const app = express();

// Menggunakan dotenv untuk konfigurasi environment variables
dotenv.config();

// Mendapatkan PORT dan MONGO_URL dari environment variables
const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

// Skema pengguna
const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
});

// Membuat model berdasarkan skema
const UserModel = mongoose.model("User", userSchema);

// Koneksi ke MongoDB
mongoose
    .connect(MONGOURL)
    .then(() => {
        console.log("Database is connected successfully.");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => console.log("Error connecting to database:", error));

// Endpoint untuk mengambil data pengguna
app.get("/getUsers", async (req, res) => {
    try {
        const userData = await UserModel.find();  // Query untuk mengambil data pengguna
        res.json(userData);  // Mengirimkan data pengguna dalam format JSON
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Error fetching users" });  // Mengirimkan error jika gagal
    }
});
