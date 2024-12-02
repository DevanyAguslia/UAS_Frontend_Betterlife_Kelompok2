import express from 'express';
import {
    createEntry,
    getEntries,
    updateEntry,
    deleteEntry
} from '../../controllers/diaryController.js';

const router = express.Router();

// Tambahkan endpoint untuk Diary
router.post('/', createEntry);       // Tambah entri baru
router.get('/', getEntries);         // Ambil semua entri (dengan pencarian/filter)
router.put('/:id', updateEntry);     // Perbarui entri berdasarkan ID
router.delete('/:id', deleteEntry);  // Hapus entri berdasarkan ID

export default router;