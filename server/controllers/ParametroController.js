const db = require("../config/db");
const {
  NOT_FOUND,
  ERROR_FETCH,
  SUCCESS_UPDATED,
} = require("../includes/Messages");

class ParametroController {
  //#region READ
  static getAll = async (req, res) => {
    await db.knex
      .select("*")
      .from("parametro")
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
    const {
      nome,
      documento,
      responsavel,
      cep,
      logradouro,
      numero,
      complemento,
      bairro,
      cidade,
      uf,
      telefone,
      email,
      homepage,
      email_remetente,
      email_login,
      email_senha,
      email_servidor,
      email_porta,
      email_ssl,
    } = req.body;

    const ID_NOME = 1;
    const ID_DOCUMENTO = 2;
    const ID_RESPONSAVEL = 3;
    const ID_CEP = 4;
    const ID_LOGRADOURO = 5;
    const ID_NUMERO = 6;
    const ID_COMPLEMENTO = 7;
    const ID_BAIRRO = 8;
    const ID_CIDADE = 9;
    const ID_UF = 10;
    const ID_TELEFONE = 11;
    const ID_EMAIL = 12;
    const ID_HOMEPAGE = 13;
    const ID_EMAIL_REMETENTE = 14;
    const ID_EMAIL_LOGIN = 15;
    const ID_EMAIL_SENHA = 16;
    const ID_EMAIL_SERVIDOR = 17;
    const ID_EMAIL_PORTA = 18;
    const ID_EMAIL_SSL = 19;

    function GetValorByParametroId(id) {
      switch (id) {
        case ID_NOME:
          return nome;

        case ID_DOCUMENTO:
          return documento;

        case ID_RESPONSAVEL:
          return responsavel;

        case ID_CEP:
          return cep;

        case ID_LOGRADOURO:
          return logradouro;

        case ID_NUMERO:
          return numero;

        case ID_COMPLEMENTO:
          return complemento;

        case ID_BAIRRO:
          return bairro;

        case ID_CIDADE:
          return cidade;

        case ID_UF:
          return uf;

        case ID_TELEFONE:
          return telefone;

        case ID_EMAIL:
          return email;

        case ID_HOMEPAGE:
          return homepage;

        case ID_EMAIL_REMETENTE:
          return email_remetente;

        case ID_EMAIL_LOGIN:
          return email_login;

        case ID_EMAIL_SENHA:
          return email_senha;

        case ID_EMAIL_SERVIDOR:
          return email_servidor;

        case ID_EMAIL_PORTA:
          return email_porta;

        case ID_EMAIL_SSL:
          return email_ssl;

        default:
          return null;
      }
    }

    await db.knex
      .select("*")
      .from("parametro")
      .then(function (results) {
        if (results.length) {
          results.forEach(async (item) => {
            db.knex("parametro")
              .where("parametroid", item.parametroid)
              .update({
                valor: GetValorByParametroId(item.parametroid),
              })
              .then(() => {})
              .catch((err) => {
                console.log(err);
              });
          });
          res.status(201).json({
            message: SUCCESS_UPDATED,
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

module.exports = ParametroController;
