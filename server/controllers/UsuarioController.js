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
const bcrypt = require("bcryptjs");

class UsuarioController {
  //#region CREATE
  static create = async (req, res) => {
    const { nome, login, senha, senha2, administrador } = req.body;

    if (senha != senha2) {
      res.status(200).json({ message: PASSWORD_DONT_MATCH });
    } else {
      db.knex("usuario")
        .insert({
          nome: nome,
          login: login,
          senha: bcrypt.hashSync(senha, 8),
          administrador: administrador,
        })
        .then(() => {
          res.status(201).json({ message: SUCCESS_CREATED });
        })
        .catch((err) => {
          res.status(500).json({
            message: ERROR_CREATED + " - " + err.message,
          });
        });
    }
  };
  //#endregion

  //#region READ
  static getAll = async (req, res) => {
    db.knex
      .select()
      .from("usuario")
      .orderBy("nome")
      .then((results) => {
        if (results.length) {
          res.status(200).json(results);
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
      .from("usuario")
      .where({ usuarioid: id })
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

    var query = db.knex("usuario").select("*");

    if (nome != undefined)
      query.whereILike("nome", `%${nome}%`).orderBy("nome");

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
    const { nome, login, senha, senha2, administrador } = req.body;
    if (senha != senha2) {
      res.status(200).json({ message: PASSWORD_DONT_MATCH });
    } else {
      db.knex
        .select("*")
        .from("usuario")
        .where({ usuarioid: id })
        .then(function (result) {
          if (result.length) {
            db.knex
              .where({ usuarioid: id })
              .update({
                nome: nome,
                login: login,
                senha: bcrypt.hashSync(senha, 8),
                administrador: administrador,
              })
              .table("usuario")
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
    }
  };
  //#endregion

  //#region DELETE
  static delete = async (req, res) => {
    let id = Number.parseInt(req.params.id);
    await db.knex
      .select("*")
      .from("usuario")
      .where({ usuarioid: id })
      .then(function (result) {
        if (result.length) {
          db.knex
            .where({ usuarioid: id })
            .delete()
            .table("usuario")
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

module.exports = UsuarioController;
