"use client"

import PuntajeStyles from "@/components/Juego/PuntajeBoton.module.css";

export default function BotonPuntaje({puntaje, onClick}){
    return(
        <>
            <button onClick={onClick} className={PuntajeStyles.button}>{puntaje}</button>
        </>
    )
}