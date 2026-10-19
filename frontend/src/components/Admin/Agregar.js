"use client"

import Button from "../Button";
import { useState } from "react";

function Añadir(dataInput, url) {
    if (!dataInput || Object.keys(dataInput).length === 0) {
        console.log("Error, datos vacíos");
        alert("Error: llenar todos los campos");

        return;
    }

    for (const key in dataInput) {
        if (dataInput[key] === "") {
            console.log(`Error, el campo ${key} está vacío`);
            alert(`Error: llenar el campo ${key}`);
            return;
        }
    }

    const body = { ...dataInput };

    const fetchData = async () => {
    const response = await fetch(url, {
        method: 'POST',
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

const urls = {
    usuarios: 'http://localhost:4000/postUsuariosTPF',
    usuariosPartida: 'http://localhost:4000/postPartidasUsuarioTPF',
    partidas: 'http://localhost:4000/postPartidasTPF',
    estadisticas: 'http://localhost:4000/postEstadisticasTPF'
};

export default function Agregar({tabla, data}){
    const [dataInput, setDataInput] = useState({});

    return(
        <>
            <h3>Agregar</h3>
            {data.map((item) => {
                return <input key={item.id} className={item.id} placeholder={item.placeholder} onChange={(e) => setDataInput(e.target.value)}/>;
            })}
            <Button text="Agregar" onClick={() => Añadir(dataInput, urls[tabla])}></Button>
        </>
    )
}