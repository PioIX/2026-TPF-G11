"use client"

import Button from "./Button";

export default function Eliminar({onClick}){
    return(
        <>
            <h3>Eliminar</h3>
            <input></input>
            <Button text="Eliminar" onClick={onClick}></Button>
        </>
    )
}