import foodModel from "../models/foodModel.js";
import fs from 'fs'

// Adding Food Item
const addFoodItem = async (req, res) => {
    try {
        const { name, description, price, stars, category } = req.body;

        // Check if Multer stored the file
        if (!req.file) {
            return res.status(400).json({ success: false, message: "Image is required!" });
        }

        // Get the uploaded image filename
        const image = req.file.filename;  // Correct way to get image from Multer

        // Validate input
        if (!name || !description || !price || !stars || !category) {
            return res.status(400).json({ success: false, message: "All fields are required!" });
        }

        // Save the food item with the image URL
        const foodData = new foodModel({ name, description, price, stars, category, image });

        await foodData.save();
        res.status(201).json({ success: true, message: "Food Added Successfully", data: foodData });

    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "Internal Server Error, Adding Food!!" })
    }
};

// All Food List
const listFoodItem = async (req, res) => {
    try {
        const foods = await foodModel.find({})
        res.status(201).json({ success: true, data: foods })

    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "Internal Server Error, Getting Food List!!" })
    }
};

// Remove Food Item
const removeFoodItem = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id)

        fs.unlink(`uploads/${food.image}`, () => { })
        await foodModel.findByIdAndDelete(req.body.id)

        return res.status(201).json({ success: true, message: "Food Removed" })

    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "Internal Server Error, Removing Food!!" })
    }
};

export { addFoodItem, listFoodItem, removeFoodItem }