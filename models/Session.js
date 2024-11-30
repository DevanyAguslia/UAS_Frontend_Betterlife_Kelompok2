import mongoose from "mongoose"

const sessionSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['focus', 'break']
    },
    duration: {
        type: Number,
        required: true,
        enum: [15, 25, 30, 45, 60]
    },
    completedAt: {
        type: Date,
        required: true,
        default: Date.now
    }
}, {
    timestamps: true
});

const Session = mongoose.model('Session', sessionSchema);

export default Session;