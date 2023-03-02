const express = require("express");
const { knex } = require("../config/db");
const db = require("../config/db");
const appRoutes = express.Router();
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

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
appRoutes.post("/", (req, res) => {
  const {
    projetoid,
    descricao,
    datainicio,
    datafim,
    nivel,
    tipo,
    formularionivelamento,
    localeventoid,
    ativo,
  } = req.body;

  db.knex("evento")
    .insert({
      projetoid: projetoid,
      descricao: descricao,
      datainicio: datainicio,
      datafim: datafim,
      nivel: nivel,
      tipo: tipo,
      formularionivelamento: formularionivelamento,
      localeventoid: localeventoid,
      ativo: ativo,
    })
    .then((result) => {
      let resultInsert = result[0];
      res.status(200).json({ eventoid: resultInsert });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Erro ao cadastrar evento - " + err.message,
      });
    });
});
//#endregion

//#region READ
appRoutes.get("/", async (req, res, next) => {
  await db.knex
    .select("*")
    .from("evento")
    .then(function (results) {
      if (results.length) {
        return res.status(201).json(results);
      } else {
        res.status(404).json({
          message: "Nenhum evento cadastrado",
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

appRoutes.get("/:id", async (req, res, next) => {
  let id = Number.parseInt(req.params.id);
  await db.knex
    .select("*")
    .from("evento")
    .where({ eventoid: id })
    .then(function (result) {
      if (result.length) {
        return res.status(201).json(result);
      } else {
        res.status(404).json({
          message: "Evento não encontrada",
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
  const {
    projetoid,
    descricao,
    datainicio,
    datafim,
    nivel,
    tipo,
    formularionivelamento,
    localeventoid,
    ativo,
  } = req.body;

  await db.knex
    .select("*")
    .from("evento")
    .where({ eventoid: id })
    .then(function (result) {
      if (result.length) {
        knex
          .where({ eventoid: id })
          .update({
            projetoid: projetoid,
            descricao: descricao,
            datainicio: datainicio,
            datafim: datafim,
            nivel: nivel,
            tipo: tipo,
            formularionivelamento: formularionivelamento,
            localeventoid: localeventoid,
            ativo: ativo,
          })
          .table("evento")
          .then((result) => {
            console.log(result);
          })
          .catch((err) => {
            console.log(err);
          });

        res.status(200).json({
          message: "Evento alterado com sucesso",
        });
      } else {
        res.status(404).json({
          message: "Evento não encontrado",
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
    .from("evento")
    .where({ eventoid: id })
    .then(function (result) {
      if (result.length) {
        knex
          .where({ eventoid: id })
          .delete()
          .table("evento")
          .then((result) => {
            console.log(result);
          })
          .catch((err) => {
            console.log(err);
          });

        res.status(200).json({
          message: "Evento excluído com sucesso",
        });
      } else {
        res.status(404).json({
          message: "Evento não encontrado",
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
//#endregion

module.exports = appRoutes;