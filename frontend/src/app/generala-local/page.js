"use client"
import Tablero from "@/components/Juego/Tablero"
import PuntajeTabla from "@/components/Juego/PuntajeTabla"
import Tirar from "@/components/Juego/Tirar";

import clsx from "clsx";
import { useState } from "react";

import styles from "./page.module.css";

/*<Tablero valor1={1} valor2={2} valor3={3} valor4={4} valor5={5}></Tablero>*/

export default function GeneralaLocal() {

    return (
        <section className={styles.Body}>
            <div className={styles.TituloDiv}>
                <h1 className={styles.Titulo}>Turno de: {"HOLA"}</h1>
            </div>
            <div className={styles.Partes}>
                <PuntajeTabla
                    jugador1={"PUTA"} jugador2={"PUTO"}
                ></PuntajeTabla>
                <Tablero valor1={1} valor2={2} valor3={3} valor4={4} valor5={5}></Tablero>
                <div>
                    <div className={styles.Guia}>
                        <h3>Controles y Tips</h3>
                        <p>Haz click sobre un dado para bloquearlo, haz click devuelta
                            para desbloquearlo<br /><br />Los dados bloqueados no van a
                            cambiar si vuelves a tirar tus dados.<br /><br />Haz click
                            sobre el espacio vacio en el tablon de puntaje para anotar el
                            puntaje de tus dados.<br /><br />Los datos de esta partida
                            solo se guardaran para el usuario loggeado.</p>
                    </div>
                    <Tirar></Tirar>
                </div>
            </div>
        </section>
    )
}