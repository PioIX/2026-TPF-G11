"use client"
import PuntajeTabla from "@/components/Juego/PuntajeTabla"
import Tirar from "@/components/Juego/Tirar";
import Dado from "@/components/Juego/Dado";

import clsx from "clsx";
import { useState } from "react";

import styles from "./page.module.css";

export default function GeneralaLocal() {
    const [uno1, setUno1] = useState("");
    const [uno2, setUno2] = useState("");
    const [dos1, setDos1] = useState("");
    const [dos2, setDos2] = useState("");
    const [tres1, setTres1] = useState("");
    const [tres2, setTres2] = useState("");
    const [cuatro1, setCuatro1] = useState("");
    const [cuatro2, setCuatro2] = useState("");
    const [cinco1, setCinco1] = useState("");
    const [cinco2, setCinco2] = useState("");
    const [seis1, setSeis1] = useState("");
    const [seis2, setSeis2] = useState("");

    const [esc1, setEsc1] = useState("");
    const [esc2, setEsc2] = useState("");
    const [full1, setFull1] = useState("");
    const [full2, setFull2] = useState("");
    const [poker1, setPoker1] = useState("");
    const [poker2, setPoker2] = useState("");
    const [gen1, setGen1] = useState("");
    const [gen2, setGen2] = useState("");
    const [dobGen1, setDobGen1] = useState("");
    const [dobGen2, setDobGen2] = useState("");

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

    const tirarDados = () => {

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

    const anotarNumero = (numero, jugador) => {
        const puntos = 0;
        if (jugador === turnoJugador) {
            for (let i = 0; i < dados.length; i++) {
                if (dados[i] === numero) {
                    puntos += numero;
                }
            }
            guardarPuntaje(puntos)
            switch (numero) {
                case 1:
                    if (jugador === 1) {
                        setUno1(`${puntos}`)
                    } else {
                        setUno2(`${puntos}`)
                    }
                    break;
                case 2:
                    if (jugador === 1) {
                        setDos1(`${puntos}`)
                    } else {
                        setDos2(`${puntos}`)
                    }
                    break;
                case 3:
                    if (jugador === 1) {
                        setTres1(`${puntos}`)
                    } else {
                        setTres2(`${puntos}`)
                    }
                    break;
                case 4:
                    if (jugador === 1) {
                        setCuatro1(`${puntos}`)
                    } else {
                        setCuatro2(`${puntos}`)
                    }
                    break;
                case 5:
                    if (jugador === 1) {
                        setCinco1(`${puntos}`)
                    } else {
                        setCinco2(`${puntos}`)
                    }
                    break;
                case 6:
                    if (jugador === 1) {
                        setSeis1(`${puntos}`)
                    } else {
                        setSeis2(`${puntos}`)
                    }
                    break;
            }
        }
    }

    const anotarGenerala = (jugador) => {
        let esGen = true;
        if (jugador == turnoJugador) {
            for (let i = 0; i < 5; i++) {
                if (dados[i] !== dados[0]) {
                    esGen = false;
                    break;
                }
            }
            if (esGen) {
                generalaServida();
                guardarPuntaje(50)
                if (jugador === 1) {
                    setGen1(`${50}`)
                } else {
                    setGen2(`${50}`)
                }
            } else {
                guardarPuntaje(0)
                if (jugador === 1) {
                    setGen1(`${0}`)
                } else {
                    setGen2(`${0}`)
                }
            }
        }
    }

    const anotarGeneralaDoble = (jugador) => {
        let esGen = true;
        if (jugador == turnoJugador) {
            switch (jugador) {
                case 1:
                    if (gen1 === "") {
                        esGen = false;
                    }
                    break
                case 2:
                    if (gen2 === "") {
                        esGen = false;
                    }
            }

            if (esGen) {
                for (let i = 0; i < 5; i++) {
                    if (dados[i] !== dados[0]) {
                        esGen = false;
                        break;
                    }
                }
            }

            if (esGen) {
                generalaServida();
                guardarPuntaje(100)
                if (jugador === 1) {
                    setGen1(`${100}`)
                } else {
                    setGen2(`${100}`)
                }
            } else {
                guardarPuntaje(0)
                if (jugador === 1) {
                    setGen1(`${0}`)
                } else {
                    setGen2(`${0}`)
                }
            }
        }
    }

    const anotarPoker = (jugador) => {

    }

    const anotarFull = (jugador) => {

    }

    const anotarEscalera = (jugador) => {

    }


    return (
        <section className={styles.Body}>
            <div className={styles.TituloDiv}>
                <h1 className={styles.Titulo}>{titulo}</h1>
            </div>
            <div className={styles.Partes}>
                <div className={styless.Div}>
                    <div className={styles.Tabla}>
                        <div></div>
                        <div><p className={styles.p}><b>{jugador1}</b></p></div>
                        <div><p className={styles.p}><b>{jugador2}</b></p></div>

                        <div><p className={styles.p}><b>1</b></p></div>
                        <div><PuntajeBoton onClick={() => anotarNumero(1, 1)} puntaje={uno1}></PuntajeBoton></div>
                        <div><PuntajeBoton onClick={() => anotarNumero(1, 2)} puntaje={uno2}></PuntajeBoton></div>

                        <div><p className={styles.p}><b>2</b></p></div>
                        <div><PuntajeBoton onClick={() => anotarNumero(2, 1)} puntaje={dos1}></PuntajeBoton></div>
                        <div><PuntajeBoton onClick={() => anotarNumero(2, 2)} puntaje={dos2}></PuntajeBoton></div>

                        <div><p className={styles.p}><b>3</b></p></div>
                        <div><PuntajeBoton onClick={() => anotarNumero(3, 1)} puntaje={tres1}></PuntajeBoton></div>
                        <div><PuntajeBoton onClick={() => anotarNumero(3, 2)} puntaje={tres2}></PuntajeBoton></div>

                        <div><p className={styles.p}><b>4</b></p></div>
                        <div><PuntajeBoton onClick={() => anotarNumero(4, 1)} puntaje={cuatro1}></PuntajeBoton></div>
                        <div><PuntajeBoton onClick={() => anotarNumero(4, 2)} puntaje={cuatro2}></PuntajeBoton></div>

                        <div><p className={styles.p}><b>5</b></p></div>
                        <div><PuntajeBoton onClick={() => anotarNumero(5, 1)} puntaje={cinco1}></PuntajeBoton></div>
                        <div><PuntajeBoton onClick={() => anotarNumero(5, 2)} puntaje={cinco2}></PuntajeBoton></div>

                        <div><p className={styles.p}><b>6</b></p></div>
                        <div><PuntajeBoton onClick={() => anotarNumero(6, 1)} puntaje={seis1}></PuntajeBoton></div>
                        <div><PuntajeBoton onClick={() => anotarNumero(6, 2)} puntaje={seis2}></PuntajeBoton></div>

                        <div><p className={styles.p}><b>Escalera</b></p></div>
                        <div><PuntajeBoton onClick={() => anotarEscalera(1)} puntaje={esc1}></PuntajeBoton></div>
                        <div><PuntajeBoton onClick={() => anotarEscalera(2)} puntaje={esc2}></PuntajeBoton></div>

                        <div><p className={styles.p}><b>Full<br></br>House</b></p></div>
                        <div><PuntajeBoton onClick={() => anotarFull(1)} puntaje={full1}></PuntajeBoton></div>
                        <div><PuntajeBoton onClick={() => anotarFull(2)} puntaje={full2}></PuntajeBoton></div>

                        <div><p className={styles.p}><b>Poker</b></p></div>
                        <div><PuntajeBoton onClick={() => anotarPoker(1)} puntaje={poker1}></PuntajeBoton></div>
                        <div><PuntajeBoton onClick={() => anotarPoker(2)} puntaje={poker2}></PuntajeBoton></div>

                        <div><p className={styles.p}><b>Generala</b></p></div>
                        <div><PuntajeBoton onClick={() => anotarGenerala(1)} puntaje={gen1}></PuntajeBoton></div>
                        <div><PuntajeBoton onClick={() => anotarGenerala(2)} puntaje={gen2}></PuntajeBoton></div>

                        <div><p className={styles.p}><b>Doble<br></br>Generala</b></p></div>
                        <div><PuntajeBoton onClick={() => anotarGeneralaDoble(1)} puntaje={dobGen1}></PuntajeBoton></div>
                        <div><PuntajeBoton onClick={() => anotarGeneralaDoble(2)} puntaje={dobGen2}></PuntajeBoton></div>
                    </div>
                </div>
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
