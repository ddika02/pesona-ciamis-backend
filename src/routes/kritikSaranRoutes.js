const express = require('express');
const kritikSaranController = require('../controllers/kritikSaranController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Tambah kritik/saran baru (public)
router.post('/kritik-saran', kritikSaranController.addKritikSaran);

// Ambil semua kritik/saran (admin only)
router.get('/kritik-saran', authMiddleware.protect, kritikSaranController.getAllKritikSaran);

// Hapus kritik/saran (admin only)
router.delete('/kritik-saran/:id', authMiddleware.protect, kritikSaranController.deleteKritikSaran);

module.exports = router;