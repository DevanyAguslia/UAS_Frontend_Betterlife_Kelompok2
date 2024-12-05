import mongoose from 'mongoose';


const taskSchema = new mongoose.Schema({
    // Task title - required field with custom error message
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    // Task description - required field with custom error message
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    // Task status - enum with predefined values, defaults to 'OPEN'
    status: {
        type: String,
        enum: ['OPEN', 'PROGRESS', 'TESTING', 'DONE'],
        default: 'OPEN'
    },
    // Creation timestamp - automatically set to current date/time
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

export default mongoose.model('Task', taskSchema);