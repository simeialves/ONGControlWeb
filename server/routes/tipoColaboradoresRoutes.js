const express = require("express");
const { knex } = require("../config/db");
const db = require("../config/db");
const appRoutes = express.Router();
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

appRoutes.use(bodyParser.json());

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

//CREATE
appRoutes.post("/", (req, res) => {
  const {
    nome,
    documento,
    sexo,
    dtnascimento,
    telefone,
    email,
    cep,
    logradouro,
    numero,
    complemento,
    bairro,
    cidade,
    uf,
    pais,
    tipo,
  } = req.body;

  db.knex("pessoa")
    .insert({
      nome: nome,
      documento: documento,
      sexo: sexo,
      dtnascimento: dtnascimento,
      telefone: telefone,
      email: email,
      cep: cep,
      logradouro: logradouro,
      numero: numero,
      complemento: complemento,
      bairro: bairro,
      cidade: cidade,
      uf: uf,
      pais: pais,
      tipo: tipo,
    })
    .then((result) => {
      let pessoa = result[0];
      res.status(200).json({ pessoaid: pessoa.clienteid });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Erro ao cadastrar pessoa - " + err.message,
      });
    });
});

//READ
appRoutes.get("/", verifyJWT, async (req, res, next) => {
  await db.knex
    .select("*")
    .from("pessoa")
    .then(function (pessoas) {
      return res.status(201).json(pessoas);
    })
    .catch((err) => {
      console.log(err);
    });
});

appRoutes.get("/:id", async (req, res, next) => {
  let pessoaid = Number.parseInt(req.params.id);
  await db.knex
    .select("*")
    .from("pessoa")
    .where({ pessoaid: pessoaid })
    .then(function (pessoas) {
      return res.status(201).json(pessoas);
    })
    .catch((err) => {
      console.log(err);
    });
});

//UPDATE
appRoutes.put("/:id", async (req, res) => {
  const id = Number.parseInt(req.params.id);
  const {
    nome,
    documento,
    sexo,
    dtnascimento,
    telefone,
    email,
    cep,
    logradouro,
    numero,
    complemento,
    bairro,
    cidade,
    uf,
    pais,
    tipo,
  } = req.body;

  await db.knex
    .select("*")
    .from("pessoa")
    .where({ pessoaid: id })
    .then(function (pessoas) {
      if (pessoas.length) {
        knex
          .where({ pessoaid: id })
          .update({
            nome: nome,
            documento: documento,
            sexo: sexo,
            dtnascimento: dtnascimento,
            telefone: telefone,
            email: email,
            cep: cep,
            logradouro: logradouro,
            numero: numero,
            complemento: complemento,
            bairro: bairro,
            cidade: cidade,
            uf: uf,
            pais: pais,
            tipo: tipo,
          })
          .table("pessoa")
          .then((pessoas) => {
            console.log(pessoas);
          })
          .catch((err) => {
            console.log(err);
          });

        res.status(200).json({
          message: "Pessoa alterada com sucesso",
        });
      } else {
        res.status(404).json({
          message: "Pessoa não encontrada",
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

//DELETE
appRoutes.delete("/:id", async (req, res) => {
  let id = Number.parseInt(req.params.id);
  await db.knex
    .select("*")
    .from("pessoa")
    .where({ pessoaid: id })
    .then(function (pessoas) {
      if (pessoas.length) {
        knex
          .where({ pessoaid: id })
          .delete()
          .table("pessoa")
          .then((pessoas) => {
            console.log(pessoas);
          })
          .catch((err) => {
            console.log(err);
          });

        res.status(200).json({
          message: "Pessoa excluída com sucesso",
        });
      } else {
        res.status(404).json({
          message: "Pessoa não encontrada",
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
module.exports = appRoutes;
