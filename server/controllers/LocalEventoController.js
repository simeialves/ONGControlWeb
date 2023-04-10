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

class LocalEventoController {
  //#region CREATE
  static create = async (req, res) => {
    const {
      nome,
      cep,
      logradouro,
      numero,
      complemento,
      bairro,
      cidade,
      uf,
      pais,
      link,
    } = req.body;

    db.knex("localevento")
      .insert({
        nome: nome,
        cep: cep,
        logradouro: logradouro,
        numero: numero,
        complemento: complemento,
        bairro: bairro,
        cidade: cidade,
        uf: uf,
        pais: pais,
        link: link,
      })
      .then(() => {
        res.status(200).json({ message: SUCCESS_CREATED });
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
      .from("localevento")
      .orderBy("nome")
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
      .from("localevento")
      .where({ localeventoid: id })
      .then(function (result) {
        if (result.length) {
          res.status(201).json(result);
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
    const { nome } = req.query;

    var query = db.knex("localevento").select("*").orderBy("nome");

    if (nome != undefined) query.whereILike("nome", `%${nome}%`);

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
      nome,
      cep,
      logradouro,
      numero,
      complemento,
      bairro,
      cidade,
      uf,
      pais,
      link,
    } = req.body;

    await db.knex
      .select("*")
      .from("localevento")
      .where({ localeventoid: id })
      .then(function (result) {
        if (result.length) {
          db.knex
            .where({ localeventoid: id })
            .update({
              nome: nome,
              cep: cep,
              logradouro: logradouro,
              numero: numero,
              complemento: complemento,
              bairro: bairro,
              cidade: cidade,
              uf: uf,
              pais: pais,
              link: link,
            })
            .table("localevento")
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
      .from("localevento")
      .where({ localeventoid: id })
      .then(function (result) {
        if (result.length) {
          db.knex
            .where({ localeventoid: id })
            .delete()
            .table("localevento")
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

module.exports = LocalEventoController;
