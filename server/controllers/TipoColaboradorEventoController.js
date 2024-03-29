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

class TipoColaboradorEventoController {
  //#region CREATE
  static create = async (req, res) => {
    const { tipocolaboradorid, eventoid, quantidade } = req.body;

    db.knex("tipocolaboradorevento")
      .insert({
        tipocolaboradorid: tipocolaboradorid,
        eventoid: eventoid,
        quantidade: quantidade,
        quantidadeinscritos: 0,
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
    const { eventoid } = req.query;

    var query = db
      .knex("tipocolaboradorevento")
      .select("*")
      .join(
        "tipocolaborador",
        "tipocolaboradorevento.tipocolaboradorid",
        "=",
        "tipocolaborador.tipocolaboradorid"
      );

    if (eventoid != undefined)
      query.where("tipocolaboradorevento.eventoid", eventoid);

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
  };
  static getById = async (req, res) => {
    let id = Number.parseInt(req.params.id);
    await db.knex
      .select("*")
      .from("tipocolaboradorevento")
      .where({ tipocolaboradorid: id })
      .then(function (result) {
        if (result.length) {
          res.status(201).json(result);
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
  //#endregion

  //#region UPDATE
  static update = async (req, res) => {
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
      .from("tipocolaboradorevento")
      .where({ tipocolaboradoreventoid: id })
      .then(function (result) {
        if (result.length) {
          db.knex
            .where({ tipocolaboradoreventoid: id })
            .update({
              tipodoacaoid: tipodoacaoid,
              tipodoacaoeventoid: tipodoacaoeventoid,
              eventoid: eventoid,
              pessoaid: pessoaid,
              datadoacao: datadoacao,
              quantidade: quantidade,
            })
            .table("tipocolaboradorevento")
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
      .from("tipocolaboradorevento")
      .where({ tipocolaboradoreventoid: id })
      .then(function (result) {
        if (result.length) {
          db.knex
            .where({ tipocolaboradoreventoid: id })
            .delete()
            .table("tipocolaboradorevento")
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

module.exports = TipoColaboradorEventoController;
