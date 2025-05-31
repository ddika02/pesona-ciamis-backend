const { pool } = require("../config/db");

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

module.exports = { tambahDestinasi };
