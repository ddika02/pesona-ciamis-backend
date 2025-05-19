const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Controller untuk login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validasi input
    if (!username || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Username dan password diperlukan'
      });
    }

    // Cari user berdasarkan username
    const user = await User.findByUsername(username);
    console.log('User ditemukan:', user);

    // Jika user tidak ditemukan
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Username atau password salah'
      });
    }

    // Verifikasi password
    console.log('Password dari request:', password);
    console.log('Password dari database:', user.password);
    const isPasswordValid = await User.verifyPassword(password, user.password);
    console.log('Password valid:', isPasswordValid);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        status: 'error',
        message: 'Username atau password salah'
      });
    }

    // Buat token JWT
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // Kirim respons dengan token
    res.status(200).json({
      status: 'success',
      message: 'Login berhasil',
      data: {
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        },
        token
      }
    });
  } catch (error) {
    console.error('Error login:', error);
    res.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan pada server'
    });
  }
};

// Controller untuk mendapatkan profil user
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User tidak ditemukan'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (error) {
    console.error('Error mendapatkan profil:', error);
    res.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan pada server'
    });
  }
};