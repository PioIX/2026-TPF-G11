"use client"

import { useState, useEffect } from "react";
// import { useSocket } from "@/hooks/useSocket";
// import { useRouter } from "next/navigation";
import TablasUsuarios from "@/components/Tablas/TablaUsuarios";
import TablaEstadisticas from "@/components/Tablas/TablaEstadisticas";
import TablaUsuariosPartida from "@/components/Tablas/TablaUsuariosPartida";
import TablaPartidas from "@/components/Tablas/TablaPartidas";

export default function AdminPage() {

  function EliminarU() {
    if (id_usuario === null || id_usuario === "") {
      console.log("Error, datos vacíos");
      alert("Error: llenar todos los campos");

    } else {
      const body = {
        id_usuario: id_usuario
      };

      const fetchData = async () => {
        const response = await fetch('http://localhost:4000/deleteUsuariosTPF', {
          method: ' DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        });

        const data = await response.json();
        console.log(data);


        fetchData();
      }
    }
  }

  function EliminarUP() {
    if (id === null || id === "") {
      console.log("Error, datos vacíos");
      alert("Error: llenar todos los campos");

    } else {
      const body = {
        id: id
      };

      const fetchData = async () => {
        const response = await fetch('http://localhost:4000/deleteUsuariosPartidaTPF', {
          method: ' DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        });

        const data = await response.json();
        console.log(data);


        fetchData();
      }
    }
  }

  function EliminarP() {
    if (id_partida === null || id_partida === "") {
      console.log("Error, datos vacíos");
      alert("Error: llenar todos los campos");

    } else {
      const body = {
        id_partida: id_partida
      };

      const fetchData = async () => {
        const response = await fetch('http://localhost:4000/deletePartidasTPF', {
          method: ' DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        });

        const data = await response.json();
        console.log(data);


        fetchData();
      }
    }
  }

  function EliminarE() {
    if (id_estadistica === null || id_estadistica === "") {
      console.log("Error, datos vacíos");
      alert("Error: llenar todos los campos");

    } else {
      const body = {
        id_estadistica: id_estadistica
      };

      const fetchData = async () => {
        const response = await fetch('http://localhost:4000/deleteEstadisticasTPF', {
          method: ' DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        });

        const data = await response.json();
        console.log(data);


        fetchData();
      }
    }
  }

  return (
    <>
      <div>
        <TablasUsuarios />
        <TablaUsuariosPartida />
        <TablaPartidas />
        <TablaEstadisticas />
      </div>
      <div>
        <h1>Usuarios</h1>
          <h3>Agregar</h3>
            <Input className={nombre} placeholder={Nombre} />
            <Input className="apellido" placeholder="Apellido"/>
            <Input className="nombre de usuario" placeholder="User"/>
            <Input className="email" placeholder="Email"/>
            <Input className="contraseña" placeholder="Contraseña"/>
            <Button text="Agregar usuario"/>
          <h3>Modificar</h3>
            <Input className="id usuario" placeholder="ID"/>
            <Input className={nombre}  placeholder={Nombre} />
            <Input className="apellido" placeholder="Apellido"/>
            <Input className="nombre de usuario" placeholder="User"/>
            <Input className="email" placeholder="Email"/>
            <Input className="contraseña" placeholder="Contraseña"/>
            <Button text="Modificar usuario"/>
          <Eliminar onClick={EliminarU} />
        <h1>UsuariosPartida</h1>
          <Eliminar onClick={EliminarUP} />
        <h1>Partidas</h1>
          <Eliminar onClick={EliminarP} />
        <h1>Estadisticas</h1>
          <h3>Modificar</h3>
            <Input className="id estadistica" placeholder="ID"/>
            <Input className="id usuario" placeholder="ID usuario"/>
            <Input className="generalas totales" placeholder="Generalas totales"/>
            <Input className="partidas totales" placeholder="Partidas totales"/>
            <Input className="partidas ganadas" placeholder="Partidas ganadas"/>
            <Input className="partidas perdidas" placeholder="Partidas perdidas"/>
            <Input className="porcentaje victorias" placeholder="Porcentaje victoria"/> //El porcentaje se debería calcular automáticamente si el admin modifica las partidas totales o las ganadas
            <Input className="puntaje historico" placeholder="Puntaje histórico"/>
          <Eliminar onClick={EliminarE} />
      </div>
    </>
  )
}