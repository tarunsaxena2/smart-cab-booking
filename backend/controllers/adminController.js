const db = require("../config/db");

const getAdminDashboard = async (req, res) => {
  try {
    const users = await db.query("SELECT COUNT(*) FROM users WHERE role = 'user'");
    const drivers = await db.query("SELECT COUNT(*) FROM users WHERE role = 'driver'");
    const bookings = await db.query("SELECT COUNT(*) FROM bookings");
    const completedRides = await db.query("SELECT COUNT(*) FROM bookings WHERE booking_status = 'Completed'");
    const pendingRides = await db.query("SELECT COUNT(*) FROM bookings WHERE booking_status = 'Pending'");
    const revenue = await db.query("SELECT COALESCE(SUM(amount), 0) FROM payments WHERE payment_status = 'Success'");

    res.status(200).json({
      success: true,
      dashboard: {
        totalUsers: Number(users.rows[0].count),
        totalDrivers: Number(drivers.rows[0].count),
        totalBookings: Number(bookings.rows[0].count),
        completedRides: Number(completedRides.rows[0].count),
        pendingRides: Number(pendingRides.rows[0].count),
        totalRevenue: Number(revenue.rows[0].coalesce),
      },
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
  getAdminDashboard,
};