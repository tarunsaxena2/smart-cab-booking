const express = require("express");
const cors = require("cors");
const path = require("path"); // 1. Added path module
require("dotenv").config();

require("./config/db");
const bookingRoutes = require("./routes/bookingRoutes");
const authRoutes = require("./routes/authRoutes");
const driverRoutes = require("./routes/driverRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// 2. Serve static frontend assets (HTML, CSS, JS, images)
app.use(express.static(path.join(__dirname, "../frontend")));

// API Endpoints
app.use("/api/bookings", bookingRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/admin", adminRoutes);

// 3. Fallback route to serve index.html for any non-API page requests
app.get("/{*catchall}", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});