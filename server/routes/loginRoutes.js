require("dotenv").config();
const express = require("express");
const db = require("../config/db");
const loginRoutes = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

loginRoutes.post("/loginAuth", (req, res) => {
  db.knex
    .select("*")
    .from("usuario")
    .where({ login: req.body.email })
    .then(async (usuarios) => {
      if (usuarios.length) {
        let usuario = usuarios[0];
        let checkSenha = await bcrypt.compare(req.body.password, usuario.senha);
        if (checkSenha) {
          var tokenJWT = jwt.sign(
            { id: usuario.usuarioid },
            process.env.SECRET_KEY,
            {
              expiresIn: 3600,
            }
          );
          res.status(200).json({
            success: true,
            message: "Logado com sucesso",
            id: usuario.usuarioid,
            email: usuario.login,
            access_token: tokenJWT,
          });
          return;
        } else
          res.status(401).json({
            success: false,
            message: "Login ou senha incorretos.",
          });
      } else
        res.status(401).json({
          success: false,
          message: "Login ou senha incorretos.",
        });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Erro ao verificar login - " + err.message,
      });
    });
});

module.exports = loginRoutes;
