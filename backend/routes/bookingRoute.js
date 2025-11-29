import express from 'express';
import { createBooking, getUserBookings, getRestaurantBookings, updateBookingStatus, cancelBooking } from '../controllers/bookingController.js';
import nativeauthMiddleware from '../middleware/nativeAuthMiddleware.js';

const bookingRouter = express.Router();

// Create a new booking
bookingRouter.post('/create', nativeauthMiddleware, createBooking);

// Get user's bookings
bookingRouter.get('/user-bookings', nativeauthMiddleware, getUserBookings);

// Get restaurant's bookings (for restaurant owners)
bookingRouter.get('/restaurant-bookings/:restaurantId', nativeauthMiddleware, getRestaurantBookings);

// Update booking status
bookingRouter.put('/update-status/:bookingId', nativeauthMiddleware, updateBookingStatus);

// Cancel booking
bookingRouter.put('/cancel/:bookingId', nativeauthMiddleware, cancelBooking);

export default bookingRouter;