/**
 * Tarea B:

  Usando Express.js:
  
  1. Crear un endpoint que permita obtener la lista completa de elementos de una lista de mercado utilizando Node.js HTTP.
  2. Crear un endpoint que permita agregar un nuevo elemento a una lista de mercado utilizando Node.js HTTP, validando si el elemento ya existe y devolviendo un mensaje de error con código de estado de conflicto en caso afirmativo.
 */

  import express from 'express';

const app = express();
const PORT = 3000;

// Usaremos este array como nuestra "base de datos" temporal para la lista de mercado
let listaDeMercado = ['manzanas', 'pan', 'leche'];

app.use(express.json()); // Para poder parsear cuerpos de solicitud tipo JSON

// Endpoint para obtener la lista completa de elementos de la lista de mercado
app.get('/lista-de-mercado', (req, res) => {
  res.status(200).json(listaDeMercado);
});

// Endpoint para agregar un nuevo elemento a la lista de mercado
app.post('/lista-de-mercado', (req, res) => {
  const { item } = req.body; // Extraemos "item" del cuerpo de la solicitud

  // Verificamos si el item ya existe en la lista
  if (listaDeMercado.includes(item)) {
    // Si el item ya existe, devolvemos un mensaje de error
    return res.status(409).json({ error: 'El elemento ya existe en la lista de mercado.' });
  }

  // Si el item no existe, lo agregamos a la lista
  listaDeMercado.push(item);
  res.status(201).json(listaDeMercado);
});

app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
});
