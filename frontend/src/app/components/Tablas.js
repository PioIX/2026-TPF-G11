"use client"

import { useEffect, useState } from "react";

export default function Tabla() {
    const [usuarios, setUsuarios] = useState([])
    const [estaditicas, setEstadisticas] = useState([])
    const [partidas, setPartidas] = useState([])
    const [usuariosPartida, setUsuariosPartida] = useState([])

    useEffect(() => {
        fetch('http://localhost:4000/getUsuariosTPF')
            .then(response => response.json())
            .then(data => {
                console.log(data); // Se muestra en consola del navegador
                setUsuarios(data.usuarios);
            });
    }, [])


    return (
        <>
            <div id="tablas" onload="console.log('loadT')">

                <table id="tabla" >
                    <tr>
                        {usuarios.map((usuario, index) => (
                            <td
                               
                            />
                        ))}
                    </tr>
                </table>

            </div>
        </>
    )
}