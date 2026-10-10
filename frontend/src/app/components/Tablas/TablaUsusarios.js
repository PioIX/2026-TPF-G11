"use client"

import { useEffect, useState } from "react";
import Tabla from "./Tabla";

export default function TablasUsuarios() {
    const [usuarios, setUsuarios] = useState([])

    useEffect(() => {
        fetch('http://localhost:4000/getUsuariosTPF')
            .then(response => response.json())
            .then(data => {
                console.log(data); // Se muestra en consola del navegador
                setUsuarios(data.usuarios);
            });
    }, [])

    return (
        <Tabla
            cabecera={["ID", "Nombre", "Apellido", "Usuario","Email", "Contraseña"]}
            filas={usuarios.map( usuario => {
                const { id, nombre, apellido, nombre_de_usuario, email, contraseña } = usuario;
                return [id, nombre, apellido, nombre_de_usuario, email, contraseña];
            })}
        />
    )
}