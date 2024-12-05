import Book from '../models/Books.js';

// Get all the books
export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create new books
export const createBook = async (req, res) => {
    const { title, summary, link, image } = req.body;
    const newBook = new Book({
        title,
        summary,
        link,
        image
    });

    try {
        const savedBook = await newBook.save();
        res.json(savedBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete books
export const deleteBook = async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        res.json(deletedBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Mark a book as read
export const markAsRead = async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, { readStatus: req.body.readStatus }, { new: true });
        res.json(updatedBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};