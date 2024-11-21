import express from "express";

import verifyAuth from "../middleware/verifyUser.js";
import { getAllBooks, getBookById } from "../controllers/bookController.js";

const router = express.Router();

router.get('/allBooks',verifyAuth, getAllBooks);
router.get('/:id',verifyAuth, getBookById);

export default router