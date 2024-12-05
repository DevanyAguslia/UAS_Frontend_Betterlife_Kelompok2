import express from 'express';
import {
    createEntry,
    getEntries,
    updateEntry,
    deleteEntry
} from '../../controllers/diaryController.js';

const router = express.Router();

// Define the POST route for creating a new diary entry
router.post('/', createEntry);  

// Define the GET route for retrieving all diary entries
router.get('/', getEntries);     

// Define the PUT route for updating a specific diary entry by its ID
router.put('/:id', updateEntry);    

// Define the DELETE route for deleting a specific diary entry by its ID
router.delete('/:id', deleteEntry);  

export default router;