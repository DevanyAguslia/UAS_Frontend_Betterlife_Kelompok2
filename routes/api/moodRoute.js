import express from 'express';
import * as moodController from '../../controllers/moodController.js';

const router = express.Router();

// Basic CRUD routes
router.get('/', moodController.getMoods);
router.post('/', moodController.createMood);
router.put('/:id', moodController.updateMood);
router.delete('/:id', moodController.deleteMood);
router.delete('/', moodController.deleteAllMoods);

export default router;