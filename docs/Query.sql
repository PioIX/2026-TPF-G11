INSERT INTO UsuariosTPF (nombre, apellido, nombre_de_usuario, email, contraseña)
VALUES ("John","Pork","JohnnyPorky","jpork@jozu.gov.il","Campora_Goat1974");
INSERT INTO EstadisticasTPF (id_usuario, generalas_totales, partidas_totales, partidas_ganadas, partidas_perdidas, porcentaje_victorias, puntaje_historico)
VALUES (2, 30, 63, 30, partidas_totales - partidas_ganadas, (partidas_ganadas / partidas_totales)*100, 2134);

DELETE FROM EstadisticasTPF WHERE id_estadistica = 1;

SELECT * FROM EstadisticasTPF

