"use client"

// import { useEffect } from "react";
// import { useState } from "react";
// import { useSocket } from "@/hooks/useSocket";
// import { useRouter } from "next/navigation";
import TablasUsuarios from "@/app/components/Tablas/TablaUsusarios";
import TablaEstadisticas from "@/app/components/Tablas/TablaEstadisticas";
import TablaUsuariosPartida from "@/app/components/Tablas/TablaUsuariosPartida";
import TablaPartidas from "@/app/components/Tablas/TablaPartidas";

export default function AdminPage() {
  return (
    <>
        <TablasUsuarios />
        <TablaUsuariosPartida />
        <TablaPartidas />
        <TablaEstadisticas />
    </>
  )
}