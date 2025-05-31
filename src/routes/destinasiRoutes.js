const express = require('express');
const router = express.Router();
const { tambahDestinasi } = require('../controllers/destinasiController');

router.post('/tambah', tambahDestinasi);

module.exports = router;
