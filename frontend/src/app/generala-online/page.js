"use client"

import Tirar from "@/components/Juego/Tirar";
import Button from "@/components/Button";
import Dado from "@/components/Juego/Dado";
import PuntajeBoton from "@/components/Juego/PuntajeBoton"

import clsx from "clsx";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSocket } from "@/hooks/useSocket";

import styles from "./page.module.css";

export default function GeneralaOnline() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const sala = searchParams.get("sala");
    const userID = searchParams.get("user");
    const { socket, isConnected } = useSocket();
    const url = `localhost`;

    const [dados, setDados] = useState([0, 0, 0, 0, 0]);
    const [dadosBloqueados, setDadosBloqueados] = useState([]);
    const [titulo, setTitulo] = useState("")
    const [turnoJugador, setTurnoJugador] = useState(null);
    const [cantTiradas, setCantTiradas] = useState(0);

    const [animacion, setAnimacion] = useState(false);
    const [escondido, setEscondido] = useState(true);
    const [escondidoReglas, setEscondidoReglas] = useState(true);

    const [skinTablero, setSkinTablero] = useState(1)
    const [skinDado, setSkinDado] = useState("dado")

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

    const skinUsuario = async () => {
        const skinResponse = await fetch(
            `http://${url}:4000/getSkin?id_usuario=${userID}`
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

    useEffect(() => {
        if (!socket) return;
        const handleTurnoCambiado = (data) => {
            setDados(data.dados);
            setDadosBloqueados(data.dadosBloqueados);
            setCantTiradas(data.cantTiradas);
            if (data.turnoJugador !== turnoJugador) {
                setTurnoJugador(data.turnoJugador);
            }
            if (data.turnoJugador === userID) {
                setTitulo("Es tu turno");
            } else {
                setTitulo("Espera tu turno");
            }
        };
        socket.on("turnoCambiado", handleTurnoCambiado);
        return () => socket.off("turnoCambiado", handleTurnoCambiado);
    }, [socket, turnoJugador, userID]);

    const actualizarEstadisticas = async (ganador, cantGeneralas) => {
        const estadisticasResponse = await fetch(
            `http://${url}:4000/getEstadisticasUsuario?id_usuario=${userID}`
        );
        const estadisticas = await estadisticasResponse.json();
        if (estadisticas.length !== 0) {

            const estadistica = estadisticas[0];
            const jugadorGano = ganador != null && String(ganador) === String(userID);
            const jugadorPerdio = ganador != null && !jugadorGano;
            const response = await fetch("http://${url}:4000/putEstadisticasTPF", {
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

    useEffect(() => {
        if (!socket) return;
        const handleFinJuego = (data) => {
            const ganadorFinal = data.ganador;
            const jugadorGano = ganadorFinal != null
                && String(ganadorFinal) === String(userID);
            if (ganadorFinal == null) {
                setTitulo("¡ Empate !");
            } else if (jugadorGano) {
                setTitulo("¡ Ganaste !");
            } else {
                setTitulo("¡ Perdiste !");
            }
            setAnimacion(true);
            const cantGeneralas = Number((data.generalaGanada && jugadorGano) || gen1 === "50")
                + Number(dobGen1 === "100");
            actualizarEstadisticas(ganadorFinal, cantGeneralas);
        };
        socket.on("finJuego", handleFinJuego);
        return () => socket.off("finJuego", handleFinJuego);
    }, [socket, gen1, dobGen1, userID]);

    const tirarDados = (nuevaRonda = false) => {
        const tiradasActuales = nuevaRonda ? 0 : cantTiradas;
        if (tiradasActuales >= 3) {
            alert("Ya hiciste tres tiradas")
        } else {
            socket.emit("tirarDados", { user: userID, nuevaRonda: nuevaRonda });
        }
    }

    useEffect(() => {
        if (!socket) return;
        const handleDadosTirados = (data) => {
            setDados(data.dados);
            setDadosBloqueados(data.dadosBloqueados);
            setCantTiradas(data.cantTiradas);
        };
        socket.on("dadosTirados", handleDadosTirados);
        return () => socket.off("dadosTirados", handleDadosTirados);
    }, [socket]);

    const bloquearDado = (dataId) => {
        socket.emit("bloquearDados", { user: userID, dadoID: dataId })
    }

    useEffect(() => {
        if (!socket) return;
        const handleNuevosDadosBloqueados = (data) => {
            setDadosBloqueados(data.dados)
        };
        socket.on("nuevosDadosBloqueados", handleNuevosDadosBloqueados);
        return () => socket.off("nuevosDadosBloqueados", handleNuevosDadosBloqueados);
    }, [socket]);

    const anotarNumero = (numero) => {
        socket.emit("anotarNumero", { user: userID, numero: numero })
    }

    useEffect(() => {
        if (!socket) return;
        const handleNumeroAnotado = (data) => {
            switch (data.numero) {
                case 1:
                    if (data.user === userID) {
                        setUno1(data.puntos);
                    } else {
                        setUno2(data.puntos);
                    }
                    break;
                case 2:
                    if (data.user === userID) {
                        setDos1(data.puntos);
                    } else {
                        setDos2(data.puntos);
                    }
                    break;
                case 3:
                    if (data.user === userID) {
                        setTres1(data.puntos);
                    } else {
                        setTres2(data.puntos);
                    }
                    break;
                case 4:
                    if (data.user === userID) {
                        setCuatro1(data.puntos);
                    } else {
                        setCuatro2(data.puntos);
                    }
                    break;
                case 5:
                    if (data.user === userID) {
                        setCinco1(data.puntos);
                    } else {
                        setCinco2(data.puntos);
                    }
                    break;
                case 6:
                    if (data.user === userID) {
                        setSeis1(data.puntos);
                    } else {
                        setSeis2(data.puntos);
                    }
                    break;
                default:
                    break;
            }
        };
        socket.on("numeroAnotado", handleNumeroAnotado);
        return () => socket.off("numeroAnotado", handleNumeroAnotado);
    }, [socket]);

    const anotarGenerala = () => {
        socket.emit("anotarGenerala", { user: userID });
    }

    useEffect(() => {
        if (!socket) return;
        const handleGeneralaAnotada = (data) => {
            if (data.user === userID) {
                setGen1(`${data.puntos}`);
            } else {
                setGen2(`${data.puntos}`);
            }
        };
        socket.on("generalaAnotada", handleGeneralaAnotada);
        return () => socket.off("generalaAnotada", handleGeneralaAnotada);
    }, [socket]);

    const anotarGeneralaDoble = () => {
        socket.emit("anotarGeneralaDoble", { user: userID });
    }

    useEffect(() => {
        if (!socket) return;
        const handleGeneralaDobleAnotada = (data) => {
            if (data.user === userID) {
                setDobGen1(`${data.puntos}`);
            } else {
                setDobGen2(`${data.puntos}`);
            }
        };
        socket.on("generalaDobleAnotada", handleGeneralaDobleAnotada);
        return () => socket.off("generalaDobleAnotada", handleGeneralaDobleAnotada);
    }, [socket]);

    const anotarPoker = () => {
        socket.emit("anotarPoker", { user: userID });
    }

    useEffect(() => {
        if (!socket) return;
        const handlePokerAnotado = (data) => {
            if (data.user === userID) {
                setPoker1(`${data.puntos}`);
            } else {
                setPoker2(`${data.puntos}`);
            }
        };
        socket.on("pokerAnotado", handlePokerAnotado);
        return () => socket.off("pokerAnotado", handlePokerAnotado);
    }, [socket]);

    const anotarFull = () => {
        socket.emit("anotarFull", { user: userID });
    }

    useEffect(() => {
        if (!socket) return;
        const handleFullAnotado = (data) => {
            if (data.user === userID) {
                setFull1(`${data.puntos}`);
            } else {
                setFull2(`${data.puntos}`);
            }
        };
        socket.on("fullAnotado", handleFullAnotado);
        return () => socket.off("fullAnotado", handleFullAnotado);
    }, [socket]);

    const anotarEscalera = () => {
        socket.emit("anotarEscalera", { user: userID });
    }

    useEffect(() => {
        if (!socket) return;
        const handleEscaleraAnotada = (data) => {
            if (data.user === userID) {
                setEsc1(`${data.puntos}`);
            } else {
                setEsc2(`${data.puntos}`);
            }
        };
        socket.on("escaleraAnotada", handleEscaleraAnotada);
        return () => socket.off("escaleraAnotada", handleEscaleraAnotada);
    }, [socket]);

    const PopVolver = () => {
        setEscondido(false);
    }

    const VolverAtras = () => {
        router.back();
    }

    return (
        <section className={styles.Body}>
            <button className={styles.Button} onClick={() => PopVolver()}>
                Volver
            </button>
            <div className={clsx(styles.Reglamento, {
                [styles.escondido]: escondidoReglas,
            })}>
                <div className={styles.ReglamentoContent}>
                    <div style={{ display: "flex", width: "100%", flex: "0", justifyContent: "space-between", alignItems: "center" }}>
                        <h1>Reglamento y cómo jugar</h1>
                        <div className={styles.CerrarDiv}>
                            <button className={styles.Cerrar} onClick={() => setEscondidoReglas(true)}> X </button>
                        </div>
                    </div>
                    <hr style={{ borderColor: 'darkred' }}></hr>
                    <ul>
                        <li><p>El puntaje anotado a un numero se calcula por la cantidad de dados con ese numero al anotar.</p></li>
                        <li><p><b>Escalera:</b> (20pts) Es cuando tenes un dado de cada uno, es decir, 1-2-3-4-5 o 2-3-4-5-6. Los dados pueden estar desordenados en el tablon.</p></li>
                        <li><p><b>Full House:</b> (30pts) 2 dados del mismo valor y 3 dados de otro valor.</p></li>
                        <li><p><b>Poker:</b> (40pts) 4 dados del mismo valor y 1 dado de otro value.</p></li>
                        <li><p><b>Generala:</b> (50pts) 5 dados del mismo value.</p></li>
                        <li><p><b>Doble Generala:</b> (100pts) 5 dados del mismo valor una segunda vez. Gana el juego inmediatamente.</p></li>
                    </ul>
                    <hr style={{ borderColor: 'darkred' }}></hr>
                    <p>Cada turno tenes 3 tiradas. La primera ocurre automáticamente cuando cambia el turno.</p>
                    <p>Si querés "tachar" un puntaje, solo clickeá sobre el botón correspondiente. Se anotará como 0 puntos.</p>
                </div>
            </div>
            <div className={clsx(styles.PopupVolver, {
                [styles.escondido]: escondido,
            })}>
                <div className={styles.PopupContent}>
                    <h1>¡Espera!</h1>
                    <p>¿Estás seguro de que quieres volver al menú?</p>
                    <div>
                        <button className={styles.Confirmar} onClick={() => VolverAtras()}>
                            Sí, Volver atras
                        </button>
                        <button className={styles.Cancelar} onClick={() => setEscondido(true)}>
                            No, Cancelar
                        </button>
                    </div>
                </div>
            </div>
            <div className={clsx(styles.Creditos, {
                [styles.Mostrar]: animacion,
            })}>
                <Button text={"Creditos"} onClick={() => (router.push(`/creditos?user=${userID}`))}></Button>
            </div>
            <img className={clsx(styles.Confetti, {
                [styles.Mostrar]: animacion,
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
                        <div><p className={styles.p}><b>Vos</b></p></div>
                        <div><p className={styles.p}><b>Contrincante</b></p></div>

                        <div><p className={styles.p}><b>1</b></p></div>
                        <div><PuntajeBoton onClick={() => anotarNumero(1)} puntaje={uno1}></PuntajeBoton></div>
                        <div><PuntajeBoton onClick={() => anotarNumero(1)} puntaje={uno2}></PuntajeBoton></div>

                        <div><p className={styles.p}><b>2</b></p></div>
                        <div><PuntajeBoton onClick={() => anotarNumero(2)} puntaje={dos1}></PuntajeBoton></div>
                        <div><PuntajeBoton onClick={() => anotarNumero(2)} puntaje={dos2}></PuntajeBoton></div>

                        <div><p className={styles.p}><b>3</b></p></div>
                        <div><PuntajeBoton onClick={() => anotarNumero(3)} puntaje={tres1}></PuntajeBoton></div>
                        <div><PuntajeBoton onClick={() => anotarNumero(3)} puntaje={tres2}></PuntajeBoton></div>

                        <div><p className={styles.p}><b>4</b></p></div>
                        <div><PuntajeBoton onClick={() => anotarNumero(4)} puntaje={cuatro1}></PuntajeBoton></div>
                        <div><PuntajeBoton onClick={() => anotarNumero(4)} puntaje={cuatro2}></PuntajeBoton></div>

                        <div><p className={styles.p}><b>5</b></p></div>
                        <div><PuntajeBoton onClick={() => anotarNumero(5)} puntaje={cinco1}></PuntajeBoton></div>
                        <div><PuntajeBoton onClick={() => anotarNumero(5)} puntaje={cinco2}></PuntajeBoton></div>

                        <div><p className={styles.p}><b>6</b></p></div>
                        <div><PuntajeBoton onClick={() => anotarNumero(6)} puntaje={seis1}></PuntajeBoton></div>
                        <div><PuntajeBoton onClick={() => anotarNumero(6)} puntaje={seis2}></PuntajeBoton></div>

                        <div><p className={styles.p}><b>Escalera</b></p></div>
                        <div><PuntajeBoton onClick={() => anotarEscalera()} puntaje={esc1}></PuntajeBoton></div>
                        <div><PuntajeBoton onClick={() => anotarEscalera()} puntaje={esc2}></PuntajeBoton></div>

                        <div><p className={styles.p}><b>Full<br />House</b></p></div>
                        <div><PuntajeBoton onClick={() => anotarFull()} puntaje={full1}></PuntajeBoton></div>
                        <div><PuntajeBoton onClick={() => anotarFull()} puntaje={full2}></PuntajeBoton></div>

                        <div><p className={styles.p}><b>Poker</b></p></div>
                        <div><PuntajeBoton onClick={() => anotarPoker()} puntaje={poker1}></PuntajeBoton></div>
                        <div><PuntajeBoton onClick={() => anotarPoker()} puntaje={poker2}></PuntajeBoton></div>

                        <div><p className={styles.p}><b>Generala</b></p></div>
                        <div><PuntajeBoton onClick={() => anotarGenerala()} puntaje={gen1}></PuntajeBoton></div>
                        <div><PuntajeBoton onClick={() => anotarGenerala()} puntaje={gen2}></PuntajeBoton></div>

                        <div><p className={styles.p}><b>Doble<br />Generala</b></p></div>
                        <div><PuntajeBoton onClick={() => anotarGeneralaDoble()} puntaje={dobGen1}></PuntajeBoton></div>
                        <div><PuntajeBoton onClick={() => anotarGeneralaDoble()} puntaje={dobGen2}></PuntajeBoton></div>
                    </div>
                </div>
                <div className={clsx(styles.Tablero, {
                    [styles.Normal]: (skinTablero == 1),
                    [styles.Rojo]: (skinTablero == 2),
                    [styles.Azul]: (skinTablero == 3),
                    [styles.Tigre]: (skinTablero == 4),
                    [styles.Marmol]: (skinTablero == 5),
                    [styles.Filete]: (skinTablero == 6),
                })}>
                    <Dado
                        dataId={1}
                        valor={dados[0]}
                        onClick={() => bloquearDado(1)}
                        skin={skinDado}
                        animacion={animacion}
                        esBloqueado={dadosBloqueados.includes(1)}
                    ></Dado>
                    <Dado
                        dataId={2}
                        valor={dados[1]}
                        onClick={() => bloquearDado(2)}
                        skin={skinDado}
                        animacion={animacion}
                        esBloqueado={dadosBloqueados.includes(2)}
                    ></Dado>
                    <Dado
                        dataId={3}
                        valor={dados[2]}
                        onClick={() => bloquearDado(3)}
                        skin={skinDado}
                        animacion={animacion}
                        esBloqueado={dadosBloqueados.includes(3)}
                    ></Dado>
                    <Dado
                        dataId={4}
                        valor={dados[3]}
                        onClick={() => bloquearDado(4)}
                        skin={skinDado}
                        animacion={animacion}
                        esBloqueado={dadosBloqueados.includes(4)}
                    ></Dado>
                    <Dado
                        dataId={5}
                        valor={dados[4]}
                        onClick={() => bloquearDado(5)}
                        skin={skinDado}
                        animacion={animacion}
                        esBloqueado={dadosBloqueados.includes(5)}
                    ></Dado>
                </div>
                <div>
                    <div className={styles.Guia}>
                        <h3>Controles y Tips</h3>
                        <p>Haz click sobre un dado para bloquearlo, haz click devuelta
                            para desbloquearlo<br /><br />Los dados bloqueados no van a
                            cambiar si vuelves a tirar tus dados.<br /><br />Haz click
                            sobre el espacio vacio en el tablon de puntaje para anotar el
                            puntaje de tus dados.<br /><br /></p>
                        <button onClick={() => setEscondidoReglas(false)} className={styles.ReglasBoton}>Cómo jugar</button>
                    </div>
                    <Tirar onClick={() => tirarDados()}></Tirar>
                </div>
            </div>
        </section>
    )
}

/* {styles.Tablero} */