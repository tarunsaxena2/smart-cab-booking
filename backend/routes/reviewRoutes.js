const express = require("express");
const { body } = require("express-validator");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  addReview,
  getDriverReviews,
} = require("../controllers/reviewController");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware("user"),
  [
    body("bookingId").isNumeric().withMessage("Booking ID is required"),
    body("driverId").isNumeric().withMessage("Driver ID is required"),
    body("rating")
      .isInt({ min: 1, max: 5 })
      .withMessage("Rating must be between 1 and 5"),
  ],
  addReview
);

router.get("/driver/:driverId", getDriverReviews);

module.exports = router;