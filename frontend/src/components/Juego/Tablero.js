"use client"

import Dado from "./Dado"

import TableroStyles from "@/components/Juego/Tablero.module.css";

export default function Tablero({valor1, valor2, valor3, valor4, valor5, onClick}){
    return(
        <div className={TableroStyles.Tablero}>
            <Dado dataId={1} valor={valor1} onClick={onClick}></Dado>
            <Dado dataId={2} valor={valor2} onClick={onClick}></Dado>
            <Dado dataId={3} valor={valor3} onClick={onClick}></Dado>
            <Dado dataId={4} valor={valor4} onClick={onClick}></Dado>
            <Dado dataId={5} valor={valor5} onClick={onClick}></Dado>
        </div>
    )
}