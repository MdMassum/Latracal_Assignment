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
    summary: {
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    reviews : [
        {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        name:{
            type:String,
            required:true
        },
        comment: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        }
    }
    ],
    numOfReviews:{
        type:Number,
        default:0,
    },
    ratings:{
        type: Number,
        default:0,
    },
    coverImage: {
        type: String,
        default: "",
    }
}, { timestamps: true });

const Book = mongoose.model("Book", BookSchema);

export default Book
