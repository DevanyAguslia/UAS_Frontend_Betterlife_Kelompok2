import express from 'express';
import { register, login } from '../../controllers/authController.js';

const router = express.Router();

// Define the POST route for user registration
router.post('/register', register);

// Define the POST route for user login
router.post('/login', login);

export default router;