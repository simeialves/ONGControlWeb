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
    /*
    doacaoeventoid
    eventoid
    pessoaid
    pessoaeventoid
    quantidade
    */

    const {
      doacaoeventoid,
      eventoid,
      pessoaid,
      pessoaeventoid,
      quantidade,
      status,
    } = req.body;

    db.knex("doacaoeventopessoa")
      .insert({
        doacaoeventoid: doacaoeventoid,
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
    const { eventoid } = req.query;

    var query = db
      .knex("doacaoeventopessoa")
      .orderBy("doacaoeventopessoa.eventoid", "doacaoeventopessoa.pessoaid")
      .select(
        "doacaoeventopessoa.doacaoeventopessoaid as doacaoeventopessoaid",
        "doacaoeventopessoa.doacaoeventoid as doacaoeventoid",
        "doacaoeventopessoa.eventoid as eventoid",
        "doacaoeventopessoa.pessoaid as pessoaid",
        "doacaoeventopessoa.pessoaeventoid as pessoaeventoid",
        "doacaoeventopessoa.quantidade as quantidade",
        "doacaoeventopessoa.status as status",
        "pessoa.nome as nome",
        "pessoa.documento as documento",
        "pessoa.email as email",
        "pessoaevento.senharetirada as senharetirada"
      )
      .join(
        "doacaoevento",
        "doacaoevento.doacaoeventoid",
        "=",
        "doacaoeventopessoa.doacaoeventoid"
      )
      .join(
        "tipodoacaoevento",
        "tipodoacaoevento.tipodoacaoeventoid",
        "=",
        "doacaoevento.tipodoacaoeventoid"
      )
      .join(
        "tipodoacao",
        "tipodoacao.tipodoacaoid",
        "=",
        "tipodoacaoevento.tipodoacaoid"
      )
      .join("pessoa", "doacaoeventopessoa.pessoaid", "=", "pessoa.pessoaid")
      .join(
        "pessoaevento",
        "doacaoeventopessoa.pessoaeventoid",
        "=",
        "pessoaevento.pessoaeventoid"
      );

    if (eventoid != undefined)
      query.where("doacaoeventopessoa.eventoid", eventoid);
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
      doacaoeventoid,
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
              doacaoeventoid: doacaoeventoid,
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
