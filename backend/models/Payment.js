const db = require("../config/db");

const createPayment = async (
  bookingId,
  amount,
  paymentMethod,
  paymentStatus,
  transactionId
) => {
  const query = `
    INSERT INTO payments
    (
      booking_id,
      amount,
      payment_method,
      payment_status,
      transaction_id,
      paid_at
    )
    VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)
    RETURNING *;
  `;

  const result = await db.query(query, [
    bookingId,
    amount,
    paymentMethod,
    paymentStatus,
    transactionId,
  ]);

  return result.rows[0];
};

const getPaymentsByBooking = async (bookingId) => {
  const result = await db.query(
    `
    SELECT *
    FROM payments
    WHERE booking_id = $1
    ORDER BY created_at DESC
    `,
    [bookingId]
  );

  return result.rows;
};

module.exports = {
  createPayment,
  getPaymentsByBooking,
};