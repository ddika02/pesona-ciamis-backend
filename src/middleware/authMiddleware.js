const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.protect = async (req, res, next) => {
  try {
    // Cek apakah ada token
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'Anda tidak memiliki akses. Silakan login terlebih dahulu.'
      });
    }

    // Verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Simpan informasi user di req
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        status: 'error',
        message: 'Token tidak valid'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        status: 'error',
        message: 'Token telah kedaluwarsa. Silakan login kembali.'
      });
    }

    console.error('Error autentikasi:', error);
    res.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan pada server'
    });
  }
};

// Tambahkan fungsi restrictTo untuk membatasi akses berdasarkan role
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // Periksa apakah role user ada dalam daftar roles yang diizinkan
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'error',
        message: 'Anda tidak memiliki izin untuk melakukan operasi ini'
      });
    }
    next();
  };
};