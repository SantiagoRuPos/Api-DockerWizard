const { exec } = require('child_process');
const { error } = require('console');
const { stdout, stderr } = require('process');



exports.crearUsuario = (req, res) => {
  const { Nombre_Usuario_Cygnus, Password_Usuario } = req.body;
  exec(`sudo adduser --disabled-password --gecos "" --force-badname ${Nombre_Usuario_Cygnus} && echo "${Nombre_Usuario_Cygnus}:${Password_Usuario}" | sudo chpasswd`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error al crear el usuario: ${error.message}`);
      return res.status(500).json({ error: 'Error al crear el usuario' });
    }
    if (stderr) {
      console.error(`Error al crear el usuario: ${stderr}`);
      return res.status(500).json({ error: 'Error al crear el usuario' });
    }
    console.log(`Usuario creado correctamente: ${Nombre_Usuario_Cygnus}`);
    res.status(200).json({ message: 'Usuario creado correctamente' });
  });
}




exports.ListUserCygnus = (req, res) => {
  // Ejecutar el comando para obtener la lista de usuarios del directorio /home
  exec('getent passwd | grep "^\\w*:.*:/home" | cut -d: -f1', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error al obtener la lista de usuarios: ${error.message}`);
      return res.status(500).json({ error: 'Error al obtener la lista de usuarios' });
    }
    if (stderr) {
      console.error(`Error al obtener la lista de usuarios: ${stderr}`);
      return res.status(500).json({ error: 'Error al obtener la lista de usuarios' });
    }
    
    // Dividir la salida en líneas y enviar solo los nombres de usuario al frontend
    const userList = stdout.trim().split('\n');
    res.status(200).json({ users: userList });
  });
};

exports.ProcessCygnus = (req,res) => {
  exec('ps -eo pid,comm,user,%cpu,%mem --sort=-%cpu', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error al obtener la información del proceso: ${error.message}`);
      return res.status(500).json({ error: 'Error al obtener la información del proceso' });
    }
    if (stderr) {
      console.error(`Error al obtener la información del proceso: ${stderr}`);
      return res.status(500).json({ error: 'Error al obtener la información del proceso' });
    }
    const processData = stdout.trim().split('\n');
    const processList = processData.slice(1).map(line => {
      const [pid, name, user, cpu, memory] = line.trim().split(/\s+/);
      return {
        pid,
        name,
        user,
        cpu,
        memory
      };
    });
    res.status(200).json({ processes: processList });
  });
}

exports.MonitorUserCygnus = (req, res) => {
    exec('who', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error al obtener la lista de usuarios: ${error.message}`);
        return res.status(500).json({ error: 'Error al obtener la lista de usuarios' });
      }
      if (stderr) {
        console.error(`Error al obtener la lista de usuarios: ${stderr}`);
        return res.status(500).json({ error: 'Error al obtener la lista de usuarios' });
      }      
      const userList = stdout.trim().split('\n').map(line => {
        const userInfo = line.trim().split(/\s+/);
        return {
          user: userInfo[0],
          tty: userInfo[1],
          date: userInfo.slice(2).join(' ')
        };
      });
      res.status(200).json({ users: userList });
    });
}

exports.ResetPasswordCygnus = (req, res) => {
  const { Nombre_Usuario_Cygnus, Password_Usuario } = req.body;

  if (!Nombre_Usuario_Cygnus || !Password_Usuario) {
    return res.status(400).send('Nombre de usuario y contraseña son requeridos');
  }

  // Comando para cambiar la contraseña del usuario y forzar el cambio en el siguiente inicio de sesión
  const command = `echo "${Nombre_Usuario_Cygnus}:${Password_Usuario}" | sudo chpasswd && sudo chage -d 0 ${Nombre_Usuario_Cygnus}`;

  // Ejecutar el comando
  exec(command, (error, stdout, stderr) => {
    if (error) {
         return res.status(500).json({ error: 'Error al restablecer la Contraseña del usuario' });
    }
    console.log("Contraseña cambiada exitosamente y debera de cambiarla al siguiente inicio");
    res.status(200).json({ message: 'Contraseña  cambiada correctamente' });
  });
}

exports.PermisosCygnus = (req, res) => {
  const { Nombre_Usuario_Cygnus, Grupo_Cygnus } = req.body;
 
  if (!Nombre_Usuario_Cygnus || !Grupo_Cygnus) {
    return res.status(400).json({error:'Nombre_Usuario_Cygnus y Grupo_Cygnus son requeridos'});
  }

  const command = `sudo usermod -a -G ${Grupo_Cygnus} ${Nombre_Usuario_Cygnus}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error ejecutando el comando: ${error.message}`);
      return res.status(500).json({ error: 'Error al agregar al usuario al grupo ' });
    }
    if (stderr) {
      console.error(`Error en stderr: ${stderr}`);
      return res.status(500).json({ error: 'Error stderr ' });
    }
    console.log(`Comando ejecutado correctamente: ${stdout}`);
    res.status(200).json({ message: 'Usuario añadido al grupo ' });
  });
}


exports.QuitarPermiso = (req, res) => {
  const { Nombre_Usuario_Cygnus, Grupo_Cygnus } = req.body;
  
  if (!Nombre_Usuario_Cygnus || !Grupo_Cygnus) {
    return res.status(400).json({ error: 'Nombre_Usuario_Cygnus y Grupo_Cygnus son requeridos' });
  }
  
  const command = `sudo gpasswd -d ${Nombre_Usuario_Cygnus} ${Grupo_Cygnus}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error ejecutando el comando: ${error.message}`);
      return res.status(500).json({ error: `Error ejecutando el comando: ${error.message}` });
    }
    if (stderr) {
      console.error(`Error en stderr: ${stderr}`);
      return res.status(500).json({ error: `Error en stderr: ${stderr}` });
    }
    console.log(`Comando ejecutado correctamente: ${stdout}`);
    res.status(200).json({ message: `Usuario ${Nombre_Usuario_Cygnus} eliminado del grupo ${Grupo_Cygnus}` });
  });
}