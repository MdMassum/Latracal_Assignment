
import User from "../models/User.js";
import ErrorHandler from "../utils/errorHandler.js";
import bcrypt from 'bcryptjs'
import sendToken from "../utils/jwtToken.js";


// register
export const registerUser = async(req,res,next) =>{

    try {
        const {name, email, password} = req.body;

        if(!email || !password || !name){
            return next(new ErrorHandler("Please Enter Email or Password",400))
        }

        const hashedPass = await bcrypt.hash(password, 10);

        const user = await User.create({name, email, password:hashedPass})

        sendToken(user,201,res);
    } catch (error) {
        return next (new ErrorHandler(error.message, 500));
    }
    
}

// login
export const loginUser = async(req,res,next) =>{
    try {

        const {email, password} = req.body;

        if(!email || !password){
            return next(new ErrorHandler("Please Enter Email or Password",400))
        }

        const user = await User.findOne({email}).select('+password'); // since we have done select = false in schema;

        if(!user){
            return next(new ErrorHandler("Invalid Email Or Password !!!",401));
        }

        const verifyPass = await bcrypt.compare(password, user.password);
        if(!verifyPass){
            return next(new ErrorHandler("Invalid Email Or Password !!!",401));
        }
        sendToken(user, 200, res);
        
    } catch (error) {
        return next (new ErrorHandler(error.message, 500));
    }
}


// logout
export const logoutUser = async(req,res,next) =>{
    try {
        res.clearCookie('access_token');

        res.status(200).json({
            success:true,
            message:"Logged Out Succeccfully"
        })
    } catch (error) {
        return next (new ErrorHandler(error.message, 500));
    }
        
}