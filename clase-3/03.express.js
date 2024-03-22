import express from "express";

const PORT = 3000;
const app = express();

let visitas = 0;
let compras = 1;

// Analizar cuerpos JSON en las solicitudes entrantes
app.use(express.json());

// Manejar solicitudes GET para /counterA
app.get("/visitas", (req, res) => {
  const resBody = {  visitas };
  res.status(200).json(resBody);
});

// Manejar solicitudes GET para /counterB
app.get("/compras", (req, res) => {
  const resBody = {  compras };
  res.status(200).json(resBody);
});

// Manejar solicitudes POST para /counterA
app.post("/visitas", (req, res) => {
  visitas += parseInt(req.body.increment); // Incrementar counterA
  const resBody = { visitas };
  res.status(200).json(resBody);
});

// Manejar solicitudes POST para /counterB
app.post("/compras", (req, res) => {
  compras += parseInt(req.body.increment); // Incrementar counterB
  const resBody = { compras };
  res.status(200).json(resBody);
});

// Iniciar el servidor y mostrar un mensaje en la consola
app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT} 🚀`);
});
