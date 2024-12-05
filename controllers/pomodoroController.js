import Session from '../models/Session.js';

const pomodoroController = {
    // Get all sessions 
    getAllSessions: async (req, res) => {
        try {
            const sessions = await Session.find()
                .sort({ completedAt: -1 })
                .limit(10);
            res.json(sessions);
        } catch (error) {
            res.status(500).json({ 
                success: false,
                message: 'Error fetching sessions',
                error: error.message 
            });
        }
    },

    // Create a new session
    createSession: async (req, res) => {
        try {
            const { type, duration, completedAt } = req.body;

            if (duration <= 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Duration must be a positive number.'
                });
            }

            const session = new Session({
                type,
                duration,
                completedAt: completedAt || new Date()
            });

            const newSession = await session.save();
            res.status(201).json({
                success: true,
                data: newSession,
                message: 'Session created successfully'
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: 'Error creating session',
                error: error.message
            });
        }
    },

    // Update existing session
    updateSession: async (req, res) => {
        try {
            const { id } = req.params;
            const { type } = req.body;

            const session = await Session.findById(id);
            if (!session) {
                return res.status(404).json({
                    success: false,
                    message: 'Session not found'
                });
            }

            session.type = type;
            const updatedSession = await session.save();

            res.json({
                success: true,
                data: updatedSession,
                message: 'Session updated successfully'
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: 'Error updating session',
                error: error.message
            });
        }
    },

    // Delete session
    deleteSession: async (req, res) => {
        try {
            const { id } = req.params;
            const session = await Session.findById(id);
            
            if (!session) {
                return res.status(404).json({
                    success: false,
                    message: 'Session not found'
                });
            }

            await Session.deleteOne({ _id: id });
            res.json({
                success: true,
                message: 'Session deleted successfully'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error deleting session',
                error: error.message
            });
        }
    },

    // Get session statistics
    getSessionStats: async (req, res) => {
        try {
            const stats = await Session.aggregate([
                {
                    $group: {
                        _id: '$type',
                        totalSessions: { $sum: 1 },
                        averageDuration: { $avg: '$duration' },
                        totalDuration: { $sum: '$duration' }
                    }
                }
            ]);

            res.json({
                success: true,
                data: stats
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching statistics',
                error: error.message
            });
        }
    }
};

export default pomodoroController;