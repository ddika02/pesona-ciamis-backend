const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// Pastikan direktori upload ada
const uploadDir = process.env.UPLOAD_PATH || './uploads';
const destinasiDir = path.join(uploadDir, 'destinasi');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

if (!fs.existsSync(destinasiDir)) {
  fs.mkdirSync(destinasiDir, { recursive: true });
}

// Konfigurasi penyimpanan
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, destinasiDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'destinasi-' + uniqueSuffix + ext);
  }
});

// Filter file (hanya izinkan gambar)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipe file tidak didukung. Hanya JPEG, JPG, PNG, dan WEBP yang diizinkan.'), false);
  }
};

// Konfigurasi upload untuk gambar utama
const uploadGambarUtama = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
}).single('gambar_utama');

// Konfigurasi upload untuk multiple gambar
const uploadMultipleGambar = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
}).array('gambar', 5); // Maksimal 5 gambar

module.exports = {
  uploadGambarUtama,
  uploadMultipleGambar,
  destinasiDir
};