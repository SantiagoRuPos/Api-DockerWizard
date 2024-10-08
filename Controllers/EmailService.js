const sendMail = require('./mailer'); // Importa correctamente sendMail

class EmailService {
    static async sendRegistrationEmail(email, name) {
        const subject = '¡Registro Exitoso en DockerWizard! 🎉';
        const text = `Estimado(a) ${name},\n\n¡Nos complace darle la bienvenida a DockerWizard! 🎊 Su registro se ha completado con éxito. A partir de ahora, tendrá acceso a todas nuestras funcionalidades y beneficios exclusivos.\n\nSi tiene alguna pregunta o necesita asistencia, no dude en contactarnos.\n\n¡Esperamos que disfrute de su experiencia con nosotros! 😊\n\nAtentamente,\nEl equipo de DockerWizard`;
        const html = `
        <h1>¡Registro Exitoso en DockerWizard! 🎉</h1>
        <p>Estimado(a) ${name},</p>
        <p>¡Nos complace darle la bienvenida a DockerWizard! 🎊 Su registro se ha completado con éxito. A partir de ahora, tendrá acceso a todas nuestras funcionalidades y beneficios exclusivos.</p>
        <p>Si tiene alguna pregunta o necesita asistencia, no dude en contactarnos.</p>
        <p>¡Esperamos que disfrute de su experiencia con nosotros! 😊</p>
        <p>Atentamente,<br>El equipo de DockerWizard</p>
        <p>Inicie sesión <a href="http://cygnus.uniajc.edu.co/DockerWizard/login">aquí</a>.</p>
    `;
    
        try {
            await sendMail(email, subject, text, html);
            //console.log('Correo de registro enviado exitosamente');
        } catch (error) {
            console.error('Error al enviar el correo de registro:', error);
            throw error; // Propaga el error para que pueda manejarse en la función de registro de usuario
        }
    }

    static async sendPasswordResetEmail(email, newPassword) {
        const subject = '🔒 Restablecimiento de Contraseña - DockerWizard';
        const text = `Estimado(a) usuario(a),
    
    Se ha generado una nueva contraseña para su cuenta en DockerWizard: ${newPassword}
    
    Por favor, inicie sesión y cambie su contraseña lo antes posible para garantizar la seguridad de su cuenta.
    
    Si necesita más ayuda, no dude en ponerse en contacto con nuestro equipo de soporte.
    
    Atentamente,
    El equipo de DockerWizard`;
    
        const html = `
            <h1>🔒 Restablecimiento de Contraseña</h1>
            <p>Estimado(a) usuario(a),</p>
            <p>Se ha generado una nueva contraseña para su cuenta en DockerWizard.</p>
            <p><strong>Nueva contraseña:</strong> <span style="font-size: 16px; color: #4CAF50;">${newPassword}</span> 🔑</p>
            <p>Por favor, inicie sesión y cambie su contraseña lo antes posible para garantizar la seguridad de su cuenta.</p>
            <p>Si necesita más ayuda, no dude en ponerse en contacto con nuestro equipo de soporte.</p>
            <br>
            <p>Atentamente,<br>El equipo de DockerWizard</p>
            <p>🌐 <a href="http://cygnus.uniajc.edu.co/DockerWizard/login">cygnus.uniajc.edu.co/DockerWizard</a> </p>
        `;
    
        try {
            await sendMail(email, subject, text, html);
        } catch (error) {
            console.error('Error al enviar el correo de restablecimiento de contraseña:', error);
            throw error;
        }
    }

   static async sendNewProjectEmail(email, projectName) {
    const subject = '📢 Registro de Nuevo Proyecto en DockerWizard';
    const text = `Estimado(a) usuario(a),

Su proyecto "${projectName}" se ha registrado correctamente y ya se encuentra disponible en el servidor.

En los próximos minutos, recibirá en su correo las credenciales de inicio de sesión al servidor de Cygnus.

Atentamente,
El equipo de DockerWizard`;

    const html = `
        <h1>📢 Registro de Nuevo Proyecto</h1>
        <p>Estimado(a) usuario(a),</p>
        <p>Su proyecto "<strong>${projectName}</strong>" se ha registrado correctamente y ya se encuentra disponible en el servidor.</p>
        <p>En los próximos minutos, recibirá en su correo las credenciales de inicio de sesión al servidor de Cygnus.</p>
        <br>
        <p>Atentamente,<br>El equipo de DockerWizard</p>
        <p>🌐 <a href="http://cygnus.uniajc.edu.co/DockerWizard/">http://cygnus.uniajc.edu.co/DockerWizard/</a></p>
    `;

    try {
        await sendMail(email, subject, text, html);
    } catch (error) {
        console.error('Error al enviar el correo de registro de proyecto:', error);
        throw error;
    }
}

    static async sendNewReportEmail(email, report) {
        const { Nombre_Reporte, Fecha_Registro_Usuario, Descripcion_Reporte, Nivel_Reporte, Usuario_Registrador_Reporte } = report;

        const subject = '📝 Nuevo Reporte Registrado en DockerWizard';
        const text = `
        Estimado(a) ${Usuario_Registrador_Reporte},

        Se ha registrado un nuevo reporte en DockerWizard con la siguiente información:

        Nombre: ${Nombre_Reporte}
        Fecha de Registro: ${Fecha_Registro_Usuario}
        Descripción: ${Descripcion_Reporte}
        Nivel: ${Nivel_Reporte}
        Estado: Pendiente

        Si tiene alguna pregunta o necesita más información, no dude en contactarnos.

        Atentamente,
        El equipo de DockerWizard
        `;

        const html = `
        <h1>📝 Nuevo Reporte Registrado</h1>
        <p>Estimado(a) <strong>${Usuario_Registrador_Reporte}</strong>,</p>
        <p>Se ha registrado un nuevo reporte en DockerWizard con la siguiente información:</p>
        <ul>
            <li><strong>Nombre:</strong> ${Nombre_Reporte}</li>
            <li><strong>Fecha de Registro:</strong> ${Fecha_Registro_Usuario}</li>
            <li><strong>Descripción:</strong> ${Descripcion_Reporte}</li>
            <li><strong>Nivel:</strong> ${Nivel_Reporte}</li>
            <li><strong>Estado:</strong> Pendiente</li>
        </ul>
        <p>Si tiene alguna pregunta o necesita más información, no dude en contactarnos.</p>
        <p>Atentamente,<br>El equipo de DockerWizard</p>
        <p>🌐 <a href="http://cygnus.uniajc.edu.co/DockerWizard/">http://cygnus.uniajc.edu.co/DockerWizard/</a></p>
        `;

        try {
            await sendMail(email, subject, text, html);
        } catch (error) {
            console.error('Error al enviar el correo de registro de reporte:', error);
            throw error;
        }
    }
    static async sendReportUpdateEmail(email, report) {
        const { Id_Reporte, Nivel_Reporte, Estado_Reporte, Usuario_Solucionador_Reporte, Comentarios_Reporte, Fecha_Solucion_Reporte } = report;

        const subject = '🛠️ Actualización de Reporte en DockerWizard';
        const text = `
        Estimado(a),

        Se ha actualizado el siguiente reporte en DockerWizard:

        Código: ${Id_Reporte}
   
        Nivel: ${Nivel_Reporte}
        Estado: ${Estado_Reporte}
        Usuario Solucionador: ${Usuario_Solucionador_Reporte}
        Fecha de Solución: ${Fecha_Solucion_Reporte}
        Comentarios: ${Comentarios_Reporte || 'No hay comentarios.'}

        Si tiene alguna pregunta o necesita más información, no dude en contactarnos.

        Atentamente,
        El equipo de DockerWizard
        `;

        const html = `
        <h1>🛠️ Actualización de Reporte</h1>
        <p>Estimado(a),</p>
        <p>Se ha actualizado el siguiente reporte en DockerWizard:</p>
        <ul>
            <li><strong>Código:</strong> ${Id_Reporte}</li>
            <li><strong>Nivel:</strong> ${Nivel_Reporte}</li>
            <li><strong>Estado:</strong> ${Estado_Reporte}</li>
            <li><strong>Usuario Solucionador:</strong> ${Usuario_Solucionador_Reporte}</li>
            <li><strong>Fecha de Solución:</strong> ${Fecha_Solucion_Reporte}</li>
            <li><strong>Comentarios:</strong> ${Comentarios_Reporte || 'No hay comentarios.'}</li>
        </ul>
        <p>Si tiene alguna pregunta o necesita más información, no dude en contactarnos.</p>
        <p>Atentamente,<br>El equipo de DockerWizard</p>
        <p>🌐 <a href="http://cygnus.uniajc.edu.co/DockerWizard/">http://cygnus.uniajc.edu.co/DockerWizard/</a></p>
        `;

        try {
            await sendMail(email, subject, text, html);
        } catch (error) {
            console.error('Error al enviar el correo de actualización de reporte:', error);
            throw error;
        }
    }

    static async sendPasswordChangedEmail(email, nombreUsuario) {
        const subject = '🔒 Actualización de Contraseña - DockerWizard';
        const text = `
        Estimado(a) ${nombreUsuario},

        Su contraseña ha sido actualizada con éxito.

        Si no ha realizado este cambio, por favor póngase en contacto con nuestro equipo de soporte de inmediato.

        Atentamente,
        El equipo de DockerWizard
        `;

        const html = `
        <h1>🔒 Actualización de Contraseña</h1>
        <p>Estimado(a) <strong>${nombreUsuario}</strong>,</p>
        <p>Su contraseña ha sido actualizada con éxito.</p>
        <p>Si no ha realizado este cambio, por favor póngase en contacto con nuestro equipo de soporte de inmediato.</p>
        <p>Atentamente,<br>El equipo de DockerWizard</p>
        <p>🌐 <a href="http://cygnus.uniajc.edu.co/DockerWizard/">http://cygnus.uniajc.edu.co/DockerWizard/</a></p>
        `;

        try {
            await sendMail(email, subject, text, html);
        } catch (error) {
            console.error('Error al enviar el correo de cambio de contraseña:', error);
            throw error;
        }
    }

}


module.exports = EmailService;
