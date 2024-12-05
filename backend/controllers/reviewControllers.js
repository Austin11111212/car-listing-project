const Review = require('../models/Review');
const mongoose = require('mongoose'); // For ObjectId validation

/**
 * Add a new review
 */
exports.addReview = async (req, res) => {
    try {
        // Validate required fields
        const { car, reviewText } = req.body;
        if (!car || !reviewText) {
            return res.status(400).json({ error: "Car ID and review text are required." });
        }

        // Ensure car ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(car)) {
            return res.status(400).json({ error: "Invalid car ID." });
        }

        // Create and save the review
        const review = await Review.create({
            car,
            reviewText,
            user: req.user?.userId // Assumes user ID is attached via middleware
        });

        res.status(201).json({ message: "Review added successfully!", review });
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ error: "An error occurred while adding the review." });
    }
};

/**
 * Get reviews for a specific car
 */
exports.getReviews = async (req, res) => {
    try {
        const { carId } = req.params;

        // Validate carId
        if (!mongoose.Types.ObjectId.isValid(carId)) {
            return res.status(400).json({ error: "Invalid car ID." });
        }

        console.log('Fetching reviews for carId:', carId);

        // Fetch reviews for the given carId
        const reviews = await Review.find({ car: carId }).populate('user', 'name');

        if (!reviews.length) {
            return res.status(404).json({ message: 'No reviews found for this car.' });
        }

        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ error: "An error occurred while fetching the reviews." });
    }
};

/**
 * Update a review
 */
exports.updateReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const { reviewText } = req.body;

        // Validate reviewId
        if (!mongoose.Types.ObjectId.isValid(reviewId)) {
            return res.status(400).json({ error: "Invalid review ID." });
        }

        // Check if reviewText is provided
        if (!reviewText) {
            return res.status(400).json({ error: "Review text is required for update." });
        }

        // Update the review
        const updatedReview = await Review.findByIdAndUpdate(
            reviewId,
            { reviewText },
            { new: true, runValidators: true }
        );

        if (!updatedReview) {
            return res.status(404).json({ error: "Review not found." });
        }

        res.status(200).json({ message: "Review updated successfully!", updatedReview });
    } catch (error) {
        console.error('Error updating review:', error);
        res.status(500).json({ error: "An error occurred while updating the review." });
    }
};

/**
 * Delete a review
 */
exports.deleteReview = async (req, res) => {
    try {
        const { reviewId } = req.params;

        // Validate reviewId
        if (!mongoose.Types.ObjectId.isValid(reviewId)) {
            return res.status(400).json({ error: "Invalid review ID." });
        }

        // Delete the review
        const deletedReview = await Review.findByIdAndDelete(reviewId);

        if (!deletedReview) {
            return res.status(404).json({ error: "Review not found." });
        }

        res.status(200).json({ message: "Review deleted successfully!" });
    } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).json({ error: "An error occurred while deleting the review." });
    }
};
