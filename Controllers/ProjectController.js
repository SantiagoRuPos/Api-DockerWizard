const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ProyectModel = require ('../Models/ProjectModel');
const moment = require('moment-timezone');
require('dotenv').config();


exports.GetProjectByname=async (req,res)=>{
    const {Nombre_Proyecto}=req.body;
    try {
        const Project= await  ProyectModel.GetProjectByName(Nombre_Proyecto);
        if (Project) {
            return res.status(401).json({ error: 'El nombre del proyecto Se encuentra registrado' });
            console.log(Project);
        }
        else {
            res.status(400).json({message:"No se encuentra ningun proyecto con ese nombre"});
        }
    } catch (error) {
        console.error("Error al consultar el proyecto -->:", error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
}

exports.NewProject=async (req,res)=> {
    const {Nombre_Proyecto,Nombre_Proyecto_Acronimo,Nombre_Usuario_Cygnus,Rol_Proyecto,Nombre_Lider_Proyecto,Telefono_Lider_Proyecto,Correo_Institucional_Lider,Cargo_Institucional_Lider,Programa_Academico_Proyecto,Semillero_Lider,Grupo_Investigacion,Usuario_Registrador_Proyecto} = req.body;
    try {
        const proyecto=await ProyectModel.GetProjectByName(Nombre_Proyecto);
        if (proyecto) {
            res.status(400).json({message:"Ya hay un proyecto registrado con ese nombre",proyecto});
        } else {
        const Registro_Proyecto = moment().tz('America/Bogota').format('YYYY-MM-DD HH:mm:ss');
        await ProyectModel.RegisterNewProject(Nombre_Proyecto,Nombre_Proyecto_Acronimo,Nombre_Usuario_Cygnus,Rol_Proyecto,Nombre_Lider_Proyecto,Telefono_Lider_Proyecto,Correo_Institucional_Lider,Cargo_Institucional_Lider,Programa_Academico_Proyecto,Semillero_Lider,Grupo_Investigacion,Usuario_Registrador_Proyecto,Registro_Proyecto)
        res.status(200).json({message:"Proyecto Registrado"});
        }
        
    } catch (error) {
        console.error("Error al registrar el Proyecto:", error);
        res.status(500).json({ message: "Error interno del servidor" });
  
    }
}



