-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 05, 2021 at 01:22 PM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 7.4.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacationdb`
--
CREATE DATABASE IF NOT EXISTS `vacationdb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vacationdb`;

-- --------------------------------------------------------

--
-- Table structure for table `follows`
--

CREATE TABLE `follows` (
  `userId` int(11) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `follows`
--

INSERT INTO `follows` (`userId`, `vacationId`) VALUES
(9, 2),
(4, 4);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `uuid` char(36) CHARACTER SET utf8 DEFAULT NULL,
  `firstName` varchar(30) NOT NULL,
  `lastName` varchar(30) NOT NULL,
  `userName` varchar(30) NOT NULL,
  `password` varchar(128) CHARACTER SET utf8 NOT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `uuid`, `firstName`, `lastName`, `userName`, `password`, `isAdmin`) VALUES
(1, 'dfgh552154fh-fghf51g4h1-daaa54fr', 'Odai', 'Wattad', 'odaiwa12', '123456', 1),
(4, '34205a3f-916c-4e8a-9ba5-dd3de4f826fb', 'Moshi', 'Ofnik', 'moshiko1', '8493ce9a85a452088be658631708cc193b072763f07cf234f06adcefeb4ee569ddf9f69a2cd3f4484435f339c33aea50f99b5324e38a2129cc1da59f9c473207', 0),
(8, '88d00dde-9ce5-4166-bbeb-cc957f0819d6', 'Kipi', 'Bin-Kipod', 'kipode', '0ff58575da6dffef7e8681141e7aa23d79d1ab2df9a6eb7b6c5e5930a9505ff3a691f4aeb619fa355a697fc57caa9da046c9a2520b8ad55762c93ce9dafad70b', 1),
(9, 'd4a10298-afbd-4531-907c-004ef2b0b5ac', 'Moshi', 'Ofnik', 'moshiko', '8493ce9a85a452088be658631708cc193b072763f07cf234f06adcefeb4ee569ddf9f69a2cd3f4484435f339c33aea50f99b5324e38a2129cc1da59f9c473207', 0);

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `destination` varchar(50) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` decimal(11,0) NOT NULL,
  `description` varchar(300) NOT NULL,
  `img` varchar(400) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `destination`, `startDate`, `endDate`, `price`, `description`, `img`) VALUES
(2, 'Beer-Sheva', '2021-09-06', '2021-09-14', '340', 'Beer-Sheva is one of the Cities that is Evolving in Isreal.', ''),
(4, 'Eilat', '2021-07-17', '2021-07-21', '345', 'Eilat is the best city for tourist in Israel', '263a7f3c-5630-4b07-8106-44b116dc691bundefined'),
(5, 'Rio-De Janeiro', '2021-09-16', '2021-09-17', '540', 'Best City in Barzil.\r\n', ''),
(6, 'Tokyo', '2021-09-19', '2021-09-21', '670', 'Welcome to JDM!!!!!', ''),
(7, 'Lisbon', '2021-09-20', '2021-09-22', '260', 'in this city there\'s a club called Sporting Lisbon where Cristiano Ronaldo started his career.', ''),
(8, 'Eilat', '1010-05-05', '1010-05-05', '345', 'ghfjfghj', '686bc402-09e1-472d-aa8e-b42177dd7bdfundefined');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `follows`
--
ALTER TABLE `follows`
  ADD KEY `userId` (`userId`),
  ADD KEY `vacationId` (`vacationId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `follows`
--
ALTER TABLE `follows`
  ADD CONSTRAINT `follows_ibfk_1` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `follows_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
