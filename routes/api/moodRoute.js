import express from 'express';
import {
    getMoods,
    createMood,
    deleteMood,
    deleteAllMoods
} from '../../controllers/moodController.js';

const router = express.Router();

// Basic CRUD routes
router.get('/', getMoods);
router.post('/', createMood);
router.delete('/:id', deleteMood);
router.delete('/', deleteAllMoods);

export default router;