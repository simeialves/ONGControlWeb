const express = require("express");
const db = require("../config/db");
const appRoutes = express.Router();
const bodyParser = require("body-parser");
const {
  NOT_FOUND,
  SUCCESS_UPDATED,
  SUCCESS_DELETED,
  SUCCESS_CREATED,
  ERROR_CREATED,
  ERROR_FETCH,
  ERROR_UPDATED,
  ERROR_DELETED,
} = require("../includes/Messages");
const { verifyJWT } = require("./../includes/Uteis");

appRoutes.use(bodyParser.json());

/*
TESTE
*/

//#region CREATE
appRoutes.post("/", verifyJWT, (req, res) => {
  const { tipodoacaoeventoid, pessoaid, datadoacao, quantidade } = req.body;

  db.knex("doacaoevento")
    .insert({
      tipodoacaoeventoid: tipodoacaoeventoid,
      pessoaid: pessoaid,
      datadoacao: datadoacao,
      quantidade: quantidade,
    })
    .then((result) => {
      res.status(200).json({
        message: SUCCESS_CREATED,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: ERROR_CREATED + " - " + err.message,
      });
    });
});
//#endregion

//#region READ
appRoutes.get("/", verifyJWT, async (req, res, next) => {
  const { eventoid } = req.query;

  var query = db
    .knex("doacaoevento")
    .orderBy("datadoacao", "descricao")
    .select(
      "doacaoevento.doacaoeventoid",
      "tipodoacao.descricao as tipodoacaodescricao",
      "doacaoevento.quantidade as doacaoeventoquantidade",
      "pessoa.nome as pessoanome",
      "doacaoevento.datadoacao as doacaoeventodatadoacao",
      "pessoa.telefone as pessoatelefone",
      "pessoa.email as pessoaemail"
    )
    .join(
      "tipodoacaoevento",
      "doacaoevento.tipodoacaoeventoid",
      "=",
      "tipodoacaoevento.tipodoacaoeventoid"
    )
    .join(
      "tipodoacao",
      "tipodoacaoevento.tipodoacaoid",
      "=",
      "tipodoacao.tipodoacaoid"
    )
    .join("pessoa", "doacaoevento.pessoaid", "=", "pessoa.pessoaid");

  if (eventoid != undefined) query.where("tipodoacaoevento.eventoid", eventoid);
  query
    .then(function (results) {
      if (results.length) {
        return res.status(201).json(results);
      } else {
        return res.status(404).json({ message: NOT_FOUND });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: ERROR_FETCH + " - " + err.message,
      });
    });
});

appRoutes.get("/:id", verifyJWT, async (req, res, next) => {
  let id = Number.parseInt(req.params.id);
  await db.knex
    .select("*")
    .from("doacaoevento")
    .where({ doacaoeventoid: id })
    .then(function (result) {
      if (result.length) {
        return res.status(201).json(result);
      } else {
        return res.status(404).json({ message: NOT_FOUND });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: ERROR_FETCH + " - " + err.message,
      });
    });
});
//#endregion

//#region UPDATE

appRoutes.put("/:id", verifyJWT, async (req, res) => {
  const id = Number.parseInt(req.params.id);
  const {
    tipodoacaoid,
    tipodoacaoeventoid,
    eventoid,
    pessoaid,
    datadoacao,
    quantidade,
  } = req.body;

  await db.knex
    .select("*")
    .from("doacaoevento")
    .where({ doacaoeventoid: id })
    .then(function (result) {
      if (result.length) {
        db.knex
          .where({ doacaoeventoid: id })
          .update({
            tipodoacaoid: tipodoacaoid,
            tipodoacaoeventoid: tipodoacaoeventoid,
            eventoid: eventoid,
            pessoaid: pessoaid,
            datadoacao: datadoacao,
            quantidade: quantidade,
          })
          .table("doacaoevento")
          .then(() => {
            res.status(200).json({
              message: SUCCESS_UPDATED,
            });
          })
          .catch((err) => {
            res.status(500).json({
              message: ERROR_UPDATED + " - " + err.message,
            });
          });
      } else {
        res.status(404).json({
          message: NOT_FOUND,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: ERROR_FETCH + " - " + err.message,
      });
    });
});
//#endregion

//#region DELETE
appRoutes.delete("/:id", verifyJWT, async (req, res) => {
  let id = Number.parseInt(req.params.id);
  await db.knex
    .select("*")
    .from("doacaoevento")
    .where({ doacaoeventoid: id })
    .then(function (result) {
      if (result.length) {
        db.knex
          .where({ doacaoeventoid: id })
          .delete()
          .table("doacaoevento")
          .then(() => {
            res.status(200).json({
              message: SUCCESS_DELETED,
            });
          })
          .catch((err) => {
            res.status(500).json({
              message: ERROR_DELETED + " - " + err.message,
            });
          });
      } else {
        res.status(404).json({
          message: NOT_FOUND,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: ERROR_FETCH + " - " + err.message,
      });
    });
});
//#endregion

module.exports = appRoutes;
