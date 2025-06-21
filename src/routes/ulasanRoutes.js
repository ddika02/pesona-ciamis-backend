const express = require("express");
const router = express.Router();
const {
  tambahUlasan,
  getUlasanByDestinasiId,
  hapusUlasan
} = require("../controllers/ulasanController");
const authMiddleware = require("../middleware/authMiddleware");

// Tambah ulasan untuk destinasi
router.post("/destinasi/:destinasi_id/ulasan", tambahUlasan);

// Ambil semua ulasan untuk destinasi tertentu
router.get("/destinasi/:destinasi_id/ulasan", getUlasanByDestinasiId);

// Hapus ulasan (hanya admin)
router.delete("/ulasan/:id", authMiddleware.protect, authMiddleware.restrictTo('admin'), hapusUlasan);

module.exports = router;