import mongoose from 'mongoose';

// Definisikan schema untuk entri Diary
const diarySchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    content: { 
        type: String, 
        required: true 
    },
    tags: [String], // Array untuk menyimpan tags
    mood: { 
        type: String, 
        enum: ['Happy', 'Excited', 'Neutral', 'Sad', 'Angry'], // Mood yang dapat dipilih
        required: true 
    },
    formattedDate: { 
        type: String, // Format tanggal (WIB)
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

// Membuat model berdasarkan schema yang telah didefinisikan
export default mongoose.model('Diary', diarySchema);