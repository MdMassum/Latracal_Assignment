import Review from "../models/Review.js";
import ErrorHandler from "../utils/errorHandler.js";


// get all review of a book
export const getReviews = async(req,res,next) =>{

    try {
        const reviews = await Review.find({bookId:req.params.id});

        res.status(200).send({
            success:true,
            reviews
        })
    } catch (error) {
        return next (new ErrorHandler(error.message, 500));
    }
}

// create review
export const createReview = async(req,res,next) =>{

    const{rating, content} = req.body;
    try {
        const review = await Review.create({
            rating,
            content,
            bookId:req.params.id,
            userId:req.user.id,
            name:req.user.name,
        })
        res.status(201).send({
            success:true,
            review
        })
        
    } catch (error) {
        return next (new ErrorHandler(error.message, 500));
    }
}
