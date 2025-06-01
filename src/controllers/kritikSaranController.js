const KritikSaran = require('../models/kritikSaranModel');

// Tambah kritik/saran baru
exports.addKritikSaran = async (req, res) => {
  try {
    const { nama, email, pesan } = req.body;

    // Validasi input
    if (!nama || !email || !pesan) {
      return res.status(400).json({
        status: 'error',
        message: 'Nama, email, dan pesan diperlukan'
      });
    }

    // Buat kritik/saran baru
    const newKritikSaran = await KritikSaran.create(nama, email, pesan);

    res.status(201).json({
      status: 'success',
      message: 'Kritik/saran berhasil dikirim',
      data: newKritikSaran
    });
  } catch (error) {
    console.error('Error menambahkan kritik/saran:', error);
    res.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan pada server'
    });
  }
};

// Ambil semua kritik/saran
exports.getAllKritikSaran = async (req, res) => {
  try {
    const kritikSaran = await KritikSaran.getAll();

    res.status(200).json({
      status: 'success',
      data: kritikSaran
    });
  } catch (error) {
    console.error('Error mendapatkan kritik/saran:', error);
    res.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan pada server'
    });
  }
};

// Hapus kritik/saran
exports.deleteKritikSaran = async (req, res) => {
  try {
    const { id } = req.params;

    await KritikSaran.delete(id);

    res.status(200).json({
      status: 'success',
      message: 'Kritik/saran berhasil dihapus'
    });
  } catch (error) {
    console.error('Error menghapus kritik/saran:', error);
    res.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan pada server'
    });
  }
};