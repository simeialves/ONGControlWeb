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

class TipoDoacaoEventoController {
  //#region CREATE
  static create = async (req, res) => {
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
  };
  //#endregion

  //#region READ
  static getAll = async (req, res) => {
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

    if (eventoid != undefined)
      query.where("tipodoacaoevento.eventoid", eventoid);

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
  static getById = async (req, res) => {
    let id = Number.parseInt(req.params.id);
    await db.knex
      .select("*")
      .from("tipodoacaoevento")
      .where({ pessoaeventoid: id })
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
  static getByFilter = async (req, res) => {
    const { nome } = req.query;

    var query = db.knex("tipodoacaoevento").select("*");

    if (nome != undefined)
      query.whereILike("nome", `%${nome}%`).orderBy("nome");

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
  };
  //#endregion

  //#region DELETE
  static delete = async (req, res) => {
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
  };
  //#endregion
}

module.exports = TipoDoacaoEventoController;
