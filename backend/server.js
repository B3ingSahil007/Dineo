import express from 'express';
import cors from 'cors';
import { connectDB } from './config/mongodb.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import 'dotenv/config'
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

// CORS
const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:5174', 'https://dineo.onrender.com', 'https://dineo-admin.onrender.com'], // Allow both 5173 and 5174
    methods: 'GET, POST, PUT, DELETE, OPTIONS, HEAD, PATCH, PROPFIND',
    credentials: true
}

// App Configuration
const app = express()
const port = process.env.PORT || 4000;

// Middlewares
app.use(express.json())
app.use(cors(corsOptions));

// API Endpoints
app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

app.get('/', (req, res) => {
    res.send('API Working . . .')
})

// Starting Express Server & Database
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server Is Running On : http://localhost:${port}`)
        console.log('Changes Applied On Project !!')
    })
})
