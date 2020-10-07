
const express = require('express'); //Obtener la libreria
const app = express(); //Asignar la libreria a app
const {pokemon} = require('./pokedex.json'); //Importar la base de datos y extraer el elmento especifico

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
    res.send("Bienvenido al pokedex");
});

app.get("/pokemon/all", (req, res, next) =>
{
    res.status(200);
    res.send(pokemon);   
});

app.get('/pokemon/:id([0-9]{1,3})', (req, res, next) =>
{
    const id = req.params.id - 1;

    if(id >= 0 || id <= 150)
    {
        res.status(200);
        res.send(pokemon[req.params.id-1]); 
        
    }else
    {
        res.status(404);
        res.send("El pokemon no ha sido encontrado");
    }

});

app.get('/pokemon/:name' , (req, res, next) =>
{
    const name = req.params.name;

    for(i = 0; i < pokemon.length; i++)
    {
        if(pokemon[i].name == name.trim())
        {
            res.status(200);
            res.send(pokemon[i]);
        }
    }

    res.status(404);
    res.send("Pokemon no encontrado");
    
});

app.get('/pokemon/:num', (req, res, next) =>
{
    res.status(200);
    res.send(pokemon[req.params.num]);
});

//Encender el servidor para que escuche
app.listen(process.env.PORT || 3000, () =>
{
    console.log("Server is running...");
});

/*
const x = 0;
let y = 0;
var z = 0;*/
