const { validationResult } = require("express-validator");
const {
  createReview,
  getReviewsByDriver,
} = require("../models/Review");

// Create Review
const addReview = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const {
      bookingId,
      driverId,
      rating,
      comment,
    } = req.body;

    const review = await createReview(
      bookingId,
      req.user.id,
      driverId,
      rating,
      comment
    );

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      review,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get Driver Reviews
const getDriverReviews = async (req, res) => {
  try {
    const { driverId } = req.params;

    const reviews = await getReviewsByDriver(driverId);

    res.status(200).json({
      success: true,
      reviews,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  addReview,
  getDriverReviews,
};