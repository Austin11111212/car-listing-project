const express = require('express');
const { addReview, getReviews } =
    require('../controllers/reviewControllers');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Define routes
router.get('/:carId', getReviews);

// Add a new review to a car
router.post('/', authMiddleware, addReview);

// Export the router
module.exports = router;