"use client"

import { useEffect, useState } from "react";
import Tabla from "./Tabla";

export default function TablaEstadisticas() {
    const [estadisticas, setEstadisticas] = useState([])

    useEffect(() => {
        fetch('http://localhost:4000/getEstadisticasTPF')
            .then(response => response.json())
            .then(data => {
                console.log(data); // Se muestra en consola del navegador
                setEstadisticas(data.estadisticas);
            });
    }, [])

    return (
        <Tabla
            cabecera={["ID", "ID usuario", "Generalas totales", "Partidas totales","Partidas ganadas", "Partidas perdidas", "Porcentaje victorias", "Puntaje historico"]}
            filas={estadisticas.map( estadistica => {
                const { id, id_usuario, generalas_totales, partidas_totales, partidas_ganadas, partidas_perdidas, porcentaje_victorias, puntaje_historico } = estadistica;
                return [id, id_usuario, generalas_totales, partidas_totales, partidas_ganadas, partidas_perdidas, porcentaje_victorias, puntaje_historico];
            })}
        />
    )
}