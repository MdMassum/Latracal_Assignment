
import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler.js";
import User from "../models/User.js";

const verifyAuth = async(req, res, next) =>{

    try {
        const token = req.cookies.access_token;
        if (!token) {
            return next(new ErrorHandler("No Token", 401));
        }

        const decodedData = jwt.verify(token, process.env.JWT_SECRET );

        if (decodedData) {
            req.user = await User.findById(decodedData.id);
        } else {
            return next(new ErrorHandler("Invalid token", 401));
        }

        next();
        
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}

export default verifyAuth