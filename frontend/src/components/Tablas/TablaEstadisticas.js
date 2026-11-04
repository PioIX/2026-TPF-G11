"use client"

import { useEffect, useState } from "react";
import Tabla from "./Tabla";

export default function TablaEstadisticas({ refresh }) {
    const [estadisticas, setEstadisticas] = useState([])

    useEffect(() => {
        fetch('http://localhost:4000/getEstadisticasTPF')
            .then(response => response.json())
            .then(data => {
                setEstadisticas(data);
            });
    }, [refresh])
    

    return (
        <Tabla
            cabecera={["ID", "ID usuario", "Generalas totales", "Partidas totales","Partidas ganadas", "Partidas perdidas", "Porcentaje victorias"]}
            filas={estadisticas.map( estadistica => {
                const { id_estadistica, id_usuario, generalas_totales, partidas_totales, partidas_ganadas, partidas_perdidas, porcentaje_victorias } = estadistica;
                return [id_estadistica, id_usuario, generalas_totales, partidas_totales, partidas_ganadas, partidas_perdidas, porcentaje_victorias.toFixed(1) + " %"];
            })}
        />
    )
}