import Book from '../models/Book.js';
import ErrorHandler from '../utils/errorHandler.js';

// creating & updating review -->
export const createBookReview = async(req,res,next)=>{
    const{rating,comment,bookId} = req.body
    
    const review = {
        user : req.user._id,
        name : req.user.name,
        rating : Number(rating),
        comment
    }

    try {
       
        const book = await Book.findById(bookId);
    
        const isReviewed = book.reviews.find(rev=>rev.user.toString() === req.user.id);
        if(isReviewed){
    
            book.reviews.forEach(rev=>{
                if(rev.user.toString() === req.user.id){
                    rev.rating = rating;
                    rev.comment = comment;  
                }
            })
        }
        else{
            book.reviews.push(review);
            book.numOfReviews = book.reviews.length
        }
    
        let avg = 0;
       
        book.reviews.forEach((rev)=>{  // sum of all ratings of review
            avg += Number(rev.rating)
        })
        avg = avg/book.numOfReviews;
        book.ratings = avg;
    
        await book.save({validateBeforeSave:false})
        res.status(200).json({
            success:true,
            message:"Review Added Successfully"
        })
    } catch (error) {
        return next(new ErrorHandler("Something Went Wrong", 500));
    }
}

// get all reviews of single book
export const getBookReviews = async(req,res,next)=>{
    try {
        const book = await Book.findById(req.params.id);
    
        if(!book){
            return next(new Errorhandler("book Not Found",404));
        }
        res.status(200).json({
            success:true,
            reviews:book.reviews
        })
    } catch (error) {
        return next(new ErrorHandler("Something Went Wrong", 500));
    }
}

// deleting a review 
export const deleteReview = async(req,res,next)=>{

    try {
        const book = await Book.findById(req.params.id);
    
        if(!book){
            return next(new Errorhandler("book Not Found",404));
        }
        // keeping all reviews except the review given by current user
        const reviews = book.reviews.filter((rev)=>rev.user.toString() !== req.user._id.toString())
    
        book.numOfReviews = reviews.length // updating numOfReviews
        book.reviews = reviews;
    
        let avg = 0;
        reviews.forEach((rev)=>{  // sum of all ratings of review
            avg += Number(rev.rating)
        })
        avg = avg/book.numOfReviews;
        book.ratings = avg;
    
        await book.save({validateBeforeSave:false})
    
        res.status(200).json({
            success:true,
            message:"Review deleted successfully",
            reviews
        })
    } catch (error) {
        return next(new ErrorHandler("Something Went Wrong", 500));
    }
}