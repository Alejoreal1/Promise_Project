const fs = require('fs').promises;
const path = require('path');
const archiver = require('archiver');

const TOTAL_ARCHIVOS = 1000;
const CARPETA = path.join(__dirname, 'promesas 2');
const ZIP_FILE = path.join(__dirname, 'archivos.zip');

// 1. Crear la carpeta si no existe
fs.mkdir(CARPETA, { recursive: true })
  .then(() => {
    console.time('Tiempo Total');

    // 2. Crear el archivo ZIP
    const output = require('fs').createWriteStream(ZIP_FILE);
    const archive = archiver('zip', {
      zlib: { level: 9 } // Máxima compresión
    });

    // Manejar eventos del archivo ZIP
    output.on('close', () => {
      console.log(`✅ Archivo ZIP creado con ${archive.pointer()} bytes`);
      console.timeEnd('Tiempo Total');
    });

    archive.pipe(output);

    // 3. Crear y agregar archivos al ZIP
    for (let i = 1; i <= TOTAL_ARCHIVOS; i++) {
      const contenido = "Este es el archivo número ${i}";
      archive.append(`contenido, { name: archivo_${i}.txt }`);
    }

    // 4. Finalizar el archivo ZIP
    return archive.finalize();
  })
  .catch((error) => {
    console.error('Error durante el proceso:',error);
  });