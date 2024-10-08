const moment = require('moment-timezone');
require('dotenv').config();
const ReportsModels = require ('../Models/ReportsModels');
const EmailService = require('./EmailService');

exports.search = async (req, res) => { 
    const params = req.body; 
    try {
        const results = await ReportsModels.searchReports(params);
        res.status(200).json(results);
    } catch (error) {
        console.error("Error al procesar la solicitud:", error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

exports.NewReport = async (req, res) => {
    const { Nombre_Reporte, Descripcion_Reporte, Nivel_Reporte, Usuario_Registrador_Reporte, Correo_Institucional_Usuario } = req.body;
    try {
        const FechaRegistro = moment().tz('America/Bogota').format('YYYY-MM-DD HH:mm:ss');

        // Registrar el nuevo reporte en la base de datos
        const resultado = await ReportsModels.newReport(Nombre_Reporte, Descripcion_Reporte, Nivel_Reporte, Usuario_Registrador_Reporte, FechaRegistro);

        // Obtener el ID del reporte recién creado
        const Id_Reporte = resultado.insertId;

        // Crear un objeto con los detalles del reporte
        const nuevoReporte = {
            Id_Reporte,
            Nombre_Reporte,
            Fecha_Registro_Usuario: FechaRegistro,
            Descripcion_Reporte,
            Nivel_Reporte,
            Usuario_Registrador_Reporte
        };

        // Enviar correo al usuario con los detalles del nuevo reporte
        await EmailService.sendNewReportEmail(Correo_Institucional_Usuario, nuevoReporte);

        // Responder al cliente solo después de enviar el correo
        return res.status(200).json({ message: "Reporte registrado y correo enviado con éxito." });

    } catch (error) {
        console.error('Error al registrar el reporte:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

exports.ReportUpdate = async (req, res) => {
    const { Nivel_Reporte, Estado_Reporte, Usuario_Solucionador_Reporte, Comentarios_Reporte, Id_Reporte, Correo_Institucional_Usuario, Nombre_Reporte } = req.body;
    
    try {
        const Fecha_Solucion_Reporte = moment().tz('America/Bogota').format('YYYY-MM-DD HH:mm:ss');

        // Actualizar el reporte en la base de datos
        await ReportsModels.ReportUpdate(Nivel_Reporte, Estado_Reporte, Usuario_Solucionador_Reporte, Fecha_Solucion_Reporte, Comentarios_Reporte, Id_Reporte);

        // Crear un objeto con los detalles del reporte actualizado
        const reporteActualizado = {
            Id_Reporte,
            Nivel_Reporte,
            Estado_Reporte,
            Usuario_Solucionador_Reporte,
            Comentarios_Reporte,
            Fecha_Solucion_Reporte
        };

        // Enviar correo al usuario con los detalles del reporte actualizado
        try {
            await EmailService.sendReportUpdateEmail(Correo_Institucional_Usuario, reporteActualizado);
        } catch (error) {
            console.error('Error al enviar el correo de actualización de reporte:', error);
            // Notificar que hubo un error al enviar el correo, pero el reporte fue actualizado correctamente.
            return res.status(500).json({ message: 'Reporte actualizado, pero falló el envío del correo.' });
        }

        // Responder al cliente solo después de enviar el correo
        return res.status(200).json({ message: "Nivel de reporte actualizado y correo enviado con éxito." });

    } catch (error) {
        console.error('Error al actualizar el reporte:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};


