import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    seats: { type: Number, required: true },

    images: [
        {
            type: String,
            required: true, // store URLs
        }
    ],

    address: { type: String, required: true },
    coordinates: {
        latitude: {
            type: Number,
            required: true, // ✅ नई field
        },
        longitude: {
            type: Number,
            required: true, // ✅ नई field
        }
    },
    opening: { type: String, required: true },  // "11:00"
    closing: { type: String, required: true },  // "23:00"

    about: {
        type: String,
        default:
            "Experience exquisite dining in a sophisticated atmosphere."
    },

    cuisine: { type: String, default: "Multi-cuisine" },

    rating: { type: Number, default: 4.5 },

    isActive: { type: Boolean, default: true },

    createdAt: { type: Date, default: Date.now },
});

const restaurantModal = mongoose.model("Restaurant", restaurantSchema);
export default restaurantModal;
