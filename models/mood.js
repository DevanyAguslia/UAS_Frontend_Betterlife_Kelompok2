// models/mood.js
import mongoose from 'mongoose';

const moodSchema = new mongoose.Schema({
    mood: {
        type: String,
        required: true,
        enum: ['excited', 'happy', 'neutral', 'sad', 'angry']
    },
    answers: [{
        question: String,
        answer: String
    }],
    date: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Mood = mongoose.model('Mood', moodSchema);

export default Mood;