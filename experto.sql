-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-12-2025 a las 07:16:57
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `experto`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `favoritos_peliculas`
--

CREATE TABLE `favoritos_peliculas` (
  `id_favorito` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_pelicula` int(11) NOT NULL,
  `resena` text DEFAULT NULL,
  `puntuacion` int(11) DEFAULT NULL CHECK (`puntuacion` between 1 and 5)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `favoritos_peliculas`
--

INSERT INTO `favoritos_peliculas` (`id_favorito`, `id_usuario`, `id_pelicula`, `resena`, `puntuacion`) VALUES
(12, 2, 3, 'me encanto!', 5),
(14, 2, 2, NULL, NULL),
(15, 2, 5, NULL, NULL),
(16, 3, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `peliculas`
--

CREATE TABLE `peliculas` (
  `id_pelicula` int(11) NOT NULL,
  `titulo` varchar(150) NOT NULL,
  `director` varchar(100) DEFAULT NULL,
  `actor_principal` varchar(100) DEFAULT NULL,
  `genero` varchar(50) DEFAULT NULL,
  `anio_estreno` int(11) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `img_id` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `peliculas`
--

INSERT INTO `peliculas` (`id_pelicula`, `titulo`, `director`, `actor_principal`, `genero`, `anio_estreno`, `descripcion`, `img_id`) VALUES
(1, 'Inception', 'Christopher Nolan', 'Leonardo DiCaprio', 'Ciencia ficción', 2010, 'Un ladrón que roba información entrando en los sueños debe lograr una misión imposible: implantar una idea.', NULL),
(2, 'The Dark Knight', 'Christopher Nolanuwu', 'Christian Bale', 'Acción', 2008, 'Batman enfrenta al Joker, un criminal caótico que busca desatar el caos en Gotham.', 'iauh0qefxyx1fgdk8twt'),
(3, 'Titanic 2', 'James Cameron', 'Leonardo DiCaprio', 'Romance', 1997, 'Historia de amor entre Jack y Rose a bordo del trágico RMS Titanic.', NULL),
(4, 'The Matrix', 'Lana Wachowski y Lilly Wachowski', 'Keanu Reeves', 'Ciencia ficción', 1999, 'Un hacker descubre la verdad sobre la realidad y lucha contra las máquinas.', NULL),
(5, 'Forrest Gump', 'Robert Zemeckis', 'Tom Hanks', 'Drama', 1994, 'Forrest narra su extraordinaria vida mientras se cruza con grandes eventos históricos.', NULL),
(6, 'Interstellar', 'Christopher Nolan', 'Matthew McConaughey', 'Ciencia ficción', 2014, 'Un grupo de astronautas viaja a través de un agujero para buscar un nuevo hogar para la humanidad.', NULL),
(7, 'Pulp Fiction', 'Quentin Tarantino', 'John Travolta', 'Crimen', 1994, 'Historias entrelazadas de crimen, mafia y situaciones absurdas en Los Ángeles.', NULL),
(8, 'The Avengers', 'Joss Whedon', 'Robert Downey Jr.', 'Acción', 2012, 'Los héroes más poderosos de la Tierra se unen para detener una invasión alienígena.', NULL),
(9, 'La La Land', 'Damien Chazelle', 'Emma Stone', 'Musical', 2016, 'Una actriz y un músico luchan por sus sueños mientras viven un romance inolvidable.', NULL),
(10, 'Joker', 'Todd Phillips', 'Joaquin Phoenix', 'Drama', 2019, 'Historia de origen del icónico villano de DC Comics, mostrando su descenso a la locura.', NULL),
(12, 'The Dark Knight', 'Christopher Nolanuwu', 'Christian Bale', 'sisisisis', NULL, 'hola', NULL),
(16, 'gorditos', '2', '2', '2', 2, '2', 'pm7rrf8ic23rofkurxqi');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `usuario` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `rol` enum('admin','user') NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `password`, `rol`) VALUES
(1, 'jazmin', '81dc9bdb52d04dc20036dbd8313ed055', 'user'),
(2, 'flavia', '81dc9bdb52d04dc20036dbd8313ed055', 'user'),
(3, 'admin', '81dc9bdb52d04dc20036dbd8313ed055', 'admin');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `favoritos_peliculas`
--
ALTER TABLE `favoritos_peliculas`
  ADD PRIMARY KEY (`id_favorito`),
  ADD UNIQUE KEY `id_usuario` (`id_usuario`,`id_pelicula`),
  ADD KEY `id_pelicula` (`id_pelicula`);

--
-- Indices de la tabla `peliculas`
--
ALTER TABLE `peliculas`
  ADD PRIMARY KEY (`id_pelicula`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `favoritos_peliculas`
--
ALTER TABLE `favoritos_peliculas`
  MODIFY `id_favorito` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `peliculas`
--
ALTER TABLE `peliculas`
  MODIFY `id_pelicula` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `favoritos_peliculas`
--
ALTER TABLE `favoritos_peliculas`
  ADD CONSTRAINT `favoritos_peliculas_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `favoritos_peliculas_ibfk_2` FOREIGN KEY (`id_pelicula`) REFERENCES `peliculas` (`id_pelicula`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
