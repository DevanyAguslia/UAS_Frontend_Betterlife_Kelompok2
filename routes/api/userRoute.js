import express from 'express';
import { verifyToken } from '../../middleware/authMiddleware.js';
import { 
    getProfile, 
    getAllUsers, 
    updateProfile, 
    deleteAccount 
} from '../../controllers/userController.js';

const router = express.Router();

// Define the GET route for fetching the authenticated user's profile
router.get('/profile', verifyToken, getProfile);

// Define the PUT route to update the profile of the authenticated user
router.put('/profile', verifyToken, updateProfile);

// Define the DELETE route for deleting the profile/account of the authenticated user
router.delete('/profile', verifyToken, deleteAccount);

export default router;