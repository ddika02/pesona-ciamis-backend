const { pool } = require("../config/db");
const path = require("path");
const fs = require("fs");

// Tambah data destinasi
const tambahDestinasi = async (req, res) => {
  const {
    nama_destinasi,
    alamat,
    asal_usul,
    daya_tarik,
    fasilitas,
    harga_jam,
    deskripsi,
  } = req.body;

  if (!nama_destinasi || !alamat) {
    return res
      .status(400)
      .json({ message: "Nama destinasi dan alamat wajib diisi." });
  }

  // Cek apakah ada file gambar yang diupload
  let gambar_utama = null;
  if (req.file) {
    // Simpan path relatif ke database
    gambar_utama = `/uploads/destinasi/${req.file.filename}`;
  }

  const query = `
    INSERT INTO destinasi_wisata 
    (nama_destinasi, alamat, asal_usul, daya_tarik, fasilitas, harga_jam, deskripsi, gambar_utama)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  try {
    const [result] = await pool.query(query, [
      nama_destinasi,
      alamat,
      asal_usul,
      daya_tarik,
      fasilitas,
      harga_jam,
      deskripsi,
      gambar_utama,
    ]);

    // Jika ada multiple gambar, simpan ke tabel gambar_destinasi
    if (req.files && req.files.length > 0) {
      const destinasiId = result.insertId;
      const gambarValues = req.files.map((file) => [
        destinasiId,
        `/uploads/destinasi/${file.filename}`,
      ]);

      await pool.query(
        "INSERT INTO gambar_destinasi (destinasi_id, url_gambar) VALUES ?",
        [gambarValues]
      );
    }

    res.status(201).json({
      message: "Destinasi berhasil ditambahkan",
      data: {
        id: result.insertId,
        nama_destinasi,
        alamat,
        asal_usul,
        daya_tarik,
        fasilitas,
        harga_jam,
        deskripsi,
        gambar_utama,
      },
    });
  } catch (err) {
    console.error("Gagal menambahkan destinasi:", err);
    res.status(500).json({ message: "Gagal menyimpan data ke database." });
  }
};

// Ambil semua data destinasi
const getAllDestinasi = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM destinasi_wisata ORDER BY created_at DESC"
    );
    res.json({ data: rows });
  } catch (err) {
    console.error("Gagal mengambil data destinasi:", err);
    res.status(500).json({ message: "Gagal mengambil data dari database." });
  }
};

// Ambil satu data destinasi berdasarkan ID
const getDestinasiById = async (req, res) => {
  const { id } = req.params;

  try {
    // Ambil data destinasi
    const [destinasi] = await pool.query(
      "SELECT * FROM destinasi_wisata WHERE id = ?",
      [id]
    );

    if (destinasi.length === 0) {
      return res.status(404).json({ message: "Destinasi tidak ditemukan." });
    }

    // Ambil gambar tambahan
    const [gambarTambahan] = await pool.query(
      "SELECT * FROM gambar_destinasi WHERE destinasi_id = ?",
      [id]
    );

    // Ambil ulasan
    const [ulasan] = await pool.query(
      "SELECT * FROM ulasan_destinasi WHERE destinasi_id = ? ORDER BY created_at DESC",
      [id]
    );

    // Hitung rata-rata rating
    let avgRating = 0;
    if (ulasan.length > 0) {
      const totalRating = ulasan.reduce((sum, item) => sum + item.rating, 0);
      avgRating = totalRating / ulasan.length;
    }

    // Gabungkan data
    const result = {
      ...destinasi[0],
      gambar_tambahan: gambarTambahan,
      ulasan: ulasan,
      rating_info: {
        count: ulasan.length,
        average_rating: avgRating.toFixed(1),
      },
    };

    res.json({ data: result });
  } catch (err) {
    console.error("Gagal mengambil data destinasi:", err);
    res.status(500).json({ message: "Gagal mengambil data dari database." });
  }
};

// Edit data destinasi
const editDestinasi = async (req, res) => {
  const { id } = req.params;
  const {
    nama_destinasi,
    alamat,
    asal_usul,
    daya_tarik,
    fasilitas,
    harga_jam,
    deskripsi,
  } = req.body;

  if (!nama_destinasi || !alamat) {
    return res
      .status(400)
      .json({ message: "Nama destinasi dan alamat wajib diisi." });
  }

  try {
    // Cek apakah destinasi ada
    const [destinasi] = await pool.query(
      "SELECT * FROM destinasi_wisata WHERE id = ?",
      [id]
    );

    if (destinasi.length === 0) {
      return res.status(404).json({ message: "Destinasi tidak ditemukan." });
    }

    // Cek apakah ada file gambar yang diupload
    let gambar_utama = destinasi[0].gambar_utama;
    if (req.file) {
      // Hapus gambar lama jika ada
      if (destinasi[0].gambar_utama) {
        const oldImagePath = path.join(
          __dirname,
          "..",
          "..",
          destinasi[0].gambar_utama.replace(/^\/+/, "")
        );
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      // Simpan path relatif ke database
      gambar_utama = `/uploads/destinasi/${req.file.filename}`;
    }

    const query = `
      UPDATE destinasi_wisata SET 
        nama_destinasi = ?, 
        alamat = ?, 
        asal_usul = ?, 
        daya_tarik = ?, 
        fasilitas = ?, 
        harga_jam = ?, 
        deskripsi = ?,
        gambar_utama = ?
      WHERE id = ?
    `;

    const [result] = await pool.query(query, [
      nama_destinasi,
      alamat,
      asal_usul,
      daya_tarik,
      fasilitas,
      harga_jam,
      deskripsi,
      gambar_utama,
      id,
    ]);

    // Jika ada multiple gambar baru, simpan ke tabel gambar_destinasi
    if (req.files && req.files.length > 0) {
      // Hapus gambar lama
      const [oldImages] = await pool.query(
        "SELECT * FROM gambar_destinasi WHERE destinasi_id = ?",
        [id]
      );

      // Hapus file fisik
      for (const img of oldImages) {
        const oldImagePath = path.join(
          __dirname,
          "..",
          "..",
          img.url_gambar.replace(/^\/+/, "")
        );
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      // Hapus record dari database
      await pool.query("DELETE FROM gambar_destinasi WHERE destinasi_id = ?", [
        id,
      ]);

      // Simpan gambar baru
      const gambarValues = req.files.map((file) => [
        id,
        `/uploads/destinasi/${file.filename}`,
      ]);

      await pool.query(
        "INSERT INTO gambar_destinasi (destinasi_id, url_gambar) VALUES ?",
        [gambarValues]
      );
    }

    res.json({ message: "Destinasi berhasil diperbarui." });
  } catch (err) {
    console.error("Gagal memperbarui destinasi:", err);
    res.status(500).json({ message: "Gagal memperbarui data di database." });
  }
};

// Hapus data destinasi
const deleteDestinasi = async (req, res) => {
  const { id } = req.params;

  try {
    // Cek apakah destinasi ada
    const [destinasi] = await pool.query(
      "SELECT * FROM destinasi_wisata WHERE id = ?",
      [id]
    );

    if (destinasi.length === 0) {
      return res.status(404).json({ message: "Destinasi tidak ditemukan." });
    }

    // Ambil semua gambar terkait
    const [gambarTambahan] = await pool.query(
      "SELECT * FROM gambar_destinasi WHERE destinasi_id = ?",
      [id]
    );

    // Hapus file gambar utama jika ada
    if (destinasi[0].gambar_utama) {
      const mainImagePath = path.join(
        __dirname,
        "..",
        "..",
        destinasi[0].gambar_utama.replace(/^\/+/, "")
      );
      if (fs.existsSync(mainImagePath)) {
        fs.unlinkSync(mainImagePath);
      }
    }

    // Hapus file gambar tambahan
    for (const img of gambarTambahan) {
      const imagePath = path.join(
        __dirname,
        "..",
        "..",
        img.url_gambar.replace(/^\/+/, "")
      );
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // Hapus data dari database (gambar_destinasi akan terhapus otomatis karena ON DELETE CASCADE)
    const [result] = await pool.query(
      "DELETE FROM destinasi_wisata WHERE id = ?",
      [id]
    );

    res.json({ message: "Destinasi berhasil dihapus." });
  } catch (err) {
    console.error("Gagal menghapus destinasi:", err);
    res.status(500).json({ message: "Gagal menghapus data dari database." });
  }
};

// Tambah gambar ke destinasi
const tambahGambarDestinasi = async (req, res) => {
  const { id } = req.params;

  try {
    // Cek apakah destinasi ada
    const [destinasi] = await pool.query(
      "SELECT * FROM destinasi_wisata WHERE id = ?",
      [id]
    );

    if (destinasi.length === 0) {
      // Hapus file yang sudah diupload jika destinasi tidak ditemukan
      if (req.files && req.files.length > 0) {
        req.files.forEach((file) => {
          fs.unlinkSync(file.path);
        });
      }
      return res.status(404).json({ message: "Destinasi tidak ditemukan." });
    }

    // Jika tidak ada file yang diupload
    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ message: "Tidak ada gambar yang diupload." });
    }

    // Simpan gambar ke database
    const gambarValues = req.files.map((file) => [
      id,
      `/uploads/destinasi/${file.filename}`,
    ]);

    await pool.query(
      "INSERT INTO gambar_destinasi (destinasi_id, url_gambar) VALUES ?",
      [gambarValues]
    );

    res.status(201).json({
      message: "Gambar berhasil ditambahkan",
      data: {
        destinasi_id: id,
        gambar: req.files.map((file) => `/uploads/destinasi/${file.filename}`),
      },
    });
  } catch (err) {
    console.error("Gagal menambahkan gambar:", err);
    res.status(500).json({ message: "Gagal menyimpan gambar ke database." });
  }
};

// Hapus gambar dari destinasi
const hapusGambarDestinasi = async (req, res) => {
  const { id, gambar_id } = req.params;

  try {
    // Cek apakah gambar ada dan terkait dengan destinasi yang benar
    const [gambar] = await pool.query(
      "SELECT * FROM gambar_destinasi WHERE id = ? AND destinasi_id = ?",
      [gambar_id, id]
    );

    if (gambar.length === 0) {
      return res.status(404).json({ message: "Gambar tidak ditemukan." });
    }

    // Hapus file fisik
    const imagePath = path.join(
      __dirname,
      "..",
      "..",
      gambar[0].url_gambar.replace(/^\/+/, "")
    );
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    // Hapus dari database
    await pool.query("DELETE FROM gambar_destinasi WHERE id = ?", [gambar_id]);

    res.json({ message: "Gambar berhasil dihapus." });
  } catch (err) {
    console.error("Gagal menghapus gambar:", err);
    res.status(500).json({ message: "Gagal menghapus gambar dari database." });
  }
};

const updateGambarUtama = async (req, res) => {
  const { id } = req.params;
  const { gambar_utama } = req.body;

  if (!gambar_utama) {
    return res.status(400).json({ message: "URL gambar utama diperlukan." });
  }

  try {
    const [cekDestinasi] = await pool.query(
      "SELECT * FROM destinasi_wisata WHERE id = ?",
      [id]
    );

    if (cekDestinasi.length === 0) {
      return res.status(404).json({ message: "Destinasi tidak ditemukan." });
    }

    // Simpan URL gambar ke kolom gambar_utama
    await pool.query(
      "UPDATE destinasi_wisata SET gambar_utama = ? WHERE id = ?",
      [gambar_utama, id]
    );

    res.json({
      message: "Thumbnail berhasil diperbarui.",
      data: {
        id,
        gambar_utama,
      },
    });
  } catch (err) {
    console.error("Gagal update gambar utama:", err);
    res.status(500).json({ message: "Gagal memperbarui gambar utama." });
  }
};

// Ambil semua gambar milik destinasi
const getGambarDestinasi = async (req, res) => {
  const { id } = req.params;

  try {
    const [gambar] = await pool.query(
      "SELECT * FROM gambar_destinasi WHERE destinasi_id = ?",
      [id]
    );

    res.json({ data: gambar });
  } catch (err) {
    console.error("Gagal mengambil gambar:", err);
    res.status(500).json({ message: "Gagal mengambil gambar dari database." });
  }
};

module.exports = {
  tambahDestinasi,
  getAllDestinasi,
  getDestinasiById,
  editDestinasi,
  deleteDestinasi,
  tambahGambarDestinasi,
  hapusGambarDestinasi,
  updateGambarUtama,
  getGambarDestinasi,
};
