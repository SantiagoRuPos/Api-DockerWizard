const { exec } = require('child_process');

exports.listarImagenesDocker = (req, res) => {
  exec('docker images', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error al listar las imágenes de Docker: ${error.message}`);
      return res.status(500).json({ error: 'Error al listar las imágenes de Docker' });
    }
    if (stderr) {
      console.error(`Error al listar las imágenes de Docker: ${stderr}`);
      return res.status(500).json({ error: 'Error al listar las imágenes de Docker' });
    }
    console.log('Imágenes de Docker listadas correctamente');
    res.status(200).json({ images: stdout });
  });
};
