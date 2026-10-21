"use client"
import { useState } from "react";

import TablasUsuarios from "@/components/Tablas/TablaUsuarios";
import TablaEstadisticas from "@/components/Tablas/TablaEstadisticas";
import TablaUsuariosPartida from "@/components/Tablas/TablaUsuariosPartida";
import TablaPartidas from "@/components/Tablas/TablaPartidas";
import Eliminar from "@/components/Admin/Eliminar";
import Modificar from "@/components/Admin/Modificar";
import Agregar from "@/components/Admin/Agregar";

const modificarEstadisticas = [
    { id: 'id_usuario', placeholder: 'ID usuario' },
    { id: 'generalas_totales', placeholder: 'Generalas totales' },
    { id: 'partidas_totales', placeholder: 'Partidas totales' },
    { id: 'partidas_ganadas', placeholder: 'Partidas ganadas' },
    { id: 'partidas_perdidas', placeholder: 'Partidas perdidas' },
    { id: 'puntaje_historico', placeholder: 'Puntaje histórico' },
];

const eliminarEstadisticas = [
    { id: 'id_usuario', placeholder: 'ID usuario' }
];

const modificarUsuarios = [
    { id: 'id_usuario', placeholder: 'ID usuario' },
    { id: 'nombre', placeholder: 'Nombre' },
    { id: 'apellido', placeholder: 'Apellido' },
    { id: 'nombre_de_usuario', placeholder: 'User' },
    { id: 'email', placeholder: 'Email' },
    { id: 'contraseña', placeholder: 'Contraseña' },
];

const agregarUsuarios = [
    { id: 'nombre', placeholder: 'Nombre' },
    { id: 'apellido', placeholder: 'Apellido' },
    { id: 'nombre_de_usuario', placeholder: 'User' },
    { id: 'email', placeholder: 'Email' },
    { id: 'contraseña', placeholder: 'Contraseña' },
];

const eliminarUsuarios = [
    { id: 'id_usuario', placeholder: 'ID usuario' }
];

const eliminarUsuariosPartida = [
    { id: 'id', requestKey: 'id', placeholder: 'ID registro' }
];

const eliminarPartidas = [
    { id: 'id_partida', requestKey: 'id', placeholder: 'ID partida' }
];

export default function AdminPage() {
  const [refreshId, setRefreshId] = useState(0);
  const refreshTables = () => setRefreshId((prevRefreshId) => prevRefreshId + 1);

  return (
    <>
      <div className="tablas-container">
        <TablasUsuarios refresh={refreshId} />
        <TablaUsuariosPartida refresh={refreshId} />
        <TablaPartidas refresh={refreshId} />
        <TablaEstadisticas refresh={refreshId} />
      </div>
      <div className="admin-actions">
        <h1>Usuarios</h1>
          <Agregar tabla="usuarios" data={agregarUsuarios} onClick={refreshTables} /> 
          <Modificar tabla="usuarios" data={modificarUsuarios} onClick={refreshTables} />
          <Eliminar tabla="usuarios" data={eliminarUsuarios} onClick={refreshTables} />
        <h1>UsuariosPartida</h1>
          <Eliminar tabla="usuariosPartida" data={eliminarUsuariosPartida} onClick={refreshTables} />
        <h1>Partidas</h1>
          <Eliminar tabla="partidas" data={eliminarPartidas} onClick={refreshTables} />
        <h1>Estadisticas</h1>
          <Modificar tabla="estadisticas" data={modificarEstadisticas} onClick={refreshTables} />
          <Eliminar tabla="estadisticas" data={eliminarEstadisticas} onClick={refreshTables} />
      </div>
    </>
  )
}
