const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  registerDriver,
  getDriverProfile,
  changeAvailability,
  getDriverDashboard,
} = require("../controllers/driverController");

const router = express.Router();

router.post(
  "/register",
  authMiddleware,
  roleMiddleware("driver"),
  registerDriver
);

router.get(
  "/profile",
  authMiddleware,
  roleMiddleware("driver"),
  getDriverProfile
);

router.put(
  "/availability",
  authMiddleware,
  roleMiddleware("driver"),
  changeAvailability
);

router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware("driver"),
  getDriverDashboard
);

module.exports = router;