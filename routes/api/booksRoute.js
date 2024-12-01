import express from 'express';
import { getAllBooks, createBook, deleteBook, markAsRead } from '../../controllers/booksController.js';

const router = express.Router();

// Get all books
router.get('/', getAllBooks);

// Create a new book
router.post('/', createBook);

// Delete a book
router.delete('/:id', deleteBook);

// Mark a book as read
router.put('/:id', markAsRead);

export default router;