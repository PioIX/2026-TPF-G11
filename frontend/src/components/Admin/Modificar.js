"use client"

import Button from "../Button";
import { useState } from "react";

async function Cambiar(dataInput, url) {
    if (!dataInput || Object.keys(dataInput).length === 0) {
        alert("Error: llenar todos los campos");
        return false;
    }

    for (const key in dataInput) {
        if (dataInput[key] === "") {
            alert(`Error: llenar el campo ${key}`);
            return false;
        }
    }

     const response = await fetch(url, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataInput)
    });

    if (!response.ok) {
        throw new Error(`No se pudo modificar el registro (HTTP ${response.status})`);
    }

    return true;
}

const urls = {
    usuarios: 'http://localhost:4000/putUsuariosTPF',
    usuariosPartida: 'http://localhost:4000/putUsuariosPartidaTPF',
    partidas: 'http://localhost:4000/putPartidasTPF',
    estadisticas: 'http://localhost:4000/putEstadisticasTPF'
};

export default function Modificar({tabla, data, onClick}){
    const [dataInput, setDataInput] = useState({});

    async function handleUpdate() {
        try {
            const updated = await Cambiar(dataInput, urls[tabla]);
            if (updated) {
                onClick();
            }
        } catch (error) {
            console.error("Error al modificar el registro:", error);
            alert("No se pudo modificar el registro. Revisa la conexión con el servidor.");
        }
    }

    return(
        <>
            <h3>Modificar</h3>
            {data.map((item) => {
                const { id, placeholder } = item;
                return <input key={id} className={id} placeholder={placeholder} onChange={({ target }) => setDataInput({...dataInput, [id]: target.value})} value={dataInput[id] || ""}/>;
            })}
            <Button text="Modificar" onClick={(ev) => { handleUpdate(); onClick(ev); setDataInput({}); }}></Button>
        </>
    )
}