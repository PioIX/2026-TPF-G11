"use client"

import Dado from "./Dado"

export default function Tablero(){
    return(
        <div className={TableroStyles.Tablero}>
            <Dado dataId={1} img={imgdado1}></Dado>
            <Dado dataId={2} img={imgdado2}></Dado>
            <Dado dataId={3} img={imgdado3}></Dado>
            <Dado dataId={4} img={imgdado4}></Dado>
            <Dado dataId={5} img={imgdado5}></Dado>
        </div>
    )
}