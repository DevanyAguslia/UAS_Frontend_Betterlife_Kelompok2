import Diary from '../models/Diary.js';

// Create new entry
export const createEntry = async (req, res) => {
    try {
        const { title, content, tags, mood } = req.body;
        const jakartaTime = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));
        const formattedDate = jakartaTime.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        const newEntry = new Diary({
            title,
            content,
            tags,
            mood,
            formattedDate,
            createdAt: jakartaTime 
        });

        await newEntry.save();

        res.status(201).json({ message: 'Diary entry created successfully', entry: newEntry });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create entry', error });
    }
};


// Get entry with search and filter
export const getEntries = async (req, res) => {
    try {
        const { search, tag } = req.query;
        const filter = {};

        if (search) {
            filter.$or = [
                { title: new RegExp(search, 'i') }, 
                { content: new RegExp(search, 'i') }
            ];
        }
        if (tag) {
            filter.tags = tag; 
        }

        const entries = await Diary.find(filter).sort({ createdAt: -1 });
        res.status(200).json(entries);
    } catch (error) {
        console.error('Error fetching entries:', error);
        res.status(500).json({ message: 'Failed to fetch entries', error });
    }
};

// Update the entry
export const updateEntry = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, tags, mood } = req.body;

        const updatedEntry = await Diary.findByIdAndUpdate(id, { title, content, tags, mood }, { new: true });

        if (!updatedEntry) {
            return res.status(404).json({ message: 'Entry not found' }); 
        }

        res.status(200).json({ message: 'Entry updated successfully', entry: updatedEntry });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update entry', error });
    }
};

// Delete entries
export const deleteEntry = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEntry = await Diary.findByIdAndDelete(id);
        if (!deletedEntry) {
            return res.status(404).json({ message: 'Entry not found' }); 
        }
        res.status(200).json({ message: 'Entry deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete entry', error });
    }
};