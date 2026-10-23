"use client"

import TituloStyles from "@/components/Juego/Titulo.module.css";

export default function Titulo({usuario}){
    <div className={TituloStyles.Div}>
        <h1 className={TituloStyles.Titulo}>Turno de: {usuario}</h1>
    </div>
}