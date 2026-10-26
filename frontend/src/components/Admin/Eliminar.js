"use client"

import Button from "../Button";
import { useState } from "react";

import styles from "@/components/Admin/InputsStyle.module.css";

async function Borrar(id, url, idField) {
    if (id === null || id === "") {
        alert("Error: llenar todos los campos");
        return false;
    }

    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ [idField]: id })
    });

    if (!response.ok) {
        throw new Error(`No se pudo eliminar el registro (HTTP ${response.status})`);
    }

    return true;
}

const urls = {
    usuarios: 'http://localhost:4000/deleteUsuariosTPF',
    usuariosPartida: 'http://localhost:4000/deleteUsuariosPartidaTPF',
    partidas: 'http://localhost:4000/deletePartidasTPF',
    estadisticas: 'http://localhost:4000/deleteEstadisticasTPF'
};

export default function Eliminar({tabla, data, onClick}){
    const [recordId, setRecordId] = useState("");

    async function handleDelete() {
        try {
            const deleted = await Borrar(recordId, urls[tabla], data[0].requestKey ?? data[0].id);
            if (deleted) {
                onClick();
                setRecordId("")
            }
        } catch (error) {
            console.error("Error al eliminar el registro:", error);
            alert("No se pudo eliminar el registro. Revisa la conexión con el servidor.");
        }
    }

    return(
        <>
        <div>
            <h3>Eliminar</h3>
            {data.map(({ id, placeholder }) => (
                <input key={id} className={styles.input} placeholder={placeholder} onChange={({ target }) => setRecordId(target.value)} value={recordId}/>
            ))}
        </div>
            <Button text="Eliminar" onClick={handleDelete}></Button>
        </>
    )
}   