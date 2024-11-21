import express from "express";

import verifyAuth from "../middleware/verifyUser.js";
import { createReview, getReviews } from "../controllers/reviewController.js";

const router = express.Router();

router.get('/allReviews/:id',verifyAuth, getReviews);
router.post('/add/:id',verifyAuth, createReview);

export default router