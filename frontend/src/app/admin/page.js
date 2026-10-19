"use client"

import TablasUsuarios from "@/components/Tablas/TablaUsuarios";
import TablaEstadisticas from "@/components/Tablas/TablaEstadisticas";
import TablaUsuariosPartida from "@/components/Tablas/TablaUsuariosPartida";
import TablaPartidas from "@/components/Tablas/TablaPartidas";
import Eliminar from "@/components/Admin/Eliminar";
import Modificar from "@/components/Admin/Modificar";
import Agregar from "@/components/Admin/Agregar";

const modificarEstadisticas = [
    { id: 'id-usuario', placeholder: 'ID usuario' },
    { id: 'generalas-totales', placeholder: 'Generalas totales' },
    { id: 'partidas-totales', placeholder: 'Partidas totales' },
    { id: 'partidas-ganadas', placeholder: 'Partidas ganadas' },
    { id: 'partidas-perdidas', placeholder: 'Partidas perdidas' },
    { id: 'puntaje-historico', placeholder: 'Puntaje histórico' },
];

const modificarUsuarios = [
    { id: 'id-usuario', placeholder: 'ID usuario' },
    { id: 'nombre', placeholder: 'Nombre' },
    { id: 'apellido', placeholder: 'Apellido' },
    { id: 'nombre-de-usuario', placeholder: 'User' },
    { id: 'email', placeholder: 'Email' },
    { id: 'contraseña', placeholder: 'Contraseña' },
];

const agregarUsuarios = [
    { id: 'nombre', placeholder: 'Nombre' },
    { id: 'apellido', placeholder: 'Apellido' },
    { id: 'nombre-de-usuario', placeholder: 'User' },
    { id: 'email', placeholder: 'Email' },
    { id: 'contraseña', placeholder: 'Contraseña' },
];

export default function AdminPage() {
  return (
    <>
      <div className="tablas-container">
        <TablasUsuarios />
        <TablaUsuariosPartida />
        <TablaPartidas />
        <TablaEstadisticas />
      </div>
      <div className="admin-actions">
        <h1>Usuarios</h1>
          <Agregar tabla="usuarios" data={agregarUsuarios} /> 
          <Modificar tabla="usuarios" data={modificarUsuarios} />
          <Eliminar tabla="usuarios" />
        <h1>UsuariosPartida</h1>
          <Eliminar tabla="usuariosPartida" />
        <h1>Partidas</h1>
          <Eliminar tabla="partidas" />
        <h1>Estadisticas</h1>
          <Modificar tabla="estadisticas" data={modificarEstadisticas} />
          <Eliminar tabla="estadisticas" />
      </div>
    </>
  )
}
