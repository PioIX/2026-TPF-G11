"use client"

export default function Input({title, onChange, type, placeholder, className}){
    return(
        <>
            <label>{title}</label>
            <input onChange={onChange} type={type} placeholder={placeholder} className={className}></input>
        </>
    )
}