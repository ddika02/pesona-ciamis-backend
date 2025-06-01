const { pool } = require('../config/db');

class KritikSaran {
  // Menambahkan kritik/saran baru
  static async create(nama, email, pesan) {
    try {
      const [result] = await pool.execute(
        'INSERT INTO kritik_saran (nama, email, pesan) VALUES (?, ?, ?)',
        [nama, email, pesan]
      );
      
      return {
        id: result.insertId,
        nama,
        email,
        pesan,
        created_at: new Date()
      };
    } catch (error) {
      console.error('Error membuat kritik/saran:', error.message);
      throw error;
    }
  }

  // Mendapatkan semua kritik/saran
  static async getAll() {
    try {
      const [rows] = await pool.execute(
        'SELECT * FROM kritik_saran ORDER BY created_at DESC'
      );
      return rows;
    } catch (error) {
      console.error('Error mendapatkan kritik/saran:', error.message);
      throw error;
    }
  }

  // Menghapus kritik/saran
  static async delete(id) {
    try {
      await pool.execute('DELETE FROM kritik_saran WHERE id = ?', [id]);
      return true;
    } catch (error) {
      console.error('Error menghapus kritik/saran:', error.message);
      throw error;
    }
  }
}

module.exports = KritikSaran;