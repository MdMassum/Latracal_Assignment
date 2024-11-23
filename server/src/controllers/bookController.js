
import Book from "../models/Book.js";
import ErrorHandler from "../utils/errorHandler.js";


// Create Book
export const createBook = async(req,res,next) =>{

    if(req.user.role !== 'admin'){
        return next( new ErrorHandler("Only Admin Can Create Book !!", 401))
    }

    const {title, author, summary, category} = req.body;
    try {
        if(!title || !author || !summary || !category){
            return next(new ErrorHandler("Enter all Book Details",402));
        }
        const book = await Book.create(req.body);
        res.status(200).send({
            success:true,
            book
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


// get all books with search
export const getAllBooks = async(req, res, next) =>{
    try {
        const limit = parseInt(req.query.limit) || 6;
        const startIndex = parseInt(req.query.startIndex) || 0;

        const searchKey = req.query.searchKey || '';
        const sort = req.query.sort || 'createdAt';

        const order = req.query.order || 'desc';

        // finding the books based on parameters
        const books = await Book.find({
            title:{$regex:searchKey, $options:'i'}
        }).sort(
            {[sort]:order}
        ).limit(limit).skip(startIndex)  // for pagination

        return res.status(200).send(books);

    } catch (error) {
        next(error)
    }
}