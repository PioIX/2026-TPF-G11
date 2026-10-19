"use client"

import Button from "../Button";
import { useState } from "react";

function Cambiar(dataInput, url) {
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
        method: ' PUT',
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
    usuarios: 'http://localhost:4000/putUsuariosTPF',
    usuariosPartida: 'http://localhost:4000/putUsuariosPartidaTPF',
    partidas: 'http://localhost:4000/putPartidasTPF',
    estadisticas: 'http://localhost:4000/putEstadisticasTPF'
};

export default function Modificar({tabla, data}){
    const [dataInput, setDataInput] = useState({});

    return(
        <>
            <h3>Modificar</h3>
            {data.map((item) => {
                const { id, placeholder } = item;
                const newValue = {...dataInput, [id]: e.target.value};
                return <input key={id} className={id} placeholder={placeholder} onChange={(e) => setDataInput(newValue)}/>;
            })}
            <Button text="Modificar" onClick={() => Cambiar(dataInput, urls[tabla])}></Button>
        </>
    )
}