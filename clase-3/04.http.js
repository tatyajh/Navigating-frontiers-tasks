/**
 * Tarea A:

  Usando Node.js HTTP:
  
  1. Crear un endpoint que permita obtener la lista completa de elementos de una lista de mercado utilizando Node.js HTTP.
  2. Crear un endpoint que permita agregar un nuevo elemento a una lista de mercado utilizando Node.js HTTP, validando si el elemento ya existe y devolviendo un mensaje de error con código de estado de conflicto en caso afirmativo.
 */
  import http, { request } from "http";
  const PORT = 3000;
  
  // Simular una base de datos en memoria con una lista de mercado
  let listaDeMercado = ['manzanas', 'bananas'];
  
  // Función auxiliar para enviar una respuesta JSON
  function sendJSON(res, data, statusCode = 200) {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  }
  
  const server = http.createServer((req, res) => {
    if (req.url === '/lista-mercado' && req.method === 'GET') {
      // Endpoint para obtener la lista de mercado
      sendJSON(res, listaDeMercado);
    } else if (req.url === '/lista-mercado' && req.method === 'POST') {
      // Endpoint para agregar un elemento a la lista de mercado
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString(); // Convertir Buffer a string
      });
      req.on('end', () => {
        try {
          const { item } = JSON.parse(body);
          // Verificar si el elemento ya existe
          if (listaDeMercado.includes(item)) {
            // Enviar mensaje de error si el elemento ya existe
            sendJSON(res, { error: 'El elemento ya existe en la lista' }, 409); // Código 409: Conflicto
          } else {
            // Agregar el elemento a la lista
            listaDeMercado.push(item);
            sendJSON(res, { success: 'Elemento agregado correctamente' });
          }
        } catch (error) {
          // Enviar mensaje de error si hay un problema al parsear el JSON
          sendJSON(res, { error: 'Error al procesar la solicitud' }, 400); // Código 400: Solicitud incorrecta
        }
      });
    } else {
      // Enviar un mensaje de error para otros endpoints no manejados
      sendJSON(res, { error: 'Endpoint no encontrado' }, 404); // Código 404: No encontrado
    }
  });
  
  server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
  