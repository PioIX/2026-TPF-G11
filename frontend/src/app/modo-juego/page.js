"use client"

import Button from "@/components/Button";
import Input from "@/components/Input";

import clsx from "clsx";
import styles from "./page.module.css";
import ButtonStyles from "@/components/Button.module.css";
import InputStyles from "@/components/Input.module.css";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ModoJuego() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const userID = searchParams.get("user");

    const [sala, setSala] = useState("");
    const [escondido, setEscondido] = useState(true)

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

    const mostrarSala = () => {
        if (escondido) {
            setEscondido(false);
        } else {
            setEscondido(true)
        }

    }

    const paginaEst = () => {
        router.push(`/estadisticas`);
    }

    return (
        <section className={styles.section}>
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
                        <Button onClick={mostrarSala} text={"Jugar Online"} className={ButtonStyles.Button}></Button>
                    </div>
                </main>
                <div className={clsx(styles.salaDiv, {
                    [styles.escondido]: escondido,
                })}>
                    <p>Asegurate que la otra persona ponga exactamente el mismo nombre de sala</p>
                    <Input onChange={(e) => setSala(e.target.value)} type={"text"} title={"Escriba su sala"} placeholder={"MiSala123"} className={InputStyles.Input}></Input>
                    <Button onClick={jugarOnline} text={"Jugar"} className={ButtonStyles.Button}></Button>
                </div>
            </div>
            <Button onClick={paginaEst} text={"Estadisticas"} className={clsx(ButtonStyles.Button, {
                [ButtonStyles.estadisticas]: true,
            })}></Button>
        </section>
    )
}