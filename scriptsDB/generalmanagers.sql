-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-11-2022 a las 21:15:34
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bigballersleague`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `generalmanagers`
--

CREATE TABLE `generalmanagers` (
  `gmID` int(11) NOT NULL,
  `FirstName` varchar(60) NOT NULL,
  `LastNames` varchar(60) NOT NULL,
  `PhoneNum` varchar(20) NOT NULL,
  `Email` varchar(60) NOT NULL,
  `BirthDate` date NOT NULL,
  `Gender` enum('M','F','O') NOT NULL,
  `Country` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `generalmanagers`
--
ALTER TABLE `generalmanagers`
  ADD PRIMARY KEY (`gmID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `generalmanagers`
--
ALTER TABLE `generalmanagers`
  MODIFY `gmID` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
