import express from 'express';
import taskController from '../../controllers/taskController.js';

const router = express.Router();

// Get all tasks
router.get('/', taskController.getAllTasks);

// Create new task
router.post('/', taskController.createTask);

// Update task
router.put('/:id', taskController.updateTask);

// Delete task
router.delete('/:id', taskController.deleteTask);

export default router;