import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    publishedDate: {
        type: Date,
        required: true,
    },
    summary: {
        type: String,
        required: true,
    },
    coverImage: {
        type: String,
        default: "",
    }
}, { timestamps: true });

const Book = mongoose.model("Book", BookSchema);

export default Book
