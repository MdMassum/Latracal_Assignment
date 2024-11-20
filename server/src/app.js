import express from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import errorMiddleware from './middleware/error.js';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import authRouter from './routes/authRoutes.js'


const app = express();

app.use(rateLimit({
   windowMs: 5 * 60 * 1000, // 5 minutes
   max: 100,
   message: "Too many attempts from this IP, please try again later.",
   })); // Rate limiting

app.use(helmet());
app.use(rateLimit({}))

app.use(cors({
    origin:'http://localhost:5173',     // frontend url
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

app.use('/api/auth',authRouter)

// error check 
app.use(errorMiddleware)

export default app