const fs = require('fs').promises;
const path = require('path');

const TOTAL_ARCHIVOS = 1000;
const CARPETA = path.join(__dirname, 'promesas 2');

// 1. Crear la carpeta si no existe
fs.mkdir(CARPETA, { recursive: true })
  .then(() => {
    console.time('Tiempo Total');

    // 2. Arreglo de promesas
    const promesas = [];

    for (let i = 1; i <= TOTAL_ARCHIVOS; i++) {
      const nombreArchivo = `archivo_${i}.txt`;
      const contenido = `Este es el archivo número ${i}`;
      const ruta = path.join(CARPETA, nombreArchivo);

      // 3. Crear una promesa para cada archivo y agregarla al arreglo
      const promesa = fs.writeFile(ruta, contenido);
      promesas.push(promesa);
    }

    // 4. Ejecutar todas las promesas al mismo tiempo
    return Promise.all(promesas);
  })
  .then(() => {
    console.log(`✅ Se crearon ${TOTAL_ARCHIVOS} archivos con éxito.`);
    console.timeEnd('Tiempo Total');
  })
  .catch((error) => {
    console.error(' Error durante el proceso:', error);
  });
