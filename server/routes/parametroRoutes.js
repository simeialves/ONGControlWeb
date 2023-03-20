const express = require("express");
const { knex } = require("../config/db");
const db = require("../config/db");
const appRoutes = express.Router();
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

appRoutes.use(bodyParser.json());

const STATUS_ATIVO = 1;
const NOT_FOUND = "Not Found.";

//#region Methods
function verifyJWT(req, res, next) {
  var token = req.headers["x-access-token"];

  if (!token) {
    return res.status(401).send({ auth: false, message: "No token provided." });
  }

  jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });

    // se tudo estiver ok, salva no request para uso posterior
    req.userId = decoded.id;
    next();
  });
}
//#endregion

//#region READ
appRoutes.get("/", async (req, res, next) => {
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
      console.log(err);
    });
});

//#endregion

//#region UPDATE
appRoutes.put("/", async (req, res) => {
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
          await db
            .knex("parametro")
            .where("parametroid", item.parametroid)
            .update({
              valor: GetValorByParametroId(item.parametroid),
            })
            .then(function () {})
            .catch((err) => {
              console.log(err);
            });
        });
      } else {
        res.status(404).json({
          message: NOT_FOUND,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
//#endregion
module.exports = appRoutes;