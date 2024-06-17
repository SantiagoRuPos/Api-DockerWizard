const { exec } = require('child_process');



exports.StateContainers = (req, res) => {
  const dockerCommand = 'docker ps -a --format "{{.ID}}|{{.Image}}|{{.Command}}|{{.CreatedAt}}|{{.Status}}|{{.Ports}}|{{.Names}}"';

  exec(dockerCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error ejecutando el comando: ${error.message}`);
      return res.status(500).json({ error: 'Error al obtener los contenedores Docker' });
    }
    if (stderr) {
      console.error(`Error en stderr: ${stderr}`);
      return res.status(500).json({ error: 'Error al obtener los contenedores Docker' });
    }
    
    const containersData = stdout.trim().split('\n').map(line => {
      const [id, image, command, createdAt, status, ports, names] = line.split('|');
      return { id, image, command, createdAt, status, ports, names };
    });
    
    res.status(200).json({ containers: containersData });
    console.log(containersData);
  });
};