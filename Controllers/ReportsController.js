const moment = require('moment-timezone');
require('dotenv').config();
const ReportsModels = require ('../Models/ReportsModels');

exports.search = async (req, res) => {
    const params = req.body; 
    try {
        const results = await ReportsModels.searchReports(params);
        res.status(200).json(results);
    } catch (error) {
        console.error("Error al procesar la solicitud:", error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

exports.NewReport = async (req, res)=> {
    const {Nombre_Reporte,Descripcion_Reporte,Nivel_Reporte ,Usuario_Registrador_Reporte }=req.body;
    try {
        const FechaRegistro = moment().tz('America/Bogota').format('YYYY-MM-DD HH:mm:ss');
        await ReportsModels.newReport(Nombre_Reporte,Descripcion_Reporte,Nivel_Reporte,Usuario_Registrador_Reporte,FechaRegistro)
        res.status(200).json({message:"Reporte Registrado"});

    } catch (error) {
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}

exports.ReportUpdate = async (req,res) => {
    const {Nivel_Reporte,Id_Reporte} = req.body;
    try {
        await ReportsModels.ReportUpdate(Nivel_Reporte,Id_Reporte)
        res.status(200).json({message:"Nivel de reporte Actualizado"});
    } catch (error) {
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}


exports.ReportSolved = async (req, res) => {
    const {Id_Reporte,Nombre_Usuario_Solucionador,Descripcion_Reporte_Solucionado} = req.body;
    try {
        const FechaSolucion = moment().tz('America/Bogota').format('YYYY-MM-DD HH:mm:ss');
        await ReportsModels.ReportSolved(Id_Reporte,Nombre_Usuario_Solucionador,Descripcion_Reporte_Solucionado,FechaSolucion)
        res.status(200).json({message:"Reporte Solucionado"});
    } catch (error) {
        return res.status(500).json({ error: 'Error interno del servidor' });

    }
}

exports.ReportSechar = async (req,res) => {
    try {
        const results= await ReportsModels.ReportSechar()
        res.status(200).json(results);
    } catch (error) {
        console.error("Error al procesar la solicitud:", error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}