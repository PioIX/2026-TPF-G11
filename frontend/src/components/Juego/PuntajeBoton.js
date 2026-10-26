"use client"

import PuntajeStyles from "@/components/Juego/PuntajeBoton.module.css";

export default function BotonPuntaje({puntaje, onClick, valor, jugador, valorServido}){
    return(
        <>
            <button onClick={onClick} valor={valor} valorservido={valorServido} className={PuntajeStyles.button} jugador={jugador}>{puntaje}</button>
        </>
    )
}