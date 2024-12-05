import mongoose from 'mongoose';

// Make a book schema for database
const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    summary: { type: String },
    link: { type: String },
    image: { type: String },
    readStatus: { type: Boolean, default: false } 
});

const Book = mongoose.model('Book', bookSchema);

export default Book