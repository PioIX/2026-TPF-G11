"use client"

import Button from "../Button";
import { useState } from "react";



const urls = {
    usuarios: 'http://localhost:4000/putUsuariosTPF',
    usuariosPartida: 'http://localhost:4000/putUsuariosPartidaTPF',
    partidas: 'http://localhost:4000/putPartidasTPF',
    estadisticas: 'http://localhost:4000/putEstadisticasTPF'
};

export default function Modificar({ tabla, data }) {
    const [dataInput, setDataInput] = useState({});

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

    return (
        <>
            <h3>Modificar</h3>
            {data.map((item) => {
                return <input key={item.id} className={item.id} placeholder={item.placeholder} onChange={(e) => setDataInput(e.target.value)} />;
            })}
            <Button text="Modificar" onClick={() => Cambiar(dataInput, urls[tabla])}></Button>
        </>
    )
}