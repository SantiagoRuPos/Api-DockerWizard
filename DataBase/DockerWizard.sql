CREATE TABLE Estado_Usuarios (
    Id_Estado_Usuario int AUTO_INCREMENT PRIMARY KEY NOT NULL,
    Descripcion_Estado_Usuario VARCHAR(25) NOT NULL UNIQUE
);

CREATE TABLE Rol_Usuarios (
    Id_Rol_Usuarios int AUTO_INCREMENT PRIMARY KEY NOT NULL,
    Descripcion_Rol_Usuarios VARCHAR(25) NOT NULL UNIQUE
);
   

CREATE TABLE Usuarios (
    Id_Usuario int AUTO_INCREMENT PRIMARY KEY NOT NULL,
    Tipo_Identificacion_Usuario VARCHAR(100) NOT NULL,
    Numero_Identificacion_Usuario VARCHAR(100) NOT NULL UNIQUE,
    Nombre_Completo_Usuario VARCHAR(150) NOT NULL,
    Correo_Institucional_Usuario VARCHAR(100) NOT NULL,
    Numero_Contacto VARCHAR(25) NOT NULL,
    Nombre_Usuario VARCHAR(50) NOT NULL UNIQUE,
    Password_Usuario VARCHAR(250) NOT NULL,
    Nombre_Usuario_Cygnus VARCHAR(15) NOT NULL UNIQUE,
    Rol_Usuario int(2) NOT NULL,
    Estado_Usuario int (2) NOT NULL,
    Conexion_Usuario TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    Fecha_Registro_Usuario TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    RenovacionContraseña BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (Rol_Usuario) REFERENCES Rol_Usuarios(Id_Rol_Usuarios),
    FOREIGN KEY (Estado_Usuario) REFERENCES Estado_Usuarios(Id_Estado_Usuario)
);

CREATE TABLE Rol_Proyectos (
    Id_Rol_Proyecto int AUTO_INCREMENT PRIMARY KEY NOT NULL,
    Descripcion_Rol_Proyectos VARCHAR(25) NOT NULL UNIQUE
);

CREATE TABLE Estado_Proyectos (
    Id_Estado_Proyecto int AUTO_INCREMENT PRIMARY KEY NOT NULL,
    Descripcion_Estado_Proyecto VARCHAR(25) NOT NULL UNIQUE
);

CREATE TABLE Cargo_Institucionales (
    Id_Cargo_Institucional int AUTO_INCREMENT PRIMARY KEY NOT NULL,
    Descripcion_Cargo_Institucional VARCHAR(50) NOT NULL UNIQUE
);


CREATE TABLE Programa_Institucional (
    Id_Programa_Institucional int AUTO_INCREMENT PRIMARY KEY NOT NULL,
    Descripcion_Programa_Institucional VARCHAR(50) NOT NULL UNIQUE
);


CREATE TABLE Proyectos (
    Id_Proyecto INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    Nombre_Proyecto VARCHAR(400) NOT NULL UNIQUE, 
    Nombre_Proyecto_Acronimo VARCHAR(25) NOT NULL UNIQUE,
    Nombre_Usuario_Cygnus VARCHAR(15) NOT NULL,
    Rol_Proyecto int (2) NOT NULL,
    Nombre_Lider_Proyecto VARCHAR(150) NOT NULL,
    Telefono_Lider_Proyecto VARCHAR(20) NOT NULL,
    Correo_Institucional_Lider VARCHAR(100) NOT NULL,
    Cargo_Institucional_Lider INT NOT NULL, 
    Programa_Academico_Proyecto INT NOT NULL,
    Semillero_Lider VARCHAR(20) NULL,
    Grupo_Investigacion VARCHAR(20) NULL,
    Usuario_Registrador_Proyecto int NOT NULL,
    Fecha_Registro_Proyecto DATE,
    Fecha_Finalizacion_Proyecto DATE,
    Estado_Proyecto int,
    FOREIGN KEY (Rol_Proyecto) REFERENCES Rol_Proyectos(Id_Rol_Proyecto),
    FOREIGN KEY (Usuario_Registrador_Proyecto) REFERENCES Usuarios (Id_Usuario),
    FOREIGN KEY (Estado_Proyecto) REFERENCES Estado_Proyectos (Id_Estado_Proyecto),
    FOREIGN KEY (Cargo_Institucional_Lider) REFERENCES Cargo_Institucionales (Id_Cargo_Institucional),
    FOREIGN KEY (Programa_Academico_Proyecto) REFERENCES Programa_Institucional (Id_Programa_Institucional)

);
 

CREATE TABLE Estado_Reportes(
    Id_Estado_Reporte int AUTO_INCREMENT PRIMARY KEY NOT NULL,
    Descripcion_Estado_Reporte VARCHAR(25) NOT NULL UNIQUE
);

CREATE TABLE Nivel_Reportes(
    Id_Nivel_Reporte int AUTO_INCREMENT PRIMARY KEY NOT NULL,
    Descripcion_Nivel_Reporte VARCHAR(25) NOT NULL UNIQUE
);

CREATE TABLE Reportes (
    Id_Reporte int AUTO_INCREMENT PRIMARY KEY NOT NULL,
    Nombre_Reporte VARCHAR(50) NOT NULL,
    Descripcion_Reporte VARCHAR(250) NOT NULL,
    Nivel_Reporte int (2) NOT NULL,
    Estado_Reporte int (2) NOT NULL,
    Usuario_Registrador_Reporte int (2) NOT NULL,
    Fecha_Registro_Usuario TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (Nivel_Reporte) REFERENCES Nivel_Reportes (Id_Nivel_Reporte),
    FOREIGN KEY (Estado_Reporte) REFERENCES Estado_Reportes (Id_Estado_Reporte),
    FOREIGN KEY (Usuario_Registrador_Reporte) REFERENCES Usuarios (Id_Usuario)
);


CREATE TABLE Reporte_Solucionado (
Id_Reporte_Solucionado INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
Id_Reporte int,
Nombre_Usuario_Solucionador int,
Descripcion_Reporte_Solucionado VARCHAR(45) NOT NULL,
Fecha_Solucion_Reporte DATE,
FOREIGN KEY (Id_Reporte) REFERENCES Reportes (Id_Reporte),
FOREIGN KEY (Nombre_Usuario_Solucionador) REFERENCES Usuarios (Id_Usuario)
);

INSERT INTO Estado_Usuarios (Id_Estado_Usuario,Descripcion_Estado_Usuario) VALUES (null,'Activo');
INSERT INTO Estado_Usuarios (Id_Estado_Usuario,Descripcion_Estado_Usuario) VALUES (null,'Inactivo');

INSERT INTO Rol_Usuarios (Id_Rol_Usuarios,Descripcion_Rol_Usuarios) VALUES (null,'Root');

INSERT INTO Rol_Proyectos (Id_Rol_Proyecto,Descripcion_Rol_Proyectos) VALUES (null,'Proyecto de Investigación');
INSERT INTO Rol_Proyectos (Id_Rol_Proyecto,Descripcion_Rol_Proyectos) VALUES (null,'Proyecto de Grado');

INSERT INTO Estado_Proyectos (Id_Estado_Proyecto,Descripcion_Estado_Proyecto) VALUES (null,'Activo');
INSERT INTO Estado_Proyectos (Id_Estado_Proyecto,Descripcion_Estado_Proyecto) VALUES (null,'Desactivo');

INSERT INTO Estado_Reportes (Id_Estado_Reporte,Descripcion_Estado_Reporte) VALUES (null,'Pendiente');
INSERT INTO Estado_Reportes (Id_Estado_Reporte,Descripcion_Estado_Reporte) VALUES (null,'Revision');
INSERT INTO Estado_Reportes (Id_Estado_Reporte,Descripcion_Estado_Reporte) VALUES (null,'Solucionado');

INSERT INTO  Nivel_Reportes (Id_Nivel_Reporte,Descripcion_Nivel_Reporte ) VALUES(null,'Nivel 1');
INSERT INTO  Nivel_Reportes (Id_Nivel_Reporte,Descripcion_Nivel_Reporte ) VALUES(null,'Nivel 2');
INSERT INTO  Nivel_Reportes (Id_Nivel_Reporte,Descripcion_Nivel_Reporte ) VALUES(null,'Nivel 3');

INSERT INTO Cargo_Institucionales (Id_Cargo_Institucional,Descripcion_Cargo_Institucional) VALUES (null, 'Profesor');
INSERT INTO Cargo_Institucionales (Id_Cargo_Institucional,Descripcion_Cargo_Institucional) VALUES (null, 'Estudiante');
INSERT INTO Cargo_Institucionales (Id_Cargo_Institucional,Descripcion_Cargo_Institucional) VALUES (null, 'Investigador');

INSERT INTO Programa_Institucional (Id_Programa_Institucional,Descripcion_Programa_Institucional) VALUES (null, 'Ingeniería Electrónica');
INSERT INTO Programa_Institucional (Id_Programa_Institucional,Descripcion_Programa_Institucional) VALUES (null, 'Ingeniería Sistemas');
INSERT INTO Programa_Institucional (Id_Programa_Institucional,Descripcion_Programa_Institucional) VALUES (null, 'Ingeniería Industrial');
INSERT INTO Programa_Institucional (Id_Programa_Institucional,Descripcion_Programa_Institucional) VALUES (null, 'Tecnologiá en Electronica Industrial');
INSERT INTO Programa_Institucional (Id_Programa_Institucional,Descripcion_Programa_Institucional) VALUES (null, 'Tecnología en Sistemas de Información');
INSERT INTO Programa_Institucional (Id_Programa_Institucional,Descripcion_Programa_Institucional) VALUES (null, 'Tecnología en Producción Industrial');

----------------------
ALTER TABLE Proyectos
ADD CONSTRAINT FK_Cargo_Institucional_Lider 
FOREIGN KEY (Cargo_Institucional_Lider) 
REFERENCES Cargo_Institucionales (Id_Cargo_Institucional);

ALTER TABLE Proyectos
ADD CONSTRAINT FK_Programa_Academico_Proyecto 
FOREIGN KEY (Programa_Academico_Proyecto) 
REFERENCES Programa_Institucional (Id_Programa_Institucional);