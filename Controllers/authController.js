const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require ('../Models/userModel');
const moment = require('moment-timezone');

require('dotenv').config();
 /////////API USUARIOS

 exports.login = async (req, res) => {
    const { Nombre_Usuario, Password_Usuario } = req.body;
    try {
        // Buscar al usuario por nombre de usuario en la base de datos
        const user = await userModel.getUserByUsername(Nombre_Usuario);

    
        // Si el usuario no existe, o la contraseña no coincide, devolver un error
        if (!user) {
            return res.status(401).json({ error: 'Usuario Incorrecto.' });
        }
        const passwordMatch = await bcrypt.compare(Password_Usuario, user.Password_Usuario);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Contraseña inválida' });
        }
        if (user.Rol_Usuario != "1") {
            return res.status(401).json({ error: 'El usuario no tiene los permisos requerido' });
        }
        if (user.Estado_Usuario != "1") {
            return res.status(401).json({ error: 'El usuario no Se encuentra Activado' });
        }
        const Conexion_Usuario = moment().tz('America/Bogota').format('YYYY-MM-DD HH:mm:ss');
        await userModel.LastConexion(user.Id_Usuario,Conexion_Usuario);
        // Generar un token de acceso con JWT
        const accessToken = jwt.sign({ userId: user.Id_usuario }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        // Devolver el token de acceso como respuesta
        res.json({ accessToken });
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

///API PARA OBTENER EL NOMBRE, ID, USUARIO, CYGNUS, COOREO ?


exports.getUserInfo = async (req,res) => {

    const { Nombre_Usuario } = req.body;
    try {
        const ExisteUser = await userModel.getUserByUsername(Nombre_Usuario);
        if (ExisteUser) {
            const Id_Usuario= ExisteUser.Id_Usuario;
            const usuarios = await userModel.infoUser(Id_Usuario); 
            res.status(200).json({ message: "Infromacion del usuario: ", usuarios }); 
        } else {
            return res.status(400).json({ error: 'El nombre del usuario es incorrecto o no se encuentra registrado', error });
        }
    } catch (error) {
        console.error("Error al obtener informacion del Usuario: ", error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}


exports.UpdatePasswordByUsuer =async (req, res) => {
    const { Nombre_Usuario, Password_Usuario} = req.body;

    try {
        const exiteUsuario = await userModel.getUserByUsername(Nombre_Usuario);
        if (exiteUsuario) {
        const hashedPassword = await bcrypt.hash(Password_Usuario,10);
        //console.log(hashedPassword);
        console.log("Contraseña Actualizada.");
        await userModel.UpdatePasswordByUsuer(Nombre_Usuario, hashedPassword);
        res.status(200).json({message:"Contraseña Actualizada"});
        }else {
            return res.status(400).json({ error: 'El usuario no existe' });
        }
   
    } catch (error) {
        console.error("Error al actualizar la contraseña:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}


exports.RegisterUser = async (req, res) => {
    const {Tipo_Identificacion_Usuario,Numero_Identificacion_Usuario,Nombre_Completo_Usuario,Correo_Institucional_Usuario,Numero_Contacto,Nombre_Usuario,Password_Usuario,Nombre_Usuario_Cygnus} = req.body;
    try {
        const exiteUsuario = await userModel.getUserByUsername(Nombre_Usuario);
        if (exiteUsuario) {
            return res.status(400).json({ error: 'El usuario ya existe' });
        }
        const hashedPassword = await bcrypt.hash(Password_Usuario,10);
       // const Fecha_Registro_Usuario = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const Fecha_Registro_Usuario = moment().tz('America/Bogota').format('YYYY-MM-DD HH:mm:ss');
        await userModel.RegisterUser(Tipo_Identificacion_Usuario,Numero_Identificacion_Usuario,Nombre_Completo_Usuario,Correo_Institucional_Usuario,Numero_Contacto,Nombre_Usuario,hashedPassword,Nombre_Usuario_Cygnus,Fecha_Registro_Usuario)
        res.status(200).json({message:"Usuario Registrado"});
    } catch (error) {
        console.error("Error al registrar el usuario:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}

exports.ListUser = async (req, res) => {
    const { Nombre_Usuario } = req.body;
    try {
        const ExisteUser = await userModel.getUserByUsername(Nombre_Usuario);
        if (ExisteUser) {
            const usuarios = await userModel.ListUsersByUserName(Nombre_Usuario); // Aquí obtenemos los usuarios
            res.status(200).json({ message: "Usuarios Listados", usuarios }); // Enviamos los usuarios en la respuesta
        } else {
            return res.status(400).json({ error: 'El usuario no existe' });
        }
    } catch (error) {
        console.error("Error al obtener informacion del Usuario: ", error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}

exports.ListUsers = async (req,res)=>{
    try {
       const usuarios = await userModel.ListUsers();
        res.status(200).json({ message: "Usuarios Listados",usuarios}); // Enviamos los usuarios en la respuesta
    } catch (error) {
        console.error("Error al obtener informacion del Usuario: ", error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}

exports.UpdateStatusUser = async (req,res) => {
    const {Estado_Usuario,Nombre_Usuario} = req.body;
    try {
        const ExisteUser = await userModel.getUserByUsername(Nombre_Usuario);
        if (ExisteUser) {
            await userModel.StatusUserbyNameUser(Estado_Usuario,Nombre_Usuario);
            res.status(200).json({ message: "Estado Actualizado" });
        }else{
            return res.status(400).json({ error: 'El usuario no existe' });
        }
        
    } catch (error) {
        console.error("Error al obtener informacion del Usuario: ", error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}


