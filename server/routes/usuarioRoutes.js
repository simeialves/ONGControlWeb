const express = require("express");
const db = require("../config/db");
const usuarioRoutes = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
require("dotenv").config();

function verifyJWT(req, res, next) {
    var token = req.headers["x-access-token"];
  
    if (!token) {
      return res.status(401).send({ auth: false, message: "No token provided." });
    }
  
    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
      if (err)
        return res
          .status(500)
          .send({ auth: false, message: "Failed to authenticate token." });
  
      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.id;
      next();
    });
  }

usuarioRoutes.post('/register', verifyJWT, (req, res, next) => {
    const { nome, login, senha, senha2 } = req.body

    if (senha != senha2) {
        res.status(200).json("As senhas não conferem")
    }
    else {
        db.knex('usuario')
            .insert({
                login: login,
                senha: bcrypt.hashSync(senha, 8),
                ativo: 1,
                tipo: 2
            }, ['usuarioid'])
            .then((result) => {
                let usuario = result[0]
                res.status(200).json({ "usuarioid": usuario.usuarioid })
                return
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Erro ao registrar usuario - ' + err.message
                })
            })
    }
})

module.exports = usuarioRoutes;