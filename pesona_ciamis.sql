-- Buat database jika belum ada
CREATE DATABASE IF NOT EXISTS pesona_ciamis;

USE pesona_ciamis;

-- Tabel users
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'user') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel destinasi_wisata
CREATE TABLE IF NOT EXISTS destinasi_wisata (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama_destinasi VARCHAR(100) NOT NULL,
  alamat TEXT NOT NULL,
  asal_usul TEXT,
  daya_tarik TEXT,
  fasilitas TEXT,
  harga_jam VARCHAR(100),
  deskripsi TEXT,
  gambar_utama VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabel gambar_destinasi (untuk menyimpan multiple gambar per destinasi)
CREATE TABLE IF NOT EXISTS gambar_destinasi (
  id INT AUTO_INCREMENT PRIMARY KEY,
  destinasi_id INT NOT NULL,
  url_gambar VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (destinasi_id) REFERENCES destinasi_wisata(id) ON DELETE CASCADE
);

-- Tabel kritik_saran
CREATE TABLE IF NOT EXISTS kritik_saran (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  pesan TEXT NOT NULL,
  status ENUM('baru', 'dibaca', 'diarsipkan') DEFAULT 'baru',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel pages (untuk halaman statis)
CREATE TABLE IF NOT EXISTS pages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(100) NOT NULL UNIQUE,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tambahkan data awal untuk halaman statis
INSERT INTO pages (slug, title, content) VALUES
('tentang-kami', 'Tentang Kami', '<h1>Tentang Pesona Ciamis</h1><p>Pesona Ciamis adalah platform yang menyediakan informasi tentang destinasi wisata di Kabupaten Ciamis.</p>'),
('kontak', 'Kontak', '<h1>Kontak Kami</h1><p>Hubungi kami melalui email: info@pesonaciamis.com</p>'),
('kebijakan-privasi', 'Kebijakan Privasi', '<h1>Kebijakan Privasi</h1><p>Kebijakan privasi Pesona Ciamis...</p>');