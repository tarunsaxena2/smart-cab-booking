const { validationResult } = require("express-validator");
const {
  createPayment,
  getPaymentsByBooking,
} = require("../models/Payment");

// Create Payment
const makePayment = async (req, res) => {
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
      amount,
      paymentMethod,
      transactionId,
    } = req.body;

    const payment = await createPayment(
      bookingId,
      amount,
      paymentMethod,
      "Success",
      transactionId
    );

    res.status(201).json({
      success: true,
      message: "Payment completed successfully",
      payment,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get Payment History
const getPaymentHistory = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const payments = await getPaymentsByBooking(bookingId);

    res.status(200).json({
      success: true,
      payments,
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
  makePayment,
  getPaymentHistory,
};