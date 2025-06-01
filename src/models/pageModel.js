const { pool } = require('../config/db');

class Page {
  // Mendapatkan halaman berdasarkan slug
  static async getBySlug(slug) {
    try {
      const [rows] = await pool.execute(
        'SELECT * FROM pages WHERE slug = ?',
        [slug]
      );
      return rows[0];
    } catch (error) {
      console.error('Error mendapatkan halaman:', error.message);
      throw error;
    }
  }

  // Update konten halaman
  static async updateContent(slug, title, content) {
    try {
      // Cek apakah halaman sudah ada
      const page = await this.getBySlug(slug);
      
      if (page) {
        // Update halaman yang sudah ada
        await pool.execute(
          'UPDATE pages SET title = ?, content = ?, updated_at = NOW() WHERE slug = ?',
          [title, content, slug]
        );
      } else {
        // Buat halaman baru jika belum ada
        await pool.execute(
          'INSERT INTO pages (slug, title, content) VALUES (?, ?, ?)',
          [slug, title, content]
        );
      }
      
      return await this.getBySlug(slug);
    } catch (error) {
      console.error('Error mengupdate halaman:', error.message);
      throw error;
    }
  }
}

module.exports = Page;