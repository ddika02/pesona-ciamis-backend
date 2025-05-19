const { pool } = require('../config/db');
const bcrypt = require('bcrypt');

class User {
  // Mencari user berdasarkan username
  static async findByUsername(username) {
    try {
      const [rows] = await pool.execute(
        'SELECT * FROM users WHERE username = ?',
        [username]
      );
      return rows[0];
    } catch (error) {
      console.error('Error mencari user:', error.message);
      throw error;
    }
  }

  // Mencari user berdasarkan email
  static async findByEmail(email) {
    try {
      const [rows] = await pool.execute(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );
      return rows[0];
    } catch (error) {
      console.error('Error mencari user:', error.message);
      throw error;
    }
  }

  // Mencari user berdasarkan ID
  static async findById(id) {
    try {
      const [rows] = await pool.execute(
        'SELECT id, username, email, created_at FROM users WHERE id = ?',
        [id]
      );
      return rows[0];
    } catch (error) {
      console.error('Error mencari user:', error.message);
      throw error;
    }
  }

  // Verifikasi password
  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = User;