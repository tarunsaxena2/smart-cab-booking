const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const {
  addNotification,
  getMyNotifications,
  readNotification,
} = require("../controllers/notificationController");

const router = express.Router();

// Create Notification
router.post(
  "/",
  authMiddleware,
  addNotification
);

// Get My Notifications
router.get(
  "/my",
  authMiddleware,
  getMyNotifications
);

// Mark Notification as Read
router.put(
  "/:id/read",
  authMiddleware,
  readNotification
);

module.exports = router;