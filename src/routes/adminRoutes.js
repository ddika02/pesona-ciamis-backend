const express = require('express');
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Get dashboard data (admin only)
router.get('/dashboard', authMiddleware.protect, adminController.getDashboard);

module.exports = router;