"use client";

import Tirar from "@/components/Juego/Tirar";
import Dado from "@/components/Juego/Dado";
import PuntajeBoton from "@/components/Juego/PuntajeBoton";

import clsx from "clsx";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import styles from "./page.module.css";
import Button from "@/components/Button";

const API_BASE_URL = "http://localhost:4000";

const apiRequest = async (path, options) => {
  const response = await fetch(`${API_BASE_URL}${path}`, options);
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }
  return response.json();
};

export default function GeneralaLocal() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const userID = searchParams.get("user");

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
  const [dados, setDados] = useState([0, 0, 0, 0, 0]);
  const [turnoJugador, setTurnoJugador] = useState(1);
  const [puntaje1, setPuntaje1] = useState([]);
  const [puntaje2, setPuntaje2] = useState([]);
  const [dadosBloqueados, setDadosBloqueados] = useState([]);
  const [titulo, setTitulo] = useState("Turno del Jugador 1");
  const cantidadCategorias = 11;

  const [animacion, setAnimacion] = useState(false);
  const [escondido, setEscondido] = useState(true);
  const [escondidoReglas, setEscondidoReglas] = useState(true);

  const [skinTablero, setSkinTablero] = useState(1);
  const [skinDado, setSkinDado] = useState("dado");

  const skinUsuario = async () => {
    try {
      const skins = await apiRequest(`/getSkin?id_usuario=${userID}`);
      if (skins.length > 0) {
        setSkinTablero(skins[0].skin_tablero);
        setSkinDado(skins[0].skin_dado);
      }
    } catch (error) {
      console.error("No se pudo cargar el skin del usuario:", error);
    }
  };

  useEffect(() => {
    skinUsuario();
  }, []);

  const cambiarTurno = () => {
    const siguienteJugador = turnoJugador === 1 ? 2 : 1;
    setTurnoJugador(siguienteJugador);
    setTitulo(`Turno del Jugador ${siguienteJugador}`);
    tirarDados(true);
  };

  const actualizarEstadisticas = async (ganador, cantGeneralas) => {
    try {
      const estadisticas = await apiRequest(
        `/getEstadisticasUsuario?id_usuario=${userID}`
      );
      if (estadisticas.length !== 0) {
        const estadistica = estadisticas[0];
        const jugadorGano = ganador === "Jugador 1";
        const jugadorPerdio = ganador === "Jugador 2";
        await apiRequest("/putEstadisticasTPF", {
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
      }
    } catch (error) {
      console.error("No se pudieron actualizar las estadísticas:", error);
    }
  };

  async function postUsuariosPartida(idPartida) {
    try {
      const body = {
        jugador1: userID,
        jugador2: userID,
        id_partida: idPartida,
      };
      await apiRequest(`/postUsuariosPartidaTPF?id_usuario=${userID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
    } catch (error) {
      console.error("No se pudo registrar la participación:", error);
    }
  };
  
    async function postPartida(puntajesFinales) {
      try {
      const [puntajeJugador1, puntajeJugador2] = puntajesFinales;
      const body = {
        empate: puntajeJugador1 === puntajeJugador2,
        jugador1: userID,
        jugador2: userID,
        puntaje: Math.max(puntajeJugador1, puntajeJugador2),
        fecha: new Date(),
        sala: "Local",
      };
      const partida = await apiRequest(`/postPartidasTPF?id_usuario=${userID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      return partida.insertId ?? null;
      } catch (error) {
        console.error("No se pudo registrar la partida:", error);
        return null;
      }
  };    
 
  const finJuego = (ganador, puntajesFinales, generalaGanada = false) => {
    let ganadorFinal = ganador;
    let puntajesCalculados =
      puntajesFinales ??
      [
        puntaje1.reduce((total, puntos) => total + puntos, 0),
        puntaje2.reduce((total, puntos) => total + puntos, 0),
      ];
    if (!ganador) {
      const [puntajeJugador1, puntajeJugador2] = puntajesCalculados;
      if (puntajeJugador1 > puntajeJugador2) {
        ganadorFinal = "Jugador 1";
        setTitulo("Ganador: ¡ Jugador 1 !");
      } else if (puntajeJugador2 > puntajeJugador1) {
        ganadorFinal = "Jugador 2";
        setTitulo("Ganador: ¡ Jugador 2 !");
      } else {
        setTitulo("¡ Empate !");
      }
    } else {
      setTitulo(`Ganador: ¡ ${ganador} !`);
    }
    setAnimacion(true);
    const generalasDelJugador1 =
      Number(gen1 === "50") +
      Number(dobGen1 === "100") +
      Number(generalaGanada);
    actualizarEstadisticas(ganadorFinal, generalasDelJugador1);
    postPartida(puntajesCalculados).then((idPartida) => {
      if (idPartida) {
        postUsuariosPartida(idPartida);
      }
    });
  };

  const tirarDados = (nuevaRonda = false) => {
    const tiradasActuales = nuevaRonda ? 0 : cantTiradas;
    if (tiradasActuales >= 3) {
      alert("Ya hiciste tres tiradas");
    } else {
      const dadosActuales = nuevaRonda ? [0, 0, 0, 0, 0] : dados;
      const dadosBloqueadosActuales = nuevaRonda ? [] : dadosBloqueados;
      const nuevaTirada = dadosActuales.map((dado, index) =>
        tiradasActuales > 0 && dadosBloqueadosActuales.includes(index + 1)
          ? dado
          : Math.floor(Math.random() * 6) + 1
      );
      setDados(nuevaTirada);
      setDadosBloqueados(dadosBloqueadosActuales);
      setCantTiradas(tiradasActuales + 1);
    }
  };

  const bloquearDado = (dataId) => {
    if (!dadosBloqueados.includes(dataId)) {
      setDadosBloqueados([...dadosBloqueados, dataId]);
    } else {
      setDadosBloqueados(dadosBloqueados.filter((dado) => dado !== dataId));
    }
  };

  const juegoServido = () => {
    if (cantTiradas === 1) {
      return 5;
    } else {
      return 0;
    }
  };

  const generalaServida = () => cantTiradas === 1;

  const anotarNumero = (numero, jugador) => {
    const categorias = {
      1: [uno1, setUno1],
      2: [dos1, setDos1],
      3: [tres1, setTres1],
      4: [cuatro1, setCuatro1],
      5: [cinco1, setCinco1],
      6: [seis1, setSeis1],
    };
    const categoriasJugador2 = {
      1: [uno2, setUno2],
      2: [dos2, setDos2],
      3: [tres2, setTres2],
      4: [cuatro2, setCuatro2],
      5: [cinco2, setCinco2],
      6: [seis2, setSeis2],
    };
    const [puntajeActual, setPuntaje] =
      jugador === 1 ? categorias[numero] : categoriasJugador2[numero];

    if (jugador !== turnoJugador || cantTiradas === 0 || puntajeActual !== "") {
      return;
    }

    const puntos = dados.reduce(
      (total, dado) => total + (dado === numero ? numero : 0),
      0
    );
    setPuntaje(`${puntos}`);
    guardarPuntaje(puntos);
  };

  const guardarPuntaje = (puntos, ganador = null, generalaGanada = false) => {
    const nuevoPuntaje1 = turnoJugador === 1 ? [...puntaje1, puntos] : puntaje1;
    const nuevoPuntaje2 = turnoJugador === 2 ? [...puntaje2, puntos] : puntaje2;
    setPuntaje1(nuevoPuntaje1);
    setPuntaje2(nuevoPuntaje2);

    if (ganador) {
      finJuego(ganador, undefined, generalaGanada);
      return;
    }

    if (
      nuevoPuntaje1.length === cantidadCategorias &&
      nuevoPuntaje2.length === cantidadCategorias
    ) {
      finJuego(
        null,
        [
          nuevoPuntaje1.reduce((total, valor) => total + valor, 0),
          nuevoPuntaje2.reduce((total, valor) => total + valor, 0),
        ],
        generalaGanada
      );
      return;
    }

    cambiarTurno();
  };

  const puedeAnotar = (jugador, puntajeActual) =>
    jugador === turnoJugador && cantTiradas > 0 && puntajeActual === "";

  const anotarGenerala = (jugador) => {
    const puntajeActual = jugador === 1 ? gen1 : gen2;
    if (!puedeAnotar(jugador, puntajeActual)) {
      return;
    }

    const esGen = dados.every((dado) => dado === dados[0]);
    const puntos = esGen ? 50 : 0;
    (jugador === 1 ? setGen1 : setGen2)(`${puntos}`);
    const ganador = esGen && generalaServida() ? `Jugador ${jugador}` : null;
    guardarPuntaje(puntos, ganador, jugador === 1 && esGen);
  };

  const anotarGeneralaDoble = (jugador) => {
    const puntajeActual = jugador === 1 ? dobGen1 : dobGen2;
    const generalaAnterior = jugador === 1 ? gen1 : gen2;
    if (!puedeAnotar(jugador, puntajeActual)) {
      return;
    }

    const esGen =
      Number(generalaAnterior) === 50 &&
      dados.every((dado) => dado === dados[0]);
    const puntos = esGen ? 100 : 0;
    (jugador === 1 ? setDobGen1 : setDobGen2)(`${puntos}`);
    guardarPuntaje(puntos, null, jugador === 1 && esGen);
  };

  const anotarPoker = (jugador) => {
    const puntajeActual = jugador === 1 ? poker1 : poker2;
    if (!puedeAnotar(jugador, puntajeActual)) {
      return;
    }

    const contador = dados.reduce((conteo, dado) => {
      conteo[dado] = (conteo[dado] || 0) + 1;
      return conteo;
    }, {});
    const puntos = Object.values(contador).includes(4)
      ? 40 + juegoServido()
      : 0;
    (jugador === 1 ? setPoker1 : setPoker2)(`${puntos}`);
    guardarPuntaje(puntos);
  };

  const anotarFull = (jugador) => {
    const puntajeActual = jugador === 1 ? full1 : full2;
    if (!puedeAnotar(jugador, puntajeActual)) {
      return;
    }

    const contador = dados.reduce((conteo, dado) => {
      conteo[dado] = (conteo[dado] || 0) + 1;
      return conteo;
    }, {});
    const valores = Object.values(contador);
    const puntos =
      valores.includes(3) && valores.includes(2) ? 30 + juegoServido() : 0;
    (jugador === 1 ? setFull1 : setFull2)(`${puntos}`);
    guardarPuntaje(puntos);
  };

  const anotarEscalera = (jugador) => {
    const puntajeActual = jugador === 1 ? esc1 : esc2;
    if (!puedeAnotar(jugador, puntajeActual)) {
      return;
    }

    const dadosOrdenados = [...dados].sort((a, b) => a - b);
    const escMenor = [1, 2, 3, 4, 5];
    const escMayor = [2, 3, 4, 5, 6];
    const esEsc =
      JSON.stringify(dadosOrdenados) === JSON.stringify(escMenor) ||
      JSON.stringify(dadosOrdenados) === JSON.stringify(escMayor);
    const puntos = esEsc ? 20 + juegoServido() : 0;
    (jugador === 1 ? setEsc1 : setEsc2)(`${puntos}`);
    guardarPuntaje(puntos);
  };

  const PopVolver = () => {
    setEscondido(false);
  }

  const VolverAtras = () => {
    router.back();
    // HACER QUE TAMBIEN SE BORREN LOS DATOS (si no se borran ya lel)
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
          <div style={{display: "flex", width: "100%", flex: "0", justifyContent: "space-between", alignItems: "center"}}>
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
      <img
        className={clsx(styles.Confetti, {
          [styles.Mostrar]: animacion,
        })}
        src="/recursos/img/confetti.gif"
      ></img>
      <div className={clsx(styles.Creditos, {
        [styles.Mostrar]: animacion,
      })}>
        <Button text={"Creditos"} onClick={() => (router.push(`/creditos?user=${userID}`))}></Button>
      </div>
      <div
        className={clsx(styles.TituloDiv, {
          [styles.TituloGanar]: animacion,
        })}
      >
        <h1 className={styles.Titulo}>{titulo}</h1>
      </div>
      <div className={styles.Partes}>
        <div className={styles.Div}>
          <div className={styles.Tabla}>
            <div></div>
            <div>
              <p className={styles.p}>
                <b>Jugador 1</b>
              </p>
            </div>
            <div>
              <p className={styles.p}>
                <b>Jugador 2</b>
              </p>
            </div>

            <div>
              <p className={styles.p}>
                <b>1</b>
              </p>
            </div>
            <div>
              <PuntajeBoton
                onClick={() => anotarNumero(1, 1)}
                puntaje={uno1}
              ></PuntajeBoton>
            </div>
            <div>
              <PuntajeBoton
                onClick={() => anotarNumero(1, 2)}
                puntaje={uno2}
              ></PuntajeBoton>
            </div>

            <div>
              <p className={styles.p}>
                <b>2</b>
              </p>
            </div>
            <div>
              <PuntajeBoton
                onClick={() => anotarNumero(2, 1)}
                puntaje={dos1}
              ></PuntajeBoton>
            </div>
            <div>
              <PuntajeBoton
                onClick={() => anotarNumero(2, 2)}
                puntaje={dos2}
              ></PuntajeBoton>
            </div>

            <div>
              <p className={styles.p}>
                <b>3</b>
              </p>
            </div>
            <div>
              <PuntajeBoton
                onClick={() => anotarNumero(3, 1)}
                puntaje={tres1}
              ></PuntajeBoton>
            </div>
            <div>
              <PuntajeBoton
                onClick={() => anotarNumero(3, 2)}
                puntaje={tres2}
              ></PuntajeBoton>
            </div>

            <div>
              <p className={styles.p}>
                <b>4</b>
              </p>
            </div>
            <div>
              <PuntajeBoton
                onClick={() => anotarNumero(4, 1)}
                puntaje={cuatro1}
              ></PuntajeBoton>
            </div>
            <div>
              <PuntajeBoton
                onClick={() => anotarNumero(4, 2)}
                puntaje={cuatro2}
              ></PuntajeBoton>
            </div>

            <div>
              <p className={styles.p}>
                <b>5</b>
              </p>
            </div>
            <div>
              <PuntajeBoton
                onClick={() => anotarNumero(5, 1)}
                puntaje={cinco1}
              ></PuntajeBoton>
            </div>
            <div>
              <PuntajeBoton
                onClick={() => anotarNumero(5, 2)}
                puntaje={cinco2}
              ></PuntajeBoton>
            </div>

            <div>
              <p className={styles.p}>
                <b>6</b>
              </p>
            </div>
            <div>
              <PuntajeBoton
                onClick={() => anotarNumero(6, 1)}
                puntaje={seis1}
              ></PuntajeBoton>
            </div>
            <div>
              <PuntajeBoton
                onClick={() => anotarNumero(6, 2)}
                puntaje={seis2}
              ></PuntajeBoton>
            </div>

            <div>
              <p className={styles.p}>
                <b>Escalera</b>
              </p>
            </div>
            <div>
              <PuntajeBoton
                onClick={() => anotarEscalera(1)}
                puntaje={esc1}
              ></PuntajeBoton>
            </div>
            <div>
              <PuntajeBoton
                onClick={() => anotarEscalera(2)}
                puntaje={esc2}
              ></PuntajeBoton>
            </div>

            <div>
              <p className={styles.p}>
                <b>
                  Full
                  <br />
                  House
                </b>
              </p>
            </div>
            <div>
              <PuntajeBoton
                onClick={() => anotarFull(1)}
                puntaje={full1}
              ></PuntajeBoton>
            </div>
            <div>
              <PuntajeBoton
                onClick={() => anotarFull(2)}
                puntaje={full2}
              ></PuntajeBoton>
            </div>

            <div>
              <p className={styles.p}>
                <b>Poker</b>
              </p>
            </div>
            <div>
              <PuntajeBoton
                onClick={() => anotarPoker(1)}
                puntaje={poker1}
              ></PuntajeBoton>
            </div>
            <div>
              <PuntajeBoton
                onClick={() => anotarPoker(2)}
                puntaje={poker2}
              ></PuntajeBoton>
            </div>

            <div>
              <p className={styles.p}>
                <b>Generala</b>
              </p>
            </div>
            <div>
              <PuntajeBoton
                onClick={() => anotarGenerala(1)}
                puntaje={gen1}
              ></PuntajeBoton>
            </div>
            <div>
              <PuntajeBoton
                onClick={() => anotarGenerala(2)}
                puntaje={gen2}
              ></PuntajeBoton>
            </div>

            <div>
              <p className={styles.p}>
                <b>
                  Doble
                  <br />
                  Generala
                </b>
              </p>
            </div>
            <div>
              <PuntajeBoton
                onClick={() => anotarGeneralaDoble(1)}
                puntaje={dobGen1}
              ></PuntajeBoton>
            </div>
            <div>
              <PuntajeBoton
                onClick={() => anotarGeneralaDoble(2)}
                puntaje={dobGen2}
              ></PuntajeBoton>
            </div>
          </div>
        </div>
        <div
          className={clsx(styles.Tablero, {
            [styles.Normal]: skinTablero == 1,
            [styles.Rojo]: skinTablero == 2,
            [styles.Azul]: skinTablero == 3,
            [styles.Tigre]: skinTablero == 4,
            [styles.Marmol]: skinTablero == 5,
            [styles.Filete]: skinTablero == 6,
          })}
        >
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
            <p>
              Haz click sobre un dado para bloquearlo, haz click devuelta para
              desbloquearlo
              <br />
              <br />
              Los dados bloqueados no van a cambiar si vuelves a tirar tus
              dados.
              <br />
              <br />
              Haz click sobre el espacio vacio en el tablon de puntaje para
              anotar el puntaje de tus dados.
              <br />
              <br />
              Los datos de esta partida solo se guardaran para el usuario
              loggeado.
            </p>
            <button onClick={() => setEscondidoReglas(false)} className={styles.ReglasBoton}>Cómo jugar</button>
          </div>
          <Tirar onClick={() => tirarDados()}></Tirar>
        </div>
      </div>
    </section>
  );
}