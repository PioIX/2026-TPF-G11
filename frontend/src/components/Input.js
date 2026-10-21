"use client"

export default function Input({title, onChange, type, placeholder, className}){ //si no le quieren dar classname, pongan "null" y listo
    return(
        <>
            <h3>{title}</h3>
            <input onChange={onChange} type={type} placeholder={placeholder} className={className}></input>
        </>
    )
}