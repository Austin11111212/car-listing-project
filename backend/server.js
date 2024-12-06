require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const carRoutes = require('./routes/carRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const cors = require('cors');
// Connect to MongoDB
connectDB();

// Create an instance of the Express application
const app = express();
// middleware
app.use(express.json());
app.use(cors());
// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/reviews', reviewRoutes);
// Set up the server to listen on a port
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
