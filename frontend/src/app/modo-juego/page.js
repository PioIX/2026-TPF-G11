"use client"

import Button from "@/components/Button";

import styles from "./page.module.css";
import ButtonStyles from "@/components/Button.module.css";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ModoJuego() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const userID = searchParams.get("user");

    const [sala, setSala] = useState("");

    const jugarLocal = () => {
        router.push(`/generala-local?user=${userID}`);
    }

    const jugarOnline = () => {
        if (!sala) {
            alert("Ingrese la sala")
        } else {
            router.push(`/generala-online?user=${userID}&sala=${sala}`);
        }
    }

    return (
        <div className={styles.body}>
            <h1 className={styles.title}>Elija el modo de juego:</h1>
            <main className={styles.main}>
                <div>
                    <div className={styles.modoDiv}>
                        <div className={styles.localImg}></div>
                        <h2>Juego Local</h2>
                        <p>Puedes jugar en una sola computadora.</p>
                    </div>
                    <Button onClick={jugarLocal} text={"Jugar Localmente"} className={ButtonStyles.Button}></Button>
                </div>
                <div>
                    <div className={styles.modoDiv}>
                        <div className={styles.onlineImg}></div>
                        <h2>Juego Online</h2>
                        <p>Puedes jugar con dos computadoras, con un jugador en cada una.</p>
                    </div>
                    <Button onClick={jugarOnline} text={"Jugar Online"} className={ButtonStyles.Button}></Button>
                </div>
            </main>
        </div>
    )
}