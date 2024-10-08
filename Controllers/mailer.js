// mailer.js
const nodemailer = require('nodemailer');

// Configura el transporte con las credenciales del servicio de correo
const transporter = nodemailer.createTransport({
    service: 'gmail', // Puedes usar otros servicios como Outlook, Yahoo, etc.
    auth: {
        user: 'dockerwizard@gmail.com', // Tu correo electrónico
        pass: 'fdha mcro jdan fbpz' // Tu contraseña o una contraseña de aplicación
    }
});

// Función para enviar correos
const sendMail = (to, subject, text, html) => {
    const mailOptions = {
        from: 'dockerwizard@gmail.com', // Remitente
        to: to, // Receptor
        subject: subject, // Asunto del correo
        text: text, // Texto plano del correo
        html: html // Contenido HTML (opcional)
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('Error al enviar el correo:', error);
        }
       // console.log('Correo enviado:', info.response);
    });
};

module.exports = sendMail;
