import User from '../models/User.js';

// Get profile
export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


// Update profile
export const updateProfile = async (req, res) => {
    try {
        const { username, email } = req.body;
        
        const existingUser = await User.findOne({ 
            email, 
            _id: { $ne: req.user.userId } 
        });
        
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const user = await User.findByIdAndUpdate(
            req.user.userId,
            { username, email },
            { new: true }
        ).select('-password');

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete account
export const deleteAccount = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user.userId);
        res.json({ message: 'Account deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};