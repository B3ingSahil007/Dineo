import express from "express";
import { addToCart, removeFromCart, getCart } from "../controllers/cartController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const cartRouter = express.Router();

// Route For Add Items
cartRouter.post('/add', authMiddleware, addToCart)

// Route For Remove Items
cartRouter.post('/remove', authMiddleware, removeFromCart)

// Route To Fetch Items
cartRouter.post('/get', authMiddleware, getCart)

export default cartRouter;