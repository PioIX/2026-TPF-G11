"use client";

import { useRouter } from "next/navigation";

import styles from "./page.module.css";

import TablaEstadisticasUsuario from "@/components/Tablas/TablaEstadisticasUsuario";
import Button from "@/components/Button";
import Dado from "@/components/Juego/Dado";
import { useEffect, useState } from "react";

export default function EstadisticasUsuarioPage(dado, tablero) {
  const router = useRouter();

  const [skinDado, setSkinDado] = useState("dado");
  const [skinTablero, setSkinTablero] = useState(1);

  const paginaModoJuego = () => {
    router.back();
  };

  useEffect(() => {
    fetch("http://localhost:4000/getDadoUsuario")
      .then((response) => response.json())
      .then((data) => {
        setSkinDado(data);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:4000/putDadoUsuario"),
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dado),
      };
  }, []);

  useEffect(() => {
    fetch("http://localhost:4000/getTableroUsuario")
      .then((response) => response.json())
      .then((data) => {
        setSkinTablero(data);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:4000/putTableroUsuario"),
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tablero),
      };
  }, []);

  var dado = "dado";
  var tablero = 1;

  return (
    <>
      <div className={styles.pagina}>
        <div className={styles.tabla}>
          <h1>Ajustes</h1>
          <TablaEstadisticasUsuario />
        </div>
        <div>
          <h2>Apariencia</h2>

          <h3>Dados</h3>
          <div className={styles.DadoHolder}>
            <Dado
              onClick={() => (dado = "dado")}
              dataId={0}
              valor={5}
              skin={"dado"}
              className={styles.Dado}
            ></Dado>
            <Dado
              onClick={() => (dado = "nube")}
              dataId={0}
              valor={5}
              skin={"nube"}
            ></Dado>
            <Dado
              onClick={() => (dado = "rayo")}
              dataId={0}
              valor={5}
              skin={"rayo"}
            ></Dado>
            <Dado
              onClick={() => (dado = "rojo")}
              dataId={0}
              valor={5}
              skin={"rojo"}
            ></Dado>
            <Dado
              onClick={() => (dado = "dorado")}
              dataId={0}
              valor={5}
              skin={"dorado"}
            ></Dado>
          </div>

          <h3>Tableros</h3>
          <div className={styles.TablonHolder}>
            <button onClick={() => (tablero = 1)} className={styles.tablero}>
              <img src="/recursos/img/tablero1.png" />
            </button>
            <button onClick={() => (tablero = 2)} className={styles.tablero}>
              <img src="/recursos/img/tablero2.png" />
            </button>
            <button onClick={() => (tablero = 3)} className={styles.tablero}>
              <img src="/recursos/img/tablero3.png" />
            </button>
            <button onClick={() => (tablero = 4)} className={styles.tablero}>
              <img src="/recursos/img/tablero4.png" />
            </button>
            <button onClick={() => (tablero = 5)} className={styles.tablero}>
              <img src="/recursos/img/tablero5.png" />
            </button>
          </div>
        </div>
        <Button onClick={paginaModoJuego} text="Volver" />

        <img className={styles.img} src="recursos/cat-spinning.gif" />
      </div>
    </>
  );
}
