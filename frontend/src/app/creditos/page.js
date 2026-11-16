"use client";
import styles from "./page.module.css";

export default function Creditos() {
  return (
    <section className={styles.section}>
      <img  src="/recursos/img/confetti.gif" className={styles.confetti}></img>
      <div className={styles.body}>
        <div style={{display:"flex"}}>
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
