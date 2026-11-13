"use client";

import styles from "@/components/Juego/Dado.module.css";
import clsx from "clsx";

export default function Dado({ dataId, valor, onClick, skin, animacion, esBloqueado }) {
  return (
    <>
      <button
        onClick={onClick}
        data-id={dataId}
        valor={valor}
        className={clsx(styles.Dado, {
          [styles.animacion]: animacion,
          [styles.bloqueado]: esBloqueado,
        })}
        skin={skin}
      >
        <img src={`/recursos/img/${skin}_${valor}.png`}></img>
      </button>
    </>
  );
}
