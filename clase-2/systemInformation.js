const fs = require('fs');
const os = require('os');
const archivo = 'systemInformation.json';


function bytesToGigabytes(bytes) {
  return (bytes / (1024 ** 3)).toFixed(2);
}

// Obtiene información básica del uso de memoria del proceso de Node.js
function getCurrentProcessUsage() {
  const usage = process.memoryUsage();
  return {
    rss: `${bytesToGigabytes(usage.rss)} GB`, // Resident Set Size: memoria ocupada en RAM
    heapTotal: `${bytesToGigabytes(usage.heapTotal)} GB`, // Total de memoria disponible para el heap de JavaScript
    heapUsed: `${bytesToGigabytes(usage.heapUsed)} GB`, // Memoria usada en el heap de JavaScript
    external: `${bytesToGigabytes(usage.external)} GB`, // Memoria usada por objetos "externos" a V8
  };
}

function getInfo() {
  // Asumimos que el "proceso más demandante" es el propio script de Node.js para este ejemplo
  const mostDemandingProcess = getCurrentProcessUsage();

  const datos = {
    user: os.userInfo().username,
    totalMemoryGB: bytesToGigabytes(os.totalmem()),
    freeMemoryGB: bytesToGigabytes(os.freemem()),
    cpuModel: os.cpus()[0].model,
    mostDemandingProcess
  };

  fs.writeFile(archivo, JSON.stringify(datos, null, 2), (err) => {
    if (err) {
      console.error('Error:', err);
      return;
    }
    console.log(`Archivo ${archivo} created.`);
  });
}

getInfo();
