const {
  createNotification,
  getNotificationsByUser,
  markNotificationAsRead,
} = require("../models/Notification");

// Create Notification
const addNotification = async (req, res) => {
  try {
    const { userId, title, message } = req.body;

    const notification = await createNotification(
      userId,
      title,
      message
    );

    res.status(201).json({
      success: true,
      message: "Notification created successfully",
      notification,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get My Notifications
const getMyNotifications = async (req, res) => {
  try {
    const notifications = await getNotificationsByUser(req.user.id);

    res.status(200).json({
      success: true,
      notifications,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Mark Notification as Read
const readNotification = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await markNotificationAsRead(
      id,
      req.user.id
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Notification marked as read",
      notification,
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
  addNotification,
  getMyNotifications,
  readNotification,
};