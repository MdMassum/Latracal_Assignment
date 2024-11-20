// creating token and storing in cookies (not in local storage -->because that can be accessed)
import jwt from "jsonwebtoken";

const sendToken = (user, statusCode, res) => {

    const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });

    const options = {
        expires: new Date(
            Date.now() + parseInt(process.env.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
    };

    res.status(statusCode).cookie("access_token", token, options).json({
        success: true,
        access_token : token,
        user:{
            id:user._id,
            email:user.email,
            role:user.role
        }
    });
};
export default sendToken;