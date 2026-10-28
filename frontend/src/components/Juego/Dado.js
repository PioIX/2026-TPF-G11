"use client"

import { useState } from "react"

import clsx from "clsx";
import DadoStyles from "@/components/Juego/Dado.module.css";

export default function Dado({dataId, valor, onClick}) {
    return (
        <>
            <button onClick={onClick} data-id={dataId} valor={valor} className={clsx(DadoStyles.Dado, {
                [DadoStyles.DadoBloqueado]: bloqueado,
            })}><img src={`/recursos/img/dado_${valor}.png`}></img>
                
            </button>
        </>
    )
}