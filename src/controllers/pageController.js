const Page = require('../models/pageModel');

// Ambil halaman berdasarkan slug
exports.getPage = async (req, res) => {
  try {
    const { slug } = req.params;

    const page = await Page.getBySlug(slug);

    if (!page) {
      return res.status(404).json({
        status: 'error',
        message: 'Halaman tidak ditemukan'
      });
    }

    res.status(200).json({
      status: 'success',
      data: page
    });
  } catch (error) {
    console.error('Error mendapatkan halaman:', error);
    res.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan pada server'
    });
  }
};

// Update konten halaman
exports.updatePage = async (req, res) => {
  try {
    const { slug } = req.params;
    const { title, content } = req.body;

    // Validasi input
    if (!title || !content) {
      return res.status(400).json({
        status: 'error',
        message: 'Judul dan konten diperlukan'
      });
    }

    const updatedPage = await Page.updateContent(slug, title, content);

    res.status(200).json({
      status: 'success',
      message: 'Halaman berhasil diupdate',
      data: updatedPage
    });
  } catch (error) {
    console.error('Error mengupdate halaman:', error);
    res.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan pada server'
    });
  }
};