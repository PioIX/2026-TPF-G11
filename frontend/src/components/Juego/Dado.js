"use client"

import { useState } from "react"

import DadoStyles from "@/components/Juego/Dado.module.css";

export default function Dado({img, dataId}){
    const [dadosBloqueados, setDadosBloqueados] = useState([]);
    
    const bloquearDado = (dataId) => {
        if (!dadosBloqueados.includes(dataId)) {
            setDadosBloqueados([...dadosBloqueados, dataId]);
        } else {
            const index = dadosBloqueados.indexOf(dataId);
            if (index > -1) {
                setDadosBloqueados(dadosBloqueados.filter(e => e != dataId));
            }
        }
    }

    return(
        <>
        <button onClick={bloquearDado(dataId)} data-id={dataId} className={DadoStyles.Dado}>
            <img src={img}></img>
        </button>
        </>
    )
}