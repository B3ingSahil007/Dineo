import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { placeOrder,placeOrderStripe, placeOrderApple, placeOrderGoogle, placeOrderAmazon, placeOrderPaytm, placeOrderPaypal, placeOrderMaster, placeOrderVisa, placeOrderDiscover, allOrders, userOrders, updateOrderStatus, deleteDeliveredOrder } from '../controllers/orderController.js'

const orderRouter = express.Router();

// Admin Features
orderRouter.post('/list', allOrders)
orderRouter.post('/status', updateOrderStatus)
orderRouter.post('/delete', deleteDeliveredOrder)

// Payment Features
orderRouter.post('/place', authMiddleware, placeOrder)
orderRouter.post('/stripe', authMiddleware, placeOrderStripe)
orderRouter.post('/apple', authMiddleware, placeOrderApple)
orderRouter.post('/google', authMiddleware, placeOrderGoogle)
orderRouter.post('/amazon', authMiddleware, placeOrderAmazon)
orderRouter.post('/paytm', authMiddleware, placeOrderPaytm)
orderRouter.post('/paypal', authMiddleware, placeOrderPaypal)
orderRouter.post('/master', authMiddleware, placeOrderMaster)
orderRouter.post('/visa', authMiddleware, placeOrderVisa)
orderRouter.post('/discover', authMiddleware, placeOrderDiscover)

// User Features
orderRouter.post('/userorders', authMiddleware, userOrders)

export default orderRouter;