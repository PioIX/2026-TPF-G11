"use client"

import Button from "@/components/Button"
import Input from "@/components/Input"
import { useState } from "react"
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [mail, setMail] = useState("")
  const [contraseña, setContraseña] = useState("")
  const [nombre, setNombre] = useState("")
  const [apellido, setApellido] = useState("")
  const [usuario, setUsuario] = useState("")

  function setearMail(event) {
    setMail(event.target.value)
    console.log(mail)
  }

  function setearContraseña(event) {
    setContraseña(event.target.value)
    console.log(contraseña)
  }

  function setearNombre(event) {
    setNombre(event.target.value)
    console.log(nombre)
  }

  function setearApellido(event) {
    setApellido(event.target.value)
    console.log(apellido)
  }

  function setearUsuario(event) {
    setUsuario(event.target.value)
    console.log(usuario)
  }

  function iniciarSesion() {
    if (mail === "" || contraseña === "") {
      console.log("Error, datos vacíos")
      alert("Error: llenar todos los campos")

    } else {
      const body = {
        email: mail,
        contraseña: contraseña
      }

      const fetchData = async () => {
        const response = await fetch('http://localhost:4000/postLogin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        });

        const data = await response.json();
        console.log(data)

        if (data.length === 0) {
          console.log("Error: el mail no existe o la contraseña es inválida")
          alert("Error: el mail o la contraseña son incorrectos")

        } else if (data.email === "admin" && data.contraseña === "admin") { // cambiar por los datos correctos del admin
          router.push("/admin")
        } else {
          router.push("/modo-juego");
        };
      };

      fetchData();
    }
  }

  function registrarUsuario() {
    if (mail === "" || contraseña === "" || nombre === "" || apellido === "" || usuario === "") {
      console.log("Error, datos vacíos")
      alert("Error: llenar todos los campos")
    } else {
      const body = {
        email: mail,
        contraseña: contraseña,
        nombre: nombre,
        apellido: apellido,
        nombre_de_usuario: usuario
      };

      const fetchData = async () => {
        const response = await fetch('http://localhost:4000/postRegistro', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        });
        const data = await response.json();
        console.log(data);

        if (data.length === 0) {
          console.log("Error: el usuario ya existe")
          alert("Error: el usuario o el mail ya existen")
        } else {
          router.push("/modo-juego");
        }

      };

      fetchData();
    }
  }

  return (
    <>
      <img src="/recursos/img/titulo.png" alt="Titulo de generala" title="Generala"></img>
      <h1>¡Bienvenido/a!</h1>
      <h2>Iniciar sesion</h2>

      <Input title={"Mail"} onChange={setearMail()} type={"text"} placeholder={"XxpepitoxX@gmail.com"}></Input>
      <Input title={"Contraseña"} onChange={setearContraseña()} type={"password"} placeholder={"*******"}></Input>
      <Button onClick={iniciarSesion()} text={"Iniciar sesion"}></Button>

      <hr></hr>

      <h2>Registro</h2>
      <p>En caso de querer registrarse, rellene también la siguiente información</p>
      <Input title={"Nombre"} onChange={setearNombre()} type={"text"} placeholder={"Juan Pedro"}></Input>
      <Input title={"Apellido"} onChange={setearApellido()} type={"text"} placeholder={"Cruz Gomez"}></Input>
      <Input title={"Nombre de usuario"} onChange={setearUsuario()} type={"text"} placeholder={"Pepito123"}></Input>
      <Button onClick={registrarUsuario()} text={"Registrarse"}></Button>
    </>
  )
}