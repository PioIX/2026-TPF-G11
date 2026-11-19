"use client"

import { useEffect, useState } from "react";
import Tabla from "./Tabla";

export default function TablaUsuariosPartida({ refresh }) {
    const [usuarios_partida, setUsuariosPartida] = useState([])

    useEffect(() => {
        fetch('http://localhost:4000/getUsuariosPartidaTPF')
            .then(response => response.json())
            .then(data => {
                setUsuariosPartida(data);
            });
    }, [refresh])

    return (
        <Tabla
            cabecera={["ID", "Jugador 1", "Jugador 2", "ID partida"]}
            filas={usuarios_partida.map( usuario_partida => {
                const { id_usuariosPartida, jugador1, jugador2, id_partida } = usuario_partida;
                return [id_usuariosPartida, jugador1, jugador2, id_partida];
            })}
        />
    )
}