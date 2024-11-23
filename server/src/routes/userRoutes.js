import express from "express";
import { getAllUsers, getUserById, updateUser } from "../controllers/userController.js";
import verifyAuth from "../middleware/verifyUser.js";

const router = express.Router();

router.get('/allUsers',verifyAuth, getAllUsers);
router.get('/get/:id',verifyAuth, getUserById);
router.put('/update/:id',verifyAuth, updateUser);

export default router