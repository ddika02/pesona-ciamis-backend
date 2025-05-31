const { pool } = require("../config/db");

// tambah data controller
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

  const query = `
    INSERT INTO destinasi_wisata 
    (nama_destinasi, alamat, asal_usul, daya_tarik, fasilitas, harga_jam, deskripsi)
    VALUES (?, ?, ?, ?, ?, ?, ?)
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
    ]);

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
      },
    });
  } catch (err) {
    console.error("Gagal menambahkan destinasi:", err);
    res.status(500).json({ message: "Gagal menyimpan data ke database." });
  }
};

// Ambil satu data destinasi berdasarkan ID
const getDestinasiById = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query(
      "SELECT * FROM destinasi_wisata WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Destinasi tidak ditemukan." });
    }

    res.json({ data: rows[0] });
  } catch (err) {
    console.error("Gagal mengambil data destinasi:", err);
    res.status(500).json({ message: "Gagal mengambil data dari database." });
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

//Edit Data Controller
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

  const query = `
    UPDATE destinasi_wisata SET 
      nama_destinasi = ?, 
      alamat = ?, 
      asal_usul = ?, 
      daya_tarik = ?, 
      fasilitas = ?, 
      harga_jam = ?, 
      deskripsi = ? 
    WHERE id = ?
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
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Destinasi tidak ditemukan." });
    }

    res.json({ message: "Destinasi berhasil diperbarui." });
  } catch (err) {
    console.error("Gagal memperbarui destinasi:", err);
    res.status(500).json({ message: "Gagal memperbarui data di database." });
  }
};

// Hapus destinasi berdasarkan ID
const deleteDestinasi = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query(
      "DELETE FROM destinasi_wisata WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Destinasi tidak ditemukan." });
    }

    res.json({ message: "Destinasi berhasil dihapus." });
  } catch (err) {
    console.error("Gagal menghapus destinasi:", err);
    res.status(500).json({ message: "Gagal menghapus data dari database." });
  }
};

module.exports = {
  getAllDestinasi,
  getDestinasiById,
  tambahDestinasi,
  editDestinasi,
   deleteDestinasi
};
