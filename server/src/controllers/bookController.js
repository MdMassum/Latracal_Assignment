
import Book from "../models/Book.js";
import ErrorHandler from "../utils/errorHandler.js";


// getAllBooks
export const getAllBooks = async(req,res,next) =>{

    try {
        const books = await Book.find();

        res.status(200).send({
            success:true,
            books
        })
    } catch (error) {
        return next (new ErrorHandler(error.message, 500));
    }
}

// get book by id
export const getBookById = async(req,res,next) =>{

    try {
        const book = await Book.findById(req.params.id);

        if(!book){
            return next(new ErrorHandler("No Book Found !!!",401));
        }

        res.status(200).send({
            success:true,
            book
        })
        
    } catch (error) {
        return next (new ErrorHandler(error.message, 500));
    }
}
