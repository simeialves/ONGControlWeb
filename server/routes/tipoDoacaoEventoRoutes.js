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
    tipodoacaoid,
    eventoid,
    quantidade,
    quantidaderecebidas,
    quantidaderealizadas,
  } = req.body;

  db.knex("tipodoacaoevento")
    .insert({
      tipodoacaoid: tipodoacaoid,
      eventoid: eventoid,
      quantidade: quantidade,
      quantidaderecebidas: quantidaderecebidas,
      quantidaderealizadas: quantidaderealizadas,
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
  const { tipodoacaoid, eventoid } = req.query;

  var query = db
    .knex("tipodoacaoevento")
    .select("*")
    .join("evento", "tipodoacaoevento.eventoid", "=", "evento.eventoid")
    .join(
      "tipodoacao",
      "tipodoacaoevento.tipodoacaoid",
      "=",
      "tipodoacao.tipodoacaoid"
    );

  if (eventoid != undefined) query.where("tipodoacaoevento.eventoid", eventoid);

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

appRoutes.get("/filter", verifyJWT, async (req, res, next) => {
  const { nome } = req.query;

  var query = db.knex("tipodoacaoevento").select("*");

  if (nome != undefined) query.whereILike("nome", `%${nome}%`).orderBy("nome");

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
    .from("tipodoacaoevento")
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
    tipodoacaoid,
    eventoid,
    quantidade,
    quantidaderecebidas,
    quantidaderealizadas,
  } = req.body;

  await db.knex
    .select("*")
    .from("tipodoacaoevento")
    .where({ tipodoacaoeventoid: id })
    .then(function (result) {
      if (result.length) {
        db.knex
          .where({ tipodoacaoeventoid: id })
          .update({
            tipodoacaoid: tipodoacaoid,
            eventoid: eventoid,
            quantidade: quantidade,
            quantidaderecebidas: quantidaderecebidas,
            quantidaderealizadas: quantidaderealizadas,
          })
          .table("tipodoacaoevento")
          .then(() => {
            res.status(201).json({
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
    .from("tipodoacaoevento")
    .where({ tipodoacaoeventoid: id })
    .then(function (result) {
      if (result.length) {
        db.knex
          .where({ tipodoacaoeventoid: id })
          .delete()
          .table("tipodoacaoevento")
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
