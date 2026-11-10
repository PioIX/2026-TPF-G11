"use client";

import clsx from "clsx";
import styles from "@/components/Juego/Dado.module.css";

export default function Dado({ dataId, valor, onClick, skin }) {
  return (
    <>
      <button
        onClick={onClick}
        data-id={dataId}
        valor={valor}
        className={styles.Dado}
        skin={skin}
      >
        <img src={`/recursos/img/${skin}_${valor}.png`} className={styles.Dado} ></img>
      </button>
    </>
  );
}
