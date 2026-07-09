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
  roleMiddleware("user"),
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
  roleMiddleware("user"),
  getMyBookings
);

// Update Booking Status
router.put(
  "/:bookingId/status",
  authMiddleware,
  roleMiddleware("driver", "admin"),
  changeBookingStatus
);

// Driver - Ride Requests
router.get(
  "/requests",
  authMiddleware,
  roleMiddleware("driver"),
  getRideRequests
);

// Driver - Accept Ride
router.put(
  "/:bookingId/accept",
  authMiddleware,
  roleMiddleware("driver"),
  acceptRide
);

// Driver - Complete Ride
router.put(
  "/:bookingId/complete",
  authMiddleware,
  roleMiddleware("driver"),
  finishRide
);

module.exports = router;