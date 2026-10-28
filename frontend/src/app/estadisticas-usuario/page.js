"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation";

import styles from "./page.module.css";

import TablaEstadisticasUsuario from "@/components/Tablas/TablaEstadisticasUsuario"
import Button from "@/components/Button";


export default function EstadisticasUsuarioPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const userID = searchParams.get("user");

    const paginaModoJuego = () => {
        router.back();
    }


    return (
        <>
            <div>
            <h1>Estadisticas</h1>
            <TablaEstadisticasUsuario />
            </div>
            <Button onClick={paginaModoJuego} text="Volver"/>
        </>
    )
}