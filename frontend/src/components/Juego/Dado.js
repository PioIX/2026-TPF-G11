"use client"

import clsx from "clsx";
import DadoStyles from "@/components/Juego/Dado.module.css";

export default function Dado({dataId, valor, onClick}) {
    return (
        <>
            <button onClick={onClick} data-id={dataId} valor={valor} className={DadoStyles.Dado}><img src={`/recursos/img/dado_${valor}.png`}></img>
                
            </button>
        </>
    )
}