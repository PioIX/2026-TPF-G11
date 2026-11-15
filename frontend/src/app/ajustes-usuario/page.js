"use client";

import { useRouter, useSearchParams } from "next/navigation";

import styles from "./page.module.css";

import TablaEstadisticasUsuario from "@/components/Tablas/TablaEstadisticasUsuario";
import Button from "@/components/Button";
import Dado from "@/components/Juego/Dado";

export default function AjustesUsuarioPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userID = searchParams.get("user");

  const paginaModoJuego = () => {
    router.back();
  };

  const actualizarSkinDado = async (dado) => {
    const response = await fetch(
      `http://localhost:4000/putSkinDadoUsuario?id_usuario=${userID}`,
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
  };

  const actualizarSkinTablero = async (tablero) => {
    const response = await fetch(
      `http://localhost:4000/putSkinTableroUsuario?id_usuario=${userID}`,
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
              className={styles.Dado}
            ></Dado>
            <Dado
              onClick={() => actualizarSkinDado("nube")}
              dataId={0}
              valor={5}
              skin={"nube"}
            ></Dado>
            <Dado
              onClick={() => actualizarSkinDado("rayo")}
              dataId={0}
              valor={5}
              skin={"rayo"}
            ></Dado>
            <Dado
              onClick={() => actualizarSkinDado("rojo")}
              dataId={0}
              valor={5}
              skin={"rojo"}
            ></Dado>
            <Dado
              onClick={() => actualizarSkinDado("dorado")}
              dataId={0}
              valor={5}
              skin={"dorado"}
            ></Dado>
          </div>

          <h3>Tableros</h3>
          <div className={styles.TablonHolder}>
            <button
              onClick={() => actualizarSkinTablero(1)}
              className={styles.tablero}
            >
              <img src="/recursos/img/tablero1.png" />
            </button>
            <button
              onClick={() => actualizarSkinTablero(2)}
              className={styles.tablero}
            >
              <img src="/recursos/img/tablero2.png" />
            </button>
            <button
              onClick={() => actualizarSkinTablero(3)}
              className={styles.tablero}
            >
              <img src="/recursos/img/tablero3.png" />
            </button>
            <button
              onClick={() => actualizarSkinTablero(4)}
              className={styles.tablero}
            >
              <img src="/recursos/img/tablero4.png" />
            </button>
            <button
              onClick={() => actualizarSkinTablero(5)}
              className={styles.tablero}
            >
              <img src="/recursos/img/tablero5.png" />
            </button>
          </div>
        </div>
        <Button onClick={() => paginaModoJuego()} text="Volver" />

        <img className={styles.img} src="recursos/cat-spinning.gif" />
      </div>
    </>
  );
}
