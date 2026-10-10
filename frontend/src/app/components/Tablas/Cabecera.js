"use client"

export default function Cabecera({ columnas, id }) {

    return (
        <thead>
            <tr>
                {columnas.map((columna, index) => {
                    return <th key={`cabecera-${id}-columna-${index}`}>{columna}</th>;
                })}
            </tr>
        </thead>
    )
}