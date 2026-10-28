"use client"

import PuntajeBoton from "@/components/Juego/PuntajeBoton"

import TablaStyles from "@/components/Juego/PuntajeTabla.module.css";

export default function PuntajeTabla() {
    const esc = 20
    const full = 30
    const poker = 40
    const generala = 50
    const dobleGenerala = 100
    return (
        <div className={TablaStyles.Div}>
            <div className={TablaStyles.Tabla}>
                <div></div>
                <div><p className={TablaStyles.p}><b>{jugador1}</b></p></div>
                <div><p className={TablaStyles.p}><b>{jugador2}</b></p></div>

                <div><p className={TablaStyles.p}><b>1</b></p></div>
                <div><PuntajeBoton onClick={null} valor={1} valorservido={null} puntaje={puntaje1j1} jugador={jugador1}></PuntajeBoton></div>
                <div><PuntajeBoton onClick={null} valor={1} valorServido={null} puntaje={puntaje1j2} jugador={jugador2}></PuntajeBoton></div>

                <div><p className={TablaStyles.p}><b>2</b></p></div>
                <div><PuntajeBoton onClick={null} valor={2} valorservido={null} puntaje={puntaje2j1} jugador={jugador1}></PuntajeBoton></div>
                <div><PuntajeBoton onClick={null} valor={2} valorServido={null} puntaje={puntaje2j2} jugador={jugador2}></PuntajeBoton></div>

                <div><p className={TablaStyles.p}><b>3</b></p></div>
                <div><PuntajeBoton onClick={null} valor={3} valorservido={null} puntaje={puntaje3j1} jugador={jugador1}></PuntajeBoton></div>
                <div><PuntajeBoton onClick={null} valor={3} valorservido={null} puntaje={puntaje3j2} jugador={jugador2}></PuntajeBoton></div>

                <div><p className={TablaStyles.p}><b>4</b></p></div>
                <div><PuntajeBoton onClick={null} valor={4} valorservido={null} puntaje={puntaje4j1} jugador={jugador1}></PuntajeBoton></div>
                <div><PuntajeBoton onClick={null} valor={4} valorservido={null} puntaje={puntaje4j2} jugador={jugador2}></PuntajeBoton></div>

                <div><p className={TablaStyles.p}><b>5</b></p></div>
                <div><PuntajeBoton onClick={null} valor={5} valorservido={null} puntaje={puntaje5j1} jugador={jugador1}></PuntajeBoton></div>
                <div><PuntajeBoton onClick={null} valor={5} valorservido={null} puntaje={puntaje5j2} jugador={jugador2}></PuntajeBoton></div>

                <div><p className={TablaStyles.p}><b>6</b></p></div>
                <div><PuntajeBoton onClick={null} valor={6} valorservido={null} puntaje={puntaje6j1} jugador={jugador1}></PuntajeBoton></div>
                <div><PuntajeBoton onClick={null} valor={6} valorservido={null} puntaje={puntaje6j2} jugador={jugador2}></PuntajeBoton></div>

                <div><p className={TablaStyles.p}><b>Escalera</b></p></div>
                <div><PuntajeBoton onClick={null} valor={esc} valorservido={esc + 5} puntaje={puntajeEscj1} jugador={jugador1}></PuntajeBoton></div>
                <div><PuntajeBoton onClick={null} valor={esc} valorservido={esc + 5} puntaje={puntajeEscj2} jugador={jugador2}></PuntajeBoton></div>

                <div><p className={TablaStyles.p}><b>Full<br></br>House</b></p></div>
                <div><PuntajeBoton onClick={null} valor={full} valorservido={full + 5} puntaje={puntajeFullj1} jugador={jugador1}></PuntajeBoton></div>
                <div><PuntajeBoton onClick={null} valor={full} valorservido={full + 5} puntaje={puntajeFullj2} jugador={jugador2}></PuntajeBoton></div>

                <div><p className={TablaStyles.p}><b>Poker</b></p></div>
                <div><PuntajeBoton onClick={null} valor={poker} valorservido={poker + 5} puntaje={puntajePj1} jugador={jugador1}></PuntajeBoton></div>
                <div><PuntajeBoton onClick={null} valor={poker} valorservido={poker + 5} puntaje={puntajePj2} jugador={jugador2}></PuntajeBoton></div>

                <div><p className={TablaStyles.p}><b>Generala</b></p></div>
                <div><PuntajeBoton onClick={null} valor={generala} valorservido={generala + 5} puntaje={puntajeGj1} jugador={jugador1}></PuntajeBoton></div>
                <div><PuntajeBoton onClick={null} valor={generala} valorservido={generala + 5} puntaje={puntajeGj2} jugador={jugador2}></PuntajeBoton></div>

                <div><p className={TablaStyles.p}><b>Doble<br></br>Generala</b></p></div>
                <div><PuntajeBoton onClick={null} valor={dobleGenerala} valorservido={dobleGenerala + 5} puntaje={puntajeDGj1} jugador={jugador1}></PuntajeBoton></div>
                <div><PuntajeBoton onClick={null} valor={dobleGenerala} valorservido={dobleGenerala + 5} puntaje={puntajeDGj2} jugador={jugador2}></PuntajeBoton></div>
            </div>
        </div>
    )
}