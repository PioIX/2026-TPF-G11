CREATE TABLE UsuariosTPF (
	id_usuario int PRIMARY KEY AUTO_INCREMENT,
    nombre varchar(40),
    apellido varchar(40),
    nombre_de_usuario varchar(40),
    email varchar(40),
    contraseña varchar(40)
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
);

CREATE TABLE PartidasTPF (
	id_partida int PRIMARY KEY AUTO_INCREMENT,
    gano bool,
	puntaje int,
    fecha date,
    id_usuario int,
    CONSTRAINT fk_usuario2
    FOREIGN KEY (id_usuario)
    REFERENCES UsuariosTPF(id_usuario)
);

CREATE TABLE UsuariosPartidaTPF (
	id int PRIMARY KEY AUTO_INCREMENT,
    id_usuario int,
    CONSTRAINT fk_usuario4
    FOREIGN KEY (id_usuario)
    REFERENCES UsuariosTPF(id_usuario),
    id_partida int,
    CONSTRAINT fk_partida
    FOREIGN KEY (id_partida)
    REFERENCES PartidasTPF(id_partida)
);

SELECT * FROM EstadisticasTPF




