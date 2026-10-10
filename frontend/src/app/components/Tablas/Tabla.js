"use client"
import styles from "./Tabla.module.css";
import Cabecera from "./Cabecera";
import Fila from "./Fila";

export default function Tabla({ cabecera, filas }) {
    return (
        <table className={styles.tabla} >
            <Cabecera columnas={cabecera} />
            <tbody>
                {filas.map((fila, index) => (
                    <Fila key={`fila-${index}`} id={index} data={fila} />
                ))}
            </tbody>
        </table>
    )
}