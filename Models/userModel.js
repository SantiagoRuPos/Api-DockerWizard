const db = require('../db');


exports.getUserByUsername = async (Nombre_Usuario) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM Usuarios WHERE Nombre_Usuario = ? ', [Nombre_Usuario], (error, results) => {
            if (error) {
                console.error("Error al ejecutar la consulta:", error);
                return reject(error);
            }
            console.log("Resultados de la consulta:", results);
            resolve(results[0]);
        });
    });
};

exports.LastConexion = async (Id_Usuario,Conexion_Usuario) => {
    return new Promise((resolve, reject) => {
        const sql ='UPDATE Usuarios SET  Conexion_Usuario = ? WHERE Id_Usuario = ?';
        db.query(sql,[Conexion_Usuario, Id_Usuario], (error, results)=> {
            if (error) {
                console.error("Error. en la actulizacion de la conexion: ", error);
                reject(error);
            }else {
                resolve(results);
            }
        })

    })
}

exports.UpdatePasswordByUsuer = async (Nombre_Usuario,Password_Usuario)=> {
    return new Promise((resolve, reject)=>{
        const sql ='UPDATE Usuarios SET Password_Usuario = ? WHERE Nombre_Usuario = ?';
        db.query(sql, [Password_Usuario, Nombre_Usuario], (error, results) => {
            if (error) {
                console.error("Error al ejecutar la consulta:", error);
                reject (error);
            } else {
                resolve(results);
            }
        })
    })
}


exports.RegisterUser = async (Tipo_Identificacion_Usuario,Numero_Identificacion_Usuario,Nombre_Complreto_Usuario,Correo_Institucional_Usuario,Numero_Contacto,Nombre_Usuario,Password_Usuario,Nombre_Usuario_Cygnus,Fecha_Registro_Usuario) =>{
    return new Promise((resolve, reject)=>{
        const sql = 'INSERT INTO Usuarios (Id_Usuario,Tipo_Identificacion_Usuario,Numero_Identificacion_Usuario,Nombre_Complreto_Usuario,Correo_Institucional_Usuario,Numero_Contacto,Nombre_Usuario,Password_Usuario,Nombre_Usuario_Cygnus,Rol_Usuario,Estado_Usuario,Conexion_Usuario,Fecha_Registro_Usuario,RenovacionContraseña) VALUES (null,?,?,?,?,?,?,?,?,"1","2",null,?,null)';
            db.query(sql,[Tipo_Identificacion_Usuario,Numero_Identificacion_Usuario,Nombre_Complreto_Usuario,Correo_Institucional_Usuario,Numero_Contacto,Nombre_Usuario,Password_Usuario,Nombre_Usuario_Cygnus,Fecha_Registro_Usuario],(error,results)=>{
                if (error) {
                    console.error("Error. Insert: ", error);
                    reject (error);
                } else {
                    console.log("Usuario resgistrado");
             
                    resolve(results);
                }
         })
    })
}

exports.ListUsersByUserName = async(Nombre_Usuario) => {
     return new Promise((resolve, reject)=>{
        const sql = 'SELECT Id_Usuario,Nombre_Complreto_Usuario,Nombre_Usuario_Cygnus,Correo_Institucional_Usuario,Conexion_Usuario,Estado_Usuario FROM Usuarios WHERE Nombre_Usuario = ?';
        db.query(sql,[Nombre_Usuario],(error,results)=> {
            if (error) {
                console.error("Error al listar : ", error);
                reject (error);
            }else {
                console.log("Usuario Listado");
                resolve(results[0]);
            }
        })

     })
}
