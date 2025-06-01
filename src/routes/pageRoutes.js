const express = require('express');
const pageController = require('../controllers/pageController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Ambil halaman berdasarkan slug (public)
router.get('/pages/:slug', pageController.getPage);

// Update konten halaman (admin only)
router.put('/pages/:slug', authMiddleware.protect, pageController.updatePage);

module.exports = router;