import express from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import errorMiddleware from './middleware/error.js';
import helmet from 'helmet';
// import rateLimit from 'express-rate-limit';
import authRouter from './routes/authRoutes.js'
import userRouter from './routes/userRoutes.js'
import bookRouter from './routes/bookRoutes.js'
import reviewRouter from './routes/reviewRoutes.js'


const app = express();

// app.use(rateLimit({
//    windowMs: 5 * 60 * 1000, // 5 minutes
//    max: 100,
//    message: "Too many attempts from this IP, please try again later.",
//    })); // Rate limiting

app.use(helmet());
// app.use(rateLimit({}))

app.use(cors({
    // origin:'http://localhost:5173',     // frontend url
    origin:'https://latracal-assignment.vercel.app',     // frontend url
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma",
      ],
    credentials: true
}))
app.use(express.json());
app.use(cookieParser());

// routes
// app.use('/',(req,res)=>{
//   res.status(200).json({
//     success:true,
//     message:"Server Running Successfully"
//   })
// })
app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)
app.use('/api/book',bookRouter)
app.use('/api/review',reviewRouter)

// error check 
app.use(errorMiddleware)

export default app