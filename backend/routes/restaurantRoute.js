import express from "express";
import {
    createRestaurant,
    getRestaurants,
    deleteRestaurant
} from "../controllers/restaurantController.js";
import upload from "../middleware/multer.js";

const restaurantRouter = express.Router();

// Create restaurant
restaurantRouter.post(
    "/create",
    upload.array("images", 10),
    createRestaurant
);

// Get all restaurants
restaurantRouter.get("/list", getRestaurants);

// Delete restaurant
restaurantRouter.delete("/:id", deleteRestaurant);

export default restaurantRouter;
