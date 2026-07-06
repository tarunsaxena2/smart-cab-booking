const express = require("express");
const { body } = require("express-validator");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  makePayment,
  getPaymentHistory,
} = require("../controllers/paymentController");

const router = express.Router();

// Make Payment
router.post(
  "/",
  authMiddleware,
  roleMiddleware("user"),
  [
    body("bookingId").isNumeric().withMessage("Booking ID is required"),
    body("amount").isNumeric().withMessage("Amount is required"),
    body("paymentMethod").notEmpty().withMessage("Payment method is required"),
    body("transactionId").notEmpty().withMessage("Transaction ID is required"),
  ],
  makePayment
);

// Payment History
router.get(
  "/:bookingId",
  authMiddleware,
  getPaymentHistory
);

module.exports = router;