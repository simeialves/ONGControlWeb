const db = require("../config/db");
const {
  NOT_FOUND,
  ERROR_FETCH,
  SUCCESS_CREATED,
  ERROR_CREATED,
  SUCCESS_UPDATED,
  ERROR_UPDATED,
  SUCCESS_DELETED,
} = require("../includes/Messages");

class TipoDoacaoController {
  //#region CREATE
  static create = async (req, res) => {
    const { descricao, ativo } = req.body;

    db.knex("tipodoacao")
      .insert({
        descricao: descricao,
        ativo: ativo,
      })
      .then(() => {
        res.status(201).json({ message: SUCCESS_CREATED });
      })
      .catch((err) => {
        res.status(500).json({
          message: ERROR_CREATED + " - " + err.message,
        });
      });
  };
  //#endregion

  //#region READ
  static getAll = async (req, res) => {
    const { ativo } = req.query;

    var query = db.knex("tipodoacao").select("*").orderBy("descricao");

    if (ativo != undefined) query.where("ativo", ativo);

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
  };
  static getById = async (req, res) => {
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
            message: NOT_FOUND,
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: ERROR_FETCH + " - " + err.message,
        });
      });
  };
  static getByFilter = async (req, res) => {
    const { ativo, descricao } = req.query;

    var query = db.knex("tipodoacao").select("*").orderBy("descricao");

    if (ativo != undefined) query.where("ativo", ativo);
    if (descricao != undefined) query.whereILike("descricao", `%${descricao}%`);

    query
      .then(function (results) {
        if (results.length) {
          res.status(201).json(results);
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
  };
  //#endregion

  //#region UPDATE
  static update = async (req, res) => {
    const id = Number.parseInt(req.params.id);
    const { descricao, ativo } = req.body;

    await db.knex
      .select("*")
      .from("tipodoacao")
      .where({ tipodoacaoid: id })
      .then(function (result) {
        if (result.length) {
          db.knex
            .where({ tipodoacaoid: id })
            .update({
              descricao: descricao,
              ativo: ativo,
            })
            .table("tipodoacao")
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
  };
  //#endregion

  //#region DELETE
  static delete = async (req, res) => {
    let id = Number.parseInt(req.params.id);
    await db.knex
      .select("*")
      .from("tipodoacao")
      .where({ tipodoacaoid: id })
      .then(function (result) {
        if (result.length) {
          db.knex
            .where({ tipodoacaoid: id })
            .delete()
            .table("tipodoacao")
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
  };
  //#endregion
}

module.exports = TipoDoacaoController;
