// models/mood.js
import mongoose from 'mongoose';

const moodSchema = new mongoose.Schema({
    // User's current mood selection (excited/happy/neutral/sad/angry)
    mood: {
        type: String,
        required: true,
        enum: ['excited', 'happy', 'neutral', 'sad', 'angry']
    },
    // Array of questions and corresponding user answers
    answers: [{
        question: String,
        answer: String
    }],
    // Timestamp when mood entry was created
    date: {
        type: Date,
        default: Date.now
    },
    // Timestamp when mood entry was last modified
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Mood = mongoose.model('Mood', moodSchema);

export default Mood;