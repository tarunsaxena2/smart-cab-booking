const db = require("../config/db");

const createNotification = async (userId, title, message) => {
  const query = `
    INSERT INTO notifications
    (
      user_id,
      title,
      message
    )
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

  const result = await db.query(query, [userId, title, message]);
  return result.rows[0];
};

const getNotificationsByUser = async (userId) => {
  const result = await db.query(
    `
    SELECT *
    FROM notifications
    WHERE user_id = $1
    ORDER BY created_at DESC
    `,
    [userId]
  );

  return result.rows;
};

const markNotificationAsRead = async (notificationId, userId) => {
  const result = await db.query(
    `
    UPDATE notifications
    SET is_read = TRUE
    WHERE id = $1 AND user_id = $2
    RETURNING *;
    `,
    [notificationId, userId]
  );

  return result.rows[0];
};

module.exports = {
  createNotification,
  getNotificationsByUser,
  markNotificationAsRead,
};