const express = require("express");
const cors = require("cors");
const session = require("express-session");
const { Server } = require("socket.io");

const { realizarQuery } = require("./modulos/mysql");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const sessionMiddleware = session({
  secret: "keysupersecreta",
  resave: false,
  saveUninitialized: false,
});
app.use(sessionMiddleware);

const server = app.listen(PORT, () => {
  console.log(`Servidor NodeJS corriendo en http://localhost:${PORT}/`);
});

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000" ,"http://localhost:3001"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  },
});

io.use((socket, next) => {
  sessionMiddleware(socket.request, {}, next);
});

const partidas = new Map();

const crearDatosPartida = () => ({
  J1: null,
  J2: null,
  turnoJugador: null,
  finalizada: false,
  dados: [0, 0, 0, 0, 0],
  cantTiradas: 0,
  dadosBloqueados: [],
  puntajeJ1: {
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    full: "",
    poker: "",
    esc: "",
    gen: "",
    dobGen: ""
  },
  puntajeJ2: {
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    full: "",
    poker: "",
    esc: "",
    gen: "",
    dobGen: ""
  }
});

io.on("connection", (socket) => {
  const req = socket.request;

  let datosPartida = crearDatosPartida();

  const juegoServido = () => {
    if (datosPartida.cantTiradas === 1) {
      return 5;
    } else {
      return 0;
    }
  }

  const generalaServida = () => {
    return datosPartida.cantTiradas === 1;
  };

  const tirarDados = (nuevaRonda = false) => {
    const tiradasActuales = nuevaRonda ? 0 : datosPartida.cantTiradas;
    const dadosActuales = nuevaRonda ? [0, 0, 0, 0, 0] : datosPartida.dados;
    const dadosBloqueadosActuales = nuevaRonda ? [] : datosPartida.dadosBloqueados;
    datosPartida.dados = dadosActuales.map((dado, index) =>
      tiradasActuales > 0 && dadosBloqueadosActuales.includes(index + 1)
        ? dado
        : Math.floor(Math.random() * 6) + 1
    );
    datosPartida.dadosBloqueados = dadosBloqueadosActuales;
    datosPartida.cantTiradas = tiradasActuales + 1;

    return {
      dados: datosPartida.dados,
      dadosBloqueados: datosPartida.dadosBloqueados,
      cantTiradas: datosPartida.cantTiradas
    };
  };

  const chequearPuntaje = (ganador = null, generala = false) => {
    if (datosPartida.finalizada) return;

    if (ganador) {
      datosPartida.finalizada = true;
      const puntajeTotalJ1 = Object.values(datosPartida.puntajeJ1).reduce((total, puntaje) => total + Number(puntaje || 0), 0);
      const puntajeTotalJ2 = Object.values(datosPartida.puntajeJ2).reduce((total, puntaje) => total + Number(puntaje || 0), 0);
      io.to(req.session.room).emit("finJuego", {
        ganador: ganador,
        J1: datosPartida.J1,
        J2: datosPartida.J2,
        puntajesFinales: {
          J1: puntajeTotalJ1,
          J2: puntajeTotalJ2
        },
        generalaGanada: generala
      })
      return;
    }

    if (Object.values(datosPartida.puntajeJ1).every(puntaje => puntaje !== "") &&
      Object.values(datosPartida.puntajeJ2).every(puntaje => puntaje !== "")) {
      const puntajeTotalJ1 = Object.values(datosPartida.puntajeJ1).reduce((total, puntaje) => total + puntaje, 0);
      const puntajeTotalJ2 = Object.values(datosPartida.puntajeJ2).reduce((total, puntaje) => total + puntaje, 0);
      const ganadorFinal = puntajeTotalJ1 > puntajeTotalJ2
        ? datosPartida.J1
        : puntajeTotalJ2 > puntajeTotalJ1
          ? datosPartida.J2
          : null;
      datosPartida.finalizada = true;
      io.to(req.session.room).emit("finJuego", {
        ganador: ganadorFinal,
        puntajesFinales: {
          J1: puntajeTotalJ1,
          J2: puntajeTotalJ2
        },
        generalaGanada: false
      })
      return
    }
  }

  const emitirTurno = () => {
    io.to(req.session.room).emit("turnoCambiado", {
      turnoJugador: datosPartida.turnoJugador,
      dados: datosPartida.dados,
      dadosBloqueados: datosPartida.dadosBloqueados,
      cantTiradas: datosPartida.cantTiradas
    });
  };

  const avanzarTurno = () => {
    datosPartida.turnoJugador = datosPartida.turnoJugador === datosPartida.J1
      ? datosPartida.J2
      : datosPartida.J1;
    tirarDados(true);
    emitirTurno();
  };

  socket.on("joinRoom", (data) => {
    console.log("🚀 ~ io.on ~ req.session.room:", req.session.room);
    if (req.session.room != undefined && req.session.room.length > 0)
      socket.leave(req.session.room);
    req.session.room = data.room;
    req.session.user = data.user;
    socket.join(req.session.room);
    if (!partidas.has(req.session.room)) {
      partidas.set(req.session.room, crearDatosPartida());
    }
    datosPartida = partidas.get(req.session.room);

    if (datosPartida.J1 == null) {
      datosPartida.J1 = data.user;
      datosPartida.turnoJugador = data.user;
      tirarDados(true);
      numJugador = 1;
    } else if (datosPartida.J2 == null) {
      datosPartida.J2 = data.user;
      numJugador = 2;
    }
    emitirTurno();
  });

  socket.on("tirarDados", (data) => {
    if (datosPartida.finalizada) return;
    if (data.user === datosPartida.turnoJugador) {
      io.to(req.session.room).emit("dadosTirados", tirarDados(data.nuevaRonda));
    }
  });

  socket.on("bloquearDados", (data) => {
    if (datosPartida.finalizada) return;
    if (data.user === datosPartida.turnoJugador) {
      if (!datosPartida.dadosBloqueados.includes(data.dadoID)) {
        datosPartida.dadosBloqueados.push(data.dadoID);
      } else {
        const index = datosPartida.dadosBloqueados.indexOf(data.dadoID);
        datosPartida.dadosBloqueados.splice(index, 1);
      }

      io.to(req.session.room).emit("nuevosDadosBloqueados", {
        dados: datosPartida.dadosBloqueados
      });
    }
  });

  socket.on("anotarNumero", (data) => {
    if (datosPartida.finalizada) return;
    if (data.user === datosPartida.turnoJugador) {
      const puntajeActual = data.user === datosPartida.J1 ? datosPartida.puntajeJ1[data.numero] : datosPartida.puntajeJ2[data.numero];
      if (puntajeActual === "") {
        const puntos = datosPartida.dados.reduce((total, dado) => total + (dado === data.numero ? data.numero : 0), 0);
        if (data.user === datosPartida.J1) {
          datosPartida.puntajeJ1[data.numero] = puntos;
        } else {
          datosPartida.puntajeJ2[data.numero] = puntos;
        }

        io.to(req.session.room).emit("numeroAnotado", {
          numero: data.numero,
          puntos: puntos,
          user: data.user
        });
        avanzarTurno();
        chequearPuntaje();
      }
    }
  });

  socket.on("anotarGenerala", (data) => {
    if (datosPartida.finalizada) return;
    if (data.user === datosPartida.turnoJugador) {
      if (data.user === datosPartida.J1 && datosPartida.puntajeJ1.gen !== "") return;
      if (data.user === datosPartida.J2 && datosPartida.puntajeJ2.gen !== "") return;
      const esGen = datosPartida.dados.every(dado => dado === datosPartida.dados[0]);
      const puntos = esGen ? 50 : 0;
      if (data.user === datosPartida.J1) {
        datosPartida.puntajeJ1.gen = puntos;
      } else {
        datosPartida.puntajeJ2.gen = puntos;
      }
      const ganador = esGen && generalaServida() ? data.user : null;
      io.to(req.session.room).emit("generalaAnotada", {
        puntos: puntos,
        user: data.user
      });
      if (!ganador) avanzarTurno();
      chequearPuntaje(ganador, Boolean(ganador));
    }
  });

  socket.on("anotarGeneralaDoble", (data) => {
    if (datosPartida.finalizada) return;
    if (data.user === datosPartida.turnoJugador) {
      if (data.user === datosPartida.J1 && datosPartida.puntajeJ1.dobGen !== "") return;
      if (data.user === datosPartida.J2 && datosPartida.puntajeJ2.dobGen !== "") return;
      const esGen = datosPartida.dados.every(dado => dado === datosPartida.dados[0]);
      const puntajeGenerala = data.user === datosPartida.J1
        ? datosPartida.puntajeJ1.gen
        : datosPartida.puntajeJ2.gen;
      const puntos = puntajeGenerala === 50 && esGen ? 100 : 0;
      if (data.user === datosPartida.J1) {
        datosPartida.puntajeJ1.dobGen = puntos;
      } else {
        datosPartida.puntajeJ2.dobGen = puntos;
      }
      const ganador = puntos === 100 && generalaServida() ? data.user : null;
      io.to(req.session.room).emit("generalaDobleAnotada", {
        puntos: puntos,
        user: data.user
      });
      if (!ganador) avanzarTurno();
      chequearPuntaje(ganador, Boolean(ganador));
    }
  });

  socket.on("anotarPoker", (data) => {
    if (datosPartida.finalizada) return;
    if (data.user === datosPartida.turnoJugador) {
      if (data.user === datosPartida.J1 && datosPartida.puntajeJ1.poker !== "") return;
      if (data.user === datosPartida.J2 && datosPartida.puntajeJ2.poker !== "") return;
      const contador = datosPartida.dados.reduce((conteo, dado) => {
        conteo[dado] = (conteo[dado] || 0) + 1;
        return conteo;
      }, {});
      const puntos = Object.values(contador).includes(4) ? 40 + juegoServido() : 0;
      if (data.user === datosPartida.J1) {
        datosPartida.puntajeJ1.poker = puntos;
      } else {
        datosPartida.puntajeJ2.poker = puntos;
      }
      io.to(req.session.room).emit("pokerAnotado", {
        puntos: puntos,
        user: data.user
      });
      avanzarTurno();
      chequearPuntaje();
    }
  });

  socket.on("anotarFull", (data) => {
    if (datosPartida.finalizada) return;
    if (data.user === datosPartida.turnoJugador) {
      if (data.user === datosPartida.J1 && datosPartida.puntajeJ1.full !== "") return;
      if (data.user === datosPartida.J2 && datosPartida.puntajeJ2.full !== "") return;
      const contador = datosPartida.dados.reduce((conteo, dado) => {
        conteo[dado] = (conteo[dado] || 0) + 1;
        return conteo;
      }, {});
      const valores = Object.values(contador);
      const puntos = valores.includes(3) && valores.includes(2) ? 30 + juegoServido() : 0;
      if (data.user === datosPartida.J1) {
        datosPartida.puntajeJ1.full = puntos;
      } else {
        datosPartida.puntajeJ2.full = puntos;
      }
      io.to(req.session.room).emit("fullAnotado", {
        puntos: puntos,
        user: data.user
      });
      avanzarTurno();
      chequearPuntaje();
    }
  })

  socket.on("anotarEscalera", (data) => {
    if (datosPartida.finalizada) return;
    if (data.user === datosPartida.turnoJugador) {
      if (data.user === datosPartida.J1 && datosPartida.puntajeJ1.esc !== "") return;
      if (data.user === datosPartida.J2 && datosPartida.puntajeJ2.esc !== "") return;
      const dadosOrdenados = [...datosPartida.dados].sort((a, b) => a - b);
      const escMenor = [1, 2, 3, 4, 5];
      const escMayor = [2, 3, 4, 5, 6];
      const esEsc = JSON.stringify(dadosOrdenados) === JSON.stringify(escMenor)
        || JSON.stringify(dadosOrdenados) === JSON.stringify(escMayor);
      const puntos = esEsc ? 20 + juegoServido() : 0;
      if (data.user === datosPartida.J1) {
        datosPartida.puntajeJ1.esc = puntos;
      } else {
        datosPartida.puntajeJ2.esc = puntos;
      }
      io.to(req.session.room).emit("escaleraAnotada", {
        puntos: puntos,
        user: data.user
      });
      avanzarTurno();
      chequearPuntaje();
    }
  })

});

// GET
app.get("/getUsuariosTPF", async function (req, res) {
  console.log(req.query);
  const respuesta = await realizarQuery(`
        SELECT * FROM UsuariosTPF;
    `);
  console.log({ respuesta });
  res.send(respuesta);
});

app.get("/getEstadisticasTPF", async function (req, res) {
  console.log(req.query);
  const respuesta = await realizarQuery(`
        SELECT * FROM EstadisticasTPF;
    `);
  console.log({ respuesta });
  res.send(respuesta);
});

app.get("/getEstadisticasUsuario", async function (req, res) {
  console.log(req.query);
  const respuesta = await realizarQuery(`
        SELECT * FROM EstadisticasTPF WHERE id_usuario = '${req.query.id_usuario}';
    `);
  console.log({ respuesta });
  res.send(respuesta);
});

app.get("/getUsuariosPartidaTPF", async function (req, res) {
  console.log(req.query);
  const respuesta = await realizarQuery(`
        SELECT * FROM UsuariosPartidaTPF;
    `);
  console.log({ respuesta });
  res.send(respuesta);
});

app.get("/getPartidasTPF", async function (req, res) {
  console.log(req.query);
  const respuesta = await realizarQuery(`
        SELECT * FROM PartidasTPF;
    `);
  console.log({ respuesta });
  res.send(
    respuesta.map((partida) => ({
      ...partida,
      empate: Boolean(partida.empate),
    }))
  );
});

// GET LOGIN
app.get("/getLoginEmail", async function (req, res) {
  console.log("get /getloginemail req.query:", req.query);
  const respuesta = await realizarQuery(`
        SELECT * FROM UsuariosTPF WHERE email = '${req.query.email}';
    `);
  console.log({ respuesta: respuesta });
  res.send(respuesta);
});

// GET SKIN
app.get("/getSkin", async function (req, res) {
  console.log("get /getSkin req.query:", req.query);
  const respuesta = await realizarQuery(`
    SELECT skin_dado, skin_tablero FROM UsuariosTPF WHERE id_usuario = '${req.query.id_usuario}';
  `);
  console.log({ respuesta: respuesta });
  res.send(respuesta);
});

// POST
app.post("/postUsuariosTPF", async function (req, res) {
  console.log("POST /postUsuariosTPF");
  console.log(req.body);
  let respuesta = await realizarQuery(
    `SELECT * FROM UsuariosTPF WHERE nombre_de_usuario = '${req.body.nombre_de_usuario}' OR email = '${req.body.email}'`
  );
  console.log(respuesta);
  if (respuesta.length == 0) {
    await realizarQuery(
      `INSERT INTO UsuariosTPF(nombre, apellido, nombre_de_usuario, contraseña, email) VALUES ('${req.body.nombre}', '${req.body.apellido}', '${req.body.nombre_de_usuario}', '${req.body.contraseña}', '${req.body.email}')`
    );
  }
  console.log({ respuesta });
  res.send(respuesta);
});

app.post("/postEstadisticasTPF", async function (req, res) {
  console.log(req.body);
  const respuesta = await realizarQuery(
    `INSERT INTO EstadisticasTPF(generalas_totales, partidas_ganadas, partidas_perdidas, partidas_totales, porcentaje_victorias, id_usuario) VALUES (${req.body.generalas_totales}, ${req.body.partidas_ganadas}, ${req.body.partidas_perdidas}, ${req.body.partidas_totales}, ${req.body.porcentaje_victorias}, ${req.body.id_usuario})`
  );
  console.log({ respuesta });
  res.send(respuesta);
});

app.post("/postUsuariosPartidaTPF", async function (req, res) {
  console.log(req.body);
  const respuesta = await realizarQuery(
    `INSERT INTO UsuariosPartidaTPF(jugador1, jugador2, id_partida) VALUES (${req.body.jugador1}, ${req.body.jugador2 ?? "NULL"}, ${req.body.id_partida ?? "NULL"})`
  );
  console.log({ respuesta });
  res.send(respuesta);
});

app.post("/postPartidasTPF", async function (req, res) {
  console.log(req.body);
  const empate = req.body.empate === true || req.body.empate === 1 ? 1 : 0;
  const sala = String(req.body.sala || "Local").replace(/'/g, "''");
  const puntaje = Number(req.body.puntaje);
  const fecha = new Date(req.body.fecha);
  const fechaSql = Number.isNaN(fecha.getTime())
    ? null
    : fecha.toISOString().slice(0, 19).replace("T", " ");
  const respuesta = await realizarQuery(
    `INSERT INTO PartidasTPF(empate, fecha, puntaje, jugador1, jugador2, sala) VALUES (${empate}, ${fechaSql ? `'${fechaSql}'` : "NULL"}, ${Number.isFinite(puntaje) ? puntaje : 0}, ${req.body.jugador1}, ${req.body.jugador2 ?? "NULL"}, '${sala}')`
  );
  console.log({ respuesta });
  res.send(respuesta);
});

// POST PARA EL LOGIN
app.post("/postLogin", async function (req, res) {
  console.log(req.body);

  const respuesta = await realizarQuery(
    `SELECT * FROM UsuariosTPF WHERE email = '${req.body.email}' AND contraseña = '${req.body.contraseña}'`
  );

  console.log("respuesta: ", respuesta);

  res.send(respuesta);
});

// PUT
app.put("/putUsuariosTPF", async function (req, res) {
  console.log(req.body);
  const respuesta = await realizarQuery(
    `UPDATE UsuariosTPF SET nombre = '${req.body.nombre}', apellido = '${req.body.apellido}', nombre_de_usuario = '${req.body.nombre_de_usuario}', contraseña = '${req.body.contraseña}', email = '${req.body.email}' WHERE id_usuario = ${req.body.id_usuario}`
  );
  console.log({ respuesta });
  res.send(respuesta);
});

app.put("/putEstadisticasTPF", async function (req, res) {
  console.log(req.body);
  const porcentaje_victorias =
    req.body.partidas_totales > 0
      ? (req.body.partidas_ganadas / req.body.partidas_totales) * 100
      : 0;
  const respuesta = await realizarQuery(
    `UPDATE EstadisticasTPF SET generalas_totales = ${req.body.generalas_totales}, partidas_ganadas = ${req.body.partidas_ganadas}, partidas_perdidas = ${req.body.partidas_perdidas}, partidas_totales = ${req.body.partidas_totales}, porcentaje_victorias = ${porcentaje_victorias} WHERE id_usuario = ${req.body.id_usuario}`
  );
  console.log({ respuesta });
  res.send(respuesta);
});

app.put("/putPartidasTPF", async function (req, res) {
  console.log(req.body);
  const empate = req.body.empate === true || req.body.empate === 1 ? 1 : 0;
  const sala = String(req.body.sala || "Local").replace(/'/g, "''");
  const respuesta = await realizarQuery(
    `UPDATE PartidasTPF SET empate = ${empate}, fecha = '${req.body.fecha}', puntaje = ${req.body.puntaje}, sala = '${sala}' WHERE id_partida = ${req.body.id_partida}`
  );
  console.log({ respuesta });
  res.send(respuesta);
});

// PUT SKIN
app.put("/putSkinDadoUsuario", async function (req, res) {
  console.log(req.query);
  const respuesta = await realizarQuery(`
        UPDATE UsuariosTPF SET skin_dado = '${req.body.skin_dado}' WHERE id_usuario = '${req.query.id_usuario}';
    `);
  console.log({ respuesta });
  res.send(respuesta);
});

app.put("/putSkinTableroUsuario", async function (req, res) {
  console.log(req.query);
  const respuesta = await realizarQuery(`
        UPDATE UsuariosTPF SET skin_tablero = '${req.body.skin_tablero}' WHERE id_usuario = '${req.query.id_usuario}';
    `);
  console.log({ respuesta });
  res.send(respuesta);
});

// DELETE
app.delete("/deleteUsuariosTPF", async function (req, res) {
  console.log(req.body);
  const respuesta = await realizarQuery(
    `DELETE FROM UsuariosTPF WHERE id_usuario = '${req.body.id_usuario}';`
  );
  console.log({ respuesta });
  res.send(respuesta);
});

app.delete("/deleteUsuariosPartidaTPF", async function (req, res) {
  console.log(req.body);
  const respuesta = await realizarQuery(
    `DELETE FROM UsuariosPartidaTPF WHERE id_usuariosPartida = '${req.body.id}';`
  );
  console.log({ respuesta });
  res.send(respuesta);
});

app.delete("/deleteEstadisticasTPF", async function (req, res) {
  console.log(req.body);
  const respuesta = await realizarQuery(
    `DELETE FROM EstadisticasTPF WHERE id_estadistica = '${req.body.id_estadistica}';`
  );
  console.log({ respuesta });
  res.send(respuesta);
});

app.delete("/deletePartidasTPF", async function (req, res) {
  console.log(req.body);
  const respuesta = await realizarQuery(
    `DELETE FROM PartidasTPF WHERE id_partida = ${req.body.id_partida}';`
  );
  console.log({ respuesta });
  res.send(respuesta);
});

app.use((req, res) => {
  res.status(404).json({ error: "Recurso no encontrado" });
});
