"use client"

import Tirar from "@/components/Juego/Tirar";
import Dado from "@/components/Juego/Dado";
import PuntajeBoton from "@/components/Juego/PuntajeBoton"

import clsx from "clsx";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useSocket } from "@/hooks/useSocket";

import styles from "./page.module.css";
import DadoStyles from "@/components/Juego/Dado.module.css";

export default function GeneralaOnline() {
    const searchParams = useSearchParams();
    const sala = searchParams.get("sala");
    const userID = searchParams.get("user");
    const { socket, isConnected } = useSocket();

    useEffect(() => {
        if (!socket || !sala) return;
        socket.emit("joinRoom", { room: sala });
    }, [socket, sala]);

    return (
        <>
        </>
    )
}