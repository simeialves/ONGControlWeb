const express = require("express");
const { knex } = require("../config/db");
const db = require("../config/db");
const appRoutes = express.Router();
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

appRoutes.use(bodyParser.json());

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

//CREATE
appRoutes.post("/", (req, res) => {
  const { descricao, ativo } = req.body;

  db.knex("tipodoacao")
    .insert({
      descricao: descricao,
      ativo: ativo,
    })
    .then((result) => {
      let tipodoacao = result[0];
      console.log(result[0]);
      res.status(200).json({ tipodoacaoid: tipodoacao.tipodoacaoid });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Erro ao cadastrar tipo de doação - " + err.message,
      });
    });
});

//READ
appRoutes.get("/", async (req, res, next) => {
  await db.knex
    .select("*")
    .from("tipodoacao")
    .then(function (results) {
      return res.status(201).json(results);
    })
    .catch((err) => {
      console.log(err);
    });
});

appRoutes.get("/:id", async (req, res, next) => {
  let id = Number.parseInt(req.params.id);
  await db.knex
    .select("*")
    .from("tipodoacao")
    .where({ tipodoacaoid: id })
    .then(function (result) {
      return res.status(201).json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//UPDATE
appRoutes.put("/:id", async (req, res) => {
  const id = Number.parseInt(req.params.id);
  const { descricao, ativo } = req.body;

  await db.knex
    .select("*")
    .from("tipodoacao")
    .where({ tipodoacaoid: id })
    .then(function (result) {
      if (result.length) {
        knex
          .where({ tipodoacaoid: id })
          .update({
            descricao: descricao,
            ativo: ativo,
          })
          .table("tipodoacao")
          .then((result) => {
            console.log(result);
          })
          .catch((err) => {
            console.log(err);
          });

        res.status(200).json({
          message: "Tipo de Doação alterada com sucesso",
        });
      } else {
        res.status(404).json({
          message: "Tipo de Doação não encontrada",
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

//DELETE
appRoutes.delete("/:id", async (req, res) => {
  let id = Number.parseInt(req.params.id);
  await db.knex
    .select("*")
    .from("tipodoacao")
    .where({ tipodoacaoid: id })
    .then(function (result) {
      if (result.length) {
        knex
          .where({ tipodoacaoid: id })
          .delete()
          .table("tipodoacao")
          .then((result) => {
            console.log(result);
          })
          .catch((err) => {
            console.log(err);
          });

        res.status(200).json({
          message: "Tipo de Doação excluída com sucesso",
        });
      } else {
        res.status(404).json({
          message: "Tipo de Doação não encontrada",
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
module.exports = appRoutes;
