// DEPENDENCIAS DEL PROYECTO
const path = require('node:path');
const fs = require('node:fs');
const express = require('express'); // Sintaxis commonjs
const app = express();

// PUERTO DE CONEXION
process.loadEnvFile();
const PORT = process.env.PORT;

// MIDDLEWARE
// Para la carpeta de recursos públicos
app.use(express.static(path.join(__dirname, "public")))
// Para indicar cuál es el motor de las plantillas
app.set('view engine', "ejs");
app.set("views", path.join(__dirname, "views"));

// CARGAR LOS DATOS
const jsonData = require('./data/travels.json');
// console.log(jsonData);
jsonData.forEach(travel => {
    // RUTAS
    app.get(`${travel.ruta}`, (req, res) => {
        res.render("travels", {
            "lugar" : `${travel.lugar}`,
            "nombre" : `${travel.nombre}`,
            "descripcion" : `${travel.descripcion}`,
            "precio" : `${travel.precio}`,
            "img" : `${travel.img}`,
            "id" : `${travel.id}`,
            "travels" : jsonData
        });
    })
})




app.listen(PORT, () => {console.log(`servidor levantado en http://localhost:${PORT}`);})

