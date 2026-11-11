"use client"

import Tirar from "@/components/Juego/Tirar";
import Dado from "@/components/Juego/Dado";
import PuntajeBoton from "@/components/Juego/PuntajeBoton"

import clsx from "clsx";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useSocket } from "@/hooks/useSocket";

import styles from "./page.module.css";
import DadoStyles from "@/components/Juego/Dado.module.css";

export default function GeneralaOnline() {
    const searchParams = useSearchParams();
    const sala = searchParams.get("sala");
    const userID = searchParams.get("user");
    const { socket, isConnected } = useSocket();

    const [dados, setDados] = useState([0, 0, 0, 0, 0]);
    const [dadosBloqueados, setDadosBloqueados] = useState([]);
    const [titulo, setTitulo] = useState("")
    const [cantTiradas, setCantTiradas] = useState(0);

    const [animacion, setAnimacion] = useState(false);

    const [skinTablero, setSkinTablero] = useState(1)
    const [skinDado, setSkinDado] = useState("dado")

    const skinUsuario = async () => {
        const skinResponse = await fetch(
            `http://localhost:4000/getSkin?id_usuario=${userID}`
        );
        const skins = await skinResponse.json();
        setSkinTablero(skins[0].skin_tablero);
        setSkinDado(skins[0].skin_dado);
    }

    useEffect(() => {
        skinUsuario();
    }, []);

    useEffect(() => {
        if (!socket || !sala) return;
        socket.emit("joinRoom", { room: sala, user: userID });
    }, [socket, sala]);

    const cambiarTurno = () => {
        socket.emit("cambiarTurno", {});
    }

    useEffect(() => {
        socket.on("turnoCambiado", (data) => {
            setDados(data.dados);
            if (data.turnoJugador === userID) {
                setTitulo("Es tu turno");
            } else {
                setTitulo("Espera tu turno");
            }
        });
    }, [socket]);

    const actualizarEstadisticas = async (ganador, cantGeneralas) => {
        const estadisticasResponse = await fetch(
            `http://localhost:4000/getEstadisticasUsuario?id_usuario=${userID}`
        );
        const estadisticas = await estadisticasResponse.json();
        if (estadisticas.length !== 0) {

            const estadistica = estadisticas[0];
            const jugadorGano = ganador === userID;
            const jugadorPerdio = ganador !== userID;
            const response = await fetch("http://localhost:4000/putEstadisticasTPF", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id_usuario: Number(userID),
                    generalas_totales:
                        Number(estadistica.generalas_totales) + cantGeneralas,
                    partidas_ganadas:
                        Number(estadistica.partidas_ganadas) + Number(jugadorGano),
                    partidas_perdidas:
                        Number(estadistica.partidas_perdidas) + Number(jugadorPerdio),
                    partidas_totales: Number(estadistica.partidas_totales) + 1,
                }),
            });

            const data = await response.json();
            console.log(data);
        }
    };

    const finJuego = () => {
        pass
    }

    const tirarDados = (nuevaRonda = false) => {
        const tiradasActuales = nuevaRonda ? 0 : cantTiradas;
        if (tiradasActuales >= 3) {
            alert("Ya hiciste tres tiradas")
        } else {
            socket.emit("tirarDados", { user: userID, nuevaRonda: nuevaRonda });
        }
    }

    useEffect(() => {
        socket.on("dadosTirados", (data) => {
            setDados(data.dados);
            setDadosBloqueados(data.dadosBloqueados);
            setCantTiradas(data.cantTiradas);
        });
    }, [socket]);

    return (
        <section className={styles.Body}>
            <img className={clsx(styles.Confetti, {
                [styles.ConfettiGanar]: animacion,
            })} src="/recursos/img/confetti.gif"></img>
            <div className={clsx(styles.TituloDiv, {
                [styles.TituloGanar]: animacion,
            })}>
                <h1 className={styles.Titulo}>{titulo}</h1>
            </div>
            <div className={styles.Partes}>
                <div className={styles.Div}>
                    <div className={styles.Tabla}>
                        <div></div>
                        <div><p className={styles.p}><b>Jugador 1</b></p></div>
                        <div><p className={styles.p}><b>Jugador 2</b></p></div>

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

                        <div><p className={styles.p}><b>Full<br />House</b></p></div>
                        <div><PuntajeBoton onClick={() => anotarFull(1)} puntaje={full1}></PuntajeBoton></div>
                        <div><PuntajeBoton onClick={() => anotarFull(2)} puntaje={full2}></PuntajeBoton></div>

                        <div><p className={styles.p}><b>Poker</b></p></div>
                        <div><PuntajeBoton onClick={() => anotarPoker(1)} puntaje={poker1}></PuntajeBoton></div>
                        <div><PuntajeBoton onClick={() => anotarPoker(2)} puntaje={poker2}></PuntajeBoton></div>

                        <div><p className={styles.p}><b>Generala</b></p></div>
                        <div><PuntajeBoton onClick={() => anotarGenerala(1)} puntaje={gen1}></PuntajeBoton></div>
                        <div><PuntajeBoton onClick={() => anotarGenerala(2)} puntaje={gen2}></PuntajeBoton></div>

                        <div><p className={styles.p}><b>Doble<br />Generala</b></p></div>
                        <div><PuntajeBoton onClick={() => anotarGeneralaDoble(1)} puntaje={dobGen1}></PuntajeBoton></div>
                        <div><PuntajeBoton onClick={() => anotarGeneralaDoble(2)} puntaje={dobGen2}></PuntajeBoton></div>
                    </div>
                </div>
                <div className={clsx(styles.Tablero, {
                    [styles.Normal]: (skinTablero == 1),
                    [styles.Rojo]: (skinTablero == 2),
                    [styles.Azul]: (skinTablero == 3),
                    [styles.Tigre]: (skinTablero == 4),
                    [styles.Marmol]: (skinTablero == 5),
                })}>
                    <Dado dataId={1} valor={dados[0]} onClick={() => bloquearDado(1)} skin={skinDado} className={clsx(styles.Dado, {
                        [styles.DadoBloqueado]: dadosBloqueados.includes(1),
                        [styles.ganarDado]: animacion,
                    })}></Dado>
                    <Dado dataId={2} valor={dados[1]} onClick={() => bloquearDado(2)} skin={skinDado} className={clsx(styles.Dado, {
                        [styles.DadoBloqueado]: dadosBloqueados.includes(2),
                        [styles.ganarDado]: animacion,
                    })}></Dado>
                    <Dado dataId={3} valor={dados[2]} onClick={() => bloquearDado(3)} skin={skinDado} className={clsx(styles.Dado, {
                        [styles.DadoBloqueado]: dadosBloqueados.includes(3),
                        [styles.ganarDado]: animacion,
                    })}></Dado>
                    <Dado dataId={4} valor={dados[3]} onClick={() => bloquearDado(4)} skin={skinDado} className={clsx(styles.Dado, {
                        [styles.DadoBloqueado]: dadosBloqueados.includes(4),
                        [styles.ganarDado]: animacion,
                    })}></Dado>
                    <Dado dataId={5} valor={dados[4]} onClick={() => bloquearDado(5)} skin={skinDado} className={clsx(styles.Dado, {
                        [styles.DadoBloqueado]: dadosBloqueados.includes(5),
                        [styles.ganarDado]: animacion,
                    })}></Dado>
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
                    <Tirar onClick={() => tirarDados()}></Tirar>
                </div>
            </div>
        </section>
    )
}

/* {styles.Tablero} */