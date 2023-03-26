const express = require("express");
const { knex } = require("../config/db");
const db = require("../config/db");
const appRoutes = express.Router();
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const { NOT_FOUND } = require("../includes/const");

appRoutes.use(bodyParser.json());

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

//#region CREATE
appRoutes.post("/", (req, res) => {
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
      let resultInsert = result[0];
      res.status(200).json({ pessoaeventoid: resultInsert });
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
  const { tipo, eventoid, tipocolaboradoreventoid } = req.query;
  var query = knex("pessoaevento")
    .select("*")
    .join("pessoa", "pessoaevento.pessoaid", "=", "pessoa.pessoaid")
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

  if (tipo != undefined) query.where("pessoaevento.tipo", tipo);
  if (eventoid != undefined) query.where("pessoaevento.eventoid", eventoid);
  if (tipocolaboradoreventoid != undefined)
    query.where(
      "pessoaevento.tipocolaboradoreventoid",
      tipocolaboradoreventoid
    );

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
      console.log(err);
    });
});

// appRoutes.get("/filter", verifyJWT, async (req, res, next) => {
//   const { nome } = req.query;

//   var query = knex("pessoaevento").select("*");

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
    .from("pessoaevento")
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
    .where({ pessoaid: id })
    .then(function (result) {
      if (result.length) {
        knex
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
          message: "Pessoa não encontrada",
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
    .from("pessoaevento")
    .where({ pessoaeventoid: id })
    .then(function (result) {
      if (result.length) {
        knex
          .where({ pessoaeventoid: id })
          .delete()
          .table("pessoaevento")
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
          message: "Pessoa não encontrada",
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
//#endregion

module.exports = appRoutes;
