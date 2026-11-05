"use client";

import Styles from "@/components/Apariencia.module.css";

export default function Apariencia({ onClick, skin }) {
  return (
    <div>
      <button onClick={onClick} className={Styles.Button}>
        <img src={skin} className={Styles.ButtonImage}></img>
      </button>
    </div>
  );
}

/* <a onClick={onClick} src={`/recursos/img/${skin}_5.png`}>
      {text}
    </a>*/
