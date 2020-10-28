//const bodyParser = require('body-parser');
const morgan = require('morgan');
const express = require('express'); //Obtener la libreria
const app = express(); //Asignar la libreria a app
const pokemon = require('./routes/pokemon'); //Asignar el recurso
const user = require('./routes/user');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

/*
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));*/

//req es la petición del cliente navegador, res es la respuesta que nosotros mandaremos
app.get("/", (req, res, next) =>
{
    return res.status(200).json({code: 1, message: "Bienvenido al Pokédex"});
});

app.use("/pokemon", pokemon); // cada que se detecte al pokemon se manda al js, es acceder a los recursos
app.use("/user", user);

// Cuando se entre a algun recurso inexistentes, <--------------------- siempre se pone al final --------------------->
app.use((req, res, next) =>
{
    return res.status(404).json({code: 404, message: "URL NO ENCONTRADA"});
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
