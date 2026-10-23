"use client"

import Dado from "./Dado"

import TableroStyles from "@/components/Juego/Tablero.module.css";

export default function Tablero({valor1, valor2, valor3, valor4, valor5}){
    return(
        <div className={TableroStyles.Tablero}>
            <Dado dataId={1} valor={valor1}></Dado>
            <Dado dataId={2} valor={valor2}></Dado>
            <Dado dataId={3} valor={valor3}></Dado>
            <Dado dataId={4} valor={valor4}></Dado>
            <Dado dataId={5} valor={valor5}></Dado>
        </div>
    )
}