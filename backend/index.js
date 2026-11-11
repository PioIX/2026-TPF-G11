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

  const puntajeJugador1 = {
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    full: null,
    poker: null,
    esc: null,
    gen: null,
    dobGen: null
  }

    const puntajeJugador2 = {
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    full: null,
    poker: null,
    esc: null,
    gen: null,
    dobGen: null
  }

  let cantTiradas = 0;
  let dados = [0, 0, 0, 0, 0];
  let turnoJugador = 1;
  let dadosBloqueados = [];
  let titulo1 = "";
  let titulo2 = "";
  let animacion = false;


  socket.on("cambiarTurno", () => {
    turnoJugador = turnoJugador === 1 ? 2 : 1;
    // cambiar titulo dependiendo del jugador ("es tu turno" o "espera tu turno")
    socket.emit("turnoCambiado", { turno: turnoJugador, titulo:  tituloJugador});
  });

  socket.on("disconnect", () => {
    console.log("Disconnect");
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
