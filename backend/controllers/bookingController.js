import bookingModel from '../models/bookingModal.js';
import restaurantModel from '../models/restaurantModal.js';

// Create new booking
export const createBooking = async (req, res) => {
    try {
        const {
            restaurantId, // ✅ Yeh frontend se aa raha hai
            bookingDate,
            bookingTime,
            guests,
            specialRequests = '',
            contactNumber = ''
        } = req.body;

        // Validate required fields
        if (!restaurantId || !bookingDate || !bookingTime || !guests) {
            return res.status(400).json({
                success: false,
                message: "All fields are required: restaurantId, bookingDate, bookingTime, guests"
            });
        }

        // Check if restaurant exists
        const restaurant = await restaurantModel.findById(restaurantId);
        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found"
            });
        }

        // Check if restaurant has enough seats
        if (guests > restaurant.seats) {
            return res.status(400).json({
                success: false,
                message: `Maximum ${restaurant.seats} guests allowed`
            });
        }

        // Convert bookingDate to proper format
        const bookingDateObj = new Date(bookingDate);
        const dateString = bookingDateObj.toISOString().split('T')[0]; // YYYY-MM-DD format

        // Check for existing bookings at same time
        const existingBookings = await bookingModel.countDocuments({
            restaurantId: restaurantId,
            date: dateString,
            timeSlot: bookingTime,
            status: { $in: ['Pending', 'Confirmed'] }
        });

        // Set a limit per time slot
        const maxBookingsPerSlot = Math.floor(restaurant.seats / 2);
        if (existingBookings >= maxBookingsPerSlot) {
            return res.status(400).json({
                success: false,
                message: "This time slot is fully booked. Please choose another time."
            });
        }

        // Create booking with correct field names
        const booking = new bookingModel({
            restaurantId: restaurantId, // ✅ Correct field name
            userId: req.userId, // ✅ Correct field name
            date: dateString, // ✅ Correct field name
            timeSlot: bookingTime, // ✅ Correct field name
            guests: guests,
            specialRequests: specialRequests,
            contactNumber: contactNumber,
            status: 'Confirmed' // Auto-confirm
        });

        await booking.save();

        // Populate restaurant details in response
        await booking.populate('restaurantId', 'name address image opening closing cuisine');

        res.status(201).json({
            success: true,
            message: "Booking confirmed successfully! 🎉",
            data: booking
        });

    } catch (error) {
        console.error('Booking creation error:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message
        });
    }
};

// Get user's bookings
export const getUserBookings = async (req, res) => {
    try {
        const bookings = await bookingModel.find({ userId: req.userId })
            .populate('restaurantId', 'name address image opening closing cuisine')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            data: bookings
        });

    } catch (error) {
        console.error('Get user bookings error:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

// Get restaurant's bookings
export const getRestaurantBookings = async (req, res) => {
    try {
        const { restaurantId } = req.params;

        const bookings = await bookingModel.find({ restaurantId: restaurantId })
            .populate('userId', 'name email')
            .sort({ date: 1, timeSlot: 1 });

        res.json({
            success: true,
            data: bookings
        });

    } catch (error) {
        console.error('Get restaurant bookings error:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

// Update booking status
export const updateBookingStatus = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const { status } = req.body;

        if (!['Pending', 'Confirmed', 'Cancelled', 'Rejected', 'Completed'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status"
            });
        }

        const booking = await bookingModel.findByIdAndUpdate(
            bookingId,
            { status },
            { new: true }
        ).populate('restaurantId', 'name');

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        res.json({
            success: true,
            message: `Booking ${status} successfully`,
            data: booking
        });

    } catch (error) {
        console.error('Update booking status error:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

// Cancel booking
export const cancelBooking = async (req, res) => {
    try {
        const { bookingId } = req.params;

        const booking = await bookingModel.findByIdAndUpdate(
            bookingId,
            { status: 'Cancelled' },
            { new: true }
        ).populate('restaurantId', 'name');

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        res.json({
            success: true,
            message: "Booking cancelled successfully",
            data: booking
        });

    } catch (error) {
        console.error('Cancel booking error:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};