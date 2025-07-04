const nodemailer = require('nodemailer');

// 1. Configura el transportador SMTP (usa tu correo real aquí)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ahiguita696@gmail.com',
    pass: 'xinp tjvq orvg ffnr'
  }
});

// 2. Lista de destinatarios
const destinatarios = [
  'ahiguita696@gmail.com',
  'ahiguita393@gmail.com',
  'lauraguirregarcia@gmail.com',
  'brayansalazzar1221@gmail.com'
  
 

];

// 3. Función para enviar un solo correo
async function enviarCorreo(destinatario) {
  const opcDeCorreo = {
    from: '"Alejandro Higuita" <ahiguita696@gmail.com>',
    to: destinatario,
    subject: '¡Hola a todos',
    text: `Hola ${destinatario}, este es un correo masivo utilizando  Node.js .`
  };

  try {
    await transporter.sendMail(opcDeCorreo);
    console.log(` Enviado a: ${destinatario}`);
  } catch (err) {
    console.error(` Error al enviar a ${destinatario}:`, err.message);
  }
}

// 4. Ejecutar envío masivo
async function enviarCorreosMasivos() {
  console.log('📨 Enviando correos...');

  // Ejecutar todos en paralelo
  await Promise.all(destinatarios.map(dest => enviarCorreo(dest)));

  console.log('Todos los correos han sido procesados.');
}

enviarCorreosMasivos();
