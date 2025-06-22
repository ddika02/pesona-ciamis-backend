-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 21, 2025 at 04:44 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pesona_ciamis`
--

-- --------------------------------------------------------

--
-- Table structure for table `destinasi_wisata`
--

CREATE TABLE `destinasi_wisata` (
  `id` int(11) NOT NULL,
  `nama_destinasi` varchar(100) NOT NULL,
  `alamat` text NOT NULL,
  `asal_usul` text DEFAULT NULL,
  `daya_tarik` text DEFAULT NULL,
  `fasilitas` text DEFAULT NULL,
  `harga_jam` varchar(100) DEFAULT NULL,
  `deskripsi` text DEFAULT NULL,
  `gambar_utama` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `destinasi_wisata`
--

INSERT INTO `destinasi_wisata` (`id`, `nama_destinasi`, `alamat`, `asal_usul`, `daya_tarik`, `fasilitas`, `harga_jam`, `deskripsi`, `gambar_utama`, `created_at`, `updated_at`) VALUES
(2, 'Pantai Pangandaran', 'Jl. Pantai Pangandaran, Ciamis', 'Pantai terkenal di Ciamis', 'Pemandangan laut yang indah', 'Toilet, Parkir, Warung Makan', 'Rp 10.000 per orang', 'Pantai dengan pasir putih dan ombak yang cocok untuk berselancar', '/uploads/destinasi/destinasi-1749986320261-925999309.webp', '2025-06-15 10:57:09', '2025-06-15 11:18:40'),
(3, '\"Ciung Wanara\"', '\"Jalan Raya Ciamis-Banjar, Ciamis\"', '\"Tempat bersejarah dari kerajaan Galuh\"', '\"Pemandangan alam yang indah dan nilai sejarah\"', '\"Toilet, Parkir, Tempat Ibadah\"', '\"Rp 10.000 / orang\"', '\"Objek wisata budaya dan sejarah di Ciamis\"', '/uploads/destinasi/destinasi-1749986036775-492298381.webp', '2025-06-15 11:13:56', '2025-06-15 11:13:56');

-- --------------------------------------------------------

--
-- Table structure for table `gambar_destinasi`
--

CREATE TABLE `gambar_destinasi` (
  `id` int(11) NOT NULL,
  `destinasi_id` int(11) NOT NULL,
  `url_gambar` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kritik_saran`
--

CREATE TABLE `kritik_saran` (
  `id` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `pesan` text NOT NULL,
  `status` enum('baru','dibaca','diarsipkan') DEFAULT 'baru',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kritik_saran`
--

INSERT INTO `kritik_saran` (`id`, `nama`, `email`, `pesan`, `status`, `created_at`) VALUES
(2, 'John Doe', 'john@example.com', 'Website ini sangat membantu untuk menemukan destinasi wisata di Ciamis', 'baru', '2025-06-15 11:01:17');

-- --------------------------------------------------------

--
-- Table structure for table `pages`
--

CREATE TABLE `pages` (
  `id` int(11) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `title` varchar(200) NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pages`
--

INSERT INTO `pages` (`id`, `slug`, `title`, `content`, `created_at`, `updated_at`) VALUES
(1, 'tentang-kami', 'Tentang Kami', '<h1>Tentang Pesona Ciamis</h1><p>Pesona Ciamis adalah platform yang menyediakan informasi tentang destinasi wisata di Kabupaten Ciamis.</p>', '2025-06-15 10:33:44', '2025-06-15 10:33:44'),
(2, 'kontak', 'Kontak', '<h1>Kontak Kami</h1><p>Hubungi kami melalui email: info@pesonaciamis.com</p>', '2025-06-15 10:33:44', '2025-06-15 10:33:44'),
(3, 'kebijakan-privasi', 'Kebijakan Privasi', '<h1>Kebijakan Privasi</h1><p>Kebijakan privasi Pesona Ciamis...</p>', '2025-06-15 10:33:44', '2025-06-15 10:33:44'),
(4, 'about', 'beranda', 'Pesona Ciamis adalah platform untuk mempromosikan pariwisata di Kabupaten Ciamis', '2025-06-15 11:09:26', '2025-06-15 11:10:54');

-- --------------------------------------------------------

--
-- Table structure for table `ulasan_destinasi`
--

CREATE TABLE `ulasan_destinasi` (
  `id` int(11) NOT NULL,
  `destinasi_id` int(11) NOT NULL,
  `nama_pengulas` varchar(100) NOT NULL,
  `rating` int(1) NOT NULL,
  `komentar` text NOT NULL,
  `tanggal` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ulasan_destinasi`
--

INSERT INTO `ulasan_destinasi` (`id`, `destinasi_id`, `nama_pengulas`, `rating`, `komentar`, `tanggal`, `created_at`) VALUES
(1, 2, 'Maulana', 4, 'Buat Yg Mau Wisata Sejarah,Bisa Kesini,Apalagi Karena Sebagian Tempatnya Makem,Tapi Bisa Ngadem Sambil Lihat Kereta Lewat,Bisa Datang Kesini !!', '2025-06-21', '2025-06-21 14:40:14');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','user') DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `role`, `created_at`) VALUES
(2, 'admin', 'admin@gmail.com', '$2b$10$f60yG1.roFmXDjYQrlbKhO0F4f7qKcLHeskniw4tqaFb9GYt1234y', 'admin', '2025-06-15 10:36:19');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `destinasi_wisata`
--
ALTER TABLE `destinasi_wisata`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gambar_destinasi`
--
ALTER TABLE `gambar_destinasi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `destinasi_id` (`destinasi_id`);

--
-- Indexes for table `kritik_saran`
--
ALTER TABLE `kritik_saran`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pages`
--
ALTER TABLE `pages`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `ulasan_destinasi`
--
ALTER TABLE `ulasan_destinasi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `destinasi_id` (`destinasi_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `destinasi_wisata`
--
ALTER TABLE `destinasi_wisata`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `gambar_destinasi`
--
ALTER TABLE `gambar_destinasi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `kritik_saran`
--
ALTER TABLE `kritik_saran`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `pages`
--
ALTER TABLE `pages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `ulasan_destinasi`
--
ALTER TABLE `ulasan_destinasi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `gambar_destinasi`
--
ALTER TABLE `gambar_destinasi`
  ADD CONSTRAINT `gambar_destinasi_ibfk_1` FOREIGN KEY (`destinasi_id`) REFERENCES `destinasi_wisata` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ulasan_destinasi`
--
ALTER TABLE `ulasan_destinasi`
  ADD CONSTRAINT `ulasan_destinasi_ibfk_1` FOREIGN KEY (`destinasi_id`) REFERENCES `destinasi_wisata` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
