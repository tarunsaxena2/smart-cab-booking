const { validationResult } = require("express-validator");
const {
  createBooking,
  getBookingsByUser,
  updateBookingStatus,
  getPendingBookings,
  assignDriverToBooking,
  completeRide,
} = require("../models/Booking");

const { findDriverByUserId } = require("../models/Driver");

// Create New Booking
const createNewBooking = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const {
      pickupLocation,
      dropLocation,
      cabType,
      distanceKm,
      estimatedFare,
    } = req.body;

    const booking = await createBooking(
      req.user.id,
      pickupLocation,
      dropLocation,
      cabType,
      distanceKm,
      estimatedFare
    );

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get My Bookings
const getMyBookings = async (req, res) => {
  try {
    const bookings = await getBookingsByUser(req.user.id);

    res.status(200).json({
      success: true,
      bookings,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const changeBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    const allowedStatus = ["Pending", "Accepted", "Ongoing", "Completed", "Cancelled"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking status",
      });
    }

    const booking = await updateBookingStatus(bookingId, status);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Booking status updated successfully",
      booking,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getRideRequests = async (req, res) => {
  try {
    const bookings = await getPendingBookings();

    res.status(200).json({
      success: true,
      rideRequests: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const acceptRide = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const driver = await findDriverByUserId(req.user.id);

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Driver profile not found",
      });
    }

    const booking = await assignDriverToBooking(
      bookingId,
      driver.id
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Ride accepted successfully",
      booking,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const finishRide = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await completeRide(bookingId);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Ride completed successfully",
      booking,
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
  createNewBooking,
  getMyBookings,
  changeBookingStatus,
  getRideRequests,
  acceptRide,
  finishRide,
};