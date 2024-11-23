
import User from "../models/User.js";
import ErrorHandler from "../utils/errorHandler.js";
import bcrypt from 'bcryptjs'


// getAllUsers
export const getAllUsers = async(req,res,next) =>{

    try {
        const users = await User.find();

        res.status(200).send({
            success:true,
            users
        })
    } catch (error) {
        return next (new ErrorHandler(error.message, 500));
    }
}

// get user by id
export const getUserById = async(req,res,next) =>{

    try {
        const user = await User.findById(req.params.id);

        if(!user){
            return next(new ErrorHandler("No User Found !!!",401));
        }

        res.status(200).send({
            success:true,
            user
        })
        
    } catch (error) {
        return next (new ErrorHandler(error.message, 500));
    }
}
// get user by id
export const updateUser = async(req,res,next) =>{

    if(req.user.id !== req.params.id) return next(new ErrorHandler(401, "You can only update your own account"))

    try {

        if(req.body.password){
            req.body.password = bcrypt.hashSync(req.body.password,10);
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set:{
                name : req.body.name,
                password : req.body.password
            }
        },{new:true})

        res.status(200).send({
            success:true,
            updatedUser
        })
        
    } catch (error) {
        return next (new ErrorHandler(error.message, 500));
    }
}
