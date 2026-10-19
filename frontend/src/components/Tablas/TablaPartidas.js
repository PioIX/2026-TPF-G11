"use client"

import { useEffect, useState } from "react";
import Tabla from "./Tabla";

export default function TablaPartidas() {
    const [partidas, setPartidas] = useState([])

    useEffect(() => {
        fetch('http://localhost:4000/getPartidasTPF')
            .then(response => response.json())
            .then(data => {
                console.log(data); // Se muestra en consola del navegador
                setPartidas(data.partidas);
            });
    }, [])

    return (
        <Tabla
            cabecera={["ID", "Gano", "Puntaje", "Fecha"]}
            filas={partidas.map( partida => {
                const { id, gano, puntaje, fecha } = partida;
                return [id, gano, puntaje, fecha];
            })}
        />
    )
}
