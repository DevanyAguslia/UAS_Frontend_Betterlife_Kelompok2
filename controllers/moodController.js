import Mood from '../models/mood.js';

// Get all moods
// Returns sorted list of moods with newest first
// Response: 200 success with moods array, 500 for server error
export const getMoods = async (req, res) => {
    try {
        const moods = await Mood.find().sort({ date: -1 });
        res.status(200).json({
            status: 'success',
            data: moods
        });
    } catch (error) {
        console.error('Error in getMoods:', error);
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Create new mood entry
// Expects mood and answers in request body
// Sets current date automatically
// Response: 201 with new mood, 400 for validation errors
export const createMood = async (req, res) => {
    try {
        const { mood, answers } = req.body;
        const newMood = new Mood({
            mood,
            answers,
            date: new Date()
        });

        const savedMood = await newMood.save();
        res.status(201).json({
            status: 'success',
            data: savedMood
        });
    } catch (error) {
        console.error('Error in createMood:', error);
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
};

// Delete specific mood by ID
// Validates mood existence before deletion
// Response: 200 for success, 404 if not found, 500 for server error
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
        console.error('Error in deleteMood:', error);
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Delete all mood records
// Removes all documents from moods collection
// Response: 200 for success, 500 for server error
export const deleteAllMoods = async (req, res) => {
    try {
        await Mood.deleteMany({});
        res.status(200).json({
            status: 'success',
            message: 'All moods deleted successfully'
        });
    } catch (error) {
        console.error('Error in deleteAllMoods:', error);
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Update existing mood
// Expects mood ID in URL params, mood and answers in body
// Updates timestamp automatically
// Response: 200 with updated mood, 404 if not found, 500 for server error
export const updateMood = async (req, res) => {
    try {
        const { id } = req.params;
        const { mood, answers } = req.body;

        const updatedMood = await Mood.findByIdAndUpdate(
            id,
            {
                mood,
                answers,
                updatedAt: new Date()
            },
            { new: true, runValidators: true }
        );

        if (!updatedMood) {
            return res.status(404).json({
                status: 'error',
                message: 'Mood not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: updatedMood
        });
    } catch (error) {
        console.error('Error in updateMood:', error);
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};