const db = require("../config/db");

// Create New User
const createUser = async (name, email, phone, password, role) => {
  const query = `
    INSERT INTO users (name, email, phone, password, role)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, name, email, phone, role, created_at
  `;

  const values = [name, email, phone, password, role];

  const result = await db.query(query, values);
  return result.rows[0];
};

// Find User by Email
const findUserByEmail = async (email) => {
  const result = await db.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  return result.rows[0];
};

module.exports = {
  createUser,
  findUserByEmail,
};