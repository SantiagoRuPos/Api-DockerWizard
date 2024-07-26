const { exec } = require('child_process');
const moment = require('moment-timezone');
const fs = require('fs');

const path = require('path');


exports.StateContainers = async (req, res) => {
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
}

exports.BackUp = async (req, res) => {
  // Obtiene la fecha actual en la zona horaria de Colombia
  const date = moment.tz('America/Bogota');
  const formattedDate = date.format('YYYY-MM-DD');

  // Define la ruta de la carpeta de respaldo
  const backupDir = `/home/santi/Backup/${formattedDate}`;

  // Crea la carpeta de respaldo con la fecha actual
  fs.mkdir(backupDir, { recursive: true }, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error al crear la carpeta de respaldo' });
    }

    // Comando para copiar los archivos a la carpeta de respaldo
    const comando = `cp /home/santi/docker-compose.yml /home/santi/default.conf ${backupDir}/`;

    // Ejecuta el comando de copia
    exec(comando, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error al copiar los archivos: ${stderr}`);
        return res.status(500).json({ error: 'Error al copiar los archivos' });
      }

      res.json({ message: 'Copia de seguridad realizada con éxito' });
    });
  });
}


exports.DockerUp = async (req, res) => {
  // Define el comando para ejecutar docker-compose up
  const comando = 'docker-compose -f /home/santi/docker-compose.yml up -d';

  // Ejecuta el comando
  exec(comando, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error al ejecutar docker-compose up: ${stderr}`);
      return res.status(500).json({ error: 'Error al ejecutar docker-compose up' });
    }

    res.json({ message: 'docker-compose up ejecutado con éxito', output: stdout });
  });
}

exports.DockerLogs = async (req, res) => {
  // Obtiene el nombre del contenedor y el número de líneas desde el cuerpo de la solicitud
  const containerName = req.body.containerName;
  const tailLines = req.body.tailLines || 100; // Por defecto obtiene las últimas 100 líneas

  if (!containerName) {
    return res.status(400).json({ error: 'El nombre del contenedor es requerido' });
  }

  const comando = `docker logs --tail ${tailLines} ${containerName}`;

  // Ejecuta el comando
  exec(comando, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error al obtener los logs del contenedor: ${stderr}`);
      return res.status(500).json({ error: 'Error al obtener los logs del contenedor' });
    }

    res.json({ logs: stdout });
  });
}

exports.MonitoringImages = async (req, res) => {
  const dockerCommand = 'docker images --format "{{.Repository}}|{{.Tag}}|{{.ID}}|{{.CreatedAt}}|{{.Size}}"';

  exec(dockerCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error ejecutando el comando: ${error.message}`);
      return res.status(500).json({ error: 'Error al obtener las imágenes Docker' });
    }

    if (stderr) {
      console.error(`Error en stderr: ${stderr}`);
      return res.status(500).json({ error: 'Error al obtener las imágenes Docker' });
    }

    try {
      const containersData = stdout.trim().split('\n').map(line => {
        const [Repository, Tag, ID, CreatedAt, Size] = line.split('|');
        return { Repository, Tag, ID, CreatedAt, Size };
      });

      res.status(200).json({ containers: containersData });
      console.log(containersData);
    } catch (parseError) {
      console.error(`Error parsing output: ${parseError.message}`);
      res.status(500).json({ error: 'Error al procesar los datos de las imágenes Docker' });
    }
  });
}

exports.NewRuta = async (req, res) => {
  const { NmaeRuta,dockerName } = req.body;

  if (!dockerName) {
    return res.status(400).json({ error: 'El nombre del Docker es requerido' });
  }

  const newLocation = `
location /${NmaeRuta}/ {

    proxy_pass    http://${dockerName}/ ;

}
`;

  const configFilePath = '/home/santi/default.conf';

  fs.readFile(configFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error al leer el archivo: ${err.message}`);
      return res.status(500).json({ error: 'Error al leer el archivo de configuración' });
    }

    const lines = data.split('\n');

    // Encuentra la última línea con un corchete de cierre
    let insertIndex = lines.length;
    for (let i = lines.length - 1; i >= 0; i--) {
      if (lines[i].trim() === '}') {
        insertIndex = i;
        break;
      }
    }

    // Inserta el nuevo bloque de configuración después de la línea 33 o antes del último corchete de cierre
    const updatedLines = [
      ...lines.slice(0, insertIndex),
      newLocation,
      ...lines.slice(insertIndex)
    ];

    const updatedData = updatedLines.join('\n');

    fs.writeFile(configFilePath, updatedData, 'utf8', (err) => {
      if (err) {
        console.error(`Error al escribir en el archivo: ${err.message}`);
        return res.status(500).json({ error: 'Error al escribir en el archivo de configuración' });
      }

      res.status(200).json({ message: 'Ruta agregada exitosamente' });
    });
  });
}

exports.NewDockerWeb = async (req, res) => {
  const { NombreContenedor, image, volumnes, dockerName } = req.body;

  // Validación de campos requeridos
  if (!NombreContenedor) {
    return res.status(400).json({ error: 'El nombre del Docker es requerido' });
  }

  if (!image) {
    return res.status(400).json({ error: 'La imagen es requerida' });
  }

  if (!volumnes) {
    return res.status(400).json({ error: 'El volumen del Docker es requerido' });
  }

  if (!dockerName) {
    return res.status(400).json({ error: 'El nombre del apodo del Docker es requerido' });
  }

  const newServiceConfig = `
  ${NombreContenedor}:
    image: ${image}
    container_name: ${dockerName}
    volumes:
      - ${volumnes}
    expose:
      - 8000
      - 80
    networks:
      - website
    restart: always
  `;

  const filePath = '/home/santi/docker-compose.yml';

  // Leer el archivo existente
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error al leer el archivo Docker Compose' });
    }

    // Encontrar las secciones de volúmenes y redes
    const volumesSectionIndex = data.indexOf('\nvolumes:');
    const networksSectionIndex = data.indexOf('\nnetworks:');

    let insertionIndex = data.length;

    // Determinar la posición de inserción basada en las secciones encontradas
    if (volumesSectionIndex !== -1) {
      insertionIndex = volumesSectionIndex;
    } else if (networksSectionIndex !== -1) {
      insertionIndex = networksSectionIndex;
    }

    // Insertar el nuevo servicio antes de las secciones de volúmenes y redes, si existen
    const updatedConfig = [
      data.slice(0, insertionIndex),
      newServiceConfig,
      data.slice(insertionIndex)
    ].join('');

    // Escribir el archivo actualizado
    fs.writeFile(filePath, updatedConfig, 'utf8', (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error al actualizar el archivo Docker Compose' });
      }
      res.status(200).json({ message: 'Archivo Docker Compose actualizado exitosamente', config: newServiceConfig });
    });
  });
};


exports.DockerBd = async (req, res) => {
  const {
    NombreContenedor,
    image,
    MYSQL_DATABASE,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_ROOT_PASSWORD,
    volumnes,
    dockerName,
    NombreContenedorPHPmyadmin,
    imagePHPmyadmin,
    dockerNamephpmyadmin,
    PMA_HOST,
    depends_on
  } = req.body;

  // Validación de campos requeridos
  if (!NombreContenedor || !image || !MYSQL_DATABASE || !MYSQL_USER || !MYSQL_PASSWORD || !MYSQL_ROOT_PASSWORD || !volumnes || !dockerName) {
    return res.status(400).json({ error: 'Todos los campos para el contenedor MySQL son requeridos' });
  }

  if (!NombreContenedorPHPmyadmin || !imagePHPmyadmin || !dockerNamephpmyadmin || !PMA_HOST || !depends_on) {
    return res.status(400).json({ error: 'Todos los campos para el contenedor phpMyAdmin son requeridos' });
  }

  // Configuración para el contenedor MySQL
  const mysqlServiceConfig = `
  ${NombreContenedor}:
    image: ${image}
    container_name: ${dockerName}
    environment:
      MYSQL_DATABASE: ${MYSQL_DATABASE}
      MYSQL_USER: ${MYSQL_USER}
      MYSQL_PASSWORD: ${MYSQL_PASSWORD}
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
    expose:
      - "3306"
    volumes:
      - ${volumnes}:/var/lib/mysql
    networks:
      - website
    restart: always
  `;

  // Configuración para el contenedor phpMyAdmin
  const phpmyadminServiceConfig = `
  ${NombreContenedorPHPmyadmin}:
    image: ${imagePHPmyadmin}
    container_name: ${dockerNamephpmyadmin}
    environment:
      - PMA_HOST=${PMA_HOST}
    expose:
      - "80"
      - "8080"
    depends_on:
      - ${depends_on}
    networks:
      - website
    restart: always
  `;

  const filePath = '/home/santi/docker-compose.yml';

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error al leer el archivo Docker Compose' });
    }

    // Encontrar las secciones de volúmenes y redes
    const volumesSectionIndex = data.indexOf('\nvolumes:');
    const networksSectionIndex = data.indexOf('\nnetworks:');

    let insertionIndex = data.length;

    // Determinar la posición de inserción basada en las secciones encontradas
    if (volumesSectionIndex !== -1) {
      insertionIndex = volumesSectionIndex;
    } else if (networksSectionIndex !== -1) {
      insertionIndex = networksSectionIndex;
    }

    // Insertar los nuevos servicios antes de las secciones de volúmenes y redes, si existen
    const updatedConfig = [
      data.slice(0, insertionIndex),
      mysqlServiceConfig,
      phpmyadminServiceConfig,
      data.slice(insertionIndex)
    ].join('');

    // Escribir el archivo actualizado
    fs.writeFile(filePath, updatedConfig, 'utf8', (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error al actualizar el archivo Docker Compose' });
      }
      res.status(200).json({ message: 'Archivo Docker Compose actualizado exitosamente', config: mysqlServiceConfig });
    });
  });
};