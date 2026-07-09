const express = require("express");
const { body } = require("express-validator");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  createNewBooking,
  getMyBookings,
  changeBookingStatus,
  getRideRequests,
  acceptRide,
  finishRide,
} = require("../controllers/bookingController");

const router = express.Router();

// Create Booking
router.post(
  "/",
  authMiddleware,
  roleMiddleware("customer"), // 1. FIXED: Changed from "user" to "customer" to match your DB schema
  [
    body("pickupLocation").notEmpty().withMessage("Pickup location is required"),
    body("dropLocation").notEmpty().withMessage("Drop location is required"),
    body("cabType").notEmpty().withMessage("Cab type is required"),
    body("distanceKm").isNumeric().withMessage("Distance must be a number"),
    body("estimatedFare").isNumeric().withMessage("Fare must be a number"),
  ],
  createNewBooking
);

// Get My Bookings
router.get(
  "/my",
  authMiddleware,
  roleMiddleware("customer"), // 2. FIXED: Changed from "user" to "customer"
  getMyBookings
);

// Update Booking Status
router.put(
  "/:bookingId/status",
  authMiddleware,
  roleMiddleware("driver", "admin"),
  changeBookingStatus
);

router.get(
  "/requests",
  authMiddleware,
  roleMiddleware("driver"),
  getRideRequests
);

router.put(
  "/:bookingId/accept",
  authMiddleware,
  roleMiddleware("driver"),
  acceptRide
);

router.put(
  "/:bookingId/complete",
  authMiddleware,
  roleMiddleware("driver"),
  finishRide
);

module.exports = router;