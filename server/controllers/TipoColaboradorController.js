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

class TipoColaboradorController {
  //#region CREATE
  static create = async (req, res) => {
    const { descricao, ativo } = req.body;

    db.knex("tipocolaborador")
      .insert({
        descricao: descricao,
        ativo: ativo,
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
  };
  //#endregion

  //#region READ
  static getAll = async (req, res) => {
    await db.knex
      .select("*")
      .from("tipocolaborador")
      .orderBy("descricao")
      .then(function (results) {
        if (results.length) {
          res.status(201).json(results);
        } else {
          res.status(404).json({ message: NOT_FOUND });
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
        res.status(500).json({
          message: ERROR_FETCH + " - " + err.message,
        });
      });
  };
  static getByFilter = async (req, res) => {
    const { ativo, descricao } = req.query;

    var query = db.knex("tipocolaborador").select("*").orderBy("descricao");

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
  };
  //#endregion

  //#region UPDATE
  static update = async (req, res) => {
    const id = Number.parseInt(req.params.id);
    const { descricao, ativo } = req.body;

    await db.knex
      .select("*")
      .from("tipocolaborador")
      .where({ tipocolaboradorid: id })
      .then(function (result) {
        if (result.length) {
          db.knex
            .where({ tipocolaboradorid: id })
            .update({
              descricao: descricao,
              ativo: ativo,
            })
            .table("tipocolaborador")
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
      .from("tipocolaborador")
      .where({ tipocolaboradorid: id })
      .then(function (result) {
        if (result.length) {
          db.knex
            .where({ tipocolaboradorid: id })
            .delete()
            .table("tipocolaborador")
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

module.exports = TipoColaboradorController;
