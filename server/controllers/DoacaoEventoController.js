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

class DoacaoEventoController {
  //#region CREATE
  static create = async (req, res) => {
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
  };
  //#endregion

  //#region READ
  static getAll = async (req, res) => {
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

    if (eventoid != undefined)
      query.where("tipodoacaoevento.eventoid", eventoid);
    query
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
      .from("doacaoevento")
      .where({ doacaoeventoid: id })
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
  };
  //#endregion

  //#region DELETE
  static delete = async (req, res) => {
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
  };
  //#endregion
}

module.exports = DoacaoEventoController;
