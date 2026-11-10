"use client";

import { useRouter } from "next/navigation";

import styles from "./page.module.css";

import TablaEstadisticasUsuario from "@/components/Tablas/TablaEstadisticasUsuario";
import Button from "@/components/Button";

import Dado from "@/components/Juego/Dado";

export default function EstadisticasUsuarioPage() {
  const router = useRouter();

  const paginaModoJuego = () => {
    router.back();
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
          <Dado skin="dado" valor="6" />
          <Dado skin="nube" valor="6" />
          <Dado skin="rayo" valor="6" />
          <Dado skin="chino" valor="6" />
          <Dado skin="dorado" valor="6" />

          <h3>Tableros</h3>
          
        </div>
        <Button onClick={paginaModoJuego} text="Volver" />

        <img className={styles.img} src="recursos/cat-spinning.gif" />
      </div>
    </>
  );
}
/* Hay que agregar el componente de tableros */