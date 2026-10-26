"use client"

import InputStyles from "@/components/Input.module.css";

export default function Input({title, onChange, type, placeholder}){ //si no le quieren dar classname, pongan "null" y listo
    return(
        <>
            <h3>{title}</h3>
            <input onChange={onChange} type={type} placeholder={placeholder} className={InputStyles.Input}></input>
        </>
    )
}