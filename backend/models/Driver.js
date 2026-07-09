const db = require("../config/db");

// Create Driver
const createDriver = async (
  userId,
  licenseNumber,
  experience
) => {
  const query = `
    INSERT INTO drivers
    (
      user_id,
      license_number,
      experience
    )
    VALUES ($1,$2,$3)
    RETURNING *;
  `;

  const result = await db.query(query, [
    userId,
    licenseNumber,
    experience,
  ]);

  return result.rows[0];
};

// Find Driver By User ID
const findDriverByUserId = async (userId) => {
  const result = await db.query(
    "SELECT * FROM drivers WHERE user_id=$1",
    [userId]
  );

  return result.rows[0];
};

// Update Driver Availability
const updateAvailability = async (
  driverId,
  availability
) => {
  const result = await db.query(
    `
    UPDATE drivers
    SET availability=$1
    WHERE id=$2
    RETURNING *;
    `,
    [availability, driverId]
  );

  return result.rows[0];
};

module.exports = {
  createDriver,
  findDriverByUserId,
  updateAvailability,
};