const bodyParser = require('body-parser');
const morgan = require('morgan');
const express = require('express'); //Obtener la libreria
const app = express(); //Asignar la libreria a app
const pokemon = require('./routes/pokemon.js');


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/** 
 * Verbos HTTP
 * GET
 * POST
 * PATCH ----> Actualizacion de un dato de un recurso especifico (contraseña, id, name, etc)
 * PUT   ----> Actualización de todos los recursos especificados
 * DELETE
**/

//req es la petición del cliente navegador, res es la respuesta que nosotros mandaremos
app.get("/", (req, res, next) =>
{
    return res.status(200).send("Bienvenido al pokedex");
});

app.use("/pokemon", pokemon); // cada que se detecte al pokemon se manda al js

//Encender el servidor para que escuche
app.listen(process.env.PORT || 3000, () =>
{
    console.log("Server is running...");
});

/*
const x = 0;
let y = 0;
var z = 0;*/
