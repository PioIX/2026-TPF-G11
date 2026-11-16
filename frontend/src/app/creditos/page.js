"use client";
import styles from "./page.module.css";
import { useRouter, useSearchParams } from "next/navigation";

export default function Creditos() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userID = searchParams.get("user");

  const paginaModoJuego = () => {
    router.push(`/modo-juego?user=${userID}`);
  };

  return (
    <section className={styles.section}>
      <button className={styles.Button} onClick={() => paginaModoJuego()}>
        Volver
      </button>

      <img
        src="/recursos/img/confetti.gif"
        style={{
          position: "fixed",
          top: "0",
          bottom: "0",
          left: "0",
          right: "0",
          width: "100%",
          height: "100%",
        }}
      ></img>
      <div className={styles.body}>
        <div style={{ display: "flex" }}>
          <img src="/recursos/cat-spinning.gif" />
          <h1 className={styles.title}>CREADORES</h1>
          <img src="/recursos/cat-spinning.gif" />
        </div>
        <div className={styles.main}>
          <div>
            <img src="/recursos/img/ani.png" className={styles.img} />
            <h1>Anika Baldesari</h1>
            <p>CEO del CSS, pionero en CSLX.</p>
          </div>

          <div>
            <img src="/recursos/img/mechi.png" className={styles.img} />
            <h1>Mercedes Alievi</h1>
            <p>CEO del Java Script, creadora del Socket.</p>
          </div>

          <div>
            <img src="/recursos/img/thiago.png" className={styles.img} />
            <h1>Thiago Ibarzabal</h1>
            <p>CEO del SQL, asesino de las tablas y el terror del DER.</p>
          </div>

          <div>
            <img src="/recursos/img/vicky.png" className={styles.img} />
            <h1>Victoria Kutianski</h1>
            <p>CEO del admin, experta en graficos.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* <button className={styles.Button} onClick={() => paginaModoJuego()}>
          Volver
        </button>
        <img src="/recursos/img/confetti.gif" className={styles.confetti}></img> */
