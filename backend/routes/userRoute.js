import express from "express";
import { userSignUp, userLogIn, listUserInfo, updateUserInfo, deleteUserAccount } from "../controllers/userController.js";
import nativeauthMiddleware from "../middleware/nativeAuthMiddleware.js";

const userRouter = express.Router()

// Route For User Sign-Up
userRouter.post('/signup', userSignUp)

// Route For User Log-In
userRouter.post('/login', userLogIn)

// Route To Fetch User Information
userRouter.post('/fetchuser', nativeauthMiddleware, listUserInfo)

// ✅ NEW: Route To Update User Information
userRouter.put('/update', nativeauthMiddleware, updateUserInfo)

// ✅ NEW: Route To Delete User Account
userRouter.delete('/delete', nativeauthMiddleware, deleteUserAccount)

export default userRouter;
