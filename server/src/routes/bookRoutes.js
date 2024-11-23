import express from "express";

import verifyAuth from "../middleware/verifyUser.js";
import { createBook, getAllBooks, getBookById } from "../controllers/bookController.js";

const router = express.Router();

router.post('/create',verifyAuth, createBook);
router.get('/allBooks',verifyAuth, getAllBooks);
router.get('/getbook/:id',verifyAuth, getBookById);

export default router