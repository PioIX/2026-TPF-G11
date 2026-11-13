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
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

io.use((socket, next) => {
  sessionMiddleware(socket.request, {}, next);
});

io.on("connection", (socket) => {
  const req = socket.request;

  let datosPartida = {
    J1: null,
    J2: null,
    turnoJugador: null,
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
  }

  const juegoServido = () => {
    if (cantTiradas === 1) {
      return 5;
    } else {
      return 0;
    }
  }

  const generalaServida = () => cantTiradas === 1;

  socket.on("joinRoom", (data) => {
    console.log("🚀 ~ io.on ~ req.session.room:", req.session.room);
    if (req.session.room != undefined && req.session.room.length > 0)
      socket.leave(req.session.room);
    req.session.room = data.room;
    req.session.user = data.user;
    socket.join(req.session.room);

    let numJugador;

    if (datosPartida.J1 == null) {
      datosPartida.J1 = data.user;
      datosPartida.turnoJugador = data.user;
      numJugador = 1;
    } else if (datosPartida.J2 == null) {
      datosPartida.J2 = data.user;
      numJugador = 2;
    }
  });

  socket.on("cambiarTurno", () => {
    if (datosPartida.turnoJugador === datosPartida.J1) {
      datosPartida.turnoJugador = datosPartida.J2;
    } else {
      datosPartida.turnoJugador = datosPartida.J1;
    }

    socket.to(req.session.room).emit("turnoCambiado", {
      turnoJugador: datosPartida.turnoJugador,
      dados: datosPartida.dados,
    });
  });

  socket.on("tirarDados", (data) => {
    const tiradasActuales = data.nuevaRonda ? 0 : datosPartida.cantTiradas;
    if (data.user === datosPartida.turnoJugador) {
      const dadosActuales = data.nuevaRonda ? [0, 0, 0, 0, 0] : datosPartida.dados;
      const dadosBloqueadosActuales = data.nuevaRonda ? [] : datosPartida.dadosBloqueados;
      const nuevaTirada = dadosActuales.map((dado, index) =>
        tiradasActuales > 0 && dadosBloqueadosActuales.includes(index + 1)
          ? dado
          : Math.floor(Math.random() * 6) + 1
      );
      datosPartida.dados = nuevaTirada;
      datosPartida.cantTiradas = tiradasActuales + 1;
      socket.to(req.session.room).emit("dadosTirados", {
        dados: datosPartida.dados,
        dadosBloqueados: datosPartida.dadosBloqueados,
        cantTiradas: datosPartida.cantTiradas
      });
    }
  });

  socket.on("bloquearDados", (data) => {
    if (data.user === datosPartida.turnoJugador) {
      if (!datosPartida.dadosBloqueados.includes(data.dadoID)) {
        datosPartida.dadosBloqueados.push(data.dadoID);
      } else {
        const index = datosPartida.dadosBloqueados.indexOf(data.dadoID);
        datosPartida.dadosBloqueados.splice(index, 1);
      }

      socket.to(req.session.room).emit("nuevosDadosBloqueados", {
        dados: datosPartida.dadosBloqueados
      });
    }
  });

  socket.on("anotarNumero", (data) => {
    if (data.user === datosPartida.turnoJugador) {
      const puntajeActual = data.user === datosPartida.J1 ? datosPartida.puntajeJ1[data.numero] : datosPartida.puntajeJ2[data.numero];
      if (puntajeActual === "") {
        const puntos = datosPartida.dados.reduce((total, dado) => total + (dado === data.numero ? data.numero : 0), 0);
        if (data.user === datosPartida.J1) {
          datosPartida.puntajeJ1[data.numero] = puntos;
        } else {
          datosPartida.puntajeJ2[data.numero] = puntos;
        }

        socket.to(req.session.room).emit("numeroAnotado", {
          puntos,
          user: data.user
        });
      }
    }
  });

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
  res.send(respuesta);
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

app.post("/postPartidasUsuarioTPF", async function (req, res) {
  console.log(req.body);
  const respuesta = await realizarQuery(
    `INSERT INTO PartidasUsuarioTPF(id_usuario, id_partida) VALUES (${req.body.id_usuario}, ${req.body.id_partida})`
  );
  console.log({ respuesta });
  res.send(respuesta);
});

app.post("/postPartidasTPF", async function (req, res) {
  console.log(req.body);
  const respuesta = await realizarQuery(
    `INSERT INTO PartidasTPF(gano, fecha, puntaje, id_usuario) VALUES (${req.body.gano}, '${req.body.fecha}', ${req.body.puntaje}, ${req.body.id_usuario})`
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
  const respuesta = await realizarQuery(
    `UPDATE PartidasTPF SET gano = ${req.body.gano}, fecha = '${req.body.fecha}', puntaje = ${req.body.puntaje} WHERE id = ${req.body.id}`
  );
  console.log({ respuesta });
  res.send(respuesta);
});

// DELETE
app.delete("/deleteUsuariosTPF", async function (req, res) {
  console.log(req.body);
  const respuesta = await realizarQuery(
    `DELETE FROM UsuariosTPF WHERE id_usuario = ${req.body.id_usuario}`
  );
  console.log({ respuesta });
  res.send(respuesta);
});

app.delete("/deleteUsuariosPartidaTPF", async function (req, res) {
  console.log(req.body);
  const respuesta = await realizarQuery(
    `DELETE FROM UsuariosPartidaTPF WHERE id= ${req.body.id}`
  );
  console.log({ respuesta });
  res.send(respuesta);
});

app.delete("/deleteEstadisticasTPF", async function (req, res) {
  console.log(req.body);
  const respuesta = await realizarQuery(
    `DELETE FROM EstadisticasTPF WHERE id_estadistica = ${req.body.id_estadistica}`
  );
  console.log({ respuesta });
  res.send(respuesta);
});

app.delete("/deletePartidasTPF", async function (req, res) {
  console.log(req.body);
  const respuesta = await realizarQuery(
    `DELETE FROM PartidasTPF WHERE id_partida = ${req.body.id_partida}`
  );
  console.log({ respuesta });
  res.send(respuesta);
});

app.use((req, res) => {
  res.status(404).json({ error: "Recurso no encontrado" });
});
