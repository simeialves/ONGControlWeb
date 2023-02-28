const express = require("express");
const { knex } = require("../config/db");
const db = require("../config/db");
const parteRoutes = express.Router();
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

parteRoutes.use(bodyParser.json());

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
parteRoutes.post("/", (req, res) => {
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

  db.knex("parte")
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
      let parte = result[0];
      res.status(200).json({ parteid: parte.clienteid });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Erro ao cadastrar parte - " + err.message,
      });
    });
});

//READ
parteRoutes.get("/", async (req, res, next) => {
  await db.knex
    .select("*")
    .from("parte")
    .then(function (partes) {
      return res.status(201).json(partes);
    })
    .catch((err) => {
      console.log(err);
    });
});

parteRoutes.get("/:id", async (req, res, next) => {
  let parteid = Number.parseInt(req.params.id);
  await db.knex
    .select("*")
    .from("parte")
    .where({ parteid: parteid })
    .then(function (partes) {
      return res.status(201).json(partes);
    })
    .catch((err) => {
      console.log(err);
    });
});

// parteRoutes.get("/:nome", async (req, res, next) => {
//   await db.knex
//     .select("*")
//     .from("parte")
//     .where(nome, like, req.params.nome)
//     .then(function (partes) {
//       return res.status(200).json(partes);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

//UPDATE
parteRoutes.put("/:id", async (req, res) => {
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
    .from("parte")
    .where({ parteid: id })
    .then(function (partes) {
      if (partes.length) {
        knex
          .where({ parteid: id })
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
          .table("parte")
          .then((partes) => {
            console.log(partes);
          })
          .catch((err) => {
            console.log(err);
          });

        res.status(200).json({
          message: "Parte alterada com sucesso",
        });
      } else {
        res.status(404).json({
          message: "Parte não encontrada",
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

//DELETE
parteRoutes.delete("/:id", async (req, res) => {
  let id = Number.parseInt(req.params.id);
  await db.knex
    .select("*")
    .from("parte")
    .where({ parteid: id })
    .then(function (partes) {
      if (partes.length) {
        knex
          .where({ parteid: id })
          .delete()
          .table("parte")
          .then((partes) => {
            console.log(partes);
          })
          .catch((err) => {
            console.log(err);
          });

        res.status(200).json({
          message: "Parte excluída com sucesso",
        });
      } else {
        res.status(404).json({
          message: "Parte não encontrada",
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
module.exports = parteRoutes;
