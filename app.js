// DEPENDENCIAS DEL PROYECTO
const path = require('node:path');
const fs = require('node:fs');
const crypto = require('node:crypto');
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
// Recodificar los datos enviados desde el formulario
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// CARGAR LOS DATOS
const jsonDataInicial = require('./data/travels.json');
const jsonData = jsonDataInicial.sort((a, b) => a.lugar.localeCompare(b.lugar, "es", {numeric:true}))


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
    });
});

app.get("/admin", (req, res) => {
    res.render("admin", {jsonData});
})

app.post("/insert", (req, res) => {
    // console.log(req.body);
    let newTravel = req.body;
    if (newTravel[0] != "/") {
        newTravel.ruta = "/"+newTravel.ruta;
    }
    
    newTravel.precio = parseFloat(newTravel.precio);
    newTravel.id = crypto.randomUUID();
    jsonData.push(newTravel);
    // console.log(jsonData);
    fs.writeFileSync(path.join(__dirname, "data", "travels.json"), JSON.stringify(jsonData, null, 2), "utf-8");
    res.redirect("/admin");  

})

app.delete("/delete/:id", (req, res) => {
    const idDelete = req.params.id
    // console.log("El id es", idDelete);
    const newJsonData = jsonData.filter(travel => travel.id != idDelete);
    
    fs.writeFileSync(path.join(__dirname, "data", "travels.json"), JSON.stringify(newJsonData, null, 2), "utf-8");
    jsonData.length = 0;
    
    newJsonData.forEach(travel => {
        jsonData.push(travel)
    })   

    res.json({"mensaje":"Elemento borrado correctamente"})

})

app.put("/update/:id", (req, res) => {
    const idUpdate = req.params.id
    // console.log(idUpdate)
    const body = req.body;    
    console.log(body);   
   
    // si en el for utilizo in, recorre las claves , pero si utilizo of receorre los objetos
    for (dato of jsonData) {
        if (dato.id == body.id) {
            dato.ruta = body.ruta;
            dato.nombre = body.nombre;
            dato.descripcion = body.descripcion;
            dato.lugar = body.lugar;
            dato.precio = parseFloat(body.precio);
            dato.img = body.img;
        }
    }
    fs.writeFileSync(path.join(__dirname, "data", "travels.json"), JSON.stringify(jsonData, null, 2), "utf-8");

    // console.log("jsonData",jsonData);

    res.json({"Respuesta" : "Modificado correctamente"})

})
app.listen(PORT, () => {console.log(`servidor levantado en http://localhost:${PORT}`);})

