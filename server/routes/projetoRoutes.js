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
appRoutes.post("/", verifyJWT, (req, res) => {
  const { descricao, ativo } = req.body;

  db.knex("projeto")
    .insert({
      descricao: descricao,
      ativo: ativo,
    })
    .then((result) => {
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
    .from("projeto")
    .orderBy("descricao")
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

appRoutes.get("/filter", verifyJWT, async (req, res, next) => {
  const { ativo, descricao } = req.query;

  var query = knex("projeto").select("*").orderBy("descricao");

  if (ativo != undefined) query.where("ativo", ativo);
  if (descricao != undefined) query.whereILike("descricao", `%${descricao}%`);

  query
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

appRoutes.get("/:id", verifyJWT, async (req, res, next) => {
  let id = Number.parseInt(req.params.id);
  await db.knex
    .select("*")
    .from("projeto")
    .where({ projetoid: id })
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
appRoutes.put("/:id", verifyJWT, async (req, res) => {
  const id = Number.parseInt(req.params.id);
  const { descricao, ativo } = req.body;

  await db.knex
    .select("*")
    .from("projeto")
    .where({ projetoid: id })
    .then(function (result) {
      if (result.length) {
        knex
          .where({ projetoid: id })
          .update({
            descricao: descricao,
            ativo: ativo,
          })
          .table("projeto")
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
appRoutes.delete("/:id", verifyJWT, async (req, res) => {
  let id = Number.parseInt(req.params.id);
  await db.knex
    .select("*")
    .from("projeto")
    .where({ projetoid: id })
    .then(function (result) {
      if (result.length) {
        knex
          .where({ projetoid: id })
          .delete()
          .table("projeto")
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
