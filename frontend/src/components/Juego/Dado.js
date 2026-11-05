"use client";

import { useState } from "react";

import clsx from "clsx";
import DadoStyles from "@/components/Juego/Dado.module.css";

export default function Dado({ dataId, valor, onClick, skin }) {
  return (
    <>
      <button
        onClick={onClick}
        data-id={dataId}
        valor={valor}
        className={DadoStyles.Dado}
        skin={skin}
      >
        <img src={`/recursos/img/${skin}_${valor}.png`}></img>
      </button>
    </>
  );
}
