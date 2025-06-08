-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 08, 2025 at 11:54 PM
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
(1, 'Pantai Pangandaran', 'Jl. Pantai Pangandaran, Ciamis', 'Pantai terkenal di Ciamis', 'Pemandangan laut yang indah', 'Toilet, Parkir, Warung Makan', 'Rp 10.000 per orang', 'Pantai dengan pasir putih dan ombak yang cocok untuk berselancar', '/uploads/destinasi/destinasi-1749418847295-951588278.webp', '2025-06-08 21:03:40', '2025-06-08 21:40:47'),
(3, '\"Ciung Wanara\"', '\"Jalan Raya Ciamis-Banjar, Ciamis\"', '\"Tempat bersejarah dari kerajaan Galuh\"', '\"Pemandangan alam yang indah dan nilai sejarah\"', '\"Toilet, Parkir, Tempat Ibadah\"', '\"Rp 10.000 / orang\"', '\"Objek wisata budaya dan sejarah di Ciamis\"', '/uploads/destinasi/destinasi-1749418143081-254740572.webp', '2025-06-08 21:29:03', '2025-06-08 21:29:03');

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

--
-- Dumping data for table `gambar_destinasi`
--

INSERT INTO `gambar_destinasi` (`id`, `destinasi_id`, `url_gambar`, `created_at`) VALUES
(2, 1, '/uploads/destinasi/destinasi-1749419434780-32710436.webp', '2025-06-08 21:50:34');

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
(1, 'tentang-kami', 'Tentang Kami', '<h1>Tentang Pesona Ciamis</h1><p>Pesona Ciamis adalah platform yang menyediakan informasi tentang destinasi wisata di Kabupaten Ciamis.</p>', '2025-06-08 14:18:32', '2025-06-08 14:18:32'),
(2, 'kontak', 'Kontak', '<h1>Kontak Kami</h1><p>Hubungi kami melalui email: info@pesonaciamis.com</p>', '2025-06-08 14:18:32', '2025-06-08 14:18:32'),
(3, 'kebijakan-privasi', 'Kebijakan Privasi', '<h1>Kebijakan Privasi</h1><p>Kebijakan privasi Pesona Ciamis...</p>', '2025-06-08 14:18:32', '2025-06-08 14:18:32');

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
(1, 'admin', 'admin@pesonaciamis.com', '$2b$10$.0PTtjZT.JHaCpxbzT2vyuDGSjEpl/z8SAZlR45cd5qcT5hHzoqAS', 'user', '2025-06-08 19:56:03'),
(2, 'user1', 'user1@pesonaciamis.com', '$2b$10$R1vRASgPWQT/dsMwe9zyz.0O2DkejiAk4O7h2l1DHdoqJBg4TpLmm', 'user', '2025-06-08 19:56:03'),
(3, 'user2', 'user2@pesonaciamis.com', '$2b$10$JpzKrrYyHHfkdt07Gtt36ucpMieNBAaEe2VEvQwF9kn2jDjLNWafi', 'user', '2025-06-08 19:56:03');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `kritik_saran`
--
ALTER TABLE `kritik_saran`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pages`
--
ALTER TABLE `pages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `gambar_destinasi`
--
ALTER TABLE `gambar_destinasi`
  ADD CONSTRAINT `gambar_destinasi_ibfk_1` FOREIGN KEY (`destinasi_id`) REFERENCES `destinasi_wisata` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
