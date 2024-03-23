import http, { request } from "http";

const PORT = 3000;

let counterA = 0;
let counterB = 0;

const server = http.createServer((req, res) => {
  let reqBody = "";
  req.on("data", (chunk) => {
    reqBody += chunk;
  });

  req.on("end", () => {
    // Manejar solicitudes GET para /visitas
    if (req.method === "GET" && req.url === "/visitas") {
      const resBody = { counterA };

      // Establecer el encabezado de la respuesta y enviar la respuesta
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify(resBody));
    }

    // Manejar solicitudes GET para /counterB
    if (req.method === "GET" && req.url === "/compras") {
      const resBody = { counterB };

      // Establecer el encabezado de la respuesta y enviar la respuesta
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify(resBody));
    }

    // Manejar solicitudes POST para /counterA
    if (req.method === "POST" && req.url === "/visitas") {
      counterA += parseInt(JSON.parse(reqBody).increment); // Incrementar counterA
      const resBody = { counterA };

      // Establecer el encabezado de la respuesta y enviar la respuesta
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify(resBody));
    }

    // Manejar solicitudes POST para /counterB
    if (req.method === "POST" && req.url === "/compras") {
      counterB += parseInt(JSON.parse(reqBody).increment); // Incrementar counterB
      const resBody = { counterB };

      // Establecer el encabezado de la respuesta y enviar la respuesta
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify(resBody));
    }
  });
});

// Iniciar el servidor y mostrar un mensaje en la consola
server.listen(PORT, () => {
  console.log(`Node HTTP server running at http://localhost:${PORT} 🚀`);
});
