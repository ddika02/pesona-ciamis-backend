const express = require("express");
const router = express.Router();
const {
  tambahDestinasi,
  editDestinasi,
  getAllDestinasi,
  getDestinasiById,
  deleteDestinasi
} = require("../controllers/destinasiController");

//Tambah destinasi
router.post("/destinasi", tambahDestinasi);

// Ambil satu destinasi berdasarkan ID
router.get("/destinasi/:id", getDestinasiById);

// Ambil semua destinasi
router.get("/destinasi", getAllDestinasi);

//Edit destinasi (lewat ID)
router.put("/destinasi/:id", editDestinasi);

// Hapus destinasi
router.delete('/:id', deleteDestinasi);

module.exports = router;
