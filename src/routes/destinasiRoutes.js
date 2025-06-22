const express = require("express");
const multer = require("multer"); // Tambahkan import multer
const router = express.Router();
const {
  tambahDestinasi,
  editDestinasi,
  getAllDestinasi,
  getDestinasiById,
  deleteDestinasi,
  tambahGambarDestinasi,
  hapusGambarDestinasi,
  updateGambarUtama,
  getGambarDestinasi,
} = require("../controllers/destinasiController");
const {
  uploadGambarUtama,
  uploadMultipleGambar,
} = require("../middleware/uploadMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

// Middleware untuk menangani error upload
const handleUploadError = (req, res, next) => {
  return (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({
        message: `Error upload: ${err.message}`,
      });
    } else if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
    next();
  };
};

// Tambah destinasi dengan gambar utama
router.post(
  "/destinasi",
  authMiddleware.protect,
  (req, res, next) => {
    uploadGambarUtama(req, res, (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      next();
    });
  },
  tambahDestinasi
);

//tambah destinasi tanpa gambar utama
router.post("/destinasi/data", authMiddleware.protect, tambahDestinasi);

// Ambil satu destinasi berdasarkan ID
router.get("/destinasi/:id", getDestinasiById);

// Ambil semua destinasi
router.get("/destinasi", getAllDestinasi);

// Edit destinasi dengan gambar utama
router.put(
  "/destinasi/:id",
  authMiddleware.protect,
  (req, res, next) => {
    uploadGambarUtama(req, res, (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      next();
    });
  },
  editDestinasi
);

// Hapus destinasi
router.delete("/destinasi/:id", authMiddleware.protect, deleteDestinasi);

// Tambah gambar ke destinasi
router.post(
  "/destinasi/:id/gambar",
  authMiddleware.protect,
  (req, res, next) => {
    uploadMultipleGambar(req, res, (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      next();
    });
  },
  tambahGambarDestinasi
);

// Hapus gambar dari destinasi
router.delete(
  "/destinasi/:id/gambar/:gambar_id",
  authMiddleware.protect,
  hapusGambarDestinasi
);

// Update gambar utama destinasi
router.put(
  "/destinasi/:id/gambar-utama",
  authMiddleware.protect,
  (req, res, next) => {
    uploadGambarUtama(req, res, (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      next();
    });
  },
  updateGambarUtama
);

// Ambil semua gambar berdasarkan ID destinasi
router.get("/gambar/:id", getGambarDestinasi); // Hapus authMiddleware.protect

module.exports = router;

router.put(
  "/destinasi/:id/gambar-utama",
  authMiddleware.protect,
  updateGambarUtama // ⛔ tanpa multer middleware
);
