"use client";
import InputStyles from "@/components/Input.module.css";

export default function Creditos() {
  return (
    <section className={styles.section}>
      <div className={styles.body}>
        <h1>CREADORES</h1>
        <div>
          <img src="/recursos/img/ani.png" />
          <h1>Anika Baldesari</h1>
          <p>CEO del CSS, pionero en CSLX</p>
        </div>

        <div>
          <img src="/recursos/img/mechi.png" />
          <h1>Mercedes Alievi</h1>
          <p>CEO del Java Script, creadora del Socket </p>
        </div>

        <div>
          <img src="/recursos/img/thiago.png" />
          <h1>Thiago Ibarzabal</h1>
          <p>CEO del SQL, asesino de las tablas y el terror del der</p>
        </div>

        <div>
          <img src="/recursos/img/vicky.png" />
          <h1>Victoria Kutianski</h1>
          <p>CEO del admin, experta en graficos</p>
        </div>
      </div>
    </section>
  );
}
