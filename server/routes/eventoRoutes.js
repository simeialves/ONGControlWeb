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
    .then(() => {
      res.status(200).json({ message: SUCCESS_CREATED });
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
  await db.knex
    .select("*")
    .from("evento")
    .orderBy("descricao")
    .then(function (results) {
      if (results.length) {
        return res.status(200).json(results);
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
  const { ativo, descricao } = req.query;

  var query = db.knex("evento").select("*").orderBy("descricao");

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
      res.status(500).json({
        message: ERROR_FETCH + " - " + err.message,
      });
    });
});

appRoutes.get("/:id", verifyJWT, async (req, res, next) => {
  let id = Number.parseInt(req.params.id);
  const query = await db.knex
    .select("*")
    .from("evento")
    .where({ eventoid: id })
    .then(function (result) {
      if (result.length) {
        return res.status(201).json(result);
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

//#region UPDATE
appRoutes.put("/:id", verifyJWT, async (req, res) => {
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
        db.knex
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
    .from("evento")
    .where({ eventoid: id })
    .then(function (result) {
      if (result.length) {
        db.knex
          .where({ eventoid: id })
          .delete()
          .table("evento")
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
