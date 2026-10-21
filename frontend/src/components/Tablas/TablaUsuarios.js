"use client"

import { useEffect, useState } from "react";
import Tabla from "./Tabla";

export default function TablasUsuarios({ refresh }) {
    const [usuarios, setUsuarios] = useState([])

    useEffect(() => {
        fetch('http://localhost:4000/getUsuariosTPF')
            .then(response => response.json())
            .then(data => {
                setUsuarios(data);
            });
    }, [refresh])

    return (
        <Tabla
            cabecera={["ID", "Nombre", "Apellido", "Usuario","Email", "Contraseña"]}
            filas={usuarios.map( usuario => {
                const { id_usuario, nombre, apellido, nombre_de_usuario, email, contraseña } = usuario;
                return [id_usuario, nombre, apellido, nombre_de_usuario, email, contraseña];
            })}
        />
    )
}