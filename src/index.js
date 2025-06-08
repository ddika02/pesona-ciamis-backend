const express = require('express');
const cors = require('cors');
const path = require('path');
const { testConnection } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const destinasiRoutes = require('./routes/destinasiRoutes');
const kritikSaranRoutes = require('./routes/kritikSaranRoutes');
const pageRoutes = require('./routes/pageRoutes');
const adminRoutes = require('./routes/adminRoutes');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Test koneksi database
testConnection();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', destinasiRoutes);
app.use('/api', kritikSaranRoutes);
app.use('/api', pageRoutes);
app.use('/api/admin', adminRoutes);

// Route default
app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'Selamat datang di API Pesona Ciamis'
  });
});

// Middleware untuk menangani route yang tidak ditemukan
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route tidak ditemukan'
  });
});

// Middleware untuk menangani error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Terjadi kesalahan pada server'
  });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});