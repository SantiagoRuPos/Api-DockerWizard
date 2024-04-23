const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require ('../Models/userModel');

require('dotenv').config();

exports.login = async (req, res) => {
    const { Nombre_Usuario, Password_Usuario } = req.body;

    try {
        // Buscar al usuario por nombre de usuario en la base de datos
        const user = await userModel.getUserByUsername(Nombre_Usuario);

        // Si el usuario no existe, o la contraseña no coincide, devolver un error
        if (!user || !(await bcrypt.compare(Password_Usuario, user.Password_Usuario))) {
            return res.status(401).json({ error: 'Usuario o contraseña incorrectos.' });
        }

        // Generar un token de acceso con JWT
        const accessToken = jwt.sign({ userId: user.Id_usuario }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

        // Devolver el token de acceso como respuesta
        res.json({ accessToken });
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

exports.UpdatePasswordByUsuer =async (req, res) => {
    const { Nombre_Usuario, Password_Usuario} = req.body;

    try {
        const hashedPassword = await bcrypt.hash(Password_Usuario,10);
        console.log(hashedPassword);
        console.log("Contraseña Actualizada uwu");
        await userModel.UpdatePasswordByUsuer(Nombre_Usuario, hashedPassword);
        res.status(200).json({message:"Contraseña Actualizada"});
    } catch (error) {
        console.error("Error al actualizar la contraseña:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}


exports.RegisterUser = async (req, res) => {
    const {Tipo_Identificacion_Usuario,Numero_Identificacion_Usuario,Nombre_Completo_Usuario,Correo_Institucional_Usuario,Numero_Contacto,Nombre_Usuario,Password_Usuario,Nombre_Usuario_Cygnus} = req.body;
    try {
        const hashedPassword = await bcrypt.hash(Password_Usuario,10);
        const Fecha_Registro_Usuario = new Date().toISOString().slice(0, 19).replace('T', ' ');

        await userModel.RegisterUser(Tipo_Identificacion_Usuario,Numero_Identificacion_Usuario,Nombre_Completo_Usuario,Correo_Institucional_Usuario,Numero_Contacto,Nombre_Usuario,hashedPassword,Nombre_Usuario_Cygnus,Fecha_Registro_Usuario)
        res.status(200).json({message:"Usuario Registrado"});
    } catch (error) {
        console.error("Error al registrar el usuario:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }

}


