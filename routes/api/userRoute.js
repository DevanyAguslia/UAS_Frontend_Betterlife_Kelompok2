import express from 'express';
import { verifyToken } from '../../middleware/authMiddleware.js';
import { 
    getProfile, 
    getAllUsers, 
    updateProfile, 
    deleteAccount 
} from '../../controllers/userController.js';

const router = express.Router();

router.get('/profile', verifyToken, getProfile);
router.get('/all', verifyToken, getAllUsers);
router.put('/profile', verifyToken, updateProfile);
router.delete('/profile', verifyToken, deleteAccount);

export default router;