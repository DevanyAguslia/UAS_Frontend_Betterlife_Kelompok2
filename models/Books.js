import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    summary: { type: String },
    link: { type: String },
    image: { type: String },
    readStatus: { type: Boolean, default: false } // Melihat apakah buku sudah dibaca atau belum
});

const Book = mongoose.model('Book', bookSchema);

export default Book