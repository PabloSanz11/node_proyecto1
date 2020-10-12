const bodyParser = require('body-parser');
const express = require('express'); //Obtener la libreria
const app = express(); //Asignar la libreria a app
const {pokemon} = require('./pokedex.json'); //Importar la base de datos y extraer el elmento especifico

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

//<--------- POST--------------->
app.post("/pokemon", (req, res, next) =>
{
    return res.status(200).send(req.body); 
});


app.get("/pokemon", (req, res, next) =>
{
    return res.status(200).send(pokemon);   
});

app.get('/pokemon/:id([0-9]{1,3})', (req, res, next) =>
{
    const id = req.params.id - 1;

    (id >= 0 || id <= 150) ? res.status(200).send(pokemon[req.params.id-1]) : res.status(404).send("El pokemon no ha sido encontrado");

});

//Procesar solo aquellas que lleven un texto en la variable [1]
app.get('/pokemon/:name([A-Za-z]+)' , (req, res, next) =>
{
    const name = req.params.name;
    //Es un ciclo donde se pasa un valor, p accede a todos los atributos de la bd [2]
    const pk = pokemon.filter((p) =>
    {
        //Condicion ? si es verdadero : si es falso; [3]
        return (p.name.toUpperCase() == name.toUpperCase()) && p;
    });

    //pk es un arreglo con sus posiciones
    (pk.length > 0) ? res.status(200).send(pk) : res.status(404).send("Pokemon no encontrado");;

});

app.get('/pokemon/:num', (req, res, next) =>
{
    return res.status(200).send(pokemon[req.params.num]);
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
