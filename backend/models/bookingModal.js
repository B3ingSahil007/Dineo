import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        restaurantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Restaurant",
            required: true,
        },
        guests: {
            type: Number,
            required: true,
            min: 1
        },
        date: {
            type: String,
            required: true,
        },
        timeSlot: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["Pending", "Confirmed", "Cancelled", "Rejected", "Completed"],
            default: "Pending",
        },
        specialRequests: {
            type: String,
            default: ''
        },
        contactNumber: {
            type: String,
            default: ''
        },
    },
    { timestamps: true }
);

const bookingModel = mongoose.model("Booking", bookingSchema);
export default bookingModel;
