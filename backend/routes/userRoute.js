import express from "express";
import { userSignUp, userLogIn, listUserInfo } from "../controllers/userController.js";

const userRouter = express.Router()

// Route For User Sign-Up
userRouter.post('/signup', userSignUp)

// Route For User Log-In
userRouter.post('/login', userLogIn)

// Route To Fetch User Information
userRouter.post('/fetchuser', listUserInfo)

export default userRouter;
