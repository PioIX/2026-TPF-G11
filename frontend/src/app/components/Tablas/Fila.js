"use client"
import Celda from "./Celda";

export default function Fila({ data, id }) {
    return (
        <tr>
            {data.map((columna, index) => {
                console.log(`fila-${id}-columna-${index}`, columna);
                return <Celda key={`fila-${id}-columna-${index}`} data={columna}></Celda>;
            })}
        </tr>
    )
}