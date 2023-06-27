const db = require("../config/db");
const {
  NOT_FOUND,
  ERROR_FETCH,
  SUCCESS_CREATED,
  ERROR_CREATED,
  SUCCESS_UPDATED,
  ERROR_UPDATED,
  SUCCESS_DELETED,
  BENEFICIARIOS,
  COLABORADORES,
} = require("../includes/Messages");

class PessoaEventoController {
  //#region CREATE
  static create = async (req, res) => {
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
      .then((result) => {
        res.status(200).json({
          message: SUCCESS_CREATED,
          id: result[0],
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
    const { tipo, eventoid, tipocolaboradoreventoid, nome } = req.query;
    console.log(req.query);
    var query = db
      .knex("pessoaevento")
      .select("*")
      .join("pessoa", "pessoaevento.pessoaid", "=", "pessoa.pessoaid");

    if (tipo == COLABORADORES) {
      query
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
    } else if (tipo == BENEFICIARIOS) {
      query.where("pessoaevento.tipo", tipo);
    }
    if (nome) query.whereILike("nome", `%${nome}%`);

    if (eventoid != undefined) query.where("pessoaevento.eventoid", eventoid);
    if (tipocolaboradoreventoid != undefined)
      query.where(
        "pessoaevento.tipocolaboradoreventoid",
        tipocolaboradoreventoid
      );

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
      .from("pessoaevento")
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
  //#endregion

  //#region UPDATE
  static update = async (req, res) => {
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
      .where({ pessoaeventoid: id })
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
                id: id,
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
  };
  //#endregion

  //#region DELETE
  static delete = async (req, res) => {
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
  };
  //#endregion
}

module.exports = PessoaEventoController;
