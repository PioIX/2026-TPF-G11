"use client"

import Button from "../Button";
import { useState } from "react";

function Borrar(id, url) {
    if (id === null || id === "") {
        console.log("Error, datos vacíos");
        alert("Error: llenar todos los campos");

    } else {
        const body = { id };

        const fetchData = async () => {
        const response = await fetch(url, {
            method: ' DELETE',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const data = await response.json();
        console.log(data);
        }

        fetchData();
    }
}

const urls = {
    usuarios: 'http://localhost:4000/deleteUsuariosTPF',
    usuariosPartida: 'http://localhost:4000/deleteUsuariosPartidaTPF',
    partidas: 'http://localhost:4000/deletePartidasTPF',
    estadisticas: 'http://localhost:4000/deleteEstadisticasTPF'
};

export default function Eliminar({tabla}){
    const [id, setId] = useState("");

    return(
        <>
            <h3>Eliminar</h3>
            <input value={id} onChange={(e) => setId(e.target.value)}></input>
            <Button text="Eliminar" onClick={() => Borrar(id, urls[tabla])}></Button>
        </>
    )
}