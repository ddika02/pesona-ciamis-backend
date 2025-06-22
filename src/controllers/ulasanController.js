const { pool } = require("../config/db");

// Tambah ulasan untuk destinasi
const tambahUlasan = async (req, res) => {
  const { destinasi_id } = req.params;
  const { nama_pengulas, rating, komentar } = req.body;
  const tanggal = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD

  // Validasi input
  if (!nama_pengulas || !rating || !komentar) {
    return res.status(400).json({ 
      message: "Nama pengulas, rating, dan komentar wajib diisi." 
    });
  }

  // Validasi rating (1-5)
  if (rating < 1 || rating > 5) {
    return res.status(400).json({ 
      message: "Rating harus bernilai antara 1 sampai 5." 
    });
  }

  try {
    // Cek apakah destinasi ada
    const [destinasi] = await pool.query(
      "SELECT * FROM destinasi_wisata WHERE id = ?",
      [destinasi_id]
    );

    if (destinasi.length === 0) {
      return res.status(404).json({ message: "Destinasi tidak ditemukan." });
    }

    // Simpan ulasan ke database
    const query = `
      INSERT INTO ulasan_destinasi 
      (destinasi_id, nama_pengulas, rating, komentar, tanggal)
      VALUES (?, ?, ?, ?, ?)
    `;

    const [result] = await pool.query(query, [
      destinasi_id,
      nama_pengulas,
      rating,
      komentar,
      tanggal
    ]);

    res.status(201).json({
      message: "Ulasan berhasil ditambahkan",
      data: {
        id: result.insertId,
        destinasi_id,
        nama_pengulas,
        rating,
        komentar,
        tanggal
      },
    });
  } catch (err) {
    console.error("Gagal menambahkan ulasan:", err);
    res.status(500).json({ message: "Gagal menyimpan data ke database." });
  }
};

// Ambil semua ulasan untuk destinasi tertentu
const getUlasanByDestinasiId = async (req, res) => {
  const { destinasi_id } = req.params;

  try {
    // Cek apakah destinasi ada
    const [destinasi] = await pool.query(
      "SELECT * FROM destinasi_wisata WHERE id = ?",
      [destinasi_id]
    );

    if (destinasi.length === 0) {
      return res.status(404).json({ message: "Destinasi tidak ditemukan." });
    }

    // Ambil ulasan
    const [ulasan] = await pool.query(
      "SELECT * FROM ulasan_destinasi WHERE destinasi_id = ? ORDER BY created_at DESC",
      [destinasi_id]
    );

    // Hitung rata-rata rating
    let avgRating = 0;
    if (ulasan.length > 0) {
      const totalRating = ulasan.reduce((sum, item) => sum + item.rating, 0);
      avgRating = totalRating / ulasan.length;
    }

    res.json({ 
      data: ulasan,
      meta: {
        count: ulasan.length,
        average_rating: avgRating.toFixed(1)
      }
    });
  } catch (err) {
    console.error("Gagal mengambil data ulasan:", err);
    res.status(500).json({ message: "Gagal mengambil data dari database." });
  }
};

// Hapus ulasan (opsional, untuk admin)
const hapusUlasan = async (req, res) => {
  const { id } = req.params;

  try {
    // Cek apakah ulasan ada
    const [ulasan] = await pool.query(
      "SELECT * FROM ulasan_destinasi WHERE id = ?",
      [id]
    );

    if (ulasan.length === 0) {
      return res.status(404).json({ message: "Ulasan tidak ditemukan." });
    }

    // Hapus ulasan
    await pool.query("DELETE FROM ulasan_destinasi WHERE id = ?", [id]);

    res.json({ message: "Ulasan berhasil dihapus." });
  } catch (err) {
    console.error("Gagal menghapus ulasan:", err);
    res.status(500).json({ message: "Gagal menghapus data dari database." });
  }
};

// Modifikasi getDestinasiById di destinasiController untuk menyertakan ulasan
const updateGetDestinasiById = async (req, res) => {
  // Fungsi ini hanya sebagai referensi untuk dimodifikasi di destinasiController.js
  // Tidak perlu diimplementasikan di sini
};

module.exports = {
  tambahUlasan,
  getUlasanByDestinasiId,
  hapusUlasan
};