"use client"

import Button from "@/components/Button"
import Input from "@/components/Input"
import { useState } from "react"
import { useRouter } from "next/navigation";

import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();

  const [mail, setMail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [usuario, setUsuario] = useState("");

  function iniciarSesion() {
    if (mail === "" || contraseña === "") {
      console.log("Error, datos vacíos");
      alert("Error: llenar todos los campos");

    } else {
      const body = {
        email: mail,
        contraseña: contraseña
      };

      const fetchData = async () => {
        const response = await fetch('http://localhost:4000/postLogin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        });

        const data = await response.json();
        console.log(data);

        if (data.length === 0) {
          console.log("Error: el mail no existe o la contraseña es inválida");
          alert("Error: el mail o la contraseña son incorrectos");

        } else if (data.email === "admin" && data.contraseña === "admin") { // cambiar por los datos correctos del admin
          router.push("/admin");
        } else {
          router.push("/modo-juego");
        };
      };

      fetchData();
    }
  }

  function registrarUsuario() {
    if (mail === "" || contraseña === "" || nombre === "" || apellido === "" || usuario === "") {
      console.log("Error, datos vacíos");
      alert("Error: llenar todos los campos");
    } else {
      const body = {
        email: mail,
        contraseña: contraseña,
        nombre: nombre,
        apellido: apellido,
        nombre_de_usuario: usuario
      };

      const fetchData = async () => {
        const response = await fetch('http://localhost:4000/postUsuariosTPF', {
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
    <main className={styles.main}>

      <img src="#" alt="Titulo de generala" title="Generala" className={styles.titleImage}></img>
      <h1>¡Bienvenido/a!</h1>
      <section id="Inicio-sesion">
        <h2>Iniciar sesion</h2>
        <div className={styles.inputDiv}>
          <Input title="Mail: " onChange={(e) => setMail(e.target.value)} type="text" placeholder="XxpepitoxX@gmail.com" className={styles.inputInicio}></Input>
        </div>
        <div className={styles.inputDiv}>
          <Input title="Contraseña: " onChange={(e) => setContraseña(e.target.value)} type="password" placeholder="*******" className={styles.inputInicio}></Input>
        </div>
        <div>
          <Button onClick={iniciarSesion} text="Iniciar sesion" className={styles.inputButton}></Button>
        </div>
      </section>
      <hr></hr>
      <section id="Registro">
        <h2>Registro</h2>
        <p>En caso de querer registrarse, rellene también la siguiente información</p>
        <div className={styles.inputDiv}>
          <Input title="Nombre: " onChange={(e) => setNombre(e.target.value)} type="text" placeholder="Juan Pedro" className={styles.inputInicio}></Input>
        </div>
        <div className={styles.inputDiv}>
          <Input title="Apellido: " onChange={(e) => setApellido(e.target.value)} type="text" placeholder="Cruz Gomez" className={styles.inputInicio}></Input>
        </div>
        <div className={styles.inputDiv}>
          <Input title="Nombre de usuario: " onChange={(e) => setUsuario(e.target.value)} type="text" placeholder="Pepito123" className={styles.inputInicio}></Input>
        </div>
        <div>
          <Button onClick={registrarUsuario} text="Registrarse" className={styles.inputButton}></Button>
        </div>
      </section>
    </main>
  )
}