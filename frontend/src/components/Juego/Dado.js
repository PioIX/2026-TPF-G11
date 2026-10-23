"use client"

import { useState } from "react"

import clsx from "clsx";
import DadoStyles from "@/components/Juego/Dado.module.css";

export default function Dado({dataId, valor}) {
    const [dadosBloqueados, setDadosBloqueados] = useState([]);
    const [bloqueado, setBloqueado] = useState(false)

    const bloquearDado = (dataId) => {
        if (!dadosBloqueados.includes(dataId)) {
            setDadosBloqueados([...dadosBloqueados, dataId]);
            setBloqueado(true)
        } else {
            const index = dadosBloqueados.indexOf(dataId);
            if (index > -1) {
                setDadosBloqueados(dadosBloqueados.filter(e => e != dataId));
                setBloqueado(false)
            }
        }
    }

    return (
        <>
            <button onClick={() => bloquearDado(dataId)} data-id={dataId} valor={valor} className={clsx(DadoStyles.Dado, {
                [DadoStyles.DadoBloqueado]: bloqueado,
            })}><img src={`/recursos/img/dado_${valor}.png`}></img>
                
            </button>
        </>
    )
}