import express from "express";

import verifyAuth from "../middleware/verifyUser.js";
import { createBookReview, deleteReview, getBookReviews,  } from "../controllers/reviewController.js";

const router = express.Router();

router.get('/get/:id',verifyAuth, getBookReviews);
router.post('/add',verifyAuth, createBookReview);
router.delete('/delete/:id',verifyAuth, deleteReview);

export default router