import express from 'express';
import pomodoroController from '../../controllers/pomodoroController.js';

const router = express.Router();

// GET all sessions
router.get('/', pomodoroController.getAllSessions);

// POST new session
router.post('/', pomodoroController.createSession);

// PUT update session
router.put('/:id', pomodoroController.updateSession);

// DELETE session
router.delete('/:id', pomodoroController.deleteSession);

// GET session statistics
router.get('/stats', pomodoroController.getSessionStats);

export default router;