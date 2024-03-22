const { exec } = require('child_process');
const fs = require('fs');
const os = require('os');
const archivo = 'proc.json';

function bytesToGigabytes(bytes) {
  return (bytes / 1024 ** 3).toFixed(2);
}

function findMostDemandingProcess() {
  return new Promise((resolve, reject) => {
    const command = `powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -First 1 | Format-Table Id,ProcessName,CPU,PM -AutoSize | Out-String -Width 4096"`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      if (stderr) {
        reject(stderr);
        return;
      }

      const lines = stdout.split('\n').filter(line => line.trim()).slice(2);
      if (lines.length > 0) {
        const processInfo = lines[0].trim().split(/\s+/);
        resolve({
          Id: processInfo[0],
          ProcessName: processInfo[1],
          CPU: processInfo[2],
          PM: processInfo[3]
        });
      } else {
        resolve({});
      }
    });
  });
}


function getInfo() {
  findMostDemandingProcess().then(processInfo => {
    const systemInfo = {
      user: os.userInfo().username,
      totalMemoryGB: bytesToGigabytes(os.totalmem()),
      freeMemoryGB: bytesToGigabytes(os.freemem()),
      cpuModel: os.cpus().map(cpu => cpu.model)[0], // Asume el primer CPU representa todos
      mostDemandingProcess: processInfo
    };

    fs.writeFile(archivo, JSON.stringify(systemInfo, null, 2), (err) => {
      if (err) {
        console.error('Error al escribir en el archivo:', err);
        return;
      }
      console.log(`Archivo ${archivo} creado con éxito.`);
    });
  }).catch(err => {
    console.error('Error al recuperar la información del proceso más demandante:', err);
  });
}

getInfo();
