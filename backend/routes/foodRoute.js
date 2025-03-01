import express from 'express';
import { addFoodItem, listFoodItem, removeFoodItem } from '../controllers/foodController.js';
import upload from '../middleware/multer.js';

const foodRouter = express.Router();

// Route For Adding Food With Multiple Images
foodRouter.post('/add', upload.single("image"), addFoodItem);

// Route For List Food
foodRouter.get('/list', listFoodItem);

// Route For Removing Food
foodRouter.post('/remove', removeFoodItem);

export default foodRouter;