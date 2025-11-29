import express from "express";
import { addToCart, removeFromCart, getCart } from "../controllers/cartController.js";
import { nativeaddToCart, nativeremoveFromCart, nativegetCart } from "../controllers/nativeCartController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import nativeauthMiddleware from "../middleware/nativeAuthMiddleware.js";

const cartRouter = express.Router();

// Route For Add Items
cartRouter.post('/add', authMiddleware, addToCart)

// Route For Remove Items
cartRouter.post('/remove', authMiddleware, removeFromCart)

// Route To Fetch Items
cartRouter.post('/get', authMiddleware, getCart)


// Route For Native Add Items
cartRouter.post('/nativeadd', nativeauthMiddleware, nativeaddToCart)

// Route For Native Remove Items
cartRouter.post('/nativeremove', nativeauthMiddleware, nativeremoveFromCart)

// Route To Native Fetch Items
cartRouter.post('/nativeget', nativeauthMiddleware, nativegetCart)

export default cartRouter;