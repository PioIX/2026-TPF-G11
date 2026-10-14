"use client"

export default function Button({onClick, text, className}){
    return(
        <button onClick={onClick} className={className}>{text}</button>
    )
}