"use client"

import { useEffect, useState } from "react";
import Tabla from "./Tabla";

export default function TablaUsuariosPartida() {
    const [usuarios_partida, setUsuariosPartida] = useState([])

    useEffect(() => {
        fetch('http://localhost:4000/getUsuariosPartidaTPF')
            .then(response => response.json())
            .then(data => {
                console.log(data); // Se muestra en consola del navegador
                setUsuariosPartida(data.usuarios_partida);
            });
    }, [])

    return (
        <Tabla
            cabecera={["ID", "ID usuario", "ID partida"]}
            filas={usuarios_partida.map( usuario_partida => {
                const { id, id_usuario, id_partida } = usuario_partida;
                return [id, id_usuario, id_partida];
            })}
        />
    )
}