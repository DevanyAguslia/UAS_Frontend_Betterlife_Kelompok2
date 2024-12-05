import mongoose from 'mongoose';

// Make a diary schema
const diarySchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    content: { 
        type: String, 
        required: true 
    },
    tags: [String],
    mood: { 
        type: String, 
        enum: ['Happy', 'Excited', 'Neutral', 'Sad', 'Angry'],
        required: true 
    },
    formattedDate: { 
        type: String, 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

export default mongoose.model('Diary', diarySchema);