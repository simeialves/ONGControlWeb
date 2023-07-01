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

class DoacaoEventoPessoaController {
  //#region CREATE
  static create = async (req, res) => {
    const {
      tipodoacaoeventoid,
      eventoid,
      pessoaid,
      pessoaeventoid,
      quantidade,
      status,
    } = req.body;

    db.knex("doacaoeventopessoa")
      .insert({
        tipodoacaoeventoid: tipodoacaoeventoid,
        eventoid: eventoid,
        pessoaid: pessoaid,
        pessoaeventoid: pessoaeventoid,
        quantidade: quantidade,
        status: status,
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
    const { pessoaEventoId } = req.query;
    var query = db
      .knex("doacaoeventopessoa")
      .orderBy("doacaoeventopessoa.doacaoeventopessoaid")
      .select(
        "doacaoeventopessoa.doacaoeventopessoaid",
        "tipodoacao.descricao as descricao",
        "doacaoeventopessoa.quantidade as quantidade"
      )
      .join("pessoa", "doacaoeventopessoa.pessoaid", "=", "pessoa.pessoaid")
      .join(
        "pessoaevento",
        "doacaoeventopessoa.pessoaeventoid",
        "=",
        "pessoaevento.pessoaeventoid"
      )
      .join(
        "tipodoacaoevento",
        "doacaoeventopessoa.tipodoacaoeventoid",
        "=",
        "tipodoacaoevento.tipodoacaoeventoid"
      )
      .join(
        "tipodoacao",
        "tipodoacaoevento.tipodoacaoid",
        "=",
        "tipodoacao.tipodoacaoid"
      );
    if (pessoaEventoId)
      query.where("doacaoeventopessoa.pessoaeventoid", "=", pessoaEventoId);

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
      .from("doacaoeventopessoa")
      .where({ doacaoeventopessoaid: id })
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
      tipodoacaoeventoid,
      eventoid,
      pessoaid,
      pessoaeventoid,
      quantidade,
      status,
    } = req.body;

    await db.knex
      .select("*")
      .from("doacaoeventopessoa")
      .where({ doacaoeventopessoaid: id })
      .then(function (result) {
        if (result.length) {
          db.knex
            .where({ doacaoeventopessoaid: id })
            .update({
              tipodoacaoeventoid: tipodoacaoeventoid,
              eventoid: eventoid,
              pessoaid: pessoaid,
              pessoaeventoid: pessoaeventoid,
              quantidade: quantidade,
              status: status,
            })
            .table("doacaoeventopessoa")
            .then(() => {
              res.status(200).json({
                message: SUCCESS_UPDATED,
                id: result.id,
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
      .from("doacaoeventopessoa")
      .where({ doacaoeventopessoaid: id })
      .then(function (result) {
        if (result.length) {
          db.knex
            .where({ doacaoeventopessoaid: id })
            .delete()
            .table("doacaoeventopessoa")
            .then(() => {
              res.status(200).json({
                message: SUCCESS_DELETED,
                id: id,
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

module.exports = DoacaoEventoPessoaController;
