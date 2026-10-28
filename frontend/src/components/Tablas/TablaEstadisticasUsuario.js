"use client"

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Tabla from "./Tabla";

export default function TablaEstadisticasUsuario({ refresh }) {
    const [estadisticas, setEstadisticas] = useState([])
    const searchParams = useSearchParams();
    const userID = searchParams.get("user");

    useEffect(() => {
        fetch(`http://localhost:4000/getEstadisticasUsuario?user=${userID}`)
            .then(response => response.json())
            .then(data => {
                setEstadisticas(data);
                console.log(data)
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