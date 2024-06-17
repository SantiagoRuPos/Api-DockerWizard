const express = require('express');
const cors = require('cors');

const dtabase = require('./db');
const routes = require('./Routes/index');


const app = express();

const PORT = process.env.PORT || 8991;

app.use(express.json());
app.use(cors());

//rutas
app.use('/',routes);



app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

