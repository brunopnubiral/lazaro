-- Crear la base de datos
CREATE DATABASE JuegoCartas3D;
GO
USE JuegoCartas3D;

-- Tabla Jugadores
CREATE TABLE Jugadores (
    IdJugador INT PRIMARY KEY IDENTITY,
    Nombre NVARCHAR(100) NOT NULL,
    Mana INT NOT NULL,
    Vida INT NOT NULL,
    Puntos INT NOT NULL
);

-- Tabla Castillos
CREATE TABLE Castillos (
    IdCastillo INT PRIMARY KEY IDENTITY,
    Resistencia INT NOT NULL,
    Defensa INT NOT NULL,
    IdJugador INT FOREIGN KEY REFERENCES Jugadores(IdJugador) -- Relación 1 a 1
);

-- Tabla Tableros
CREATE TABLE Tableros (
    IdTablero INT PRIMARY KEY IDENTITY,
    Dimensiones INT NOT NULL
);

-- Tabla Partidas
CREATE TABLE Partidas (
    IdPartida INT PRIMARY KEY IDENTITY,
    FechaInicio DATETIME NOT NULL,
    Duracion TIME NOT NULL,
    Estado NVARCHAR(50) NOT NULL,
    IdTablero INT FOREIGN KEY REFERENCES Tableros(IdTablero) -- Relación con Tablero
);

-- Tabla Cartas
CREATE TABLE Cartas (
    IdCarta INT PRIMARY KEY IDENTITY,
    NombreCarta NVARCHAR(100) NOT NULL,
    CosteMana INT NOT NULL,
    IdEfecto INT -- Para asociar la carta con un efecto (relación 1 a 1)
);

-- Tabla Efectos
CREATE TABLE Efectos (
    IdEfecto INT PRIMARY KEY IDENTITY,
    TipoEfecto INT NOT NULL, -- Relación con TipoEfecto (definido abajo)
    Valor INT NOT NULL,
    TipoObjetivo INT NOT NULL -- Relación con TipoObjetivo (definido abajo)
);

-- Tabla TipoEfecto (Enum-like)
CREATE TABLE TipoEfecto (
    IdTipo INT PRIMARY KEY IDENTITY,
    Descripcion NVARCHAR(100) NOT NULL
);

-- Tabla TipoObjetivo (Enum-like)
CREATE TABLE TipoObjetivo (
    IdTipo INT PRIMARY KEY IDENTITY,
    Descripcion NVARCHAR(100) NOT NULL
);

-- Tabla Jugadas (registra cada jugada de una partida)
CREATE TABLE Jugadas (
    IdJugada INT PRIMARY KEY IDENTITY,
    IdJugador INT FOREIGN KEY REFERENCES Jugadores(IdJugador),
    IdPartida INT FOREIGN KEY REFERENCES Partidas(IdPartida),
    IdCarta INT FOREIGN KEY REFERENCES Cartas(IdCarta),
    TipoObjetivo INT FOREIGN KEY REFERENCES TipoObjetivo(IdTipo),
    FechaJugada DATETIME NOT NULL
);

-- Relacionar Cartas con Efectos (1 a 1)
ALTER TABLE Cartas
ADD FOREIGN KEY (IdEfecto) REFERENCES Efectos(IdEfecto);

-- (Opcional) Tabla para reflejar que una partida puede involucrar dos jugadores
CREATE TABLE PartidaJugador (
    IdPartida INT,
    IdJugador INT,
    PRIMARY KEY (IdPartida, IdJugador),
    FOREIGN KEY (IdPartida) REFERENCES Partidas(IdPartida),
    FOREIGN KEY (IdJugador) REFERENCES Jugadores(IdJugador)
);

-- Población de ejemplo para TipoEfecto
INSERT INTO TipoEfecto (Descripcion) VALUES ('Ataque'), ('Defensa'), ('Curacion'), ('Especial');

-- Población de ejemplo para TipoObjetivo
INSERT INTO TipoObjetivo (Descripcion) VALUES ('Jugador'), ('Castillo'), ('Carta');
