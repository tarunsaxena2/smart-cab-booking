const db = require("../config/db");

const createReview = async (bookingId, userId, driverId, rating, comment) => {
  const query = `
    INSERT INTO reviews
    (
      booking_id,
      user_id,
      driver_id,
      rating,
      comment
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  const result = await db.query(query, [
    bookingId,
    userId,
    driverId,
    rating,
    comment,
  ]);

  return result.rows[0];
};

const getReviewsByDriver = async (driverId) => {
  const result = await db.query(
    `
    SELECT *
    FROM reviews
    WHERE driver_id = $1
    ORDER BY created_at DESC
    `,
    [driverId]
  );

  return result.rows;
};

module.exports = {
  createReview,
  getReviewsByDriver,
};