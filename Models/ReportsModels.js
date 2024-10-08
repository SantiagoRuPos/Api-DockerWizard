const db = require('../db');
exports.searchReports = async (params) => {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM Reportes WHERE 1=1';
        const values = [];

        // Utilizar LIKE para búsqueda parcial
        if (params.searchText) {
            sql += ' AND (Nombre_Reporte LIKE ? OR Descripcion_Reporte LIKE ? OR Usuario_Registrador_Reporte LIKE ?)';
            const searchValue = `%${params.searchText}%`;
            values.push(searchValue, searchValue, searchValue);
        }

        db.query(sql, values, (error, results) => {
            if (error) {
                console.error('Error al ejecutar la consulta:', error);
                return reject(error);
            }
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

exports.ReportUpdate = async ( Nivel_Reporte, Estado_Reporte, Usuario_Solucionador_Reporte, Fecha_Solucion_Reporte, Comentarios_Reporte,Id_Reporte) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE Reportes SET Nivel_Reporte = ?, Estado_Reporte = ?, Usuario_Solucionador_Reporte = ?, Fecha_Solucion_Reporte = ?, Comentarios_Reporte = ? WHERE Id_Reporte = ?';
        db.query(sql, [Nivel_Reporte, Estado_Reporte, Usuario_Solucionador_Reporte, Fecha_Solucion_Reporte, Comentarios_Reporte, Id_Reporte], (error, results) => {
            if (error) {
                console.error("Error al actualizar el registro: ", error);
                reject(error);
            } else {
                console.log(sql, [Nivel_Reporte, Estado_Reporte, Usuario_Solucionador_Reporte, Fecha_Solucion_Reporte, Comentarios_Reporte, Id_Reporte])
                console.log("Actualización realizada");
                resolve(results);
            }
        });
    });
};

