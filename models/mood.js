import mongoose from 'mongoose';

const moodSchema = new mongoose.Schema({
    mood: {
        type: String,
        required: true,
        enum: ['excited', 'happy', 'neutral', 'sad', 'angry']
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
    versionKey: false
});

export default mongoose.model('Mood', moodSchema);