const { exec } = require('child_process');
const moment = require('moment-timezone');
const fs = require('fs');

const YAML = require('yamljs');
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
  const backupDir = `/home/santi/Documents/Backup/${formattedDate}`;

  // Crea la carpeta de respaldo con la fecha actual
  fs.mkdir(backupDir, { recursive: true }, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error al crear la carpeta de respaldo' });
    }

    // Comando para copiar los archivos a la carpeta de respaldo
    const comando = `cp /home/santi/Documents/docker-compose.yml /home/santi/Documents/default.conf ${backupDir}/`;

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
  const comando = 'docker-compose -f /home/santi/Documents/docker-compose.yml up -d';

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

  const configFilePath = '/home/santi/Documents/default.conf';

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

exports.CargarRutas = async (req, res) => {
  const sourcePath = '/home/santi/Documents/default.conf';
  const destinationPath = '/home/proxyreverse/conf.d/default.conf';

  fs.copyFile(sourcePath, destinationPath, (err) => {
    if (err) {
      console.error(`Error al copiar el archivo: ${err}`);
      return res.status(500).json({ error: `Error al copiar el archivo: ${err.message}` });
    }

    console.log(`Archivo copiado de ${sourcePath} a ${destinationPath}`);
    res.status(200).json({ message: `Archivo copiado exitosamente a ${destinationPath}` });
  });
}



exports.NewDockerWeb = async (req, res) => {
  const { NombreContenedor, image, volumenes, dockerName } = req.body;

  // Validación de campos requeridos
  if (!NombreContenedor) {
    return res.status(400).json({ error: 'El nombre del Docker es requerido' });
  }

  if (!image) {
    return res.status(400).json({ error: 'La imagen es requerida' });
  }

  if (!volumenes) {
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
      - /home/${volumenes}:/var/www/html
    expose:
      - 8000
      - 80
    networks:
      - website
    restart: always
  `;

  const filePath = '/home/santi/Documents/docker-compose.yml';

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
}


exports.DockerBd = async (req, res) => {
  const {
    NombreContenedor,
    image,
    MYSQL_DATABASE,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_ROOT_PASSWORD,
    volumenes,
    dockerName,
    NombreContenedorPHPmyadmin,
    imagePHPmyadmin,
    dockerNamephpmyadmin,
    PMA_HOST,
    depends_on
  } = req.body;

  // Validación de campos requeridos
  if (!NombreContenedor || !image || !MYSQL_DATABASE || !MYSQL_USER || !MYSQL_PASSWORD || !MYSQL_ROOT_PASSWORD || !volumenes || !dockerName) {
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
      - 3306
    volumes:
      - /home/${volumenes}:/var/lib/mysql
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
      - 80
      - 8080
    depends_on:
      - ${depends_on}
    networks:
      - website
    restart: always
  `;

  const filePath = '/home/santi/Documents/docker-compose.yml';

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
}


exports.DockerWebBd = async (req, res) => {
  const {
    NombreContenedorWEB,
    image,
    volumenesWEB,
    dockerNameWEB,
    linksWEB,
    NombreContenedorMYSQL,
    imageMYSQL,
    MYSQL_DATABASE,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_ROOT_PASSWORD,
    volumenesMYSQL,
    dockerNameMYSQL,
    NombreContenedorPHPmyadmin,
    imagePHPmyadmin,
    dockerNamephpmyadmin,
    PMA_HOST,
    depends_on
  } = req.body;

  // Validación de campos requeridos
  if (!NombreContenedorWEB || !image || !volumenesWEB || !dockerNameWEB) {
    return res.status(400).json({ error: 'Todos los campos para el contenedor web son requeridos' });
  }

  if (!NombreContenedorMYSQL || !imageMYSQL || !MYSQL_DATABASE || !MYSQL_USER || !MYSQL_PASSWORD || !MYSQL_ROOT_PASSWORD || !volumenesMYSQL || !dockerNameMYSQL) {
    return res.status(400).json({ error: 'Todos los campos para el contenedor MySQL son requeridos' });
  }

  if (!NombreContenedorPHPmyadmin || !imagePHPmyadmin || !dockerNamephpmyadmin || !PMA_HOST || !depends_on) {
    return res.status(400).json({ error: 'Todos los campos para el contenedor phpMyAdmin son requeridos' });
  }

  // Configuración para el contenedor web
  const webServiceConfig = `
  ${NombreContenedorWEB}:
    image: ${image}
    container_name: ${dockerNameWEB}
    volumes:
      - /home/${volumenesWEB}:/var/www/html
    links:
      - ${linksWEB}
    expose:
      - 8000
      - 80
    networks:
      - website
    restart: always
  `;

  // Configuración para el contenedor MySQL
  const mysqlServiceConfig = `
  ${NombreContenedorMYSQL}:
    image: ${imageMYSQL}
    container_name: ${dockerNameMYSQL}
    environment:
      MYSQL_DATABASE: ${MYSQL_DATABASE}
      MYSQL_USER: ${MYSQL_USER}
      MYSQL_PASSWORD: ${MYSQL_PASSWORD}
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
    expose:
      - 3306
    volumes:
      - /home/${volumenesMYSQL}:/var/lib/mysql
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
      - 80
      - 8080
    depends_on:
      - ${depends_on}
    networks:
      - website
    restart: always
  `;

  const filePath = '/home/santi/Documents/docker-compose.yml';

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
      webServiceConfig,
      mysqlServiceConfig,
      phpmyadminServiceConfig,
      data.slice(insertionIndex)
    ].join('');

    // Escribir el archivo actualizado
    fs.writeFile(filePath, updatedConfig, 'utf8', (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error al actualizar el archivo Docker Compose' });
      }
      res.status(200).json({ message: 'Archivo Docker Compose actualizado exitosamente', config: { webServiceConfig, mysqlServiceConfig, phpmyadminServiceConfig } });
    });
  });
}



exports.InstalacionesDocker = async (req, res) => {
  const { nombreContenedor } = req.body;

  if (!nombreContenedor) {
    return res.status(400).json({ error: 'Nombre del contenedor es requerido' });
  }

  // Comandos a ejecutar dentro del contenedor
  const commands = [
    'apt update',
    'apt-get install -y apt-utils',  // Instalación de apt-utils para reducir advertencias
    'apt-get install -y zlib1g-dev',
    'apt-get install -y libpng-dev',
    'docker-php-ext-install mysqli || true',  // Ignora errores si mysqli ya está instalado
    'docker-php-ext-enable mysqli || true'   // Ignora errores si mysqli ya está habilitado
  ];

  const dockerCommand = `docker exec ${nombreContenedor} bash -c "${commands.join(' && ')}"`;

  exec(dockerCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error ejecutando comandos Docker: ${error}`);
      return res.status(500).json({ error: `Error ejecutando comandos Docker: ${error.message}` });
    }
    if (stderr) {
      console.error(`Advertencias y errores: ${stderr}`);
    }
    console.log(`Output: ${stdout}`);

    res.status(200).json({ message: 'Comandos ejecutados exitosamente', output: stdout });

    // Reinicia el contenedor después de ejecutar los comandos
    exec(`docker restart ${nombreContenedor}`, (restartError, restartStdout, restartStderr) => {
      if (restartError) {
        console.error(`Error reiniciando el contenedor: ${restartError}`);
      }
      if (restartStderr) {
        console.error(`Error reiniciando el contenedor: ${restartStderr}`);
      }
      console.log(`Output del reinicio: ${restartStdout}`);
    });
  });
};

exports.DockerRestar = async (req, res) => {
  const { nombreContenedor } = req.body;

  if (!nombreContenedor) {
    return res.status(400).json({ error: 'Nombre del contenedor es requerido' });
  }

  const dockerCommand = `docker restart ${nombreContenedor}`;

  exec(dockerCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error ejecutando comando Docker: ${error}`);
      return res.status(500).json({ error: `Error ejecutando comando Docker: ${error.message}` });
    }
    if (stderr) {
      console.error(`Error: ${stderr}`);
      return res.status(500).json({ error: `Error: ${stderr}` });
    }
    console.log(`Output: ${stdout}`);
    res.status(200).json({ message: `Contenedor ${nombreContenedor} reiniciado exitosamente`, output: stdout });
  });
}



exports.DeleteDocker = async (req, res) => {
  const { NombreContenedor } = req.body;


  if (!NombreContenedor) {
    return res.status(400).json({ error: 'El nombre del Docker es requerido' });
  }

  const filePath = path.join('/home/santi/Documents', 'docker-compose.yml');


  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error al leer el archivo Docker Compose' });
    }

    // Crear una expresión regular para buscar y capturar toda la configuración del contenedor
    const regex = new RegExp(`^\\s*${NombreContenedor}:([\\s\\S]*?restart:\\s*always\\s*)`, 'm');

    if (!regex.test(data)) {
      return res.status(404).json({ error: 'El contenedor no se encontró en el archivo Docker Compose' });
    }

    // Eliminar el contenedor y su configuración
    const updatedData = data.replace(regex, '');


    fs.writeFile(filePath, updatedData, 'utf8', (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error al actualizar el archivo Docker Compose' });
      }
      res.status(200).json({ message: 'Contenedor Docker y su configuración eliminados exitosamente' });
    });
  });
}
