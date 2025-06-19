// DEPENDENCIAS DEL PROYECTO
const path = require('node:path');
const fs = require('node:fs');
const express = require('express'); // Sintaxis commonjs
const app = express();

// PUERTO DE CONEXION
process.loadEnvFile();
const PORT = process.env.PORT;

// RUTAS
app.get('/', (req, res) => {
    res.send('Ok');
})


app.listen(debugPort, () => {console.log(`servidor levantado en http://localhost:${PORT}`);})

