import Task from '../models/task.js';

const taskController = {
    // Get all tasks
    getAllTasks: async (req, res) => {
        try {
            const tasks = await Task.find().sort({ createdAt: -1 });
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Create new task
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