
const express = require('express'); //Obtener la libreria
const app = express(); //Asignar la libreria a app

/** 
 * Verbos HTTP
 * GET
 * POST
 * PATCH ----> Actualizacion de un dato de un recurso especifico (contraseña)
 * PUT   ----> Actualización de todos los recursos especificados
 * DELETE
**/

//req es la petición del cliente navegador, res es la respuesta que nosotros mandaremos
app.get("/", (req, res, next) =>
{
    res.status(200);
    res.send("Bienvenido");
});

//Encender el servidor para que escuche
app.listen(3000, () =>
{
    console.log("Server is running...");
});

/*
const x = 0;
let y = 0;
var z = 0;*/
