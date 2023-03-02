const express = require("express");
const { knex } = require("../config/db");
const db = require("../config/db");
const appRoutes = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

require("dotenv").config();
appRoutes.use(bodyParser.json());

//#region Methods
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
//#endregion

//#region CREATE
appRoutes.post("/register", (req, res, next) => {
  const { nome, login, senha, senha2, administrador } = req.body;

  if (senha != senha2) {
    res.status(200).json("As senhas não conferem");
  } else {
    db.knex("usuario")
      .insert(
        {
          nome: nome,
          login: login,
          senha: bcrypt.hashSync(senha, 8),
          administrador: administrador,
        },
        ["usuarioid"]
      )
      .then((result) => {
        let usuario = result[0];
        res.status(200).json({ usuarioid: usuario.usuarioid });
        return;
      })
      .catch((err) => {
        res.status(500).json({
          message: "Erro ao registrar usuario - " + err.message,
        });
      });
  }
});
//#endregion

//#region READ
appRoutes.get("/", (req, res, next) => {
  db.knex
    .select()
    .from("usuario")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Erro ao buscar usuarios - " + err.message,
      });
    });
});

appRoutes.get("/:id", async (req, res, next) => {
  let id = Number.parseInt(req.params.id);
  await db.knex
    .select("*")
    .from("usuario")
    .where({ usuarioid: id })
    .then(function (result) {
      if (result.length) {
        return res.status(201).json(result);
      } else {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
//#endregion

//#region UPDATE

appRoutes.put("/:id", async (req, res) => {
  const id = Number.parseInt(req.params.id);
  const { nome, login, senha, senha2, administrador } = req.body;

  await db.knex
    .select("*")
    .from("usuario")
    .where({ usuarioid: id })
    .then(function (result) {
      if (result.length) {
        knex
          .where({ usuarioid: id })
          .update({
            nome: nome,
            login: login,
            senha: bcrypt.hashSync(senha, 8),
            administrador: administrador,
          })
          .table("usuario")
          .then((result) => {
            console.log(result);
          })
          .catch((err) => {
            console.log(err);
          });

        res.status(200).json({
          message: "Usuário alterado com sucesso",
        });
      } else {
        res.status(404).json({
          message: "Usuário não encontrado",
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
//#endregion

//#region DELETE
appRoutes.delete("/:id", async (req, res) => {
  let id = Number.parseInt(req.params.id);
  await db.knex
    .select("*")
    .from("usuario")
    .where({ usuarioid: id })
    .then(function (result) {
      if (result.length) {
        knex
          .where({ usuarioid: id })
          .delete()
          .table("usuario")
          .then((result) => {
            console.log(result);
          })
          .catch((err) => {
            console.log(err);
          });

        res.status(200).json({
          message: "Usuário excluído com sucesso",
        });
      } else {
        res.status(404).json({
          message: "Usuário não encontrado",
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
//#endregion

module.exports = appRoutes;
