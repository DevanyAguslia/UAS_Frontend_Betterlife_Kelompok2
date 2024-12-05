import Diary from '../models/Diary.js';

// Buat entri baru
export const createEntry = async (req, res) => {
    try {
        const { title, content, tags, mood } = req.body;
        const newEntry = new Diary({ title, content, tags, mood, createdAt: new Date() });
        await newEntry.save();

        res.status(201).json({ message: 'Diary entry created successfully', entry: newEntry });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create entry', error });
    }
};

// Ambil semua entri dengan pencarian atau filter
export const getEntries = async (req, res) => {
    try {
        const { search, tag } = req.query;
        const filter = {};

        if (search) {
            filter.$or = [
                { title: new RegExp(search, 'i') }, // Pencarian di title
                { content: new RegExp(search, 'i') } // Pencarian di content
            ];
        }
        if (tag) {
            filter.tags = tag; // Filter untuk tag
        }

        const entries = await Diary.find(filter).sort({ createdAt: -1 });
        res.status(200).json(entries);
    } catch (error) {
        console.error('Error fetching entries:', error);
        res.status(500).json({ message: 'Failed to fetch entries', error });
    }
};

// Perbarui entri berdasarkan ID
export const updateEntry = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, tags, mood } = req.body;
        const updatedEntry = await Diary.findByIdAndUpdate(id, { title, content, tags, mood }, { new: true });
        res.status(200).json({ message: 'Entry updated successfully', entry: updatedEntry });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update entry', error });
    }
};

// Hapus entri berdasarkan ID
export const deleteEntry = async (req, res) => {
    try {
        const { id } = req.params;
        await Diary.findByIdAndDelete(id);
        res.status(200).json({ message: 'Entry deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete entry', error });
    }
};
