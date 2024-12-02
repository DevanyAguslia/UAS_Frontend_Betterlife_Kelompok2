import Mood from '../models/mood.js';

// Get all moods
export const getMoods = async (req, res) => {
    try {
        const moods = await Mood.find().sort({ date: -1 });
        res.status(200).json({
            status: 'success',
            data: moods
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Create new mood
export const createMood = async (req, res) => {
    try {
        const mood = new Mood(req.body);
        const savedMood = await mood.save();
        res.status(201).json({
            status: 'success',
            data: savedMood
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
};

// Delete mood by ID
export const deleteMood = async (req, res) => {
    try {
        const mood = await Mood.findByIdAndDelete(req.params.id);
        if (!mood) {
            return res.status(404).json({
                status: 'error',
                message: 'Mood not found'
            });
        }
        res.status(200).json({
            status: 'success',
            message: 'Mood deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Delete all moods
export const deleteAllMoods = async (req, res) => {
    try {
        await Mood.deleteMany({});
        res.status(200).json({
            status: 'success',
            message: 'All moods deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};