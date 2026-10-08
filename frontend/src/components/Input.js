"use client"

export default function Input({title, onChange, type, placeholder}){
    return(
        <>
            <label>{title}</label>
            <input onChange={onChange} type={type} placeholder={placeholder}></input>
        </>
    )
}