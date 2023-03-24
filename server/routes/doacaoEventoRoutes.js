const express = require("express");
const { knex } = require("../config/db");
const db = require("../config/db");
const appRoutes = express.Router();
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const {
  NOT_FOUND,
  NO_TOKEN_PROVIDER,
  FAILED_AUTH_TOKEN,
} = require("../includes/const");

appRoutes.use(bodyParser.json());

/*
tipodoacaoid, tipodoacaoeventoid, eventoid, pessoaid, datadoacao, quantidade
*/

//#region Methods
function verifyJWT(req, res, next) {
  var token = req.headers["x-access-token"];

  if (!token) {
    return res.status(401).send({ auth: false, message: NO_TOKEN_PROVIDER });
  }

  jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
    if (err)
      return res.status(500).send({ auth: false, message: FAILED_AUTH_TOKEN });
    req.userId = decoded.id;
    next();
  });
}
//#endregion

//#region CREATE
appRoutes.post("/", (req, res) => {
  const {
    tipodoacaoid,
    tipodoacaoeventoid,
    eventoid,
    pessoaid,
    datadoacao,
    quantidade,
  } = req.body;

  db.knex("doacaoevento")
    .insert({
      tipodoacaoid: tipodoacaoid,
      tipodoacaoeventoid: tipodoacaoeventoid,
      eventoid: eventoid,
      pessoaid: pessoaid,
      datadoacao: datadoacao,
      quantidade: quantidade,
    })
    .then((result) => {
      let resultInsert = result[0];
      res.status(200).json({ tipodoacaoid: resultInsert });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Erro ao cadastrar pessoa - " + err.message,
      });
    });
});
//#endregion

//#region READ
appRoutes.get("/", async (req, res, next) => {
  const { eventoid } = req.query;

  var query = knex("doacaoevento")
    .select(
      "tipodoacao.descricao as tipodoacaodescricao",
      "doacaoevento.quantidade as doacaoeventoquantidade",
      "pessoa.nome as pessoanome",
      "doacaoevento.datadoacao as doacaoeventodatadoacao",
      "pessoa.telefone as pessoatelefone",
      "pessoa.email as pessoaemail"
    )
    .join(
      "tipodoacao",
      "doacaoevento.tipodoacaoid",
      "=",
      "tipodoacao.tipodoacaoid"
    )
    .join(
      "tipodoacaoevento",
      "doacaoevento.tipodoacaoeventoid",
      "=",
      "tipodoacaoevento.tipodoacaoeventoid"
    )
    //.join("evento", "doacaoevento.eventoid", "=", "evento.eventoid")
    .join("pessoa", "doacaoevento.pessoaid", "=", "pessoa.pessoaid");

  if (eventoid != undefined) query.where("doacaoevento.eventoid", eventoid);

  query
    .then(function (results) {
      if (results.length) {
        return res.status(201).json(results);
      } else {
        return res.status(404).json({ message: NOT_FOUND });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

// appRoutes.get("/filter", verifyJWT, async (req, res, next) => {
//   const { nome } = req.query;

//   var query = knex("doacaoevento").select("*");

//   if (nome != undefined) query.whereILike("nome", `%${nome}%`).orderBy("nome");

//   query
//     .then(function (results) {
//       if (results.length) {
//         return res.status(201).json(results);
//       } else {
//         res.status(404).json({
//           message: NOT_FOUND,
//         });
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

appRoutes.get("/:id", async (req, res, next) => {
  let id = Number.parseInt(req.params.id);
  await db.knex
    .select("*")
    .from("doacaoevento")
    .where({ pessoaeventoid: id })
    .then(function (result) {
      if (result.length) {
        return res.status(201).json(result);
      } else {
        return res.status(404).json({ message: "Pessoa não encontrada" });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
//#endregion

//#region UPDATE

appRoutes.put("/:id", async (req, res) => {
  const id = Number.parseInt(req.params.id);
  const {
    tipodoacaoid,
    tipodoacaoeventoid,
    eventoid,
    pessoaid,
    datadoacao,
    quantidade,
  } = req.body;

  await db.knex
    .select("*")
    .from("doacaoevento")
    .where({ doacaoeventoid: id })
    .then(function (result) {
      if (result.length) {
        knex
          .where({ doacaoeventoid: id })
          .update({
            tipodoacaoid: tipodoacaoid,
            tipodoacaoeventoid: tipodoacaoeventoid,
            eventoid: eventoid,
            pessoaid: pessoaid,
            datadoacao: datadoacao,
            quantidade: quantidade,
          })
          .table("doacaoevento")
          .then((result) => {
            console.log(result);
          })
          .catch((err) => {
            console.log(err);
          });

        res.status(200).json({
          message: "Pessoa alterada com sucesso",
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

//#region DELETE
appRoutes.delete("/:id", async (req, res) => {
  let id = Number.parseInt(req.params.id);
  await db.knex
    .select("*")
    .from("doacaoevento")
    .where({ doacaoeventoid: id })
    .then(function (result) {
      if (result.length) {
        knex
          .where({ doacaoeventoid: id })
          .delete()
          .table("doacaoevento")
          .then((result) => {
            console.log(result);
          })
          .catch((err) => {
            console.log(err);
          });

        res.status(200).json({
          message: "Pessoa excluída com sucesso",
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
