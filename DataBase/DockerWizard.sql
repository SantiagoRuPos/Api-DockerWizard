-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: db
-- Tiempo de generación: 13-10-2024 a las 16:42:12
-- Versión del servidor: 8.3.0
-- Versión de PHP: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `DockerWizard`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Cargo_Institucionales`
--

CREATE TABLE `Cargo_Institucionales` (
  `Id_Cargo_Institucional` int NOT NULL,
  `Descripcion_Cargo_Institucional` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `Cargo_Institucionales`
--

INSERT INTO `Cargo_Institucionales` (`Id_Cargo_Institucional`, `Descripcion_Cargo_Institucional`) VALUES
(2, 'Estudiante'),
(3, 'Investigador'),
(1, 'Profesor');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Estado_Proyectos`
--

CREATE TABLE `Estado_Proyectos` (
  `Id_Estado_Proyecto` int NOT NULL,
  `Descripcion_Estado_Proyecto` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `Estado_Proyectos`
--

INSERT INTO `Estado_Proyectos` (`Id_Estado_Proyecto`, `Descripcion_Estado_Proyecto`) VALUES
(1, 'Activo'),
(2, 'Desactivo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Estado_Reportes`
--

CREATE TABLE `Estado_Reportes` (
  `Id_Estado_Reporte` int NOT NULL,
  `Descripcion_Estado_Reporte` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `Estado_Reportes`
--

INSERT INTO `Estado_Reportes` (`Id_Estado_Reporte`, `Descripcion_Estado_Reporte`) VALUES
(1, 'Pendiente'),
(2, 'Revision'),
(3, 'Solucionado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Estado_Usuarios`
--

CREATE TABLE `Estado_Usuarios` (
  `Id_Estado_Usuario` int NOT NULL,
  `Descripcion_Estado_Usuario` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `Estado_Usuarios`
--

INSERT INTO `Estado_Usuarios` (`Id_Estado_Usuario`, `Descripcion_Estado_Usuario`) VALUES
(1, 'Activo'),
(2, 'Inactivo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Nivel_Reportes`
--

CREATE TABLE `Nivel_Reportes` (
  `Id_Nivel_Reporte` int NOT NULL,
  `Descripcion_Nivel_Reporte` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `Nivel_Reportes`
--

INSERT INTO `Nivel_Reportes` (`Id_Nivel_Reporte`, `Descripcion_Nivel_Reporte`) VALUES
(1, 'Nivel 1'),
(2, 'Nivel 2'),
(3, 'Nivel 3');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Programa_Institucional`
--

CREATE TABLE `Programa_Institucional` (
  `Id_Programa_Institucional` int NOT NULL,
  `Descripcion_Programa_Institucional` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `Programa_Institucional`
--

INSERT INTO `Programa_Institucional` (`Id_Programa_Institucional`, `Descripcion_Programa_Institucional`) VALUES
(1, 'Ingeniería Electrónica'),
(3, 'Ingeniería Industrial'),
(2, 'Ingeniería Sistemas'),
(4, 'Tecnologiá en Electronica Industrial'),
(6, 'Tecnología en Producción Industrial'),
(5, 'Tecnología en Sistemas de Información');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Proyectos`
--

CREATE TABLE `Proyectos` (
  `Id_Proyecto` int NOT NULL,
  `Nombre_Proyecto` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Nombre_Proyecto_Acronimo` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Nombre_Usuario_Cygnus` varchar(15) NOT NULL,
  `Rol_Proyecto` int NOT NULL,
  `Nombre_Lider_Proyecto` varchar(150) NOT NULL,
  `Telefono_Lider_Proyecto` varchar(20) NOT NULL,
  `Correo_Institucional_Lider` varchar(100) NOT NULL,
  `Cargo_Institucional_Lider` int NOT NULL,
  `Programa_Academico_Proyecto` int NOT NULL,
  `Semillero_Lider` varchar(20) DEFAULT NULL,
  `Grupo_Investigacion` varchar(20) DEFAULT NULL,
  `Usuario_Registrador_Proyecto` int NOT NULL,
  `Fecha_Registro_Proyecto` date DEFAULT NULL,
  `Fecha_Finalizacion_Proyecto` timestamp NULL DEFAULT NULL,
  `Estado_Proyecto` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `Proyectos`
--

INSERT INTO `Proyectos` (`Id_Proyecto`, `Nombre_Proyecto`, `Nombre_Proyecto_Acronimo`, `Nombre_Usuario_Cygnus`, `Rol_Proyecto`, `Nombre_Lider_Proyecto`, `Telefono_Lider_Proyecto`, `Correo_Institucional_Lider`, `Cargo_Institucional_Lider`, `Programa_Academico_Proyecto`, `Semillero_Lider`, `Grupo_Investigacion`, `Usuario_Registrador_Proyecto`, `Fecha_Registro_Proyecto`, `Fecha_Finalizacion_Proyecto`, `Estado_Proyecto`) VALUES
(1, 'Diseño e Implementación de una aplicación web para la administración de servicios dockerizados sobre el proxy inverso del servidor de investigaciones de la facultad de UNIAJC “DockerWizard”', 'DockeWizard', 'santiagoruiz', 2, 'Santiago Ruiz Posso', '3175273197', 'santiagoruiz@estudiante.uniajc.edu.co', 2, 3, 'SAIDO', 'N-A', 1, '2024-10-13', NULL, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Reportes`
--

CREATE TABLE `Reportes` (
  `Id_Reporte` int NOT NULL,
  `Nombre_Reporte` varchar(50) NOT NULL,
  `Descripcion_Reporte` varchar(250) NOT NULL,
  `Nivel_Reporte` varchar(50) NOT NULL,
  `Estado_Reporte` varchar(100) NOT NULL,
  `Usuario_Registrador_Reporte` varchar(100) NOT NULL,
  `Usuario_Solucionador_Reporte` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Fecha_Solucion_Reporte` timestamp NULL DEFAULT NULL,
  `Comentarios_Reporte` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `Fecha_Registro_Usuario` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `Reportes`
--

INSERT INTO `Reportes` (`Id_Reporte`, `Nombre_Reporte`, `Descripcion_Reporte`, `Nivel_Reporte`, `Estado_Reporte`, `Usuario_Registrador_Reporte`, `Usuario_Solucionador_Reporte`, `Fecha_Solucion_Reporte`, `Comentarios_Reporte`, `Fecha_Registro_Usuario`) VALUES
(1, 'Fallo al restablecer contraseñas en Cygnus', 'No deje restablecer contraseña', 'Nivel 1', 'Pendiente', 'santiagoruiz', NULL, NULL, NULL, '2024-10-13 11:40:47');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Rol_Proyectos`
--

CREATE TABLE `Rol_Proyectos` (
  `Id_Rol_Proyecto` int NOT NULL,
  `Descripcion_Rol_Proyectos` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `Rol_Proyectos`
--

INSERT INTO `Rol_Proyectos` (`Id_Rol_Proyecto`, `Descripcion_Rol_Proyectos`) VALUES
(2, 'Proyecto de Grado'),
(1, 'Proyecto de Investigación');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Rol_Usuarios`
--

CREATE TABLE `Rol_Usuarios` (
  `Id_Rol_Usuarios` int NOT NULL,
  `Descripcion_Rol_Usuarios` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `Rol_Usuarios`
--

INSERT INTO `Rol_Usuarios` (`Id_Rol_Usuarios`, `Descripcion_Rol_Usuarios`) VALUES
(1, 'Root');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Usuarios`
--

CREATE TABLE `Usuarios` (
  `Id_Usuario` int NOT NULL,
  `Tipo_Identificacion_Usuario` varchar(100) NOT NULL,
  `Numero_Identificacion_Usuario` varchar(100) NOT NULL,
  `Nombre_Completo_Usuario` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Correo_Institucional_Usuario` varchar(100) NOT NULL,
  `Numero_Contacto` varchar(25) NOT NULL,
  `Nombre_Usuario` varchar(50) NOT NULL,
  `Password_Usuario` varchar(250) NOT NULL,
  `Nombre_Usuario_Cygnus` varchar(15) NOT NULL,
  `Rol_Usuario` int NOT NULL,
  `Estado_Usuario` int NOT NULL,
  `Conexion_Usuario` varchar(250) DEFAULT NULL,
  `Fecha_Registro_Usuario` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `RenovacionContraseña` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `Usuarios`
--

INSERT INTO `Usuarios` (`Id_Usuario`, `Tipo_Identificacion_Usuario`, `Numero_Identificacion_Usuario`, `Nombre_Completo_Usuario`, `Correo_Institucional_Usuario`, `Numero_Contacto`, `Nombre_Usuario`, `Password_Usuario`, `Nombre_Usuario_Cygnus`, `Rol_Usuario`, `Estado_Usuario`, `Conexion_Usuario`, `Fecha_Registro_Usuario`, `RenovacionContraseña`) VALUES
(1, 'Cédula de Ciudadanía', '1006107630', 'Santiago Ruiz Posso', 'santiagoruiz@estudiante.uniajc.edu.co', '3175273197', 'santiagoruiz', '$2b$10$XdGmPPJ3FBSzOtuRXo7rUOPl6ieVr545Lub47divfF8ehQ95v8INy', 'santiagoruiz', 1, 1, '2024-10-13 11:35:45', '2024-10-13 11:30:37', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `Cargo_Institucionales`
--
ALTER TABLE `Cargo_Institucionales`
  ADD PRIMARY KEY (`Id_Cargo_Institucional`),
  ADD UNIQUE KEY `Descripcion_Cargo_Institucional` (`Descripcion_Cargo_Institucional`);

--
-- Indices de la tabla `Estado_Proyectos`
--
ALTER TABLE `Estado_Proyectos`
  ADD PRIMARY KEY (`Id_Estado_Proyecto`),
  ADD UNIQUE KEY `Descripcion_Estado_Proyecto` (`Descripcion_Estado_Proyecto`);

--
-- Indices de la tabla `Estado_Reportes`
--
ALTER TABLE `Estado_Reportes`
  ADD PRIMARY KEY (`Id_Estado_Reporte`),
  ADD UNIQUE KEY `Descripcion_Estado_Reporte` (`Descripcion_Estado_Reporte`);

--
-- Indices de la tabla `Estado_Usuarios`
--
ALTER TABLE `Estado_Usuarios`
  ADD PRIMARY KEY (`Id_Estado_Usuario`),
  ADD UNIQUE KEY `Descripcion_Estado_Usuario` (`Descripcion_Estado_Usuario`);

--
-- Indices de la tabla `Nivel_Reportes`
--
ALTER TABLE `Nivel_Reportes`
  ADD PRIMARY KEY (`Id_Nivel_Reporte`),
  ADD UNIQUE KEY `Descripcion_Nivel_Reporte` (`Descripcion_Nivel_Reporte`),
  ADD KEY `Descripcion_Nivel_Reporte_2` (`Descripcion_Nivel_Reporte`);

--
-- Indices de la tabla `Programa_Institucional`
--
ALTER TABLE `Programa_Institucional`
  ADD PRIMARY KEY (`Id_Programa_Institucional`),
  ADD UNIQUE KEY `Descripcion_Programa_Institucional` (`Descripcion_Programa_Institucional`);

--
-- Indices de la tabla `Proyectos`
--
ALTER TABLE `Proyectos`
  ADD PRIMARY KEY (`Id_Proyecto`),
  ADD UNIQUE KEY `Nombre_Proyecto` (`Nombre_Proyecto`),
  ADD UNIQUE KEY `Nombre_Proyecto_Acronimo` (`Nombre_Proyecto_Acronimo`),
  ADD KEY `Rol_Proyecto` (`Rol_Proyecto`),
  ADD KEY `Usuario_Registrador_Proyecto` (`Usuario_Registrador_Proyecto`),
  ADD KEY `Estado_Proyecto` (`Estado_Proyecto`),
  ADD KEY `FK_Cargo_Institucional_Lider` (`Cargo_Institucional_Lider`),
  ADD KEY `FK_Programa_Academico_Proyecto` (`Programa_Academico_Proyecto`);

--
-- Indices de la tabla `Reportes`
--
ALTER TABLE `Reportes`
  ADD PRIMARY KEY (`Id_Reporte`),
  ADD KEY `FK_NivelReporte` (`Nivel_Reporte`),
  ADD KEY `FK_EstadoReporte` (`Estado_Reporte`),
  ADD KEY `FK_UsuarioRegistrador` (`Usuario_Registrador_Reporte`),
  ADD KEY `Usuario_Solucionador_Reporte` (`Usuario_Solucionador_Reporte`);

--
-- Indices de la tabla `Rol_Proyectos`
--
ALTER TABLE `Rol_Proyectos`
  ADD PRIMARY KEY (`Id_Rol_Proyecto`),
  ADD UNIQUE KEY `Descripcion_Rol_Proyectos` (`Descripcion_Rol_Proyectos`);

--
-- Indices de la tabla `Rol_Usuarios`
--
ALTER TABLE `Rol_Usuarios`
  ADD PRIMARY KEY (`Id_Rol_Usuarios`),
  ADD UNIQUE KEY `Descripcion_Rol_Usuarios` (`Descripcion_Rol_Usuarios`);

--
-- Indices de la tabla `Usuarios`
--
ALTER TABLE `Usuarios`
  ADD PRIMARY KEY (`Id_Usuario`),
  ADD UNIQUE KEY `Numero_Identificacion_Usuario` (`Numero_Identificacion_Usuario`),
  ADD UNIQUE KEY `Nombre_Usuario` (`Nombre_Usuario`),
  ADD UNIQUE KEY `Nombre_Usuario_Cygnus` (`Nombre_Usuario_Cygnus`),
  ADD KEY `Rol_Usuario` (`Rol_Usuario`),
  ADD KEY `Estado_Usuario` (`Estado_Usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `Cargo_Institucionales`
--
ALTER TABLE `Cargo_Institucionales`
  MODIFY `Id_Cargo_Institucional` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `Estado_Proyectos`
--
ALTER TABLE `Estado_Proyectos`
  MODIFY `Id_Estado_Proyecto` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `Estado_Reportes`
--
ALTER TABLE `Estado_Reportes`
  MODIFY `Id_Estado_Reporte` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `Estado_Usuarios`
--
ALTER TABLE `Estado_Usuarios`
  MODIFY `Id_Estado_Usuario` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `Nivel_Reportes`
--
ALTER TABLE `Nivel_Reportes`
  MODIFY `Id_Nivel_Reporte` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `Programa_Institucional`
--
ALTER TABLE `Programa_Institucional`
  MODIFY `Id_Programa_Institucional` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `Proyectos`
--
ALTER TABLE `Proyectos`
  MODIFY `Id_Proyecto` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `Reportes`
--
ALTER TABLE `Reportes`
  MODIFY `Id_Reporte` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `Rol_Proyectos`
--
ALTER TABLE `Rol_Proyectos`
  MODIFY `Id_Rol_Proyecto` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `Rol_Usuarios`
--
ALTER TABLE `Rol_Usuarios`
  MODIFY `Id_Rol_Usuarios` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `Usuarios`
--
ALTER TABLE `Usuarios`
  MODIFY `Id_Usuario` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `Proyectos`
--
ALTER TABLE `Proyectos`
  ADD CONSTRAINT `FK_Cargo_Institucional_Lider` FOREIGN KEY (`Cargo_Institucional_Lider`) REFERENCES `Cargo_Institucionales` (`Id_Cargo_Institucional`),
  ADD CONSTRAINT `FK_Programa_Academico_Proyecto` FOREIGN KEY (`Programa_Academico_Proyecto`) REFERENCES `Programa_Institucional` (`Id_Programa_Institucional`),
  ADD CONSTRAINT `Proyectos_ibfk_1` FOREIGN KEY (`Rol_Proyecto`) REFERENCES `Rol_Proyectos` (`Id_Rol_Proyecto`),
  ADD CONSTRAINT `Proyectos_ibfk_2` FOREIGN KEY (`Usuario_Registrador_Proyecto`) REFERENCES `Usuarios` (`Id_Usuario`),
  ADD CONSTRAINT `Proyectos_ibfk_3` FOREIGN KEY (`Estado_Proyecto`) REFERENCES `Estado_Proyectos` (`Id_Estado_Proyecto`);

--
-- Filtros para la tabla `Reportes`
--
ALTER TABLE `Reportes`
  ADD CONSTRAINT `FK_EstadoReporte` FOREIGN KEY (`Estado_Reporte`) REFERENCES `Estado_Reportes` (`Descripcion_Estado_Reporte`),
  ADD CONSTRAINT `FK_NivelReporte` FOREIGN KEY (`Nivel_Reporte`) REFERENCES `Nivel_Reportes` (`Descripcion_Nivel_Reporte`),
  ADD CONSTRAINT `fk_usuario_solucionador` FOREIGN KEY (`Usuario_Solucionador_Reporte`) REFERENCES `Usuarios` (`Nombre_Usuario`),
  ADD CONSTRAINT `FK_UsuarioRegistrador` FOREIGN KEY (`Usuario_Registrador_Reporte`) REFERENCES `Usuarios` (`Nombre_Usuario`);

--
-- Filtros para la tabla `Usuarios`
--
ALTER TABLE `Usuarios`
  ADD CONSTRAINT `Usuarios_ibfk_1` FOREIGN KEY (`Rol_Usuario`) REFERENCES `Rol_Usuarios` (`Id_Rol_Usuarios`),
  ADD CONSTRAINT `Usuarios_ibfk_2` FOREIGN KEY (`Estado_Usuario`) REFERENCES `Estado_Usuarios` (`Id_Estado_Usuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
