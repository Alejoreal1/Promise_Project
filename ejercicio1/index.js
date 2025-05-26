const path = require('path');
const archiver = require('archiver');

const TOTAL_ARCHIVOS = 1000;
const ZIP_FILE = path.join(__dirname, 'archivos.zip');

console.time('Tiempo Total');

// Crear el archivo ZIP
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

// Crear y agregar archivos al ZIP
for (let i = 1; i <= TOTAL_ARCHIVOS; i++) {
  const contenido = `Este es el archivo número ${i}`;
  archive.append(contenido, { name: `archivo_${i}.txt` });
}

// Finalizar el archivo ZIP
archive.finalize().catch((error) => {
  console.error('Error durante el proceso:', error);
});