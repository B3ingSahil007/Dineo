import userModel from "../models/userModel.js";

// Add to Cart Controller
// nativeCartController.js me detailed logging add karo
const nativeaddToCart = async (req, res) => {
    try {
        const { itemId } = req.body;
        const userId = req.userId;

        console.log("🛒 === NATIVE ADD TO CART START ===");
        console.log("👤 User ID:", userId);
        console.log("📦 Item ID:", itemId);

        // Find user
        const user = await userModel.findById(userId);
        
        if (!user) {
            console.log("❌ USER NOT FOUND IN DATABASE");
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        console.log("✅ User found:", user.email);
        console.log("📊 Current cartData:", user.cartData);

        // Initialize cartData if it doesn't exist
        if (!user.cartData) {
            console.log("🆕 Initializing empty cartData");
            user.cartData = {};
        }

        const itemIdStr = itemId.toString();

        // Add item to cart
        const previousQuantity = user.cartData[itemIdStr] || 0;
        if (user.cartData[itemIdStr]) {
            user.cartData[itemIdStr] += 1;
            console.log("➕ Incremented quantity:", previousQuantity, "→", user.cartData[itemIdStr]);
        } else {
            user.cartData[itemIdStr] = 1;
            console.log("🆕 Added new item with quantity: 1");
        }

        console.log("📦 Updated cartData BEFORE save:", user.cartData);

        // ✅ SOLUTION: Use { new: true } to get updated document
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { 
                $set: { 
                    cartData: user.cartData 
                } 
            },
            { new: true } // ✅ Important: returns updated document
        );

        console.log("💾 Saved to database");
        console.log("✅ Updated cartData AFTER save:", updatedUser.cartData);

        res.status(200).json({
            success: true,
            message: "Item added to cart successfully",
            cartData: updatedUser.cartData
        });

        console.log("🛒 === NATIVE ADD TO CART END ===");

    } catch (error) {
        console.error("❌ Add to cart error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

// Remove from Cart Controller
// nativeCartController.js - nativeremoveFromCart function
const nativeremoveFromCart = async (req, res) => {
    try {
        const { itemId } = req.body;
        const userId = req.userId;

        console.log("🗑️ === NATIVE REMOVE FROM CART START ===");
        console.log("👤 User ID:", userId);
        console.log("📦 Item ID to remove:", itemId);

        if (!itemId) {
            return res.status(400).json({
                success: false,
                message: "Item ID is required"
            });
        }

        const user = await userModel.findById(userId);
        if (!user) {
            console.log("❌ USER NOT FOUND");
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        console.log("✅ User found:", user.email);
        console.log("📊 Current cartData BEFORE remove:", user.cartData);

        // Initialize cartData if it doesn't exist
        if (!user.cartData) {
            user.cartData = {};
        }

        const itemIdStr = itemId.toString();

        // Remove item from cart or decrement quantity
        if (user.cartData[itemIdStr]) {
            user.cartData[itemIdStr] -= 1;
            console.log("➖ Decremented quantity:", user.cartData[itemIdStr] + 1, "→", user.cartData[itemIdStr]);

            // Remove item if quantity becomes 0 or less
            if (user.cartData[itemIdStr] <= 0) {
                delete user.cartData[itemIdStr];
                console.log("🗑️ Item completely removed from cart");
            }
        } else {
            console.log("⚠️ Item not found in cart");
        }

        console.log("📦 Updated cartData AFTER remove:", user.cartData);

        // ✅ Use { new: true } to get updated document
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { 
                $set: { 
                    cartData: user.cartData 
                } 
            },
            { new: true }
        );

        console.log("💾 Saved to database");
        console.log("✅ Final cartData:", updatedUser.cartData);

        res.status(200).json({
            success: true,
            message: "Item removed from cart successfully",
            cartData: updatedUser.cartData
        });

        console.log("🗑️ === NATIVE REMOVE FROM CART END ===");

    } catch (error) {
        console.error("❌ Remove from cart error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

// Get Cart Controller
const nativegetCart = async (req, res) => {
    try {
        const userId = req.userId;

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Return cart data (empty object if no cart data)
        const cartData = user.cartData || {};

        res.status(200).json({
            success: true,
            cartData: cartData
        });

    } catch (error) {
        console.error("Get cart error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

export { nativeaddToCart, nativeremoveFromCart, nativegetCart };