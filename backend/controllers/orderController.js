import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Placing Orders Using COD Method
const placeOrder = async (req, res) => {
    try {
        const { userId, items, quantity, amount, address } = req.body;
        const orderData = { orderId: `ORD-${Date.now()}`, userId, items, quantity, amount, address, paymentMethod: "COD", payment: false, date: Date.now() }
        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, { cartData: {} })
        res.json({ success: true, message: 'Order Placed Successfully' })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Placing Orders Using Stripe Method
const placeOrderStripe = async (req, res) => {
    
}

// Placing Orders Using ApplePay Method
const placeOrderApple = async (req, res) => {

}

// Placing Orders Using GooglePay Method
const placeOrderGoogle = async (req, res) => {

};

// Placing Orders Using AmazonPay Method
const placeOrderAmazon = async (req, res) => {

}

// Placing Orders Using Paytm Method
const placeOrderPaytm = async (req, res) => {

}

// Placing Orders Using PayPal Method
const placeOrderPaypal = async (req, res) => {

}

// Placing Orders Using Master Card Method
const placeOrderMaster = async (req, res) => {

}

// Placing Orders Using Visa Card Method
const placeOrderVisa = async (req, res) => {

}

// Placing Orders Using Discover Card Method
const placeOrderDiscover = async (req, res) => {

}

// All Orders For Admin Panel
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({ success: true, orders })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// User Orders Data For Frontend
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await orderModel.find({ userId })
        res.json({ success: true, orders })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Update Orders Status Form Admin Panel
const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        await orderModel.findByIdAndUpdate(orderId, { status });
        res.json({ success: true, message: 'Status Updated' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const deleteDeliveredOrder = async (req, res) => {
    try {
        const { orderId } = req.body;

        // Find the order by orderId (not _id)
        const order = await orderModel.findOne({ orderId });
        if (!order) return res.status(404).json({ message: "Order not found" });

        // Check if order is delivered
        if (order.status !== "Delivered") {
            return res.status(400).json({ message: "Only delivered orders can be deleted" });
        }

        // Delete order by orderId
        await orderModel.deleteOne({ orderId });

        res.json({ success: true, message: "Order deleted successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};


export { placeOrder, placeOrderStripe, placeOrderApple, placeOrderGoogle, placeOrderAmazon, placeOrderPaytm, placeOrderPaypal, placeOrderMaster, placeOrderVisa, placeOrderDiscover, allOrders, userOrders, updateOrderStatus, deleteDeliveredOrder }