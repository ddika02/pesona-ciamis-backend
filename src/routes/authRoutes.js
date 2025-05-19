const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Route login
router.post('/login', authController.login);

// Route untuk mendapatkan profil (protected route)
router.get('/profile', authMiddleware.protect, authController.getProfile);

module.exports = router;