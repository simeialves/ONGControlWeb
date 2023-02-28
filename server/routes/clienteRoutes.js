const express = require("express");
const { knex } = require("../config/db");
const db = require("../config/db");
const clientRoutes = express.Router();
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

clientRoutes.use(bodyParser.json());

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
clientRoutes.post("/", verifyJWT, (req, res) => {
  const {
    nome,
    documento,
    uf,
    cidade,
    atribuicao,
    oficio,
    telefone,
    observacao,
    servidordedicado,
    expedhorinicial,
    expedhorfinal,
    expedintinicial,
    expedintfinal,
    ativo,
  } = req.body;

  db.knex("cliente")
    .insert(
      {
        nome: nome,
        documento: documento,
        uf: uf,
        cidade: cidade,
        atribuicao: atribuicao,
        oficio: oficio,
        telefone: telefone,
        observacao: observacao,
        servidordedicado: servidordedicado,
        expedhorinicial: expedhorinicial,
        expedhorfinal: expedhorfinal,
        expedintinicial: expedintinicial,
        expedintfinal: expedintfinal,
        ativo: ativo,
      },
      ["clienteid"]
    )
    .then((result) => {
      let cliente = result[0];
      res.status(200).json({ clienteid: cliente.clienteid });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Erro ao cadastrar cliente - " + err.message,
      });
    });
});

//READ
clientRoutes.get("/", verifyJWT, async (req, res, next) => {
  await db.knex
    .select("*")
    .from("cliente")
    .then(function (clientes) {
      return res.status(201).json(clientes);
    })
    .catch((err) => {
      console.log(err);
    });
});

clientRoutes.get("/:id", verifyJWT, async (req, res, next) => {
  let clienteid = Number.parseInt(req.params.id);
  await db.knex
    .select("*")
    .from("cliente")
    .where((clienteid = clienteid))
    .then(function (clientes) {
      return res.status(201).json(clientes);
    })
    .catch((err) => {
      console.log(err);
    });
});

clientRoutes.get("/:nome", verifyJWT, async (req, res, next) => {
  await db.knex
    .select("*")
    .from("cliente")
    .where(nome, like, req.params.nome)
    .then(function (clientes) {
      return res.status(200).json(clientes);
    })
    .catch((err) => {
      console.log(err);
    });
});

//UPDATE
clientRoutes.put("/:id", verifyJWT, async (req, res) => {
  const id = Number.parseInt(req.params.id);
  const {
    nome,
    documento,
    uf,
    cidade,
    atribuicao,
    oficio,
    telefone,
    observacao,
    servidordedicado,
    expedhorinicial,
    expedhorfinal,
    expedintinicial,
    expedintfinal,
    ativo,
  } = req.body;

  await knex
    .where({ clienteid: id })
    .update({
      nome: nome,
      documento: documento,
      uf: uf,
      cidade: cidade,
      atribuicao: atribuicao,
      oficio: oficio,
      telefone: telefone,
      observacao: observacao,
      servidordedicado: servidordedicado,
      expedhorinicial: expedhorinicial,
      expedhorfinal: expedhorfinal,
      expedintinicial: expedintinicial,
      expedintfinal: expedintfinal,
      ativo: ativo,
    })
    .table("cliente")
    .then((clientes) => {
      console.log(clientes);
    })
    .catch((err) => {
      console.log(err);
    });

  res.status(200).json({
    message: "Cliente alterado com sucesso",
  });
});

//DELETE
clientRoutes.delete("/:id", verifyJWT, function (req, res) {
  let id = Number.parseInt(req.params.id);
  if (id > 0) {
    knex
      .where({ clienteid: id })
      .delete()
      .table("cliente")
      .then((clientes) => {
        console.log(clientes);
      })
      .catch((err) => {
        console.log(err);
      });

    res.status(200).json({
      message: "Cliente excluído com sucesso",
    });
  } else {
    res.status(404).json({
      message: "Cliente não encontrado",
    });
  }
});

module.exports = clientRoutes;
