import express from 'express';
import * as moodController from '../../controllers/moodController.js';

// Initialize express router
const router = express.Router();

// Get all moods
router.get('/', moodController.getMoods);

// Create new mood
router.post('/', moodController.createMood);

// Update existing mood by ID
router.put('/:id', moodController.updateMood);

// Delete specific mood by ID
router.delete('/:id', moodController.deleteMood);

// Delete all moods
router.delete('/', moodController.deleteAllMoods);

export default router;