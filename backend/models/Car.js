const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    pictures: {
        type: [String],  // Fixed here - should be [String] (Array of Strings)  // Optional field
    },
    price: {
        type: Number,
        required: true
    },
    mileage: {  // Fixed typo - should be "mileage" instead of "milage"
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    condition: {
        type: String, 
        enum: ['New', 'Used'], 
        default: 'Used'
    },
    transmission: {
        type: String, 
        enum: ['Automatic', 'Manual'], 
        default: 'Automatic'
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
     // You probably want to ensure the car is posted by a user
    },
    fueltype: {
        type: String,
        enum: ['Gasoline', 'Diesel', 'Electric', 'Hybrid'],
        default: 'Gasoline'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    color: {
        type: String,
        required: true
    }
});

// Create the Car model using the schema
module.exports = mongoose.model('Car', CarSchema);