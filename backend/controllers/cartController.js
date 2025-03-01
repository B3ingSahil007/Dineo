import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;

        if (!userId || !itemId) {
            return res.status(400).json({ success: false, message: "User ID and Item ID are required." });
        }

        let userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        let cartData = userData.cartData || {};

        // Update cart quantity
        cartData[itemId] = (cartData[itemId] || 0) + 1;

        // Remove item if quantity is 0 or less
        if (cartData[itemId] <= 0) {
            delete cartData[itemId];
        }

        // **Fix: Remove itemId if cartData is now empty**
        if (Object.keys(cartData).length === 0) {
            cartData = {}; // Reset cartData
        }

        // Update user cart
        await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });

        res.status(200).json({ success: true, message: "Added to Cart", cartData });

    } catch (error) {
        console.error("Error While Adding Product To Cart:", error);
        res.status(500).json({ success: false, message: "Internal Server Error. Failed To Add Product To Cart." });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;

        if (!userId || !itemId) {
            return res.status(400).json({ success: false, message: "User ID and Item ID are required." });
        }

        let userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        let cartData = userData.cartData || {};

        // Reduce item quantity or remove item if quantity is 0
        if (cartData[itemId] && cartData[itemId] > 0) {
            cartData[itemId] -= 1;

            if (cartData[itemId] <= 0) {
                delete cartData[itemId]; // Remove the item
            }
        }

        // Fix: Remove entire cartData if empty
        if (Object.keys(cartData).length === 0) {
            cartData = {}; // Reset cartData
        }

        // Update the user's cart
        await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });

        res.status(200).json({ success: true, message: "Remove From Cart - Updated", cartData });

    } catch (error) {
        console.error("Error While Updating The Cart:", error);
        res.status(500).json({ success: false, message: "Internal Server Error. Failed To Update Cart." });
    }
};

const getCart = async (req, res) => {
    try {
        const { userId } = req.body;
        let userData = await userModel.findById(userId);
        let cartData = await userData.cartData || {};

        res.json({ success: true, cartData })
        
    } catch (error) {
        console.error("Error While Retrieving The User's Cart :", error);
        res.json({ success: false, message: "Internal Server Error. Failed To Retrieve User's Cart." + error.message });
    }
}

export { addToCart, removeFromCart, getCart }
