"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

import styles from "./page.module.css";
import clsx from "clsx";

import TablaEstadisticasUsuario from "@/components/Tablas/TablaEstadisticasUsuario";
import Button from "@/components/Button";
import Dado from "@/components/Juego/Dado";

export default function AjustesUsuarioPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userID = searchParams.get("user");
  const url = `localhost`;

  const [skinTablero, setSkinTablero] = useState(1)
  const [skinDado, setSkinDado] = useState("dado")

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

  const paginaModoJuego = () => {
    router.back();
  };

  const actualizarSkinDado = async (dado) => {
    const response = await fetch(
      `http://${url}:4000/putSkinDadoUsuario?id_usuario=${userID}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          skin_dado: dado,
        }),
      }
    );

    const data = await response.json();
    console.log(data);
    setSkinDado(dado);
  };

  const actualizarSkinTablero = async (tablero) => {
    const response = await fetch(
      `http://${url}:4000/putSkinTableroUsuario?id_usuario=${userID}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          skin_tablero: Number(tablero),
        }),
      }
    );

    const data = await response.json();
    console.log(data);
    setSkinTablero(tablero);
  };

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
              onClick={() => actualizarSkinDado("dado")}
              dataId={0}
              valor={5}
              skin={"dado"}
              esBloqueado={skinDado === "dado"}
            ></Dado>
            <Dado
              onClick={() => actualizarSkinDado("nube")}
              dataId={0}
              valor={5}
              skin={"nube"}
              esBloqueado={skinDado === "nube"}
            ></Dado>
            <Dado
              onClick={() => actualizarSkinDado("rayo")}
              dataId={0}
              valor={5}
              skin={"rayo"}
              esBloqueado={skinDado === "rayo"}
            ></Dado>
            <Dado
              onClick={() => actualizarSkinDado("rojo")}
              dataId={0}
              valor={5}
              skin={"rojo"}
              esBloqueado={skinDado === "rojo"}
            ></Dado>
            <Dado
              onClick={() => actualizarSkinDado("dorado")}
              dataId={0}
              valor={5}
              skin={"dorado"}
              esBloqueado={skinDado === "dorado"}
            ></Dado>
            <Dado
              onClick={() => actualizarSkinDado("filete")}
              dataId={0}
              valor={5}
              skin={"filete"}
              esBloqueado={skinDado === "filete"}
            ></Dado>
          </div>

          <h3>Tableros</h3>
          <div className={styles.TablonHolder}>
            <button
              onClick={() => actualizarSkinTablero(1)}
              className={clsx(styles.tablero, {
                [styles.seleccionado]: skinTablero === 1,
              })}
            >
              <img src="/recursos/img/tablero1.png" />
            </button>
            <button
              onClick={() => actualizarSkinTablero(2)}
              className={clsx(styles.tablero, {
                [styles.seleccionado]: skinTablero === 2,
              })}
            >
              <img src="/recursos/img/tablero2.png" />
            </button>
            <button
              onClick={() => actualizarSkinTablero(3)}
              className={clsx(styles.tablero, {
                [styles.seleccionado]: skinTablero === 3,
              })}
            >
              <img src="/recursos/img/tablero3.png" />
            </button>
            <button
              onClick={() => actualizarSkinTablero(4)}
              className={clsx(styles.tablero, {
                [styles.seleccionado]: skinTablero === 4,
              })}
            >
              <img src="/recursos/img/tablero4.png" />
            </button>
            <button
              onClick={() => actualizarSkinTablero(5)}
              className={clsx(styles.tablero, {
                [styles.seleccionado]: skinTablero === 5,
              })}
            >
              <img src="/recursos/img/tablero5.png" />
            </button>
            <button
              onClick={() => actualizarSkinTablero(6)}
              className={clsx(styles.tablero, {
                [styles.seleccionado]: skinTablero === 6,
              })}
            >
              <img src="/recursos/img/tablero6.png" />
            </button>
          </div>
        </div>
        <Button onClick={() => paginaModoJuego()} text="Volver" />

        <img className={styles.img} src="recursos/cat-spinning.gif" />
      </div>
    </>
  );
}
