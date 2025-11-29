import Restaurant from "../models/restaurantModal.js";

// ✅ Create Restaurant
const createRestaurant = async (req, res) => {
    try {
        const {
            name,
            seats,
            address,
            opening,
            closing,
            about,
            cuisine,
            latitude,
            longitude
        } = req.body;

        // Images coming from multer
        const images = req.files?.map((file) => `/${file.filename}`) || [];

        if (!name || !seats || !address || !opening || !closing || !about || !cuisine || !latitude || !longitude) {
            return res.json({
                success: false,
                message: "All required fields must be provided"
            });
        }

        const restaurant = new Restaurant({
            name,
            seats,
            address,
            opening,
            closing,
            about,
            cuisine,
            images,
            coordinates: {  // ✅ coordinates object add करें
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude)
            }
        });

        await restaurant.save();

        res.json({
            success: true,
            message: "Restaurant created successfully",
            data: restaurant
        });

    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// ✅ Get All Restaurants
const getRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find();

        res.status(200).json({
            success: true,
            data: restaurants,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// ❌ Delete Restaurant
const deleteRestaurant = async (req, res) => {
    try {
        await Restaurant.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Restaurant deleted successfully",
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export {
    createRestaurant,
    getRestaurants,
    deleteRestaurant,
};