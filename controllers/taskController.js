import Task from '../models/task.js';

const taskController = {
    // Get all tasks
    // Retrieves all tasks sorted by creation date (newest first)
    // Returns: Array of task objects
    // Error: 500 if server error occurs
    getAllTasks: async (req, res) => {
        try {
            const tasks = await Task.find().sort({ createdAt: -1 });
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Create new task
    // Creates task with provided title, description, and optional status
    // Default status: 'OPEN'
    // Returns: Newly created task object
    // Error: 400 if validation fails
    createTask: async (req, res) => {
        const task = new Task({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status || 'OPEN'
        });

        try {
            const newTask = await task.save();
            res.status(201).json(newTask);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Update task
    // Updates task fields if provided in request
    // Validates task existence before update
    // Returns: Updated task object
    // Error: 404 if task not found, 400 if validation fails
    updateTask: async (req, res) => {
        try {
            const task = await Task.findById(req.params.id);
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }

            if (req.body.title) task.title = req.body.title;
            if (req.body.description) task.description = req.body.description;
            if (req.body.status) task.status = req.body.status;

            const updatedTask = await task.save();
            res.json(updatedTask);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Delete task
    // Removes task from database after validating existence
    // Returns: Success message
    // Error: 404 if task not found, 500 if server error
    deleteTask: async (req, res) => {
        try {
            const task = await Task.findById(req.params.id);
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }

            await Task.findByIdAndDelete(req.params.id);
            res.json({ message: 'Task deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

export default taskController;