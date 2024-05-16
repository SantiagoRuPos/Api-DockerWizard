const express = require('express');
const cors = require('cors');

const dtabase = require('./db');
const routes = require('./Routes/index');

const listarImagenesDocker = require ('./Controllers/imagenes');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

//rutas
app.use('/',routes);

app.get('/listar-imagenes-docker', listarImagenesDocker.listarImagenesDocker);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

