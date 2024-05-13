const { exec } = require('child_process');

exports.crearUsuario = (req, res) => {
  const { Nombre_Usuario_Cygnus, Password_Usuario } = req.body;

  exec(`sudo useradd ${Nombre_Usuario_Cygnus} && echo ${Nombre_Usuario_Cygnus}:${Password_Usuario} | sudo chpasswd && sudo chage -d 0 ${Nombre_Usuario_Cygnus}`, (error, stdout, stderr) => {
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
};



exports.ListUserCygnus = (req, res) => {
  // Ejecutar el comando para obtener la lista de usuarios del directorio /home
  exec('getent passwd | grep /home | cut -d: -f1', (error, stdout, stderr) => {
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
    res.status(200).json({ users: userList }); // Aquí se envía 'users' en lugar de 'userList'
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
