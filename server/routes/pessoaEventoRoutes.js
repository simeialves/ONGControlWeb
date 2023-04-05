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

//#region CREATE
appRoutes.post("/", verifyJWT, (req, res) => {
  const {
    pessoaid,
    tipocolaboradoreventoid,
    eventoid,
    tipo,
    status,
    senharetirada,
  } = req.body;

  db.knex("pessoaevento")
    .insert({
      pessoaid: pessoaid,
      tipocolaboradoreventoid: tipocolaboradoreventoid,
      eventoid: eventoid,
      tipo: tipo,
      status: status,
      senharetirada: senharetirada,
    })
    .then(() => {
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
  const { tipo, eventoid, tipocolaboradoreventoid } = req.query;
  var query = db
    .knex("pessoaevento")
    .select("*")
    .join("pessoa", "pessoaevento.pessoaid", "=", "pessoa.pessoaid")
    .join(
      "tipocolaboradorevento",
      "pessoaevento.tipocolaboradoreventoid",
      "=",
      "tipocolaboradorevento.tipocolaboradoreventoid"
    )
    .join(
      "tipocolaborador",
      "tipocolaborador.tipocolaboradorid",
      "=",
      "tipocolaboradorevento.tipocolaboradorid"
    );

  if (tipo != undefined) query.where("pessoaevento.tipo", tipo);
  if (eventoid != undefined) query.where("pessoaevento.eventoid", eventoid);
  if (tipocolaboradoreventoid != undefined)
    query.where(
      "pessoaevento.tipocolaboradoreventoid",
      tipocolaboradoreventoid
    );

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
      res.status(500).json({
        message: ERROR_FETCH + " - " + err.message,
      });
    });
});

appRoutes.get("/:id", verifyJWT, async (req, res, next) => {
  let id = Number.parseInt(req.params.id);
  await db.knex
    .select("*")
    .from("pessoaevento")
    .where({ pessoaeventoid: id })
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
    pessoaid,
    tipocolaboradoreventoid,
    eventoid,
    tipo,
    status,
    senharetirada,
  } = req.body;

  await db.knex
    .select("*")
    .from("pessoaevento")
    .where({ pessoaid: id })
    .then(function (result) {
      if (result.length) {
        db.knex
          .where({ pessoaeventoid: id })
          .update({
            pessoaid: pessoaid,
            tipocolaboradoreventoid: tipocolaboradoreventoid,
            eventoid: eventoid,
            tipo: tipo,
            status: status,
            senharetirada: senharetirada,
          })
          .table("pessoaevento")
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
        message: ERROR_FETCH + " -" + err.message,
      });
    });
});
//#endregion

//#region DELETE
appRoutes.delete("/:id", verifyJWT, async (req, res) => {
  let id = Number.parseInt(req.params.id);
  await db.knex
    .select("*")
    .from("pessoaevento")
    .where({ pessoaeventoid: id })
    .then(function (result) {
      if (result.length) {
        db.knex
          .where({ pessoaeventoid: id })
          .delete()
          .table("pessoaevento")
          .then(() => {
            res.status(201).json({
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
