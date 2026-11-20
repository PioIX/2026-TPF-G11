"use client";

import { useEffect, useState } from "react";
import Tabla from "./Tabla";

export default function TablaPartidas({ refresh }) {
  const [partidas, setPartidas] = useState([]);
  const url = `localhost`

  useEffect(() => {
    fetch(`http://${url}:4000/getPartidasTPF`)
      .then((response) => response.json())
      .then((data) => {
        setPartidas(data);
      });
  }, [refresh]);

  return (
    <Tabla
      cabecera={["ID", "Jugador 1", "Jugador 2", "Empate", "Puntaje", "Fecha", "Sala"]}
      filas={partidas.map((partida) => {
        const { id_partida, jugador1, jugador2, empate, puntaje, fecha, sala } = partida;
        return [
          id_partida,
          jugador1,
          jugador2,
          empate ? "Sí" : "No",
          puntaje,
          fecha,
          sala,
        ];
      })}
    />
  );
}
