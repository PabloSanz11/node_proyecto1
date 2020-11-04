const express = require('express');
const user = express.Router();
const db = require('../config/database');
const jwt = require('jsonwebtoken');

user.post("/", async (req,res,next) =>
{
    const {user_name, user_mail, user_password} = req.body;

    if(user_name && user_mail && user_password)
    {
        let query = "INSERT INTO user(user_name, user_mail, user_password)";
        query += `VALUES ('${user_name}', '${user_mail}', '${user_password}');`;
        const rows = await db.query(query);

        if(rows.affectedRows == 1)
        {
            return res.status(201).json({code: 201, message: "Usuario registrado correctamente"});
        }

        return res.status(500).json({code: 500, message: "El usuario no ha sido registrado"});
    }

    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

user.post("/login", async (req, res, next) =>
{
    const {user_mail, user_password} = req.body;

    if(user_mail && user_password)
    {
        const query = `SELECT * FROM user WHERE user_mail = '${user_mail}' AND user_password = '${user_password}';`;
        const rows = await db.query(query);

        if(rows.length == 1)
        {
            const token = jwt.sign(
            {
                user_id: rows[0].user_id,
                user_mail: rows[0].user_mail
            }, "debugkey");

            return res.status(200).json({code: 200, message: token});
        }else
        {
            return res.status(401).json({code: 401, message: "Usuario y/o Contraseña incorrectos"});
        }
    }
    
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

user.get("/", async (req, res, next) =>
{
    const query = await db.query("SELECT * FROM user;");
    return res.status(200).json({code: 200, message: query});
});


module.exports = user; //Exportar