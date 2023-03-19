const express = require("express");
const { knex } = require("../config/db");
const db = require("../config/db");
const appRoutes = express.Router();
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const { NOT_FOUND } = require("../includes/const");

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
appRoutes.post("/", verifyJWT, (req, res) => {
  const { descricao, ativo } = req.body;

  db.knex("tipocolaborador")
    .insert({
      descricao: descricao,
      ativo: ativo,
    })
    .then((result) => {
      let resultInsert = result[0];
      res.status(200).json({ tipocolaboradorid: resultInsert });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Erro ao cadastrar tipo de colaborador - " + err.message,
      });
    });
});
//#endregion

//#region READ
appRoutes.get("/", verifyJWT, async (req, res, next) => {
  await db.knex
    .select("*")
    .from("tipocolaborador")
    .orderBy("descricao")
    .then(function (results) {
      if (results.length) {
        return res.status(201).json(results);
      } else {
        return res.status(404).json({ message: NOT_FOUND });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

appRoutes.get("/filter", verifyJWT, async (req, res, next) => {
  const { ativo, descricao } = req.query;

  var query = knex("tipocolaborador").select("*").orderBy("descricao");

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
    .from("tipocolaborador")
    .where({ tipocolaboradorid: id })
    .then(function (result) {
      if (result.length) {
        return res.status(201).json(result);
      } else {
        return res.status(404).json({ message: NOT_FOUND });
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
    .from("tipocolaborador")
    .where({ tipocolaboradorid: id })
    .then(function (result) {
      if (result.length) {
        knex
          .where({ tipocolaboradorid: id })
          .update({
            descricao: descricao,
            ativo: ativo,
          })
          .table("tipocolaborador")
          .then((result) => {
            console.log(result);
          })
          .catch((err) => {
            console.log(err);
          });

        res.status(200).json({
          message: "Tipo de Colaborador alterado com sucesso",
        });
      } else {
        res.status(404).json({
          message: "Tipo de Colaborador não encontrado",
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
    .from("tipocolaborador")
    .where({ tipocolaboradorid: id })
    .then(function (result) {
      if (result.length) {
        knex
          .where({ tipocolaboradorid: id })
          .delete()
          .table("tipocolaborador")
          .then((result) => {
            console.log(result);
          })
          .catch((err) => {
            console.log(err);
          });

        res.status(200).json({
          message: "Tipo de Colaborador excluído com sucesso",
        });
      } else {
        res.status(404).json({
          message: "Tipo de Colaborador não encontrado",
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
//#endregion

module.exports = appRoutes;
