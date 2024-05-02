-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 25, 2024 at 07:05 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `blog_application`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(225) DEFAULT NULL,
  `parent_cat_id` int(11) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `is_deleted` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `parent_cat_id`, `created_at`, `is_deleted`) VALUES
(1, 'test category', 0, NULL, 0),
(2, 'abcd', 0, NULL, 0),
(3, 'abcd', 0, NULL, 0),
(4, 'test with parent', 0, NULL, 0),
(5, 'dwf3', 0, NULL, 0),
(6, 'jwqh', 0, NULL, 0),
(7, 'chbewj', 0, NULL, 0),
(8, 'dd', 0, NULL, 0),
(9, 'ewfwef', 0, NULL, 0),
(10, 'last', 0, NULL, 0),
(11, '2dkj23b', 0, NULL, 0),
(12, 'ewf3', 0, NULL, 0),
(13, 'd2e', 0, NULL, 0),
(14, 'ewfwef', 10, NULL, 0),
(15, 'dcsdv', 12, NULL, 0),
(16, 'efewf', 10, NULL, 0),
(17, 'wdqwd', 10, NULL, 0),
(18, 'scws', 0, NULL, 0),
(19, '1234', 19, NULL, 0),
(20, 'aaaaa', 0, NULL, 1),
(21, 'fgbd', 20, NULL, 1),
(22, 'cwcwqaaaa', 17, NULL, 1),
(23, 'ferfgergerg', 18, NULL, 0),
(24, 'fsf', 19, NULL, 1),
(25, 'test', 18, NULL, 0),
(26, 'test', 23, NULL, 1),
(27, 'test again', 1, NULL, 0),
(28, 'ge', 1, NULL, 0),
(29, 'SDD', 23, NULL, 0),
(30, 'hvvh', 32, NULL, 0),
(31, 'sjcb wegerg', 31, NULL, 0),
(32, 'testagain', 33, NULL, 0),
(33, 'testupdate', 0, NULL, 0),
(34, 'jhcvw ehjcvw', 1, NULL, 0),
(35, 'dwe', 16, NULL, 0),
(36, 'dcwecw', 19, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tag`
--

CREATE TABLE `tag` (
  `id` int(11) NOT NULL,
  `name` varchar(225) DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tag`
--

INSERT INTO `tag` (`id`, `name`, `is_deleted`) VALUES
(1, 'cwec', 0),
(2, 'dwwq', 0),
(3, 'dqwdwq', 0),
(4, 'cvnjdsn', 0),
(5, 'ji', 0),
(6, 'nin', 1),
(7, 'cccv', 0),
(8, 'vvvv', 0),
(9, 'kmm', 0),
(10, 'ojo', 0),
(11, 'aaaa', 1),
(12, 'mm', 1),
(13, 'csccascsa', 0),
(14, 'csa', 0),
(15, 'scsc', 0),
(16, 'vefew', 0),
(17, 'dfefer', 0),
(18, 'test1', 1),
(19, 'grtgrt', 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `role` varchar(225) DEFAULT NULL,
  `token` text DEFAULT NULL,
  `first_name` varchar(225) DEFAULT NULL,
  `last_name` varchar(225) DEFAULT NULL,
  `email` varchar(225) DEFAULT NULL,
  `password` text DEFAULT NULL,
  `address` text DEFAULT NULL,
  `ref_person` varchar(225) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `city` varchar(225) DEFAULT NULL,
  `image` text DEFAULT NULL,
  `tc_status` tinyint(1) DEFAULT NULL,
  `otp` varchar(225) DEFAULT NULL,
  `otp_created_at` datetime DEFAULT NULL,
  `is_deleted` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `role`, `token`, `first_name`, `last_name`, `email`, `password`, `address`, `ref_person`, `date_of_birth`, `city`, `image`, `tc_status`, `otp`, `otp_created_at`, `is_deleted`) VALUES
(8, NULL, NULL, 'sdfwe', 'wedbw', 'wduybv2u@bvjhbv.cub', 'undefined', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(9, NULL, NULL, 'test', 'last_name', 'test@gmail.com', '$2b$10$afh0Ke.K0Zoug/2fx.fhmu0g4zr1FJXcvAAn.usN4Mm7JJzV7Fwh.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(10, NULL, NULL, 'First Name', 'Last Name', 'first@gmail.com', '$2b$10$YzWIRPSxpmpLsSbLRPWn/eXrn8s3PL6qIntVonpr/m1b5FMVoKPa2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tag`
--
ALTER TABLE `tag`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `tag`
--
ALTER TABLE `tag`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
