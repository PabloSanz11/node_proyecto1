const express = require('express');
const pokemon = express.Router();
const db = require('../config/database');

// const pk = require('../pokedex.json').pokemon; Importar la base de datos y extraer el elmento especifico

//<--------- POST--------------->
pokemon.post("/", (req, res, next) =>
{
    return res.status(200).send(req.body); 
});


pokemon.get("/", async (req, res, next) =>
{
    const pkmn =  await db.query("SELECT * FROM pokemon"); //Es el query
    return res.status(200).json({code: 1, message: pkmn}); //Solo cuando ya viene en formato json 
});

//Busqueda por IDs
pokemon.get('/:id([0-9]{1,3})', async (req, res, next) =>
{
    const id = req.params.id;
    
    if(id >= 1 && id <= 722)
    {
       const pkmn =  await db.query("SELECT * FROM pokemon WHERE pok_id ="+ id); //Es el query
       return res.status(200).json({code: 1, message: pkmn});
    }  
    
    return res.status(404).send({code: 404, message: "El pokemon no ha sido encontrado"});
    //(id >= 0 || id <= 150) ? res.status(200).send(pk[req.params.id-1]) : res.status(404).send("El pokemon no ha sido encontrado");

});

//Procesar solo aquellas que lleven un texto en la variable [1]
pokemon.get('/:name([A-Za-z]+)', async (req, res, next) =>
{
    const name = req.params.name;
    const pkmn = await db.query("SELECT * FROM pokemon WHERE pok_name = '" + name + "'"); //Es el query

    try 
    {
        if(pkmn.length > 0)
        {
            return res.status(200).json({code: 1, message: pkmn});
        }

        return res.status(404).send({code: 404, message: "El pokemon no ha sido encontrado"});
    } catch (error) {
        console.log(error);
    }
    
    //Es un ciclo donde se pasa un valor, p accede a todos los atributos de la bd [2]
    /*
    const pkmn = json(pkmns).filter((p) =>
    {
        //Condicion ? si es verdadero : si es falso; [3]
        return (p.name.toUpperCase() == name.toUpperCase()) && p;
    });

    //pkmn es un arreglo con sus posiciones
    if(pkmn.length > 0) 
    {
        return res.status(200).json(pkmn);
    } 

    return res.status(404).send("Pokemon no encontrado");
    */
});

module.exports = pokemon; //Exportar cosas y solo una