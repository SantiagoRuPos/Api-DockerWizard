const db = require('../db');

exports.searchReports = async (params) => {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM Reportes WHERE 1=1';
        const values = [];

        if (params.Nombre_Reporte) {
            sql += ' AND Nombre_Reporte = ?';
            values.push(params.Nombre_Reporte);
        }
        if (params.Descripcion_Reporte) {
            sql += ' AND Descripcion_Reporte = ?';
            values.push(params.Descripcion_Reporte);
        }
        if (params.Nivel_Reporte) {
            sql += ' AND Nivel_Reporte = ?';
            values.push(params.Nivel_Reporte);
        }
        if (params.Estado_Reporte) {
            sql += ' AND Estado_Reporte = ?';
            values.push(params.Estado_Reporte);
        }
        if (params.Usuario_Registrado_Reporte) {
            sql += ' AND Usuario_Registrado_Reporte = ?';
            values.push(params.Usuario_Registrado_Reporte);
        }
        if (params.Fecha_Registro_Usuario) {
            sql += ' AND Fecha_Registro_Usuario = ?';
            values.push(params.Fecha_Registro_Usuario);
        }
        db.query(sql, values, (error, results) => {
            if (error) {
                console.error("Error al ejecutar la consulta:", error);
                return reject(error);
            }
            console.log(results)
            resolve(results);
        });
    });
}

exports.newReport = async (Nombre_Reporte,Descripcion_Reporte,Nivel_Reporte,Estado_Reporte,Usuario_Registrado_Reporte,Fecha_Registro_Usuario)=>{
    return new Promise((resolve, reject)=> {
        const sql =' INSERT INTO Reportes (Id_Reporte,Nombre_Reporte,Descripcion_Reporte,Nivel_Reporte,Estado_Reporte,Usuario_Registrador_Reporte,Fecha_Registro_Usuario) VALUES (null,?,?,?,"Pendiente",?,?)';
        db.query(sql,[Nombre_Reporte,Descripcion_Reporte,Nivel_Reporte,Estado_Reporte,Usuario_Registrado_Reporte,Fecha_Registro_Usuario],(error,results)=>{
            if (error) {
                console.error ("Error en el Insert: ",error);
                reject(error);
            } else {
                console.log("Reporte Registrado");
                resolve(results);
            }
        })
    })
}

exports.ReportUpdate = async (Id_Reporte ,Nivel_Reporte) => {
    return new Promise ((resolve, reject) => {
        const sql = 'UPDATE Reportes SET Nivel_Reporte= ? WHERE Id_Reporte= ?';
        db.query(sql,[Id_Reporte,Nivel_Reporte],(error,results)=>{
            if (error) {
                console.error("Error al actualizar el registro: ",error);
            }else{
                console.log("Actulizacion realizada");
                resolve(results);
            }
        })
    })
}

exports.ReportSolved = async (Id_Reporte,Nombre_Usuario_Solucionador,Descripcion_Reporte_Solucionado,Fecha_Solucion_Reporte) => {
    return new Promise ((resolve, reject) => {
        const sql = 'INSERT INTO Reporte_Solucionado (Id_Reporte_Solucionado,Id_Reporte,Nombre_Usuario_Solucionador,Descripcion_Reporte_Solucionado,Fecha_Solucion_Reporte) VALUES (null,?,?,?,?)';
        db.query(sql,[Id_Reporte,Nombre_Usuario_Solucionador,Descripcion_Reporte_Solucionado,Fecha_Solucion_Reporte],(error,results)=>{
            if (error) {
                console.error("Error en el Insert: ",error);
            }else{
                console.log("Solucion Registrada");
                resolve(results);
            }
        })
    })
}

exports.ReportSechar = async () => {
    return new Promise ((resolve, reject) => {
        const sql = 'SELECT * FROM Reporte_Solucionado';
        db.query(sql,(error,results)=>{
            if (error) {
                console.error("Error en el Insert: ",error);
            }else{
                console.log("Solucion Registrada");
                resolve(results);
            }
        })
    })
}