"use client"
import PuntajeTabla from "@/components/Juego/PuntajeTabla"
import Tirar from "@/components/Juego/Tirar";
import Dado from "@/components/Juego/Dado";

import clsx from "clsx";
import { useState } from "react";

import styles from "./page.module.css";

export default function GeneralaLocal() {
    const [cantTiradas, setCantTiradas] = useState(0);
    const [dados, setDados] = useState([]);
    const [turnoJugador, setTurnoJugador] = useState(1);
    const [puntaje1, setPuntaje1] = useState([]);
    const [puntaje2, setPuntaje2] = useState([]);
    const [dadosBloqueados, setDadosBloqueados] = useState([]);
    const [titulo, setTitulo] = useState("Turno del Jugador 1")

    const cambiarTurno = () => {
        if (puntaje1.length < 10 && puntaje2.length < 0) {

            if (turnoJugador == 1) {
                setTurnoJugador(2);
                setTitulo("Turno del Jugador 2")
            } else {
                setTurnoJugador(1);
                setTitulo("Turno del Jugador 1")
            }
            setDadosBloqueados([]);
            tirarDados();
        } else {
            finJuego(null);
        }
    }

    const finJuego = (ganador) => {
        let puntajeJugador1 = 0;
        let puntajeJugador2 = 0;

        if (!ganador) {
            for (let i = 0; i < 11; i++) {
                puntajeJugador1 += puntaje1[i];
                puntajeJugador2 += puntaje2[i];
            }
            if (puntajeJugador1 > puntajeJugador2) {
                setTitulo("Ganador: ¡ Jugador 1 !")
                // Animación de ganar
            } else if (puntajeJugador2 > puntajeJugador1) {
                setTitulo("Ganador: ¡ Jugador 2 !")
                // Animación de ganar
            } else {
                setTitulo("¡ Empate !")
                // Animación de ganar
            }
        } else {
            setTitulo(`Ganador: ¡ ${ganador} !`)
            // Animación de ganar
        }
    }

    const bloquearDado = (dataId) => {
        if (!dadosBloqueados.includes(dataId)) {
            setDadosBloqueados([...dadosBloqueados, dataId]);
            setBloqueado(true)
        } else {
            const index = dadosBloqueados.indexOf(dataId);
            if (index > -1) {
                setDadosBloqueados(dadosBloqueados.filter(e => e != dataId));
            }
        }
    }

    const juegoServido = () => {
        if (cantTiradas === 1) {
            return 5;
        } else {
            return 0;
        }
    }

    const generalaServida = () => {
        if (cantTiradas === 1) {
            finJuego(`Jugador ${turnoJugador}`)
        }
    }

    const guardarPuntaje = (puntos) => {
        if (turnoJugador === 1) {
            setPuntaje1([...puntaje1, puntos])
        } else {
            setPuntaje2([...puntaje2, puntos])
        }
        cambiarTurno();
    }

    const anotarNumero = () => {

    }

    const anotarGenerala = () => {

    }

    const anotarGeneralaDoble = () => {

    }

    const anotarPoker = () => {

    }

    const anotarFull = () => {

    }

    const anotarEscalera = () => {

    }


    return (
        <section className={styles.Body}>
            <div className={styles.TituloDiv}>
                <h1 className={styles.Titulo}>{titulo}</h1>
            </div>
            <div className={styles.Partes}>
                <PuntajeTabla
                    jugador1={"Jugador 1"} jugador2={"Jugador 2"}
                ></PuntajeTabla>
                <div className={styles.Tablero}>
                    <Dado dataId={1} valor={dados[0]} onClick={() => bloquearDado(1)}></Dado>
                    <Dado dataId={2} valor={dados[1]} onClick={() => bloquearDado(2)}></Dado>
                    <Dado dataId={3} valor={dados[2]} onClick={() => bloquearDado(3)}></Dado>
                    <Dado dataId={4} valor={dados[3]} onClick={() => bloquearDado(4)}></Dado>
                    <Dado dataId={5} valor={dados[4]} onClick={() => bloquearDado(5)}></Dado>
                </div>
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
