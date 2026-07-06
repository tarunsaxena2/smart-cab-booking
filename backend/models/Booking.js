const db = require("../config/db");

// Create Booking
const createBooking = async (
  userId,
  pickupLocation,
  dropLocation,
  cabType,
  distanceKm,
  estimatedFare
) => {
  const query = `
    INSERT INTO bookings
    (
      user_id,
      pickup_location,
      drop_location,
      cab_type,
      distance_km,
      estimated_fare
    )
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;

  const values = [
    userId,
    pickupLocation,
    dropLocation,
    cabType,
    distanceKm,
    estimatedFare,
  ];

  const result = await db.query(query, values);

  return result.rows[0];
};

// Get Bookings of Logged-in User
const getBookingsByUser = async (userId) => {
  const result = await db.query(
    `
    SELECT *
    FROM bookings
    WHERE user_id = $1
    ORDER BY booking_time DESC
    `,
    [userId]
  );

  return result.rows;
};
// Update Booking Status
const updateBookingStatus = async (bookingId, status) => {
  const query = `
    UPDATE bookings
    SET booking_status = $1
    WHERE id = $2
    RETURNING *;
  `;

  const result = await db.query(query, [status, bookingId]);
  return result.rows[0];
};

const getPendingBookings = async () => {
  const result = await db.query(
    `
    SELECT *
    FROM bookings
    WHERE booking_status = 'Pending'
    ORDER BY booking_time DESC
    `
  );

  return result.rows;
};

const assignDriverToBooking = async (bookingId, driverId) => {
  const query = `
    UPDATE bookings
    SET
      driver_id = $1,
      booking_status = 'Accepted'
    WHERE id = $2
    RETURNING *;
  `;

  const result = await db.query(query, [driverId, bookingId]);
  return result.rows[0];
};
const completeRide = async (bookingId) => {
  const query = `
    UPDATE bookings
    SET
      booking_status = 'Completed',
      ride_end_time = CURRENT_TIMESTAMP
    WHERE id = $1
    RETURNING *;
  `;

  const result = await db.query(query, [bookingId]);
  return result.rows[0];
};
module.exports = {
  createBooking,
  getBookingsByUser,
  updateBookingStatus,
  getPendingBookings,
  assignDriverToBooking,
  completeRide,
};