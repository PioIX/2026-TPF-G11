const express = require("express");
const cors = require("cors");
const session = require("express-session");
const { Server } = require("socket.io");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const sessionMiddleware = session({
  secret: "supersarasa",
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

let contador = 0;

io.on("connection", (socket) => {
  const req = socket.request;

  socket.on("joinRoom", (data) => {
    if (req.session.room != undefined && req.session.room.length > 0) {
      socket.leave(req.session.room);
    }
    req.session.room = data.room;
    socket.join(req.session.room);

    io.to(req.session.room).emit("chat-messages", {
      user: req.session.user,
      room: req.session.room,
    });
  });

  socket.on("pingAll", (data) => {
    console.log("PING ALL:", data);
    io.emit("pingAll", { event: "Ping to all", message: data });
  });

  socket.on("sendMessage", (data) => {
    io.to(req.session.room).emit("newMessage", {
      room: req.session.room,
      message: data.message,
    });
  });

  socket.on("eventoPersonalizado", () => {
    contador++;
    socket.emit("respuestaPersonalizada", { contador });
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

// POST
app.post("/postUsuariosTPF", async function (req, res) {
  console.log(req.body);
  let respuesta = await realizarQuery(
    `SELECT * FROM UsuariosTPF WHERE nombre = '${req.body.nombre}' AND apellido = '${req.body.apellido}' AND nombre_de_usuario = '${req.body.nombre_de_usuario}' AND contraseña = '${req.body.contraseña}' AND email = '${req.body.email}'`
  );
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
    `INSERT INTO EstadisticasTPF(generalas_totales, partidas_ganadas, partidas_perdidas, partidas_totales, porcentaje_victorias, puntaje_historico, id_usuario) VALUES (${req.body.generalas_totales}, ${req.body.partidas_ganadas}, ${req.body.partidas_perdidas}, ${req.body.partidas_totales}, ${req.body.porcentaje_victorias}, ${req.body.puntaje_historico}, ${req.body.id_usuario})`
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

  res.send(respuesta[0]);
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
  const respuesta = await realizarQuery(
    `UPDATE EstadisticasTPF SET generalas_totales = ${req.body.generalas_totales}, partidas_ganadas = ${req.body.partidas_ganadas}, partidas_perdidas = ${req.body.partidas_perdidas}, partidas_totales = ${req.body.partidas_totales}, porcentaje_victorias = ${req.body.porcentaje_victorias}, puntaje_historico = ${req.body.puntaje_historico} WHERE id_usuario = ${req.body.id_usuario}`
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

app.delete("/deleteEstadisticasTPF", async function (req, res) {
  console.log(req.body);
  const respuesta = await realizarQuery(
    `DELETE FROM EstadisticasTPF WHERE id = ${req.body.id}`
  );
  console.log({ respuesta });
  res.send(respuesta);
});

app.delete("/deletePartidasTPF", async function (req, res) {
  console.log(req.body);
  const respuesta = await realizarQuery(
    `DELETE FROM PartidasTPF WHERE id = ${req.body.id}`
  );
  console.log({ respuesta });
  res.send(respuesta);
});
