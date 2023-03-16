const express = require("express");
const { knex } = require("../config/db");
const db = require("../config/db");
const appRoutes = express.Router();
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const {
  NO_TOKEN_PROVIDER,
  FAILED_AUTH_TOKEN,
  NOT_FOUND,
  CREATED,
} = require("../includes/const");

appRoutes.use(bodyParser.json());

const STATUS_ATIVO = 1;

//#region Methods
function verifyJWT(req, res, next) {
  var token = req.headers["x-access-token"];

  if (!token) {
    return res.status(401).send({ auth: false, message: "NO_TOKEN_PROVIDER" });
  }

  jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "FAILED_AUTH_TOKEN" });

    // se tudo estiver ok, salva no request para uso posterior
    req.userId = decoded.id;
    next();
  });
}
//#endregion

//#region CREATE
appRoutes.post("/", (req, res) => {
  const { descricao, ativo } = req.body;

  db.knex("tipodoacao")
    .insert({
      descricao: descricao,
      ativo: ativo,
    })
    .then((result) => {
      let resultInsert = result[0];
      res.status(201).json({ message: "CREATED" });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Erro ao cadastrar tipo de doação - " + err.message,
      });
    });
});
//#endregion

//#region READ
appRoutes.get("/", async (req, res, next) => {
  await db.knex
    .select("*")
    .from("tipodoacao")
    .where("ativo", STATUS_ATIVO)
    .then(function (results) {
      if (results.length) {
        return res.status(201).json(results);
      } else {
        res.status(404).json({
          message: NOT_FOUND,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

appRoutes.get("/filter", async (req, res, next) => {
  const { ativo, descricao } = req.query;

  var query = knex("tipodoacao").select("*");
  console.log("ativo: " + ativo);
  if (ativo != undefined) query.where("ativo", ativo);
  if (descricao != undefined) query.whereILike("descricao", `%${descricao}%`);

  query
    .then(function (results) {
      if (results.length) {
        return res.status(201).json(results);
      } else {
        res.status(404).json({
          message: "Nenhum registro encontrado",
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });

  console.log("Query: " + query.toString());
});

appRoutes.get("/:id", async (req, res, next) => {
  let id = Number.parseInt(req.params.id);
  await db.knex
    .select("*")
    .from("tipodoacao")
    .where({ tipodoacaoid: id })
    .then(function (result) {
      if (result.length) {
        return res.status(201).json(result);
      } else {
        res.status(404).json({
          message: "NOT_FOUND",
        });
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
          message: "Registro alterado com sucesso",
        });
      } else {
        res.status(404).json({
          message: "Registro não encontrado",
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
//#endregion

module.exports = appRoutes;
