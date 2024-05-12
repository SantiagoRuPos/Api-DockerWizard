const db = require('../db');


exports.GetProjectByName = async(Nombre_Proyecto) => {
    return new Promise((resolve,reject)=> {
        const sql= 'SELECT * FROM Proyectos WHERE Nombre_Proyecto = ? ';
        db.query(sql,[Nombre_Proyecto],(error,results)=>{
            if (error) {
                console.error("Error al ejecutar la consulta:", error);
                return reject(error);
            }
            console.log("Resultados de la consulta:", results);
            resolve(results[0]);
        })
    })
}


exports.RegisterNewProject = async (Nombre_Proyecto,Nombre_Proyecto_Acronimo,Nombre_Usuario_Cygnus,Rol_Proyecto,Nombre_Lider_Proyecto,Telefono_Lider_Proyecto,Correo_Institucional_Lider,Cargo_Institucional_Lider,Programa_Academico_Proyecto,Semillero_Lider,Grupo_Investigacion,Usuario_Registrador_Proyecto,Fecha_Registro_Proyecto) => {
return new Promise ((resolve, reject) => {
    const sql ="INSERT Proyectos (Id_Proyecto,Nombre_Proyecto,Nombre_Proyecto_Acronimo,Nombre_Usuario_Cygnus,Rol_Proyecto,Nombre_Lider_Proyecto,Telefono_Lider_Proyecto,Correo_Institucional_Lider,Cargo_Institucional_Lider,Programa_Academico_Proyecto,Semillero_Lider,Grupo_Investigacion,Usuario_Registrador_Proyecto,Fecha_Registro_Proyecto,Fecha_Finalizacion_Proyecto,Estado_Proyecto) VALUES (null,?,?,?,?,?,?,?,?,?,?,?,?,?,null,'1')";
    db.query(sql,[Nombre_Proyecto,Nombre_Proyecto_Acronimo,Nombre_Usuario_Cygnus,Rol_Proyecto,Nombre_Lider_Proyecto,Telefono_Lider_Proyecto,Correo_Institucional_Lider,Cargo_Institucional_Lider,Programa_Academico_Proyecto,Semillero_Lider,Grupo_Investigacion,Usuario_Registrador_Proyecto,Fecha_Registro_Proyecto],(error,results)=> {
        if (error) {
            console.error("Error en insert --->",error);
            reject(error);
        } else {
            console.log("Proyecto Registrado correctamente");
            resolve(results);
        }
    })
})
}

exports.ListProjectsByname = async (Nombre_Proyecto)=>{
    return new Promise ((resolve, reject)=> {
        const sql ='SELECT Nombre_Proyecto, Rol_Proyecto, Nombre_Lider_Proyecto, Programa_Academico_Proyecto, Fecha_Registro_Proyecto, Fecha_Finalizacion_Proyecto, Estado_Proyecto FROM Proyectos WHERE Nombre_Proyecto = ?';
     
        db.query(sql,[Nombre_Proyecto],(error,results)=>{
       
            if (error) {
                console.error("Error en consulta --->",error);
            reject(error);
            } else {
                console.log("Proyecto Listado correctamente");
                resolve(results);
            }

        })
    })
}

exports.ListAllProjects = async ()=>{
    return new Promise ((resolve, reject)=> {
        const sql ='SELECT Nombre_Proyecto, Rol_Proyecto, Nombre_Lider_Proyecto, Programa_Academico_Proyecto, Fecha_Registro_Proyecto, Fecha_Finalizacion_Proyecto, Estado_Proyecto FROM Proyectos';
        db.query(sql,(error,results)=>{
            if (error) {
                console.error("Error en consulta --->",error);
            reject(error);
            } else {
                console.log("Proyecto Listado correctamente");
                resolve(results);
            }

        })
    })
}

exports.UpdateStatusProject = async (Fecha_Finalizacion_Proyecto,Estado_Proyecto,Nombre_Proyecto)=>{
    return new Promise ((resolve, reaject)=> {
        const sql = 'UPDATE Proyectos SET  Fecha_Finalizacion_Proyecto = ? , Estado_Proyecto = ? WHERE Nombre_Proyecto = ?';
        db.query(sql,[Fecha_Finalizacion_Proyecto,Estado_Proyecto,Nombre_Proyecto],(error,results)=>{
            if (error) {
                console.error("Error en consulta --->",error);
                reject(error);
            } else {
                console.log("Proyecto Modificado correctamente");
                resolve(results);
            }
        })
    })
}