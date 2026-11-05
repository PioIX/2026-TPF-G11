"use client"

import VasoStyles from "@/components/Juego/Tirar.module.css";

export default function Tirar({onClick}){
    return(
        <>
            <button onClick={onClick} className={VasoStyles.Vaso} title="Cliqueame para tirar!"></button>
        </>
    )
}