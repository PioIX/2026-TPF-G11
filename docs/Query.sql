CREATE TABLE UsuariosTPF (
	id_usuario int PRIMARY KEY AUTO_INCREMENT,
    nombre varchar(40),
    apellido varchar(40),
    nombre_de_usuario varchar(40),
    email varchar(40),
    contraseña varchar(40),
    skin_dado varchar(15) DEFAULT "dado",
    skin_tablero int DEFAULT 1
);

CREATE TABLE EstadisticasTPF  (
	id_estadistica int PRIMARY KEY AUTO_INCREMENT,
    generalas_totales int,
    partidas_ganadas int,
    partidas_perdidas int,
    partidas_totales int,
    porcentaje_victorias float,
    id_usuario int,
    CONSTRAINT fk_usuario3
    FOREIGN KEY (id_usuario)
    REFERENCES UsuariosTPF(id_usuario)
    ON DELETE CASCADE
);

CREATE TABLE PartidasTPF (
	id_partida int PRIMARY KEY AUTO_INCREMENT,
    empate bool,
	puntaje int,
    fecha datetime,
    jugador1 int,
    CONSTRAINT fk_usuarioJugador1
    FOREIGN KEY (jugador1)
    REFERENCES UsuariosTPF(id_usuario)
    ON DELETE CASCADE,
    jugador2 int DEFAULT null,
    CONSTRAINT fk_usuarioJugador2
    FOREIGN KEY (jugador2)
    REFERENCES UsuariosTPF(id_usuario)
    ON DELETE CASCADE,
    sala varchar(20) DEFAULT "Local"
);

CREATE TABLE UsuariosPartidaTPF (
	id_usuariosPartida int PRIMARY KEY AUTO_INCREMENT,
    jugador1 int,
    CONSTRAINT fk_usuarioPartidaJugador1
    FOREIGN KEY (jugador1)
    REFERENCES UsuariosTPF(id_usuario)
    ON DELETE CASCADE,
    jugador2 int DEFAULT null,
    CONSTRAINT fk_usuarioPartidaJugador2
    FOREIGN KEY (jugador2)
    REFERENCES UsuariosTPF(id_usuario)
    ON DELETE CASCADE,
    id_partida int,
    CONSTRAINT fk_partida
    FOREIGN KEY (id_partida)
    REFERENCES PartidasTPF(id_partida)
    ON DELETE CASCADE
);