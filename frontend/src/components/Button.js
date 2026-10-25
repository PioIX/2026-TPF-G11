"use client"

import ButtonStyles from "@/components/Button.module.css";

export default function Button({onClick, text}){
    return(
        <button onClick={onClick} className={ButtonStyles.Button}>{text}</button>
    )
}